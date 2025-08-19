import { NextResponse } from 'next/server';
import { formatResponse, FormatResponse } from '@/lib/utils';
import { addDishToMenu } from '@/lib/db/dailyMenu';

export async function POST(request:Request):Promise<NextResponse<FormatResponse>> {
  const { dish_id, special_of_the_day, batch_price } = await request.json();
  const response = await addDishToMenu(dish_id,special_of_the_day,batch_price);
  return formatResponse(response);
}
