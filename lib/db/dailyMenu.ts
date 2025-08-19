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
// add and remove dishes
//add dish to menu
export async function addDishToMenu(
  dish_id: string,
  special_of_the_day: boolean,
  batch_price: number
): Promise<FormatResponse> {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Check if today's daily menu exists
    let { data: dailyMenuData, error: fetchError } = await supabase
      .from("daily_menu")
      .select("id")
      .eq("menu_date", today)
      .maybeSingle();

    if (fetchError) {
      return {
        message: fetchError.message || "Failed to fetch daily menu",
        isError: true,
        status: 500,
      };
    }

    // If not exists, create one
    if (!dailyMenuData) {
      const { data: newMenu, error: createError } = await supabase
        .from("daily_menu")
        .insert([{ menu_date: today }])
        .select("id")
        .single();

      if (createError || !newMenu) {
        return {
          message: createError?.message || "Failed to create daily menu",
          isError: true,
          status: 500,
        };
      }
      dailyMenuData = newMenu;
    }

    //check if has already  added
    const { data: checkData, error: checkError } = await supabase
      .from("daily_menu_dishes")
      .select("id")
      .eq("daily_menu_id", dailyMenuData?.id)
      .eq("dish_id", dish_id)
      .maybeSingle();

    if (checkError) {
      return {
        message: checkError.message || "Failed to check if dish is already added",
        isError: true,
        status: 500,
      };
    }

    if (checkData) {
      return {
        message: "Dish has already added to the menu",
        isError: true,
        status: 409,
      };
    }

    // Add dish to the daily menu
    const { data, error } = await supabase
      .from("daily_menu_dishes")
      .insert([
        {
          daily_menu_id: dailyMenuData.id,
          dish_id,
          special_of_the_day,
          batch_price,
        },
      ])
      .select();

    if (error) {
      return {
        message: error.message || "Failed to add dish to menu",
        isError: true,
        status: 500,
      };
    }

    return {
      data,
      message: "Dish added to menu successfully",
      isError: false,
      status: 200,
    };
  } catch (err: any) {
    return {
      message: err?.message || "Unexpected error adding dish to menu",
      isError: true,
      status: 500,
    };
  }
}
// remove dish from menu
export async function removeDishFromMenu(id: string): Promise<FormatResponse> {
  if (!id) {
    return {
      data: null,
      message: "daily menu dish ID is required",
      isError: true,
      status: 400,
    };
  }

  try {
    const { data, error } = await supabase
      .from("daily_menu_dishes")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return {
          data: null,
          message: "Dish not found from today's dish",
          isError: true,
          status: 404,
        };
      }
    }

    return {
      data,
      message: "Dish removed from menu successfully",
      isError: false,
      status: 200,
    };
  } catch (err: unknown) {

    return {
      data: null,
      message:
        err instanceof Error
          ? err.message
          : "Unexpected error removing dish from menu",
      isError: true,
      status: 500,
    };
  }
}
export async function getAllTodaysMenuDishes(date: string): Promise<FormatResponse> {
  try {   

    // Get today's menu
    const { data: fetchData, error: fetchError } = await supabase
      .from("daily_menu")
      .select("id")
      .eq("menu_date", date)
      .maybeSingle();
      

    if (fetchError || !fetchData) {
      return {
        message: fetchError?.message || "No daily menu found for today",
        isError: true,
        status: 404,
        data: []
      };
    }

    // Fetch dishes with relations
    const { data, error } = await supabase
      .from("daily_menu_dishes")
      .select(`
        id,
        special_of_the_day,
        batch_price,
        dishes (
          name,
          description,
          spicy,
          vegan,
          rating,
          images,
          category:dish_category (
            id,
            name
          )
        )
      `)
      .eq("daily_menu_id", fetchData.id);
      

    if (error) {
      return {
        message: error.message || "Failed to fetch today's menu dishes",
        isError: true,
        status: 500,
      };
    }

    // Transform into clean structure
    const formattedDishes = data?.map((row: any) => ({
      id: row.id,
      name: row.dishes?.name,
      description: row.dishes?.description,
      price: row.batch_price,
      featured: row.special_of_the_day,
      rating: row.dishes?.rating,
      category: row.dishes?.category ? row.dishes.category.name : "",
      spicy: row.dishes?.spicy,
      vegan: row.dishes?.vegan,
      images: row.dishes?.images,
    })) ?? [];

    return {
      data: formattedDishes,
      message: "Today's menu dishes fetched successfully",
      isError: false,
      status: 200,
    };
  } catch (err: any) {
    return {
      message: err?.message || "Unexpected error fetching today's menu dishes",
      isError: true,
      status: 500,
    };
  }
}





