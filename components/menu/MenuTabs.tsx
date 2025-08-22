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
  const [sideOrdersPage, setSideOrdersPage] = useState(1);
  const [drinksPage, setDrinksPage] = useState(1);
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
        item?.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.category?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.category?.description?.toLowerCase().includes(searchText.toLowerCase())
    );

  const groupDishesByCategory = (dishes: Dish[]) => {
    const grouped: Record<string, Dish[]> = dishes?.reduce((acc, dish) => {
      if (!acc[dish.category.id]) acc[dish.category.id] = [];
      acc[dish.category.id].push(dish);
      return acc;
    }, {} as Record<string, Dish[]>);

    const result = Object.entries(grouped).map(([categoryId, dishes]) => {
      const category = dishes[0]?.category;
      return {
        categoryId,
        categoryName: category?.name ?? "Unknown Category",
        description: category?.description ?? "No Description",
        dishes
      };
    });

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
  // Side Orders Flatten & Pagination
  const flatSideOrders = fullMenu.flatMap((group) =>
    group.dishes
      .filter((dish) => hasMatches([dish]) && dish?.category?.name === "Side Orders")
      .map((dish) => ({
        ...dish,
        categoryId: group.categoryId,
        categoryName: group.categoryName,
        categoryDescription: group.description
      }))
  );
  // Side Orders Flatten & Pagination
  const flatDrinks = fullMenu.flatMap((group) =>
    group.dishes
      .filter((dish) => hasMatches([dish]) && (dish?.category?.name?.toLowerCase().includes("drink")))
      .map((dish) => ({
        ...dish,
        categoryId: group.categoryId,
        categoryName: group.categoryName,
        categoryDescription: group.description
      }))
  );

  const { start: fullStart, end: fullEnd } = getStartEndIndex(fullMenuPage);
  const { start: sideOrdersStart, end: sideOrdersEnd } = getStartEndIndex(sideOrdersPage);
  const { start: drinksStart, end: drinksEnd } = getStartEndIndex(drinksPage);
  const paginatedFullMenu = flatFullMenu.slice(fullStart, fullEnd);
  const paginatedSideOrders = flatSideOrders.slice(sideOrdersStart, sideOrdersEnd);
  const paginatedDrinks = flatDrinks.slice(drinksStart, drinksEnd);

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
  // Regroup paginated side orders
  const groupedPaginatedSideOrders = Object.values(
    paginatedSideOrders.reduce((acc: Record<string, any>, dish) => {
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
  // Regroup paginated drinks
  const groupedPaginatedDrinks = Object.values(
    paginatedDrinks.reduce((acc: Record<string, any>, dish) => {
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
        <TabsTrigger value="full" className="md:px-6 md:py-4 text-sm md:text-base">
          Full Menu
        </TabsTrigger>
        <TabsTrigger value="daily" className="md:px-6 md:py-4 text-sm md:text-base ">
          Today's Menu
        </TabsTrigger>
        <TabsTrigger value="drinks" className="md:px-6 md:py-4 text-sm md:text-base">
          Drinks
        </TabsTrigger>
        <TabsTrigger value="side-orders" className="md:px-6 md:py-4 text-sm md:text-base">
          Side Orders
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
              <h3 className="text-sm sm:text-md md:text-xl xl:text-2xl font-semibold xl:font-bold mb-2 text-center text-white inline-block px-2 py-1 bg-primary rounded backdrop-blur-lg ms-[45%]">
                {group.categoryName}
              </h3>
              {group.description && (
                <p className="text-sm text-gray-500 mb-6 text-justify">{group.description}</p>
              )}
              <ul className="flex flex-wrap gap-6 justify-between">
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

      {/* Side orders */}
      <TabsContent value="side-orders" className="animate-enter py-10">
        <div className="space-y-8 p-6 rounded-xl bg-transparent shadow-sm">
          {groupedPaginatedSideOrders?.map((group) => (
            <section key={group.categoryId} className="bg-transparent rounded-xl">
              <h3 className="text-sm sm:text-md md:text-xl xl:text-2xl font-semibold xl:font-bold mb-2 text-center text-white inline-block px-2 py-1 bg-primary rounded backdrop-blur-lg ms-[45%]">
                {group.categoryName}
              </h3>
              {group.description && (
                <p className="text-sm text-gray-500 mb-6 text-justify">{group.description}</p>
              )}
              <ul className="flex flex-wrap gap-6 justify-between">
                {group.dishes.map((dish: any) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </ul>
            </section>
          ))}

          {flatSideOrders.length > ITEMS_PER_PAGE && (
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              <Button onClick={() => setSideOrdersPage((p) => Math.max(1, p - 1))} disabled={sideOrdersPage === 1}>
                <ArrowLeft /> Show Previous
              </Button>
              <Button
                onClick={() => setSideOrdersPage((p) => (sideOrdersEnd >= flatSideOrders.length ? p : p + 1))}
                disabled={sideOrdersEnd >= flatSideOrders.length}
              >
                <ArrowRight /> Show Next
              </Button>
            </div>
          )}

          {!flatFullMenu.length && <NotFound message="Cuisine" menu />}
        </div>
      </TabsContent>
      {/* Drinks */}
      <TabsContent value="drinks" className="animate-enter py-10">
        <div className="space-y-8 p-6 rounded-xl bg-transparent shadow-sm">
          {groupedPaginatedDrinks?.map((group) => (
            <section key={group.categoryId} className="bg-transparent rounded-xl">
              <h3 className="text-sm sm:text-md md:text-xl xl:text-2xl font-semibold xl:font-bold mb-2 text-center text-white inline-block px-2 py-1 bg-primary rounded backdrop-blur-lg ms-[45%]">
                {group.categoryName}
              </h3>
              {group.description && (
                <p className="text-sm text-gray-500 mb-6 text-justify">{group.description}</p>
              )}
              <ul className="flex flex-wrap gap-6 justify-between">
                {group.dishes.map((dish: any) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </ul>
            </section>
          ))}

          {flatDrinks.length > ITEMS_PER_PAGE && (
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              <Button onClick={() => setDrinksPage((p) => Math.max(1, p - 1))} disabled={drinksPage === 1}>
                <ArrowLeft /> Show Previous
              </Button>
              <Button
                onClick={() => setDrinksPage((p) => (drinksEnd >= flatDrinks.length ? p : p + 1))}
                disabled={drinksEnd >= flatDrinks.length}
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
