import { NextResponse } from "next/server";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { removeDishFromMenu } from "@/lib/db/dailyMenu";

// /api/dish/remove/[id]/route.ts
export async function PUT(
  request: Request,
  { params }: { params:Promise<{ id: string }>}
): Promise<NextResponse<FormatResponse>> {   
  const awaitedParams = await params;
  const { id } = awaitedParams;
  const response = await removeDishFromMenu(id);
  return formatResponse(response);
}
