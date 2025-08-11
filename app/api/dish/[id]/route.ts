import { NextResponse } from "next/server";
import { getDishById } from "../../../../lib/db/dishes";

interface Params {
  params: { id: string };
}

export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    const id = params.id;
    const dish = await getDishById(id);
    if (!dish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json(dish, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
