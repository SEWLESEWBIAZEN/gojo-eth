import { updateDishCategory } from "@/lib/db/dishCategory";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(request: Request): Promise<NextResponse<FormatResponse>> {
  const body = await request.json();
  const response = await updateDishCategory(body);
  return formatResponse(response);
}
