import { getAllGalleryImages } from "@/lib/db/gallery";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse<FormatResponse>> {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const response = await getAllGalleryImages(page, limit);
    return formatResponse(response);
}