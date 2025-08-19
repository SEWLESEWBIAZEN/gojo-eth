import { Dish, DishCategory } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type DishesResponse = {
  isError: boolean;
  data: Dish[];
  message?: string;
};

type CategoriesResponse = {
  isError: boolean;
  data: DishCategory[];
  message?: string;
};

async function fetchDishes(): Promise<Dish[]> {
  const { data } = await axios.get<DishesResponse>("/api/dish/getAll");
  if (data.isError) throw new Error(data.message || "Error fetching dishes");
  return data.data;
}

async function fetchCategories(): Promise<DishCategory[]> {
  const { data } = await axios.get<CategoriesResponse>("/api/dishCategory/getAll");
  if (data.isError) throw new Error(data.message || "Error fetching categories");
  return data.data;
}

export function useDishesAndCategories() {
  const dishesQuery = useQuery({
    queryKey: ["dishes"],
    queryFn: fetchDishes,
    staleTime: 1000 * 60 * 60 * 12,   // 12 hours, daily menu doesn’t change often
    gcTime: 1000 * 60 * 60 * 24,      // 1 day, keeps cache but frees memory after that
    refetchOnWindowFocus: false,      // save network
    refetchOnReconnect: false,        // save network
    refetchOnMount: true            // use cached data when possible
  });

  const categoriesQuery = useQuery({
    queryKey: ["dishCategories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 12,   // 12 hours, daily menu doesn’t change often
    gcTime: 1000 * 60 * 60 * 24,      // 1 day, keeps cache but frees memory after that
    refetchOnWindowFocus: false,      // save network
    refetchOnReconnect: false,        // save network
    refetchOnMount: true            // use cached data when possible
  });

  return {
    dishes: dishesQuery.data ?? [],
    dishCategories: categoriesQuery.data ?? [],
    isLoading: dishesQuery.isLoading || categoriesQuery.isLoading,
    isError: dishesQuery.isError || categoriesQuery.isError,
  };
}
