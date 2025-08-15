import supabase from "../supabase";
import { Image, Video } from "../utils";

export async function uploadImageToGallery(galleryImage?: Image) {
  if (!galleryImage) {
    return { data: null, message: 'Gallery image is required', isError: true, status: 400 };
  }

  const { data, error } = await supabase
    .from('gallery')
    .insert({...galleryImage, type: 'image'})
    .select();

  if (error) {
    return { data: null, message: error.message, isError: true, status: error.code === "22P02" ? 400 : 500 };
  }

  return { data, message: 'Image uploaded successfully', isError: false, status: 200 };
}

export async function getAllGalleryImages(page: number = 1, limit: number = 10) {
    if (page < 1 || limit < 1) {
        return { data: null, message: 'Invalid pagination parameters', isError: true, status: 400 };
    }
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('type', 'image')
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    return { data: null, message: error.message, isError: true, status: error.code === "22P02" ? 400 : 500 };
  }

  return { data, message: 'Gallery images retrieved successfully', isError: false, status: 200 };
}

export async function uploadVideoToGallery(galleryVideo?: Video) {
  if (!galleryVideo) {
    return { data: null, message: 'Gallery video is required', isError: true, status: 400 };
  }
  const { data, error } = await supabase
    .from('gallery')
    .insert({...galleryVideo, type: 'video'})
    .select();

  if (error) {
    return { data: null, message: error.message, isError: true, status: error.code === "22P02" ? 400 : 500 };
  }

  return { data, message: 'Video uploaded successfully', isError: false, status: 200 };
}

export async function getAllGalleryVideos(page: number, limit: number) {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('type', 'video')
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    return { data: null, message: error.message, isError: true, status: error.code === "22P02" ? 400 : 500 };
  }

  return { data, message: 'Gallery videos retrieved successfully', isError: false, status: 200 };
}
