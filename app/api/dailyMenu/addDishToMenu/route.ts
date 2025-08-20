import { NextResponse } from 'next/server';
import { formatResponse, FormatResponse } from '@/lib/utils';
import { addDishToMenu } from '@/lib/db/dailyMenu';

export async function POST(request:Request):Promise<NextResponse<FormatResponse>> {
  const data= await request.json(); 
  const response = await addDishToMenu(data.dish_id,data.special_of_the_day,data.batch_price);
  return formatResponse(response);
}
