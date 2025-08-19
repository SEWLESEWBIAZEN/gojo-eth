'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogHeader, DialogTitle, DialogTrigger
} from '../ui/Dialog'
import { Button } from '../ui/Button'
import { Edit, Loader2, X } from 'lucide-react'
import axios from 'axios'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../ui/Select'
import AddDishCategory from './AddDishCategory'
import { Textarea } from '../ui/Textarea'
import { Checkbox } from '../ui/Checkbox'
import { toast } from 'sonner'

interface EditDishProps {
    id: string
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}

const EditDish: React.FC<EditDishProps> = ({ id, setRefetch }) => {
    const [dishDetails, setDishDetails] = useState<any>(null)
    const [dishCategories, setDishCategories] = useState<any[]>([])

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState<number | ''>('')
    const [featured, setFeatured] = useState(false)
    const [spicy, setSpicy] = useState(false)
    const [vegan, setVegan] = useState(false)

    // Fetch data when dialog opens
    useEffect(() => {
        if (!isDialogOpen) return
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const [dishRes, catRes] = await Promise.all([
                    axios.get(`/api/dish/getById/${id}`),
                    axios.get("/api/dishCategory/getAll")
                ])

                const dish = dishRes.data?.data
                setDishDetails(dish)
                setName(dish?.name ?? '')
                setCategory(dish?.category_id ?? '')
                setDescription(dish?.description ?? '')
                setPrice(dish?.price ?? '')
                setFeatured(dish?.featured ?? false)
                setSpicy(dish?.spicy ?? false)
                setVegan(dish?.vegan ?? false)

                setDishCategories(catRes.data?.data ?? [])
            } catch (err) {
                console.error("Error fetching data:", err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [id, isDialogOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !category) return // simple validation

        setIsSaving(true)
        try {
            const response =await axios.put(`/api/dish/update`, {
                id,
                name,
                category_id: category,
                description,
                price,
                featured,
                spicy,
                vegan
            })         
            setRefetch(prev => !prev)            
            toast.success(response?.data?.message ?? "Dish updated successfully!")
            setIsDialogOpen(false)

        } catch (err) {
            toast.error("Failed to update dish:")
            console.error(err)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="">
                    <Edit className="h-4 w-4" /> Edit Dish
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white px-6 py-4 w-[95%] md:w-[525px] xl:w-[700px] rounded-md space-y-6">
                <DialogClose className="flex flex-1 justify-end">
                    <X />
                </DialogClose>
                <DialogHeader>
                    <DialogTitle>Edit Dish</DialogTitle>
                    <DialogDescription>Update the details for this dish.</DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="animate-spin text-indigo-600 w-6 h-6" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className='flex space-x-4'>
                            {/* Name */}
                            <div className="space-y-2 flex-1">
                                <Label htmlFor="dish-name">Name</Label>
                                <Input
                                    id="dish-name"
                                    type="text"
                                    placeholder="Dish name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"

                                />
                            </div>
                            {/* Category */}
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <div className="flex gap-2">
                                    <Select value={category} onValueChange={(val) => setCategory(val)}>
                                        <SelectTrigger id="category" className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
                                        >
                                            <SelectValue placeholder="Select a category..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dishCategories.map(cat => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <AddDishCategory onAdded={() => {
                                        axios.get("/api/dishCategory/getAll")
                                            .then(res => setDishCategories(res.data?.data ?? []))
                                    }} />
                                </div>
                            </div>
                        </div>



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
                        <div className="flex flex-wrap gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="dish-price">Price</Label>
                                <Input
                                    id="dish-price"
                                    type="number"
                                    placeholder="e.g. 15.99"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value) || '')}
                                    className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"

                                />
                            </div>
                            <div className="flex flex-wrap space-x-6 border border-gray-200 p-4 rounded-md bg-indigo-50">
                                {[{ label: "Special", state: featured, setter: setFeatured },
                                { label: "Vegan", state: vegan, setter: setVegan },
                                { label: "Spicy", state: spicy, setter: setSpicy }]
                                    .map(({ label, state, setter }) => (
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

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Update Dish"}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default EditDish
