import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

async function uploadDishImages({ dishId, images }: { dishId: string; images: File[] }) {
      const formData = new FormData()
      images.forEach((file) => formData.append('images', file))
      formData.append('id', dishId)

      const { data } = await axios.put('/api/dish/uploadImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (data.isError) throw new Error(data.message || 'Error uploading images.')
      return data
    }
export function useUploadDishImages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadDishImages,
    onSuccess: () => {
      toast.success('Images uploaded successfully!')
      queryClient.invalidateQueries({ queryKey: ['dishes'] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? err?.message ?? 'Error uploading images.')
    },
  })
}