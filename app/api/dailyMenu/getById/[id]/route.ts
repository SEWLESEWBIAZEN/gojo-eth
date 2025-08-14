import { NextResponse } from 'next/server';
import { formatResponse, FormatResponse } from '@/lib/utils';
import { getDailyMenuById } from '@/lib/db/dailyMenu';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<FormatResponse>> {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  const response = await getDailyMenuById(id);

  return formatResponse(response);
}

