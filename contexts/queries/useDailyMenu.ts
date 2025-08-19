import { DailyMenuDish } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";

type DailyMenuResponse = {
  isError: boolean;
  data: DailyMenuDish[];
  message?: string;
};

// Fetch daily menu for a given date
async function fetchDailyMenu(date: Date): Promise<DailyMenuDish[]> {
  const formattedDate = format(date, "yyyy-MM-dd");

  try {
    const { data } = await axios.get<DailyMenuResponse>(
      `/api/dailyMenu/getDailyMenu?date=${formattedDate}`
    );

    if (data.isError) {
      throw new Error(data.message || "Error fetching daily menu.");
    }

    return data.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? error?.message ?? "Error fetching daily menu.");
  }
}

// Custom hook to get daily menu
export function useDailyMenu(selectedDate: Date) {
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  return useQuery({
    queryKey: ["dailyMenu", formattedDate],
    queryFn: () => fetchDailyMenu(selectedDate),
    staleTime: 1000 * 60 * 60 * 12,   // 12 hours, daily menu doesn’t change often
    gcTime: 1000 * 60 * 60 * 24,      // 1 day, keeps cache but frees memory after that
    refetchOnWindowFocus: false,      // save network
    refetchOnReconnect: false,        // save network
    refetchOnMount: true            // use cached data when possible
  });
}
