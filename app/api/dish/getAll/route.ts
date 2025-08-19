import { NextResponse } from 'next/server';
import { getAllDishesWithTodayFlag } from '../../../../lib/db/dishes';
import { formatResponse, FormatResponse } from '@/lib/utils';

export async function GET():Promise<NextResponse<FormatResponse>> {
  const response = await getAllDishesWithTodayFlag();
  return formatResponse(response);
}

