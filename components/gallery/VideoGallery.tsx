"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import NotFound from "../NotFound";
import { Button } from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import GallerySkeleton from "./GallerySkeleton";

interface GalleryVideo {
  url: string;
  title?: string;
}

export default function VideoGallery() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([]);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const ITEMS_PER_PAGE = 12;


  useEffect(() => {
    setIsLoading(true);
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/api/gallery/getAllVideos?page=${page}&limit=${ITEMS_PER_PAGE}`);
        setGalleryVideos(response.data.data.videos);
        setTotalVideos(response.data.data.total);

      } catch (error) {
        console.error('Error fetching videos:', error);
        setGalleryVideos([]);
        setTotalVideos(0);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page]);


  // Filter for search
  const filteredVideos = galleryVideos.filter(video =>
    video.title?.toLowerCase().includes(searchText.toLowerCase()) || ''
  );
  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4">
      {/* Heading & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className='w-full'>
          <h1 className="text-4xl font-bold mb-2">Video Gallery</h1>
          <p>Explore our delicious Ethiopian dishes and vibrant restaurant atmosphere.</p>
        </div>
        <Input
          placeholder="Search images..."
          className="border border-primary w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Video Grid */}
      {isLoading && <div><GallerySkeleton gallery="video"/></div>}

      {filteredVideos?.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVideos.map((video, idx) => (
            <div
              key={idx}
              className="cursor-pointer relative overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
              onClick={() => setSelectedVideo(video.url)}
            >
              {/* Overlay play icon */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold pointer-events-none">
                ▶
              </div>
              {/* Title at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm sm:text-base p-1 text-center backdrop-blur-sm pointer-events-none">
                {video.title}
              </div>
              {/* Video thumbnail */}
              <video
                src={video.url}
                className="w-full h-48 object-cover"
                muted
                loop
                playsInline
              />
            </div>
          ))}
        </div> )}
        { filteredVideos.length === 0 && !isLoading && (
        <div className="col-span-3">
          <NotFound message="No videos found" />
        </div>
      )}


      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            <ArrowLeft /> Show Previous
          </Button>
          <Button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            <ArrowRight /> Show Next
          </Button>
        </div>
      )}


      {/* Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-[90vw] max-w-4xl"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking video
          >
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              onClick={() => setSelectedVideo(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
