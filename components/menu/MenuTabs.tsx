'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Badge } from "../ui/Badge";
import Image from 'next/image'
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/Button";
import { Table2 } from "lucide-react";
import DishCard from "./DishCard";
import MenuLoading from "./MenuLoading";

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  spicy?: boolean;
  vegan?: boolean;
};

const dailySpecials: Dish[] = [
  {
    id: "1", name: "Doro Wot", description: "Spicy chicken stew with egg", price: 16.0, spicy: true, images: [
      "/images/image-1a.jpg",
      "/images/image-2a.jpg",
      "/images/image-3a.jpg",
    ]
  },
  {
    id: "2", name: "Shiro", description: "Creamy ground chickpea stew", price: 13.02, vegan: true, images: [
      "/images/image-1a.jpg",
      "/images/image-2a.jpg",
      "/images/image-3a.jpg",
    ]
  },
  {
    id: "3", name: "Kitfo", description: "Minced beef seasoned with mitmita & niter kibbeh", price: 18, images: [
      "/images/image-1a.jpg",
      "/images/image-2a.jpg",
      "/images/image-3a.jpg",
    ]
  },
  {
    id: "4", name: "Kitfo", description: "Minced beef seasoned with mitmita & niter kibbeh", price: 18, images: [
      "/images/image-1a.jpg",
      "/images/image-2a.jpg",
      "/images/image-3a.jpg",
    ]
  },
];

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

interface Dish {
  id: string;
  name: string;
  description?: string;  
  price?: number;
  spicy?: boolean;
  vegan?: boolean;
  featured?: boolean;
  rating?: number;
  images?: string[];
}

export default function MenuTabs() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedOne, setExpandedOne] = useState("");  

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dish');
        setDishes(response.data);

      } catch (error: any) {
        setError(error.message || 'Failed to fetch dishes');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <MenuLoading />;
  if (error) return <div>Error: {error}</div>;


  return (
    <Tabs
      defaultValue="daily"
      className="w-full relative pb-4">
      <Image
        src="/menu-bg-1.jpg"
        // src="/og-gojo.jpg"
        alt="Restaurant background"
        fill
        priority
        className="object-cover object-center -z-10 opacity-20"
      />
      {/* Tabs List */}
      <TabsList className="mb-6 flex flex-wrap justify-center gap-2 rounded-none">
        <TabsTrigger value="daily" className="px-6 py-4 text-sm md:text-base">
          Today's Menu
        </TabsTrigger>
        <TabsTrigger value="full" className="px-6 py-4 text-sm md:text-base">
          Full Menu
        </TabsTrigger>
      </TabsList>

      {/* Daily Specials */}
      <TabsContent value="daily" className="animate-enter py-14">
        <section className="space-y-8 p-6 bg-transparent backdrop-blur-sm rounded-xl">
          <ul className="flex flex-wrap gap-6 justify-center">
            {dailySpecials?.map((item) => (
              <DishCard key={item?.id} dish={item} />
            ))}
          </ul>
        </section>
      </TabsContent>

      {/* Full Menu */}
      <TabsContent value="full" className="animate-enter">
        <div className="space-y-8 rounded-xl bg-transparent shadow-sm ">
          {fullMenu?.map((group) => (
            <section
              key={group?.category}
              className="p-6 bg-transparent backdrop-blur-sm rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-orange-800 drop-shadow-sm text-center">
                {group?.category}
              </h3>
              <ul className="flex flex-wrap gap-6 justify-center">
                {group.items?.map((item) => (
                  <DishCard key={item?.id} dish={item}
                  //  onClick={() => setExpandedOne(expandedOne === item?.id ? "" : item?.id)}
                    />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
