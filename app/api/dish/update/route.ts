import { updateDish } from "@/lib/db/dishes";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(request:Request):Promise<NextResponse<FormatResponse>>{
    const { ...data } = await request.json();
    const dishData = data
    const response = await updateDish(dishData);
    return formatResponse(response);
}