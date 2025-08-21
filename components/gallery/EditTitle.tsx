'úse client'
import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { X } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

interface EditTitleProps {
    id: string;
    currentTitle?: string;
}
const EditTitle = ({ id, currentTitle }: EditTitleProps) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(currentTitle);
    const [loading, setLoading] = useState(false);

    async function handleUpdate(event: React.FormEvent) {
        setLoading(true)
        event.preventDefault()
        // Call the delete function from the API
        try {
            const response = await axios.put(`/api/gallery/update`, { title: editTitle ,id})
            if (!response?.data?.isError) {
                toast.success('Gallery title updated successfully')
            } else {
                toast.error(response?.data?.message || 'Failed to update gallery title')
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to update gallery title')
        }        
        finally {
            setEditDialogOpen(false)
            setLoading(false)
        }
    }

    return (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen} >
            <DialogTrigger className="flex flex-1 w-full py-2 px-4 hover:bg-indigo-900 hover:text-white items-center text-sm text-gray-600 rounded">
                Edit
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-neutral-900 px-4 py-2 space-y-4 w-full md:w-[300px] lg:w-[400px] rounded-md">
                <DialogClose className="flex flex-1 justify-end w-full h-10"><X className="h-8 w-8 bg-indigo-100 rounded-full p-1" /></DialogClose>
                <DialogHeader>
                    <DialogTitle>Edit Image Title</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpdate}>
                <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Enter new title"
                    className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
                />
                <Button type="submit" className="mt-4 bg-indigo-800 text-white hover:bg-indigo-700" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditTitle
