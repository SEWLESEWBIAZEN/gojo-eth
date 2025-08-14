import { cancelReservation } from "@/lib/db/reservation";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(request: Request): Promise<NextResponse<FormatResponse>> {
    try {
        const { email } = await request.json();
        const response = await cancelReservation(email);
        return formatResponse(response);
    } catch (error) {
        return formatResponse({
            message: "Failed to process reservation",
            isError: true,
            status: 500,
        });
    }
}