'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Button } from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DishCard from "./DishCard";
import MenuLoading from "./MenuLoading";
import NotFound from "../NotFound";
import { Dish } from "@/lib/utils";
import { toast } from "sonner";

interface MenuTabsProps {
  searchText: string;
}

interface FullMenuGroup {
  categoryId: string;
  categoryName: string;
  description: string;
  dishes: Dish[];
}

export default function MenuTabs({ searchText }: MenuTabsProps) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [fullMenu, setFullMenu] = useState<FullMenuGroup[]>([]);
  const [dailyMenu, setDailyMenu] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [dailyPage, setDailyPage] = useState(1);
  const [fullMenuPage, setFullMenuPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const getStartEndIndex = (page: number) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return { start, end };
  };

  const hasMatches = (items: Dish[] = []) =>
    items.some(
      (item) =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchText.toLowerCase())
    );

  const getCategoryById = async (categoryId: string) => {
    try {
      const response = await axios.get(`/api/dishCategory/getById/${categoryId}`);
      return response?.data?.data ?? null;
    } catch {
      return null;
    }
  };

  const groupDishesByCategory = async (dishes: Dish[]) => {
    const grouped: Record<string, Dish[]> = dishes.reduce((acc, dish) => {
      if (!acc[dish.category_id]) acc[dish.category_id] = [];
      acc[dish.category_id].push(dish);
      return acc;
    }, {} as Record<string, Dish[]>);

    const result = await Promise.all(
      Object.entries(grouped).map(async ([categoryId, dishes]) => {
        const category = await getCategoryById(categoryId);
        return {
          categoryId,
          categoryName: category?.name ?? "Unknown Category",
          description: category?.description ?? "No Description",
          dishes
        };
      })
    );

    return result;
  };

  // Fetch dishes and daily menu in parallel
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const [dishesResult, dailyMenuResult] = await Promise.allSettled([
          axios.get("/api/dish/getAll"),
          axios.get("/api/dailyMenu/getDailyMenu")
        ]);

        if (dishesResult.status === "fulfilled") {
          const fetchedDishes = dishesResult.value?.data?.data ?? [];
          setDishes(fetchedDishes);
          const groupedMenu = await groupDishesByCategory(fetchedDishes);
          setFullMenu(groupedMenu);
        } else {
          toast.error(dishesResult.reason?.message || "Failed to fetch dishes");
        }

        if (dailyMenuResult.status === "fulfilled") {
          const fetchedDailyMenu = dailyMenuResult.value?.data?.data ?? [];
          setDailyMenu(fetchedDailyMenu);
        } else {
          toast.error(dailyMenuResult.reason?.message || "Failed to fetch daily menu");
        }
      } catch (error: any) {
        toast.error(error?.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <MenuLoading />;

  // Daily Menu Pagination
  const filteredDaily = dailyMenu.filter((dish) => hasMatches([dish]));
  const { start: dailyStart, end: dailyEnd } = getStartEndIndex(dailyPage);
  const paginatedDaily = filteredDaily.slice(dailyStart, dailyEnd);

  // Full Menu Flatten & Pagination
  const flatFullMenu = fullMenu.flatMap((group) =>
    group.dishes
      .filter((dish) => hasMatches([dish]))
      .map((dish) => ({
        ...dish,
        categoryId: group.categoryId,
        categoryName: group.categoryName,
        categoryDescription: group.description
      }))
  );

  const { start: fullStart, end: fullEnd } = getStartEndIndex(fullMenuPage);
  const paginatedFullMenu = flatFullMenu.slice(fullStart, fullEnd);

  // Regroup paginated full menu
  const groupedPaginatedFullMenu = Object.values(
    paginatedFullMenu.reduce((acc: Record<string, any>, dish) => {
      if (!acc[dish.categoryId]) {
        acc[dish.categoryId] = {
          categoryId: dish.categoryId,
          categoryName: dish.categoryName,
          description: dish.categoryDescription,
          dishes: []
        };
      }
      acc[dish.categoryId].dishes.push(dish);
      return acc;
    }, {})
  );

  return (
    <Tabs defaultValue="daily" className="w-full relative md:px-[100px] pb-4">
      <TabsList className="mb-6 flex flex-wrap justify-center gap-2 rounded-none pt-10">
        <TabsTrigger value="daily" className="px-6 py-4 text-sm md:text-base">
          Today's Menu
        </TabsTrigger>
        <TabsTrigger value="full" className="px-6 py-4 text-sm md:text-base">
          Full Menu
        </TabsTrigger>
      </TabsList>

      {/* Daily Menu */}
      <TabsContent value="daily" className="animate-enter py-10">
        <section className="space-y-8 p-6 bg-transparent rounded-xl">
          <ul className="flex flex-wrap gap-6 justify-between">
            {paginatedDaily?.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </ul>
          {filteredDaily.length > ITEMS_PER_PAGE && (
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button onClick={() => setDailyPage((p) => Math.max(1, p - 1))} disabled={dailyPage === 1}>
                <ArrowLeft /> Show Previous
              </Button>
              <Button
                onClick={() => setDailyPage((p) => (dailyEnd >= filteredDaily.length ? p : p + 1))}
                disabled={dailyEnd >= filteredDaily.length}
              >
                <ArrowRight /> Show Next
              </Button>
            </div>
          )}
        </section>
        {!filteredDaily.length && <NotFound message="Cuisine" menu />}
      </TabsContent>

      {/* Full Menu */}
      <TabsContent value="full" className="animate-enter py-10">
        <div className="space-y-8 p-6 rounded-xl bg-transparent shadow-sm">
          {groupedPaginatedFullMenu.map((group) => (
            <section key={group.categoryId} className="bg-transparent rounded-xl">
              <h3 className="text-lg md:text-xl xl:text-2xl font-semibold xl:font-bold mb-2 text-center text-white inline-block px-2 py-1 bg-primary rounded backdrop-blur-lg ms-[45%]">
                {group.categoryName}
              </h3>
              {group.description && (
                <p className="text-sm text-gray-500 mb-6 text-justify">{group.description}</p>
              )}
              <ul className="flex flex-wrap gap-6 justify-center">
                {group.dishes.map((dish: any) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </ul>
            </section>
          ))}

          {flatFullMenu.length > ITEMS_PER_PAGE && (
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              <Button onClick={() => setFullMenuPage((p) => Math.max(1, p - 1))} disabled={fullMenuPage === 1}>
                <ArrowLeft /> Show Previous
              </Button>
              <Button
                onClick={() => setFullMenuPage((p) => (fullEnd >= flatFullMenu.length ? p : p + 1))}
                disabled={fullEnd >= flatFullMenu.length}
              >
                <ArrowRight /> Show Next
              </Button>
            </div>
          )}

          {!flatFullMenu.length && <NotFound message="Cuisine" menu />}
        </div>
      </TabsContent>
    </Tabs>
  );
}
