'use client'
import React, { useState } from 'react'
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger
} from '../ui/Dialog'
import { Button } from '../ui/Button'
import { PlusCircle, Upload, X } from 'lucide-react'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Textarea } from '../ui/Textarea'
import { Checkbox } from '../ui/Checkbox'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select'
import AddDishCategory from './AddDishCategory'
import { useAddMenu } from '@/context/mutations/useAddMenu'

interface AddNewMenuProps {
  categories: any[]
}

const AddNewMenu = ({ categories }: AddNewMenuProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number | ''>(0)
  const [featured, setFeatured] = useState(false)
  const [spicy, setSpicy] = useState(false)
  const [vegan, setVegan] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const mutation = useAddMenu(setIsDialogOpen)

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('price', price.toString())
    formData.append('featured', featured.toString())
    formData.append('spicy', spicy.toString())
    formData.append('vegan', vegan.toString())
    imageFiles.forEach((file) => formData.append('images', file))

    mutation.mutate(formData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files))
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Dish
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white px-6 py-4 w-[95%] md:w-[525px] xl:w-[700px] rounded-md space-y-6">
        <DialogClose className="flex flex-1 justify-end">
          <X />
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Add New Dish</DialogTitle>
          <DialogDescription>Fill in the details for the new dish.</DialogDescription>
        </DialogHeader>

        {/* Name + Category */}
        <div className="space-x-2 flex flex-wrap items-center">
          <div className="space-y-2 flex-1">
            <Label htmlFor="dish-name">Name</Label>
            <Input
              id="dish-name"
              type="text"
              placeholder="Dish name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
            />
          </div>
          <div className="flex flex-row gap-2 items-end">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  id="category"
                  className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
                >
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <AddDishCategory />
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleAddDish}>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="dish-description">Description</Label>
            <Textarea
              id="dish-description"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
            />
          </div>

          {/* Price + checkboxes */}
          <div className="flex flex-wrap items-end gap-x-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dish-price">Price</Label>
              <Input
                id="dish-price"
                type="number"
                placeholder="e.g. 15.99"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) || '')}
                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
              />
            </div>
            <div className="flex flex-wrap space-x-8 border border-gray-200 p-4 rounded-md bg-indigo-100">
              {[
                { label: 'Special', state: featured, setter: setFeatured },
                { label: 'Vegan', state: vegan, setter: setVegan },
                { label: 'Spicy', state: spicy, setter: setSpicy },
              ].map(({ label, state, setter }) => (
                <div key={label} className="flex items-center gap-2">
                  <Checkbox
                    checked={state}
                    onCheckedChange={() => setter(!state)}
                    className="data-[state=checked]:bg-indigo-500 focus-visible:ring-indigo-500 border border-indigo-500"
                  />
                  <Label className="text-sm">{label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label htmlFor="dish-image">Images</Label>
            <label
              htmlFor="dish-image"
              className={cn(
                'flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-400 transition-colors p-6'
              )}
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                Click to upload or drag & drop multiple
              </span>
              <Input
                id="dish-image"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Thumbnails */}
            {imageFiles.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {imageFiles.map((file, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 border rounded-md overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full"
                      onClick={() =>
                        setImageFiles((prev) => prev.filter((_, idx) => idx !== i))
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={mutation.status === 'pending' }
          >
            {mutation.status === 'pending' ? 'Creating...' : 'Create Dish'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewMenu
