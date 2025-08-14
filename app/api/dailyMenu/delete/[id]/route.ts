import { deleteDailyMenu } from "@/lib/db/dailyMenu";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(
 _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<FormatResponse>> {
  const { id } = await params;
  const response = await deleteDailyMenu(id);
  return formatResponse(response);
}
