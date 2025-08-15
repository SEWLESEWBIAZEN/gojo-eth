import supabase from "../supabase";
import { Image, Video } from "../utils";

export async function uploadImageToGallery(galleryImage?: Image) {
  if (!galleryImage) {
    return { data: null, message: 'Gallery image is required', isError: true, status: 400 };
  }

  const { data, error } = await supabase
    .from('gallery')
    .insert({ ...galleryImage, type: 'image' })
    .select();

  if (error) {
    return { data: null, message: error.message, isError: true, status: error.code === "22P02" ? 400 : 500 };
  }

  return { data, message: 'Image uploaded successfully', isError: false, status: 200 };
}


// get all gallery images based on page and limit
export async function getAllGalleryImages(
  page: number = 1,
  limit: number = 10
): Promise<{
  data: { images: any[]; total: number };
  message: string;
  isError: boolean;
  status: number;
}> {
  if (page < 1 || limit < 1) {
    return {
      data: { images: [], total: 0 },
      message: "Invalid pagination parameters",
      isError: true,
      status: 400,
    };
  }

  const { count, error: countError } = await supabase
    .from("gallery")
    .select("*", { count: "exact", head: true })
    .eq("type", "image");

  if (countError) {
    return {
      data: { images: [], total: 0 },
      message: countError.message,
      isError: true,
      status: countError.code === "22P02" ? 400 : 500,
    };
  }

  const { data: images, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("type", "image")
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    return {
      data: { images: [], total: count || 0 },
      message: error.message,
      isError: true,
      status: error.code === "22P02" ? 400 : 500,
    };
  }

  return {
    data: { images: images || [], total: count || 0 },
    message: images?.length
      ? "Gallery images retrieved successfully"
      : "No images found",
    isError: false,
    status: 200,
  };
}




export async function uploadVideoToGallery(galleryVideo?: Video) {
  if (!galleryVideo) {
    return { data: null, message: 'Gallery video is required', isError: true, status: 400 };
  }
  const { data, error } = await supabase
    .from('gallery')
    .insert({ ...galleryVideo, type: 'video' })
    .select();

  if (error) {
    return { data: null, message: error.message, isError: true, status: error.code === "22P02" ? 400 : 500 };
  }

  return { data, message: 'Video uploaded successfully', isError: false, status: 200 };
}




export async function getAllGalleryVideos(
  page: number,
  limit: number
): Promise<{
  data: { videos: Video[]; total: number };
  message: string;
  isError: boolean;
  status: number;
}> {
  const { count, error: countError } = await supabase
    .from("gallery")
    .select("*", { count: "exact", head: true })
    .eq("type", "video");

  if (countError) {
    return {
      data: { videos: [], total: 0 },
      message: countError.message,
      isError: true,
      status: countError.code === "22P02" ? 400 : 500,
    };
  }

  const { data: videos, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("type", "video")
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    return {
      data: { videos: [], total: count || 0 },
      message: error.message,
      isError: true,
      status: error.code === "22P02" ? 400 : 500,
    };
  }

  return {
    data: { videos: videos || [], total: count || 0 },
    message: videos?.length ? "Gallery videos retrieved successfully" : "No videos found",
    isError: false,
    status: 200,
  };
}

