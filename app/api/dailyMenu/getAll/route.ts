import { getAllDailyMenu } from "@/lib/db/dailyMenu";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET():Promise<NextResponse<FormatResponse>>{
    const response = await getAllDailyMenu();
    return formatResponse(response);
}