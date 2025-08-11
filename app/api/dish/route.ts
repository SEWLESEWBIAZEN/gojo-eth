import { NextResponse } from 'next/server';
import { createDish, getAllDishes, DishInput } from '../../../lib/db/dishes';
export async function GET() {
    const response = await getAllDishes();
    return NextResponse.json(
        {
            data: response.data,
            message: response?.data?.length === 0 ? "No dishes found" : response.message,
            isError: response.isError
        },
        {
            status: response.statusCode
        });
}

export async function POST(request: Request) {
    const dishInput: DishInput = await request.json();
    const response = await createDish(dishInput);
    return NextResponse.json(
        {
            data: response.data,
            message: response.message,
            isError: response.isError
        },
        {
            status: response.statusCode
        }
    );

}
