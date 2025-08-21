"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import NotFound from "@/components/NotFound";
import GallerySkeleton from "@/components/gallery/GallerySkeleton";
import { motion } from "framer-motion";
import EditTitle from "./EditTitle";
import Delete from "./Delete";

interface GalleryVideo {
  id: string;
  url: string;
  title?: string;
}

export default function AdminVideoGallery() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([]);
  const [totalVideos, setTotalVideos] = useState<number>(0);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchVideos();
  }, [page]);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/gallery/getAllVideos?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      setGalleryVideos(response.data.data.videos);
      setTotalVideos(response.data.data.total);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setGalleryVideos([]);
      setTotalVideos(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/gallery/deleteVideo/${id}`);
      setGalleryVideos((prev) => prev.filter((vid) => vid.id !== id));
    } catch (err) {
      console.error("Error deleting video:", err);
    }
  };

  const handleEdit = (id: string, currentTitle: string) => {
    setEditId(id);
    setEditTitle(currentTitle);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editId) return;
    try {
      await axios.put(`/api/gallery/updateVideo/${editId}`, { title: editTitle });
      setGalleryVideos((prev) =>
        prev.map((vid) => (vid.id === editId ? { ...vid, title: editTitle } : vid))
      );
      setEditDialogOpen(false);
      setEditId(null);
      setEditTitle("");
    } catch (err) {
      console.error("Error updating video:", err);
    }
  };

  const filteredVideos = galleryVideos.filter(
    (vid) => vid.title?.toLowerCase().includes(searchText.toLowerCase()) || ""
  );
  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">Admin Video Gallery</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage uploaded videos: <span className="font-medium">edit titles</span> or <span className="font-medium">delete them</span>.
          </p>
        </div>
        <Input
          placeholder="Search videos..."
          className="focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {isLoading && <GallerySkeleton gallery="video" />}

      {/* Video Grid */}
      {filteredVideos.length > 0 && !isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative rounded-xl overflow-hidden shadow-lg group bg-black"
            >
              <video
                src={video.url}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                muted
                loop
                playsInline
                onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
                onMouseOut={(e) => (e.currentTarget as HTMLVideoElement).pause()}
              />
              {video.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white text-center text-sm py-2 px-2">
                  {video.title}
                </div>
              )}

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full text-white">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 space-y-2 flex flex-col items-start">
                  <EditTitle id={video?.id} currentTitle={video?.title} />
                  <Delete id={video?.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ))}
        </div>
      ) : (
        !isLoading && <NotFound message="Video" />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

    </div>
  );
}
