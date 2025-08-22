import { useEffect, useState } from "react";
import axios from "axios";
import { Dish } from "@/lib/utils";
import { toast } from "sonner";

export function useMenuData() {
  const [loading, setLoading] = useState(false);
  const [fullMenu, setFullMenu] = useState<any[]>([]);
  const [dailyMenu, setDailyMenu] = useState<Dish[]>([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const [dishesRes, dailyRes] = await Promise.allSettled([
          axios.get("/api/dish/getAll"),
          axios.get("/api/dailyMenu/getDailyMenu"),
        ]);

        if (dishesRes.status === "fulfilled") {
          const fetchedDishes = dishesRes.value.data?.data ?? [];
          setFullMenu(groupByCategory(fetchedDishes));
        } else {
          toast.error("Failed to fetch dishes");
        }

        if (dailyRes.status === "fulfilled") {
          setDailyMenu(dailyRes.value.data?.data ?? []);
        } else {
          toast.error("Failed to fetch daily menu");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, fullMenu, dailyMenu };
}

function groupByCategory(dishes: Dish[]) {
  const grouped = dishes?.reduce((acc: Record<string, Dish[]>, dish) => {
    const id = dish.category.id;
    if (!acc[id]) acc[id] = [];
    acc[id].push(dish);
    return acc;
  }, {});
  return Object.entries(grouped).map(([id, group]) => ({
    categoryId: id,
    categoryName: group[0].category?.name ?? "Unknown",
    description: group[0].category?.description ?? "",
    dishes: group,
  }));
}
