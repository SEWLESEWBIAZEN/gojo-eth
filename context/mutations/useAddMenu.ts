'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
async function createDish(formData: FormData) {
  const { data } = await axios.post('/api/dish/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (data.isError) throw new Error(data.message || 'Error adding dish.')
  return data
}

export function useAddMenu(setIsDialogOpen: (open: boolean) => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createDish,
    onSuccess: (data) => {
      toast.success(data.message ?? 'Dish added successfully!')
      queryClient.invalidateQueries({ queryKey: ['dishes'] })
      setIsDialogOpen(false)
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? err?.message ?? 'Error adding dish.')
    },
  })
}
