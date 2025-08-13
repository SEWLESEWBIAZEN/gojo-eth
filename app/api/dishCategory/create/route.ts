import { createDishCategory } from "@/lib/db/dishCategory";
import { FormatResponse, formatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request):Promise<NextResponse<FormatResponse>> {
  const body = await request.json();
  const response = await createDishCategory(body);
  return formatResponse(response);
}
