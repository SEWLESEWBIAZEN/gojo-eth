import { Dish } from "@/lib/utils";

export function useSearchFilter(searchText: string) {
  const lowerSearch = searchText.toLowerCase();

  const hasMatches = (dish: Dish) =>
    dish?.name?.toLowerCase().includes(lowerSearch) ||
    dish?.description?.toLowerCase().includes(lowerSearch) ||
    dish?.category?.name?.toLowerCase().includes(lowerSearch) ||
    dish?.category?.description?.toLowerCase().includes(lowerSearch);

  return { hasMatches };
}
