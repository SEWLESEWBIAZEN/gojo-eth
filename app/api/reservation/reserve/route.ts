import { reserveTable } from "@/lib/db/reservation";
import { formatResponse, FormatResponse, Reservation } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<FormatResponse>> {
    try {
        const reservation: Reservation = await request.json();
        const response = await reserveTable(reservation);
        return formatResponse(response);
    } catch (error) {        
        return formatResponse({
            message: "Failed to process reservation",
            isError: true,
            status: 500,
        });
    }
}