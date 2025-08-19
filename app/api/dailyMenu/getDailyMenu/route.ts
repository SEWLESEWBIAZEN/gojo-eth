import { getAllTodaysMenuDishes } from "@/lib/db/dailyMenu";
import { FormatResponse, formatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse<FormatResponse>> {
  const url = new URL(request.url);
  const today = new Date().toISOString().split("T")[0];
  const date = url.searchParams.get("date") || today;

  const response = await getAllTodaysMenuDishes(date);
  return formatResponse(response);
}