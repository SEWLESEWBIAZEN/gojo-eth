"use client";
import { useState } from "react";
import { Input } from "../ui/Input";
import NotFound from "../NotFound";
import { Button } from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface VideoGalleryProps {
  videos?: {
    src: string;
    title?: string;
  }[];
}

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const videos: VideoGalleryProps["videos"] = [
    { src: "/videos/video1.mp4", title: "Ethiopian Coffee Ceremony" },
    { src: "/videos/video1.mp4", title: "Traditional Injera Making" },
    { src: "/videos/video1.mp4", title: "Doro Wat Cooking" },
    { src: "/videos/video1.mp4", title: "Ethiopian Cultural Dance" },
    { src: "/videos/video1.mp4", title: "Ethiopian Coffee Ceremony" },
    { src: "/videos/video1.mp4", title: "Traditional Injera Making" },
    { src: "/videos/video1.mp4", title: "Doro Wat Cooking" },
    { src: "/videos/video1.mp4", title: "Ethiopian Cultural Dance" },
    { src: "/videos/video1.mp4", title: "Ethiopian Coffee Ceremony" },
    { src: "/videos/video1.mp4", title: "Traditional Injera Making" },
    { src: "/videos/video1.mp4", title: "Doro Wat Cooking" },
    { src: "/videos/video1.mp4", title: "Ethiopian Cultural Dance" },
  ];

  const filteredVideos = videos?.filter((video) =>
    video?.title?.toLowerCase().includes(searchText.toLowerCase())
  ) ?? [];

  const paginatedVideos = filteredVideos.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4">
      {/* Heading & Search */}
      <div className="flex flex-col md:flex-row grid grid-cols-3 mb-6">
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-2">Video Gallery</h1>
          <p className="mb-6">
            Explore our delicious Ethiopian dishes and vibrant restaurant atmosphere.
          </p>
        </div>
        <Input
          placeholder="Search videos..."
          className="border border-primary"
          value={searchText}
          autoFocus
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedVideos.map((video, idx) => (
          <div
            key={idx}
            className="cursor-pointer relative overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
            onClick={() => setSelectedVideo(video.src)}
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
              src={video.src}
              className="w-full h-48 object-cover"
              muted
              loop
              playsInline
            />
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && <NotFound message="Video" />}

      {/* Pagination */}
      {filteredVideos.length > ITEMS_PER_PAGE && (
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ArrowLeft /> Show Previous
          </Button>
          <Button
            onClick={() =>
              page * ITEMS_PER_PAGE >= filteredVideos.length ? page : setPage(page + 1)
            }
            disabled={page * ITEMS_PER_PAGE >= filteredVideos.length}
          >
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
