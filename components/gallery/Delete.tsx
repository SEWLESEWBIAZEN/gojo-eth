'use client'
import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '../ui/Dialog'
import { Button } from '../ui/Button'
import { Trash2, X } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

const Delete = ({ id }: { id: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete(event: React.FormEvent) {
    setIsLoading(true)
    event.preventDefault()
    // Call the delete function from the API
    try {
      const response = await axios.delete(`/api/gallery/delete/${id}`)
      if (!response?.data?.isError) {
        toast.success('File deleted from gallery successfully')
      } else {
        toast.error(response?.data?.message || 'Failed to delete file')
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to delete file')
    }
    finally { 
      setIsDialogOpen(false);
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex flex-1 w-full py-2 px-4 hover:bg-indigo-900 hover:text-white items-center text-sm text-gray-600 rounded">
        Delete
      </DialogTrigger>
      <DialogContent className="bg-white w-[400px] rounded-lg px-6 py-4">
        <DialogClose className="flex flex-1 justify-end">
          <X />
        </DialogClose>
        <DialogTitle>Delete File</DialogTitle>
        <DialogDescription>Are you sure you want to delete this file?</DialogDescription>
        <DialogFooter className="mt-4">
          <form onSubmit={handleDelete}>
            <Button
              disabled={isLoading}
              type='submit'
              size="sm"
              variant="outline"
              className="text-red-800 border-none" >
              <Trash2 className="h-4 w-4 mr-1" />
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

export default Delete
