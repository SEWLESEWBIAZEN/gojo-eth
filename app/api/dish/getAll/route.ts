import { NextResponse } from 'next/server';
import { getAllDishes } from '../../../../lib/db/dishes';
import { formatResponse, FormatResponse } from '@/lib/utils';

export async function GET():Promise<NextResponse<FormatResponse>> {
  const response = await getAllDishes();
  return formatResponse(response);
}

