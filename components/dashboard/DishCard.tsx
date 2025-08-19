"use client";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { cn, Dish } from "@/lib/utils";
import axios from "axios";
import { Trash2, Star, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";
import { useState } from "react";
import EditDish from "./EditDIsh";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";

interface DishCardProps {
  dish: Dish;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DishCard({ dish, setRefetch }: DishCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
 
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [uploadLoading, setUploadLoading] = useState(false)

  async function deleteDish(e: React.FormEvent) {
    e.preventDefault();
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/dish/delete/${dish.id}`);
      setRefetch((prev) => !prev);
      toast.success("Dish deleted successfully!");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Error deleting dish.");
    }
    finally {
      setDeleteLoading(false);
    }
  }

  async function handleAddToDailyMenu(e: React.FormEvent) {
    setAddLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(`/api/dailyMenu/addDishToMenu`, { dish_id: dish.id, special_of_the_day: false, batch_price: 4.02 });
      if (!response?.data?.isError) {
        setRefetch((prev) => !prev);
        toast.success(response?.data?.message ?? "Dish added to daily menu!");
      } else {
        toast.error(response?.data?.message ?? "Error adding dish to daily menu.");
      }

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error adding dish to daily menu.");
    } finally {
      setAddLoading(false);
    }
  }

  async function handleUploadImages(e: React.FormEvent) {
    setUploadLoading(true);
    e.preventDefault();
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("id", dish.id);
    try {
      const response = await axios.put(`/api/dish/uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response?.data?.isError) {
        toast.success(response?.data?.message ?? "Images uploaded successfully!");
      } else {
        toast.error(response?.data?.message ?? "Error uploading images.");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error uploading images.");
    }
    finally {
      setUploadLoading(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files)) // convert FileList → File[]
    }
  }

  return (
    <Card className={`border border-indigo-200 ${dish?.todays ? "bg-indigo-100" : ""}`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-indigo-700">
          {dish?.name}
          <span className="text-indigo-600 font-semibold">${dish.price}</span>
        </CardTitle>
        {dish?.featured && (
          <CardDescription className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 mr-1" /> Special
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300">{dish?.description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between">

        <EditDish id={dish?.id} setRefetch={setRefetch} />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" disabled={deleteLoading}>
              <Trash2 className="h-4 w-4 mr-1" /> {deleteLoading ? "Moving to trash..." : "Delete"}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white w-[400px] rounded-lg px-6 py-4">
            <DialogTitle>Delete Dish</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this dish?
            </DialogDescription>
            <DialogFooter className="mt-4">
              <form onSubmit={deleteDish}>
                <Button
                  size="sm"
                  variant="outline"
                  type="submit"
                  className="text-red-800 border-none"
                  disabled={deleteLoading}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> {deleteLoading ? "Moving to trash..." : "Delete"}
                </Button>
              </form>
              <DialogClose>
                Cancel
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild><Button variant="outline" className="flex"><Upload /> Upload Images</Button></DialogTrigger>
          <DialogContent className="bg-white w-[400px] rounded-lg px-6 py-4">
            <DialogClose className="flex flex-1 justify-end"><X /></DialogClose>
            <DialogHeader>
              <DialogTitle>Upload images</DialogTitle>
              <DialogDescription>
                Upload images for this dish.
              </DialogDescription>
            </DialogHeader>

            {/* Multiple Image Upload */}
            <div className="space-y-2 my-6">
              <label
                htmlFor="dish-image"
                className={cn(
                  "flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-400 transition-colors p-6"
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
              {imageFiles?.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {imageFiles?.map((file, i) => (
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
            <DialogFooter>
              <Button variant="outline" className="mr-2" onClick={() => setImageFiles([])}>
                Remove All
              </Button>
              <Button variant="default" onClick={handleUploadImages} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                {uploadLoading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {!dish?.todays && <form onSubmit={handleAddToDailyMenu}>
          <Button
            type="submit"
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={addLoading || dish?.todays}
          >
            {addLoading ? "Adding..." : "Add to Today's"}
          </Button>
        </form> }


      </CardFooter>
    </Card>
  );
}
