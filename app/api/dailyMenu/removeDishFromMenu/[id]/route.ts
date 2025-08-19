import { NextResponse } from "next/server";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { removeDishFromMenu } from "@/lib/db/dailyMenu";

// /api/dish/remove/[id]/route.ts
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<FormatResponse>> {   
  const awaited = await params;
  const { id } = awaited;
  const response = await removeDishFromMenu(id);
  return formatResponse(response);
}
