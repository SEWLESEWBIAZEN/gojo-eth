import { NextResponse } from 'next/server';
import { formatResponse, FormatResponse } from '@/lib/utils';
import { getReservationById } from '@/lib/db/reservation';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<FormatResponse>> {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  const response = await getReservationById(id);

  return formatResponse(response);
}