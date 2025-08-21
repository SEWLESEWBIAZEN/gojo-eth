"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotFound from "@/components/NotFound";
import GallerySkeleton from "@/components/gallery/GallerySkeleton";
import EditImageTitle from "./EditTitle";
import { motion, AnimatePresence } from "framer-motion";
import Delete from "./Delete";
import EditTitle from "./EditTitle";

interface GalleryImage {
  id: string;
  url: string;
  title?: string;
}

export default function AdminImageGallery() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [totalImages, setTotalImages] = useState<number>(0);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/gallery/getAllImages?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      setGalleryImages(response.data.data.images);
      setTotalImages(response.data.data.total);
    } catch (error) {
      console.error("Error fetching images:", error);
      setGalleryImages([]);
      setTotalImages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredImages = galleryImages.filter(
    (img) => img.title?.toLowerCase().includes(searchText.toLowerCase()) || ""
  );
  const totalPages = Math.ceil(totalImages / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4">
      {/* Header & Search */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">Admin Image Gallery</h1>
          <p className="text-muted-foreground">
            Manage uploaded images: edit titles or delete them.
          </p>
        </div>
        <Input
          placeholder="Search images..."
          className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
         value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </motion.div>

      {isLoading && <GallerySkeleton gallery="image" />}

      {/* Image Grid */}
      <AnimatePresence>
        {filteredImages?.length > 0 && !isLoading ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-14 lg:gap-20"
          >
            {filteredImages?.map((image, i) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative w-80 h-60 rounded-2xl overflow-hidden shadow-md mx-auto group cursor-pointer"
              >
                <Image
                  src={image.url}
                  alt={image.title || "Image"}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  unoptimized
                />

                {/* Title overlay */}
                {image.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-center text-lg py-2 z-10"
                  >
                    {image.title}
                  </motion.div>
                )}

                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white shadow-sm backdrop-blur-sm"
                    >
                      <MoreVertical size={18} />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="rounded-xl shadow-lg animate-in fade-in zoom-in space-y-2"
                  >
                    <EditTitle id={image?.id} currentTitle={image?.title} />
                    <Delete id={image?.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !isLoading && <NotFound message="Image" />
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col md:flex-row justify-center gap-4 mt-8"
        >
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-2 rounded-xl"
          >
            <ArrowLeft size={16} /> Previous
          </Button>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-2 rounded-xl"
          >
            Next <ArrowRight size={16} />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
