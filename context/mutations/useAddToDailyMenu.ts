import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

async function addToDailyMenu(dishId: string)  {
      const { data } = await axios.post(`/api/dailyMenu/addDishToMenu`, {
        dish_id: dishId,
        special_of_the_day: false,
        batch_price: 4.02,
      })
      if (data.isError) throw new Error(data.message || 'Error adding to daily menu.')
      return data
    }
export function useAddToDailyMenu() {
  const queryClient = useQueryClient();  return useMutation({
    mutationFn: addToDailyMenu,
    onSuccess: () => {
      toast.success('Dish added to daily menu!')
      queryClient.invalidateQueries({ queryKey: ['dishes'] })
      queryClient.invalidateQueries({ queryKey: ['dailyMenu'] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? err?.message ?? 'Error adding to daily menu.')
    },
  })
}