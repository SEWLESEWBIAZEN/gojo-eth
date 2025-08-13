import { NextResponse } from 'next/server';
import { getDishById } from '../../../../../lib/db/dishes'; // assuming you have this
import { formatResponse, FormatResponse } from '@/lib/utils';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<FormatResponse>> {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  const response = await getDishById(id);

  return formatResponse(response);
}



