import { DailyMenuDish } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
type DailyMenuResponse = {
  isError: boolean;
  data: DailyMenuDish[];
  message?: string;
};
async function fetchDailyMenu(date: Date): Promise<DailyMenuDish[]> {
  const { data } = await axios.get<DailyMenuResponse>(
    `/api/dailyMenu/getDailyMenu?date=${format(date, "yyyy-MM-dd")}`
  );
  if (data.isError) throw new Error(data.message || "Error fetching daily menu.");
  return data.data;
}

export function useDailyMenu(selectedDate: Date) {
  return useQuery({
    queryKey: ["dailyMenu", format(selectedDate, "yyyy-MM-dd")],
    queryFn: () => fetchDailyMenu(selectedDate),
    staleTime: 1000 * 60 * 5, // fresh 5 mins
    gcTime: 1000 * 60 * 10,   // cached 10 mins
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}