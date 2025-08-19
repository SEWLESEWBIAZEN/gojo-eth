import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "sonner";

// API call to add a dish to the daily menu
async function addToDailyMenu(dishId: string) {
  try {
    const { data } = await axios.post("/api/dailyMenu/addDishToMenu", {
      dish_id: dishId,
      special_of_the_day: false,
      batch_price: 4.02,
    });

    if (data.isError) {
      throw new Error(data.message || "Error adding to daily menu.");
    }

    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ?? error?.message ?? "Error adding to daily menu."
    );
  }
}

// Custom hook to use the addToDailyMenu mutation
export function useAddToDailyMenu(selectedDate: Date = new Date()) {
  const queryClient = useQueryClient();
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  return useMutation({
    mutationFn: addToDailyMenu,
    onSuccess: () => {
      toast.success("Dish added to daily menu!");    
      queryClient.invalidateQueries({ queryKey: ["dishes"] });     
      queryClient.invalidateQueries({ queryKey: ["dailyMenu", formattedDate] });
    },
    onError: (err: any) => {
      toast.error(err?.message ?? "Error adding to daily menu.");
    },
  });
}
