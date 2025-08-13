import { NextResponse } from 'next/server';

import { formatResponse, FormatResponse } from '@/lib/utils';
import { getDishCategoryById } from '@/lib/db/dishCategory';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<FormatResponse>> {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  const response = await getDishCategoryById(id);

  return formatResponse(response);
}



