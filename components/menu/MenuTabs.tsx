'use client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Button } from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DishCard from "./DishCard";
import MenuLoading from "./MenuLoading";
import NotFound from "../NotFound";
import { Dish } from "@/lib/utils";
import { useMenuData } from "@/hooks/useMenuData";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { usePagination } from "@/hooks/usePagination";

interface MenuTabsProps {
  searchText: string;
}

// 🔹 Renders category groups
function MenuSection({ groups }: { groups: any[] }) {
  return (
    <>
      {groups?.map((group) => (
        <section key={group.categoryId} className="bg-transparent rounded-xl mt-4">
          <h3 className="text-xl font-bold mb-2 text-center text-white inline-block px-2 py-1 bg-primary rounded backdrop-blur-lg">
            {group.categoryName}
          </h3>
          {group.description && (
            <p className="text-sm text-gray-500 mb-6 text-justify">
              {group.description}
            </p>
          )}
          <DishList dishes={group.dishes} />
        </section>
      ))}
    </>
  );
}

// 🔹 Renders list of dishes
function DishList({ dishes }: { dishes: Dish[] }) {
  return (
    <ul className="flex flex-wrap gap-6 justify-between">
      {dishes?.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </ul>
  );
}

// 🔹 Pagination buttons
function PaginationControls({
  page,
  setPage,
  totalItems,
  ITEMS_PER_PAGE
}: {
  page: number;
  setPage: (p: number) => void;
  totalItems: number;
  ITEMS_PER_PAGE: number;
}) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const hasPrev = page > 1;
  const hasNext = end < totalItems;

  if (totalItems <= ITEMS_PER_PAGE) return null;

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
      <Button onClick={() => setPage(page - 1)} disabled={!hasPrev}>
        <ArrowLeft /> Show Previous
      </Button>
      <Button onClick={() => setPage(page + 1)} disabled={!hasNext}>
        <ArrowRight /> Show Next
      </Button>
    </div>
  );
}

// 🔹 Main Tabs Component
export default function MenuTabs({ searchText }: MenuTabsProps) {
  const { loading, fullMenu, dailyMenu } = useMenuData();
  const { hasMatches } = useSearchFilter(searchText);

  const ITEMS_PER_PAGE = 10;
  const dailyPagination = usePagination(ITEMS_PER_PAGE);
  const fullPagination = usePagination(ITEMS_PER_PAGE);
  const drinksPagination = usePagination(ITEMS_PER_PAGE);
  const sidesPagination = usePagination(ITEMS_PER_PAGE);

  if (loading) return <MenuLoading />;

  // Filter
  const filteredDaily = dailyMenu.filter((dish) => hasMatches(dish));
  const filteredFull = fullMenu.flatMap((g) =>
    g.dishes.filter(hasMatches).map((d:any) => ({ ...d, group: g }))
  );
  const filteredDrinks = filteredFull.filter((d) =>
    d.category?.name.toLowerCase().includes("drink")
  );
  const filteredSides = filteredFull.filter(
    (d) => d.category?.name === "Side Orders"
  );

  // Paginate
  const paginatedDaily = dailyPagination.paginate(filteredDaily);
  const paginatedFull = fullPagination.paginate(filteredFull);
  const paginatedDrinks = drinksPagination.paginate(filteredDrinks);
  const paginatedSides = sidesPagination.paginate(filteredSides);

  return (
    <Tabs defaultValue="daily" className="w-full relative px-14 md:px-[100px] pb-2">
      <TabsList className="flex flex-wrap justify-center gap-2 py-2 md:pt-14 mb-6 md:mb-0">
        <TabsTrigger value="full">Full Menu</TabsTrigger>
        <TabsTrigger value="daily">Today's Menu</TabsTrigger>
        <TabsTrigger value="drinks">Drinks</TabsTrigger>
        <TabsTrigger value="side-orders">Side Orders</TabsTrigger>
      </TabsList>

      {/* Daily Menu */}
      <TabsContent value="daily" className="animate-enter py-4 mt-20 sm:mt-10">
        {paginatedDaily?.length ? (
          <>
            <DishList dishes={paginatedDaily} />
            <PaginationControls
              page={dailyPagination.page}
              setPage={dailyPagination.setPage}
              totalItems={filteredDaily.length}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            />
          </>
        ) : (
          <NotFound message="Cuisine" menu />
        )}
      </TabsContent>

      {/* Full Menu */}
      <TabsContent value="full" className="animate-enter py-4 mt-20 sm:mt-10">
        {paginatedFull?.length ? (
          <>
            <MenuSection groups={fullPagination.groupByCategory(paginatedFull)} />
            <PaginationControls
              page={fullPagination.page}
              setPage={fullPagination.setPage}
              totalItems={filteredFull.length}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            />
          </>
        ) : (
          <NotFound message="Cuisine" menu />
        )}
      </TabsContent>

      {/* Drinks */}
      <TabsContent value="drinks" className="animate-enter py-4 mt-20 sm:mt-10">
        {paginatedDrinks?.length ? (
          <>
            <MenuSection groups={drinksPagination.groupByCategory(paginatedDrinks)} />
            <PaginationControls
              page={drinksPagination.page}
              setPage={drinksPagination.setPage}
              totalItems={filteredDrinks.length}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            />
          </>
        ) : (
          <NotFound message="Cuisine" menu />
        )}
      </TabsContent>

      {/* Side Orders */}
      <TabsContent value="side-orders" className="animate-enter py-4 mt-20 sm:mt-10">
        {paginatedSides?.length ? (
          <>
            <MenuSection groups={sidesPagination.groupByCategory(paginatedSides)} />
            <PaginationControls
              page={sidesPagination.page}
              setPage={sidesPagination.setPage}
              totalItems={filteredSides.length}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            />
          </>
        ) : (
          <NotFound message="Cuisine" menu />
        )}
      </TabsContent>
    </Tabs>
  );
}
