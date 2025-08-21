'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import {
    RadioGroup,
    RadioGroupItem
} from '../ui/radio-group'
import { Label } from '../ui/Label'

const AddToGallery = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState<'image' | 'video' | ''>('')
    const [file, setFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleAddToGallery(e: React.FormEvent) {
        e.preventDefault()
        if (!title || !type || !file) {
            toast.error('Please fill in all fields and select a file')
            return
        }

        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('type', type)
            formData.append('file', file)

            const url = type === 'image' ? '/api/gallery/uploadImage' : '/api/gallery/uploadVideo'

            const response = await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (!response?.data?.isError) {
                toast.success('Added to gallery successfully')
                // reset form
                setTitle('')
                setType('')
                setFile(null)
                setIsDialogOpen(false)
            } else {
                toast.error(response?.data?.message || 'Failed to add')
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to add to gallery')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="mt-4 bg-indigo-800 text-white hover:bg-indigo-700 flex flex-row space-x-2 ">
                    <Plus />
                    <span className="mr-2 hidden sm:inline-block">New</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white dark:bg-neutral-900 px-4 py-6 space-y-4 w-full md:w-[350px] lg:w-[420px] rounded-md">
                <div className="flex justify-between items-center">
                    <DialogHeader>
                        <DialogTitle>Add to Gallery</DialogTitle>
                    </DialogHeader>
                    <DialogClose>
                        <X className="h-6 w-6 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white cursor-pointer" />
                    </DialogClose>
                </div>

                <form onSubmit={handleAddToGallery} className="space-y-4">
                    <div className='space-y-2'>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="file">File</Label>
                        <Input
                            className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
                            id="file"
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label>Type</Label>
                        <RadioGroup value={type} onValueChange={(v) => setType(v as 'image' | 'video')} className="flex space-x-4 mt-2 bg-indigo-100 px-10 py-4 rounded-md">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="image" id="image" className='border border-2 border-indigo-500' />
                                <Label htmlFor="image">Image</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="video" id="video" className='border border-2 border-indigo-500' />
                                <Label htmlFor="video">Video</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-indigo-800 text-white hover:bg-indigo-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddToGallery
