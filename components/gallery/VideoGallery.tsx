"use client";
import { useState } from "react";
import { Input } from "../ui/Input";
import NotFound from "../NotFound";
interface VideoGalleryProps {
    videos?: {
        src: string;
        title?: string;
    }[];
}

export default function VideoGallery() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>("");

    const videos: VideoGalleryProps["videos"] = [
        { src: "/videos/video1.mp4", title: "Ethiopian Coffee Ceremony" },
        { src: "/videos/video1.mp4", title: "Traditional Injera Making" },
        { src: "/videos/video1.mp4", title: "Doro Wat Cooking" },
        { src: "/videos/video1.mp4", title: "Ethiopian Cultural Dance" },
    ];

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row grid grid-cols-3">
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
                    onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos?.filter(video =>
                    video?.title?.toLowerCase().includes(searchText.toLowerCase())
                )?.map((video, idx) => (
                    <div
                        key={idx}
                        className="cursor-pointer relative overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                        onClick={() => setSelectedVideo(video.src)}
                    >
                        {/* Thumbnail overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold">
                            ▶
                        </div>

                        <div className="absolute bg-transparent flex items-center backdrop-blur-md justify-center text-white text-md bottom-0 left-0 right-0">
                            {video?.title}
                        </div>

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
            {videos?.filter(video =>
                        video?.title?.toLowerCase().includes(searchText.toLowerCase())
                    ).length === 0 &&
                        <NotFound message='Video'/>
                    }

            {/* Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div className="relative w-[90vw] max-w-4xl">
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
