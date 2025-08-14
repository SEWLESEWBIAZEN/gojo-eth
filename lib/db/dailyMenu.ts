import supabase from "../supabase";
import { DailyMenu, FormatResponse } from "../utils";

// Get all daily menus
export async function getAllDailyMenu(): Promise<FormatResponse> {
  try {
    const { data, error } = await supabase.from("daily_menu").select("*");

    if (error) {
      let status = 500;
      let message = error.message || "Failed to retrieve daily menus";

      switch (error.code) {
        case "PGRST116": // No rows found
          status = 404;
          message = "No daily menus found";
          break;
        case "22P02": // Invalid input syntax
          status = 400;
          message = "Invalid request parameters";
          break;
      }

      return { data: null, message, isError: true, status };
    }

    return {
      data: data || [],
      message: data && data.length > 0 ? "Daily menus retrieved successfully" : "No daily menus available",
      isError: false,
      status: 200,
    };
  } catch (err: any) {
    return {
      data: null,
      message: err?.message || "Unexpected error retrieving daily menus",
      isError: true,
      status: 500,
    };
  }
}

// Get a single daily Menu by ID
export async function getDailyMenuById(id: string): Promise<FormatResponse> {
  if (!id || !id.trim()) {
    return { data: null, message: "Daily menu ID is required", isError: true, status: 400 };
  }

  try {
    const { data, error } = await supabase
      .from("daily_menu")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      let status = 500;
      let message = error.message || "Failed to retrieve daily menu";

      switch (error.code) {
        case "PGRST116": // No rows found
          status = 404;
          message = "Daily Menuy not found";
          break;
        case "22P02": // Invalid UUID
          status = 400;
          message = "Invalid daily menu ID format";
          break;
      }

      return { data: null, message, isError: true, status };
    }

    return { data, message: "Daily menu retrieved successfully", isError: false, status: 200 };
  } catch (err: any) {
    return {
      data: null,
      message: err?.message || "Unexpected error retrieving daily menu",
      isError: true,
      status: 500,
    };
  }
}
export async function createDailyMenu(dailyMenu: DailyMenu): Promise<FormatResponse> {
  // Validate input
  if (!dailyMenu || !dailyMenu.date || !dailyMenu.date.toString().trim()) {
    return {
      message: "Daily menu date is required",
      isError: true,
      status: 400,
    };
  }

  try {
    // Check for duplicates
    const { data: existingMenu, error: checkError } = await supabase
      .from("daily_menu")
      .select("*")
      .eq("menu_date", dailyMenu.date)
      .maybeSingle();

    if (checkError) {
      return {
        message: checkError.message || "Error checking existing daily menus",
        isError: true,
        status: 500,
      };
    }

    if (existingMenu) {
      return {
        message: "A daily menu with this date already exists",
        isError: true,
        status: 409,
      };
    }
    
    // Insert new daily menu
    const { data, error } = await supabase
      .from("daily_menu")
      .insert([{ menu_date: dailyMenu.date }])
      .select()
      .single();

    if (error) {
      let status = 500;
      let message = error.message || "Failed to create daily menu";

      switch (error.code) {
        case "23505": // Unique constraint violation
          status = 409;
          message = "A daily menu with this date already exists";
          break;
        case "22P02": // Invalid input syntax
          status = 400;
          message = "Invalid input format";
          break;
        case "PGRST116": // No rows returned
          status = 404;
          message = "Daily menu not found";
          break;
      }

      return { message, isError: true, status };
    }

    // Success
    return {
      data,
      message: "Daily menu created successfully",
      isError: false,
      status: 201,
    };
  } catch (err: any) {
    return {
      message: err?.message || "Unexpected error creating daily menu",
      isError: true,
      status: 500,
    };
  }
}

export async function updateDailyMenu(dailyMenu: DailyMenu): Promise<FormatResponse> {
  // Validate input
  if (!dailyMenu || !dailyMenu.id) {
    return {
      message: "Daily menu ID is required",
      isError: true,
      status: 400,
    };
  }

  if (!dailyMenu.date || !dailyMenu.date.toString().trim()) {
    return {
      message: "Daily menu date is required",
      isError: true,
      status: 400,
    };
  }

  try {
    // Check for duplicate date (excluding current ID)
    const { data: existingMenu, error: checkError } = await supabase
      .from("daily_menu")
      .select("*")
      .eq("menu_date", dailyMenu.date)
      .neq("id", dailyMenu.id)
      .maybeSingle();

    if (checkError) {
      return {
        message: checkError.message || "Error checking existing daily menus",
        isError: true,
        status: 500,
      };
    }

    if (existingMenu) {
      return {
        message: "A daily menu with this date already exists",
        isError: true,
        status: 409,
      };
    }

    // Update the daily menu
    const { data, error } = await supabase
      .from("daily_menu")
      .update({ menu_date: dailyMenu.date })
      .eq("id", dailyMenu.id)
      .select()
      .single();

    if (error) {
      let status = 500;
      let message = error.message || "Failed to update daily menu";

      switch (error.code) {
        case "22P02": // Invalid input syntax
          status = 400;
          message = "Invalid daily menu ID or input format";
          break;
        case "PGRST116": // No rows returned
          status = 404;
          message = "Daily menu not found";
          break;
        case "23505": // Unique constraint violation
          status = 409;
          message = "A daily menu with this date already exists";
          break;
      }

      return { message, isError: true, status };
    }

    // Success
    return {
      data,
      message: "Daily menu updated successfully",
      isError: false,
      status: 200,
    };
  } catch (err: any) {
    return {
      message: err?.message || "Unexpected error updating daily menu",
      isError: true,
      status: 500,
    };
  }
}

// Delete a daily menu by ID
export async function deleteDailyMenu(id: string): Promise<FormatResponse> {
  if (!id || !id.trim()) {
    return { data: null, message: "Daily menu ID is required", isError: true, status: 400 };
  }

  try {
    const { data, error } = await supabase
      .from("daily_menu")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      let status = 500;
      let message = error.message || "Failed to delete daily menu";

      switch (error.code) {
        case "22P02": // Invalid UUID
          status = 400;
          message = "Invalid daily menu ID format";
          break;
        case "PGRST116": // No rows found
          status = 404;
          message = "Daily menu not found";
          break;
        case "23503": // Foreign key violation
          status = 409;
          message = "Cannot delete this daily menu because it is linked to existing dishes";
          break;
      }

      return { data: null, message, isError: true, status };
    }

    return { data, message: "Daily menu deleted successfully", isError: false, status: 200 };
  } catch (err: any) {
    return {
      data: null,
      message: err?.message || "Unexpected error deleting daily menu",
      isError: true,
      status: 500,
    };
  }
}







