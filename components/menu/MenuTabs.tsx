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
  const [loading, setLoading] = useState(false);

  // Pagination
  const [dailyPage, setDailyPage] = useState(1);
  const [fullMenuPage, setFullMenuPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Helper to calculate slice indexes
  const getStartEndIndex = (page: number) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return { start, end };
  };

  // Filter based on search text
  const hasMatches = (items: Dish[] = []) =>
    items.some(
      (item) =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchText.toLowerCase())
    );

  // Fetch category by ID
  const getCategoryById = async (categoryId: string) => {
    const response = await axios.get(`/api/dishCategory/getById/${categoryId}`);
    return response?.data?.data ?? null;
  };

  // Group dishes by category with description
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

  // Fetch dishes and full menu
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await axios.get("/api/dish/getAll");
        const fetchedDishes = response?.data?.data ?? [];
        setDishes(fetchedDishes);

        const groupedMenu = await groupDishesByCategory(fetchedDishes);
        setFullMenu(groupedMenu);
      } catch (error: any) {
        toast.error(error?.message || "Failed to fetch dishes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <MenuLoading />;

  // Paginated daily menu
  const filteredDishes = dishes.filter((dish) => hasMatches([dish]));
  const { start: dailyStart, end: dailyEnd } = getStartEndIndex(dailyPage);
  const paginatedDishes = filteredDishes.slice(dailyStart, dailyEnd);

  // Flatten full menu for global pagination
  const flatFullMenu = fullMenu
    .flatMap((group) =>
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

  // Regroup paginated dishes by category for display
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
            {paginatedDishes.map((item) => (
              <DishCard key={item.id} dish={item} />
            ))}
          </ul>

          {filteredDishes.length > ITEMS_PER_PAGE && (
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button onClick={() => setDailyPage((p) => Math.max(1, p - 1))} disabled={dailyPage === 1}>
                <ArrowLeft /> Show Previous
              </Button>
              <Button
                onClick={() => setDailyPage((p) => (dailyEnd >= filteredDishes.length ? p : p + 1))}
                disabled={dailyEnd >= filteredDishes.length}
              >
                <ArrowRight /> Show Next
              </Button>
            </div>
          )}
        </section>

        {!hasMatches(dishes) && <NotFound message="Cuisine" menu />}
      </TabsContent>

      {/* Full Menu */}
      <TabsContent value="full" className="animate-enter py-10">
        <div className="space-y-8 p-6 rounded-xl bg-transparent shadow-sm">
          {groupedPaginatedFullMenu.map((group) => (
            <section key={group.categoryId} className="bg-transparent rounded-xl">
              <h3 className="text-2xl font-bold mb-2 text-center text-white inline-block px-2 py-1 bg-primary rounded backdrop-blur-lg ms-[45%]">
                {group.categoryName}
              </h3>
              {group.description && (
                <p className="text-sm text-gray-500 mb-6 text-justify">{group.description}</p>
              )}
              <ul className="flex flex-wrap gap-6 justify-center">
                {group.dishes.map((item: any) => (
                  <DishCard key={item.id} dish={item} />
                ))}
              </ul>
            </section>
          ))}

          {/* Full menu pagination */}
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
