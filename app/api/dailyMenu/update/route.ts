
import { updateDailyMenu } from "@/lib/db/dailyMenu";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(request:Request):Promise<NextResponse<FormatResponse>>{
    const { ...data } = await request.json();
    const dishData = data
    const response = await updateDailyMenu(dishData);
    return formatResponse(response);
}