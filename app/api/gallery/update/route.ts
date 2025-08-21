
import { updateGallery } from "@/lib/db/gallery";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(request:Request):Promise<NextResponse<FormatResponse>>{
    const { ...data } = await request.json();
    const {title,id} = data;
    const response = await updateGallery({title,id});
    return formatResponse(response);
}