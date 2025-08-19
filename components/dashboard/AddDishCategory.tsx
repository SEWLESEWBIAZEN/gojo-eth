'use client'
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { PlusCircle, X } from 'lucide-react'
import { Label } from '../ui/Label'
import { Textarea } from '../ui/Textarea'
import axios from 'axios'
import { toast } from 'sonner'

interface AddDishCategoryProps {
    onAdded?: () => void
}

const AddDishCategory: React.FC<AddDishCategoryProps> = ({ onAdded }) => {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await axios.post("/api/dishCategory/create", { name, description })
            if (!res?.data?.isError) {
                toast.success(res?.data?.message ?? "Category created successfully!")
            } else {
                toast.error(res?.data?.message ?? "Error creating category.")
            }
        } catch (err) {

        }finally{
            setCreateDialogOpen(false)
            setIsLoading(false)
        }


    }
    return (
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button className='bg-indigo-600 hover:bg-indigo-700 text-white' onClick={() => setCreateDialogOpen(true)}>
                    <PlusCircle className="h-4 w-4 text-white" />
                </Button >
            </DialogTrigger>
            <DialogContent className='w-[300px] bg-white px-6 py-4 rounded-lg'>
                <DialogClose className="flex flex-1 justify-end">
                    <X />
                </DialogClose>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Add a new category for the dishes.</DialogDescription>

                <form onSubmit={handleSubmit} className='space-y-8 mt-8'>
                    <div className='space-y-2'>
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input id="category-name" placeholder="Category name..." value={name} onChange={(e) => setName(e.target.value)} className='focus-visible:ring-indigo-500 focus:ring-2 focus:ring-indigo-500'/>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="category-description">Category description</Label>
                        <Textarea id="category-description" placeholder="Category description..." value={description} onChange={(e) => setDescription(e.target.value)} className='focus:ring-2 focus-visible:ring-indigo-500 focus:ring-indigo-500'/>
                    </div>
                    <Button type='submit' className='bg-indigo-600 hover:bg-indigo-700 text-white' disabled={isLoading}>Add</Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddDishCategory
