import { getAllDishCategories } from "@/lib/db/dishCategory";
import { FormatResponse, formatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<FormatResponse>> {
  const response = await getAllDishCategories();
  return formatResponse(response);
}