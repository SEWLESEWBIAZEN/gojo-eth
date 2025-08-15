'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from '../ui/Input';
import NotFound from '../NotFound';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';
import MenuLoading from '../menu/MenuLoading';
import GallerySkeleton from './GallerySkeleton';

interface GalleryImage {
    url: string;
    title?: string;
}

const ImageGallery = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [totalImages, setTotalImages] = useState<number>(0);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        setIsLoading(true);
        const fetchImages = async () => {
            try {
                const response = await axios.get(`/api/gallery/getAllImages?page=${page}&limit=${ITEMS_PER_PAGE}`);
                setGalleryImages(response.data.data.images);
                setTotalImages(response.data.data.total);

            } catch (error) {
                console.error('Error fetching images:', error);
                setGalleryImages([]);
                setTotalImages(0);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, [page]);

    // Filter for search
    const filteredImages = galleryImages.filter(img =>
        img.title?.toLowerCase().includes(searchText.toLowerCase()) || ''
    );
    const totalPages = Math.ceil(totalImages / ITEMS_PER_PAGE);

    return (
        <div>
            <div className="container mx-auto px-4">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div className='w-full'>
                        <h1 className="text-4xl font-bold mb-2">Image Gallery</h1>
                        <p>Explore our delicious Ethiopian dishes and vibrant restaurant atmosphere.</p>
                    </div>
                    <Input
                        placeholder="Search images..."
                        className="border border-primary w-full"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}                    
                    />
                </div>

                {isLoading && <div><GallerySkeleton gallery='image'/></div>}

                {/* Image Grid */}
                {filteredImages.length > 0 && !isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredImages.map((image, idx) => (
                            <div
                                key={idx}
                                className="relative w-80 h-60 rounded-lg overflow-hidden cursor-pointer shadow-md mx-auto"
                                onClick={() => setSelectedImage(image.url)}
                            >
                                {image.title && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm text-white text-center text-lg py-1 text-md z-10">
                                        {image.title}
                                    </div>
                                )}
                                <Image
                                    src={image.url}
                                    alt={image.title || `Ethiopian dish ${idx + 1}`}
                                    fill
                                    className="object-cover w-full h-full mx-auto"
                                    loading="lazy"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <NotFound message="Image" />
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
    );
};

export default ImageGallery;
