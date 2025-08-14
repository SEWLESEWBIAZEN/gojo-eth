import { createDailyMenu } from "@/lib/db/dailyMenu";
import { DailyMenu, formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<FormatResponse>> {
    const { ...data } = await request.json();
    const dailyMenu = data as DailyMenu;
  const response = await createDailyMenu(dailyMenu);
  return formatResponse(response);
}