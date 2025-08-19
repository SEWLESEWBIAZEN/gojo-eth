'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { cn, Dish } from '@/lib/utils'
import { Trash2, Star, Upload, X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/Dialog'
import { Input } from '../ui/Input'
import {  useDeleteDish } from '@/contexts/mutations/useDishDelete'
import EditDish from './EditDIsh'
import { useUploadDishImages } from '@/contexts/mutations/useUploadDishImages'
import { useAddToDailyMenu } from '@/contexts/mutations/useAddToDailyMenu'

interface DishCardProps {
  dish: Dish
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DishCard({ dish, setRefetch }: DishCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const deleteMutation = useDeleteDish()
  const addMutation = useAddToDailyMenu()
  const uploadMutation = useUploadDishImages()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFiles(Array.from(e.target.files))
  }

  return (
    <Card className={`border border-indigo-200 ${dish?.todays ? 'bg-indigo-100' : ''}`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-indigo-700">
          {dish.name}
          <span className="text-indigo-600 font-semibold">${dish.price}</span>
        </CardTitle>
        {dish.featured && (
          <CardDescription className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 mr-1" /> Special
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300">{dish.description}</p>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <EditDish id={dish.id} setRefetch={setRefetch} />

        {/* Delete */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" disabled={deleteMutation.status ==='pending'}>
              <Trash2 className="h-4 w-4 mr-1" /> {deleteMutation.status ==='pending' ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white w-[400px] rounded-lg px-6 py-4">
            <DialogClose className="flex flex-1 justify-end">
              <X />
            </DialogClose>
            <DialogTitle>Delete Dish</DialogTitle>
            <DialogDescription>Are you sure you want to delete this dish?</DialogDescription>
            <DialogFooter className="mt-4">
              <Button
                size="sm"
                variant="outline"
                className="text-red-800 border-none"
                onClick={() => deleteMutation.mutate(dish.id)}
                disabled={deleteMutation.status === 'pending'}
              >
                <Trash2 className="h-4 w-4 mr-1" /> {deleteMutation.status === 'pending' ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Upload Images */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex">
              <Upload /> Upload Images
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white w-[400px] rounded-lg px-6 py-4">
            <DialogClose className="flex flex-1 justify-end">
              <X />
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Upload images</DialogTitle>
              <DialogDescription>Upload images for this dish.</DialogDescription>
            </DialogHeader>

            <div className="space-y-2 my-6">
              <label
                htmlFor="dish-image"
                className={cn(
                  'flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-400 transition-colors p-6'
                )}
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload or drag & drop multiple</span>
                <Input
                  id="dish-image"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {imageFiles.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {imageFiles.map((file, i) => (
                    <div key={i} className="relative w-24 h-24 border rounded-md overflow-hidden">
                      <img src={URL.createObjectURL(file)} alt={file.name} className="object-cover w-full h-full" />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full"
                        onClick={() => setImageFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" className="mr-2" onClick={() => setImageFiles([])}>
                Remove All
              </Button>
              <Button
                variant="default"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => uploadMutation.mutate({ dishId: dish.id, images: imageFiles })}
                disabled={uploadMutation.status === 'pending'}
              >
                {uploadMutation.status === 'pending' ? 'Uploading...' : 'Upload'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add to Daily Menu */}
        {!dish.todays && (
          <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => addMutation.mutate(dish.id)}
            disabled={addMutation.status === 'pending'}
          >
            {addMutation.status === 'pending' ? 'Adding...' : "Add to Today's"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
