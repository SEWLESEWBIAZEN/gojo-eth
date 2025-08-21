"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Plus, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import Image from "next/image";

// Types
interface MediaItem {
  id: number;
  url: string;
  title: string;
  type: "image" | "video";
}

export default function AdminGallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [newItem, setNewItem] = useState<{ title: string; type: "image" | "video"; file: File | null }>({
    title: "",
    type: "image",
    file: null,
  });

  useEffect(() => {
    // TODO: fetch from API
    setMedia([
      { id: 1, url: "/carousel/tibsa-tibs.jpg", title: "Tibs Special", type: "image" },
      { id: 2, url: "/sample.mp4", title: "Cooking Session", type: "video" },
    ]);
  }, []);

  const handleAdd = () => {
    if (!newItem.file) return;
    const newId = media.length + 1;
    const fakeUrl = URL.createObjectURL(newItem.file); // preview
    setMedia([...media, { id: newId, url: fakeUrl, title: newItem.title, type: newItem.type }]);
    setNewItem({ title: "", type: "image", file: null });
  };

  const handleDelete = (id: number) => {
    setMedia(media.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Gallery Manager</h1>

      <Tabs defaultValue="images" className="w-full">
        <TabsList>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        {/* IMAGE TAB */}
        <TabsContent value="images">
          <div className="flex justify-end my-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Add Image
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Image</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewItem({ ...newItem, file: e.target.files?.[0] || null, type: "image" })}
                  />
                  <Button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {media
              .filter((m) => m.type === "image")
              .map((item) => (
                <div key={item.id} className="relative rounded-lg overflow-hidden shadow-md group">
                  <Image src={item.url} alt={item.title} width={400} height={250} className="object-cover w-full h-56" />
                  <div className="absolute bottom-0 w-full bg-black/50 text-white text-center p-2">{item.title}</div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white">
                        <MoreVertical />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
          </div>
        </TabsContent>

        {/* VIDEO TAB */}
        <TabsContent value="videos">
          <div className="flex justify-end my-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Add Video
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setNewItem({ ...newItem, file: e.target.files?.[0] || null, type: "video" })}
                  />
                  <Button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {media
              .filter((m) => m.type === "video")
              .map((item) => (
                <div key={item.id} className="relative rounded-lg overflow-hidden shadow-md group">
                  <video src={item.url} className="w-full h-56 object-cover" muted loop playsInline />
                  <div className="absolute bottom-0 w-full bg-black/50 text-white text-center p-2">{item.title}</div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white">
                        <MoreVertical />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
