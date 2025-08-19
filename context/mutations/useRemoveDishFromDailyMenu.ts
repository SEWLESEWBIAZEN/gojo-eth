import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "sonner";

// --- API ---
async function removeDish(id: string) {
  const { data } = await axios.put(`/api/dailyMenu/removeDishFromMenu/${id}`, {});  
  if (data.isError) throw new Error(data.message || "Error removing dish.");
  return data.message || "Dish removed successfully.";
}

// --- Hooks ---
export function useRemoveDishFromDailyMenu(selectedDate: Date) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeDish,
    onSuccess: (message) => {
      toast.success(message);     
      queryClient.invalidateQueries({
        queryKey: ["dailyMenu", format(selectedDate, "yyyy-MM-dd")],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Error removing dish.");
    },
  });
}
