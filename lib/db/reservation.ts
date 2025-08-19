import supabase from "../supabase";
import { FormatResponse, Reservation } from "../utils";
export async function reserveTable(reservation: Reservation): Promise<FormatResponse> {
    if (!reservation) {
        return {
            message: "Reservation details are required.",
            isError: true,
            status: 400,
        };
    }
    const { email, full_name, reservation_date, reservation_time, partySize, phone_number } = reservation;

    if (!email?.trim()) {
        return { message: "Email is required.", isError: true, status: 400 };
    }
    if (!full_name?.trim()) {
        return { message: "Full name is required.", isError: true, status: 400 };
    }
    if (!reservation_date) {
        return { message: "Reservation date is required.", isError: true, status: 400 };
    }
    if (!reservation_time?.trim()) {
        return { message: "Reservation time is required.", isError: true, status: 400 };
    }
    if (!phone_number?.trim()) {
        return { message: "Phone number is required.", isError: true, status: 400 };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { message: "Invalid email format.", isError: true, status: 400 };
    }
    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
    if (!phoneRegex.test(phone_number)) {
        return { message: "Invalid phone number format.", isError: true, status: 400 };
    }
    const dateObj = new Date(reservation_date);
    if (isNaN(dateObj.getTime())) {
        return { message: "Invalid reservation date.", isError: true, status: 400 };
    }   
    const combined = `${reservation_date}T${reservation_time}:00`;
    const dateTime = new Date(combined);
    // Check if in the past
    const isPast = dateTime.getTime() < new Date().getTime();
 
    if (isPast) {
        return { message: "Reservation date cannot be in the past.", isError: true, status: 400 };
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(reservation_time)) {
        return { message: "Invalid reservation time format. Use HH:MM (24-hour).", isError: true, status: 400 };
    }
    if (partySize !== undefined && (typeof partySize !== "number" || partySize <= 0)) {
        return { message: "Party size must be a positive number.", isError: true, status: 400 };
    }
    const { data: existingReservation, error: fetchError } = await supabase
        .from("table_reservations")
        .select("email")
        .eq("email", email)
        .single();


    if (existingReservation) {
        return {
            message: "You already have a reservation.",
            isError: true,
            status: 400,
        };
    }

    const { data, error } = await supabase
        .from("table_reservations")
        .insert([reservation])
        .select()
        .single();

    if (error) {
        return {
            message: "Failed to reserve table",
            isError: true,
            status: 500,
        }
    }
    return {
        data: {
            ...data,
            reservation_date: new Date(data?.reservation_date)?.toDateString(),
        },
        message: "Table reserved successfully.",
        isError: false,
        status: 201,
    };
}

export async function cancelReservation(email: string): Promise<FormatResponse> {
    if (!email?.trim()) {
        return {
            message: "Email is required to cancel a reservation.",
            isError: true,
            status: 400,
        };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            message: "Invalid email format.",
            isError: true,
            status: 400,
        };
    }
    const { data: existingReservation, error: fetchError } = await supabase
        .from("table_reservations")
        .select()
        .eq("email", email)
        .neq("status", "cancelled")
        .maybeSingle();

    if (!existingReservation) {
        return {
            message: "Your reservation not found or already cancelled.",
            isError: true,
            status: 404,
        };
    }
    if (fetchError) {
        return {
            data: null,
            message: "Failed to fetch existing reservation.",
            isError: true,
            status: 500,
        };
    }
    const { data, error } = await supabase
        .from("table_reservations")
        .update({
            status: "cancelled"
        })
        .eq("email", email)
        .maybeSingle();

    if (error) {
        return {
            message: "Failed to cancel the reservation. Please try again later.",
            isError: true,
            status: 500,
        };
    }

    return {
        data,
        message: "Reservation cancelled successfully.",
        isError: false,
        status: 200,
    };
}

