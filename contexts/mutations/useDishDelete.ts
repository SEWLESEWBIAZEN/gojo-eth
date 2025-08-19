'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
async function deleteDish(dishId: string)  {
      const { data } = await axios.delete(`/api/dish/delete/${dishId}`)
      if (data.isError) throw new Error(data.message || 'Error deleting dish.')
      return data
    }
export function useDeleteDish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDish,
    onSuccess: () => {
      toast.success('Dish deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['dishes'] })
      queryClient.invalidateQueries({ queryKey: ['dailyMenu'] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? err?.message ?? 'Error deleting dish.')
    },
  })
}

