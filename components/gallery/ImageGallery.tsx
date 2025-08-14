'use client'
import React, { useState } from 'react'
import Image from "next/image";
import { Input } from '../ui/Input';
import NotFound from '../NotFound';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
interface ImageGalleryProps {
    images: {
        src: string;
        title?: string;
    }[];
}
const ImageGallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    
    // Pagination indexes
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const galleryImages: ImageGalleryProps["images"] = [
        { src: "/images/gallary1.jpg", title: "Ethiopian Dish 1" },
        { src: "/images/image-1a.jpg", title: "Ethiopian Dish 2" },
        { src: "/images/image-2c.jpg", title: "Ethiopian Dish 3" },
        { src: "/images/image-3k.jpg", title: "Ethiopian Dish 4" },
        { src: "/images/image-4b.jpg", title: "Ethiopian Dish 5" },
        { src: "/images/image-2c.jpg", title: "Ethiopian Dish 6" },
        { src: "/images/image-3k.jpg", title: "Ethiopian Dish 7" },
        { src: "/images/image-4b.jpg", title: "Ethiopian Dish 8" },
    ];
    // Filtered data for current view
    // Filter images once instead of multiple times
    const filteredImages = galleryImages?.filter((image) =>
        image?.title?.toLowerCase().includes(searchText.toLowerCase())
    ) ?? [];
    const paginatedImages = filteredImages.slice(startIndex, endIndex);
    return (
        <div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row grid grid-cols-3">
                    <div className="col-span-2">
                        <h1 className="text-4xl font-bold mb-2">Image Gallery</h1>
                        <p className="mb-6">
                            Explore our delicious Ethiopian dishes and vibrant restaurant atmosphere.
                        </p>
                    </div>
                    <Input
                        placeholder="Search images..."
                        className="border border-primary"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        autoFocus
                    />
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {paginatedImages.map((image, idx) => (
                        <div
                            key={idx}
                            className="relative w-80 h-60 rounded-lg overflow-hidden cursor-pointer shadow-md"
                            onClick={() => setSelectedImage(image?.src)}
                        >
                            {image?.title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-transparent backdrop-blur-md text-white text-center py-1 text-md z-10">
                                    {image?.title}
                                </div>
                            )}

                            <Image
                                src={image?.src}
                                alt={`Ethiopian dish ${idx + 1}`}
                                fill
                                className="object-cover w-full h-full"
                                loading="lazy"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>

                {/* Not Found */}
                {filteredImages.length === 0 && <NotFound message="Image" />}

                {/* Pagination Controls */}
                {filteredImages.length > ITEMS_PER_PAGE && (
                    <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                        <Button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            <ArrowLeft /> Show Previous
                        </Button>
                        <Button
                            onClick={() =>
                                setPage((p) =>
                                    endIndex >= filteredImages.length ? p : p + 1
                                )
                            }
                            disabled={endIndex >= filteredImages.length}
                        >
                            <ArrowRight /> Show Next
                        </Button>
                    </div>
                )}
            </div>

            {/* Selected Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative">
                        <Image
                            src={selectedImage}
                            alt="Selected dish"
                            width={2400}
                            height={1200}
                            className="object-contain max-h-[90vh] max-w-[90vw] rounded-lg"
                        />
                        <button
                            className="absolute top-2 right-2 text-white text-2xl font-bold"
                            onClick={() => setSelectedImage(null)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageGallery
