import { useState } from "react";
import { Dish } from "@/lib/utils";

export function usePagination(ITEMS_PER_PAGE: number) {
  const [page, setPage] = useState(1);

  const paginate = (items: Dish[]) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  };

  const groupByCategory = (items: any[]) => {
    return Object.values(
      items.reduce((acc: Record<string, any>, dish) => {
        if (!acc[dish.category.id]) {
          acc[dish.category.id] = {
            categoryId: dish.category.id,
            categoryName: dish.category.name,
            description: dish.category.description,
            dishes: [],
          };
        }
        acc[dish.category.id].dishes.push(dish);
        return acc;
      }, {})
    );
  };

  return { page, setPage, paginate, groupByCategory };
}
