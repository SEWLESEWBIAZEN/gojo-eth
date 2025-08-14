'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { useEffect, useState } from "react";
import axios from "axios"
import DishCard from "./DishCard";
import MenuLoading from "./MenuLoading";
import { Dish } from "@/lib/utils";
import NotFound from "../NotFound";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  spicy?: boolean;
  vegan?: boolean;
};

const fullMenu: { category: string; items: Dish[] }[] = [
  {
    category: "Appetizers",
    items: [
      {
        id: "4", name: "Sambusa", description: "Crispy pastry with lentils", price: 8, vegan: true, images: [
          "/images/image-1a.jpg",
          "/images/image-2a.jpg",
          "/images/image-3a.jpg",
        ]
      },
      {
        id: "5", name: "Azifa", description: "Green lentil salad", price: 8, vegan: true, images: [
          "/images/image-1a.jpg",
          "/images/image-2a.jpg",
          "/images/image-3a.jpg",
        ]
      },
    ],
  },
  {
    category: "Vegetarian",
    items: [
      {
        id: "6", name: "Misir Wot", description: "Red lentils in berbere sauce", price: 13, vegan: true, spicy: true, images: [
          "/images/image-1a.jpg",
          "/images/image-2a.jpg",
          "/images/image-3a.jpg",
        ]
      },
      {
        id: "7", name: "Atkilt Alicha", description: "Cabbage, carrots, potatoes", price: 12, vegan: true, images: [
          "/images/image-1a.jpg",
          "/images/image-2a.jpg",
          "/images/image-3a.jpg",
        ]
      },
    ],
  },
  {
    category: "Meat",
    items: [
      {
        id: "8", name: "Doro Wot", description: "Chicken stew with egg", price: 16, spicy: true, featured: true, images: [
          "/images/image-1a.jpg",
          "/images/image-2a.jpg",
          "/images/image-3a.jpg",
        ]
      },
      {
        id: "9", name: "Siga Wot", description: "Beef stew in berbere", price: 17, spicy: true, images: [
          "/images/image-1a.jpg",
          "/images/image-2a.jpg",
          "/images/image-3a.jpg",
        ]
      },
    ],
  },
  {
    category: "Beverages",
    items: [
      {
        id: "10", name: "Buna (Coffee)", description: "Traditional Ethiopian coffee", price: 4, images: [
          "/images/image-1a.jpg",
          "/images/image-2a.jpg",
          "/images/image-3a.jpg",
        ]
      },
      {
        id: "11", name: "Tea", description: "Black tea with spices", price: 3, images: [
          "/images/image-1a.jpg",
          "/images/image-2a.jpg",
          "/images/image-3a.jpg",
        ]
      },
    ],
  },
];

interface MenuTabsProps {
  searchText: string;
}

export default function MenuTabs({ searchText }: MenuTabsProps) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Compute paginated slice indexes directly from page
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Search filter
  const hasMatches = (items: Dish[] = []) =>
    items.some(
      (item) =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchText.toLowerCase())
    );

  // Fetch dishes on mount
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await axios.get("/api/dish/getAll");
        setDishes(response?.data?.data ?? []);
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch dishes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <MenuLoading />;
  // Filtered data for current view
  const filteredDishes = dishes.filter((dish) => hasMatches([dish]));
  const paginatedDishes = filteredDishes.slice(startIndex, endIndex);
    return (
    <Tabs defaultValue="daily" className="w-full relative md:px-[100px] pb-4">
      {/* Tabs List */}
      <TabsList className="mb-6 flex flex-wrap justify-center gap-2 rounded-none pt-10">
        <TabsTrigger value="daily" className="px-6 py-4 text-sm md:text-base">
          Today's Menu
        </TabsTrigger>
        <TabsTrigger value="full" className="px-6 py-4 text-sm md:text-base">
          Full Menu
        </TabsTrigger>
      </TabsList>

      {/* Daily Specials */}
      <TabsContent value="daily" className="animate-enter py-14">
        <section className="space-y-8 p-6 bg-transparent rounded-xl">
          <ul className="flex flex-wrap gap-6 justify-between">
            {paginatedDishes.map((item) => (
              <DishCard key={item?.id} dish={item} />
            ))}
          </ul>

          {/* Pagination Controls */}
          {filteredDishes.length > ITEMS_PER_PAGE && (
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ArrowLeft /> Show Previous
              </Button>
              <Button
                onClick={() =>
                  setPage((p) =>
                    endIndex >= filteredDishes.length ? p : p + 1
                  )
                }
                disabled={endIndex >= filteredDishes.length}
              >
                <ArrowRight /> Show Next
              </Button>
            </div>
          )}
        </section>

        {!hasMatches(dishes) && <NotFound message="Cuisine" menu />}
      </TabsContent>

      {/* Full Menu */}
      <TabsContent value="full" className="animate-enter">
        <div className="space-y-8 rounded-xl bg-transparent shadow-sm pt-10">
          {fullMenu
            ?.filter((group) => hasMatches(group.items))
            .map((group) => (
              <section
                key={group?.category}
                className="p-6 bg-transparent rounded-xl"
              >
                <h3 className="text-2xl font-bold mb-4 text-center text-white inline-block px-2 py-1 bg-primary rounded backdrop-blur-lg ms-[45%]">
                  {group?.category}
                </h3>
                <ul className="flex flex-wrap gap-6 justify-center">
                  {group.items
                    ?.filter((item) => hasMatches([item]))
                    .map((item) => (
                      <DishCard key={item?.id} dish={item} />
                    ))}
                </ul>
              </section>
            ))}

          {!fullMenu?.some((group) => hasMatches(group.items)) && (
            <NotFound message="Cuisine" menu />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

