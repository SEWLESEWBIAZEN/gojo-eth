import { NextResponse } from 'next/server';
import { getAllDishes } from '../../../../lib/db/dishes';
import { formatResponse, FormatResponse } from '@/lib/utils';

export async function GET():Promise<NextResponse<FormatResponse>> {
  const response = await getAllDishes();
  return formatResponse({
    data: response.data,
    message: response.data?.length === 0 ? 'No dishes found' : response.message,
    isError: response.isError,
    status: response.status,
  });
}

