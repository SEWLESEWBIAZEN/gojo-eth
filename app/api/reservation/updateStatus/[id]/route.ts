import { getReservationById, updateReservationStatus } from "@/lib/db/reservation";
import { formatResponse, FormatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<FormatResponse>> {
    const awaitedParams = await params;
    const { id } = awaitedParams;
    const body = await request.json();
    const { status } = body;
    if (!status) {
        return (
            formatResponse({ message: "Status is required", status: 400 })
        );
    }
    const reservation = await getReservationById(id);
    if (!reservation) {
        return (
            formatResponse({ message: "Reservation not found", status: 404 })
        );
    }
    const response = await updateReservationStatus(id, status);
  
    return formatResponse(response);
}