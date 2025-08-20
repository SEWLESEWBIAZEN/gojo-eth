import { getAllReservations } from "@/lib/db/reservation";
import { formatResponse } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const response = await getAllReservations(page, limit);
    return formatResponse(response);
  } catch (error: any) {
    return formatResponse({
      data: { reservations: [], total: 0 },
      message: error?.message || "Failed to fetch reservations",
      isError: true,
      status: 500,
    });
  }
}
