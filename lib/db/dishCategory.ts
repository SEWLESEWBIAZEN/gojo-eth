import supabase from "../supabase";
import { DishCategory, FormatResponse } from "../utils";

export async function getAllDishCategories(): Promise<FormatResponse> {
  try {
    const { data, error } = await supabase.from("dish_category").select("*");

    if (error) {
      let status = 500;
      let message = error.message || "Failed to retrieve dish categories";

      switch (error.code) {
        case "PGRST116": // No rows found
          status = 404;
          message = "No dish categories found";
          break;
        case "22P02": // Invalid input syntax
          status = 400;
          message = "Invalid request parameters";
          break;
      }

      return {
        data: null,
        message,
        isError: true,
        status,
      };
    }

    // If data is empty, optionally return 404 or empty array
    if (!data || data.length === 0) {
      return {
        data: [],
        message: "No dish categories available",
        isError: false,
        status: 200,
      };
    }

    return {
      data,
      message: "Dish categories retrieved successfully",
      isError: false,
      status: 200,
    };
  } catch (err: any) {
    return {
      data: null,
      message: err?.message || "Unexpected error retrieving dish categories",
      isError: true,
      status: 500,
    };
  }
}

export async function getDishCategoryById(id: string): Promise<FormatResponse> {
  // 1️⃣ Validate input
  if (!id || !id.trim()) {
    return {
      data: null,
      message: "Dish category ID is required",
      isError: true,
      status: 400,
    };
  }

  try {
    const { data, error } = await supabase
      .from("dish_category")
      .select("*")
      .eq("id", id)
      .single();

    // 2️⃣ Handle Supabase errors
    if (error) {
      let status = 500;
      let message = error.message || "Failed to retrieve dish category";

      switch (error.code) {
        case "PGRST116": // No rows found for .single()
          status = 404;
          message = "Dish category not found";
          break;
        case "22P02": // Invalid UUID / input syntax
          status = 400;
          message = "Invalid category ID format";
          break;
      }

      return {
        data: null,
        message,
        isError: true,
        status,
      };
    }

    // 3️⃣ Success
    return {
      data,
      message: "Dish category retrieved successfully",
      isError: false,
      status: 200,
    };
  } catch (err: any) {
    // 4️⃣ Unexpected errors
    return {
      data: null,
      message: err?.message || "Unexpected error retrieving dish category",
      isError: true,
      status: 500,
    };
  }
}



export async function createDishCategory(categoryData: DishCategory): Promise<FormatResponse> {
  // 1️⃣ Validate input
  if (!categoryData.name || !categoryData.name.trim()) {
    return {
      data: null,
      message: "Category name is required",
      isError: true,
      status: 400,
    };
  }

  // 2️⃣ Check for duplicate name (case-insensitive)
  const { data: existingCategory, error: checkError } = await supabase
    .from("dish_category")
    .select("*")
    .ilike("name", categoryData.name.trim())
    .maybeSingle();

  if (checkError) {
    return {
      data: null,
      message: checkError.message || "Error checking existing categories",
      isError: true,
      status: 500,
    };
  }

  if (existingCategory) {
    return {
      data: null,
      message: "A dish category with this name already exists",
      isError: true,
      status: 409, // Conflict
    };
  }

  // 3️⃣ Insert category
  const { data, error } = await supabase
    .from("dish_category")
    .insert([categoryData])
    .select()
    .single();

  // 4️⃣ Handle DB errors
  if (error) {
    let status = 500;
    let message = error.message || "Failed to create dish category";

    switch (error.code) {
      case "23505": // unique violation
        status = 409;
        message = "A dish category with this name already exists";
        break;
      case "22P02": // invalid input syntax
        status = 400;
        message = "Invalid input format";
        break;
      case "PGRST116": // no rows
        status = 404;
        message = "Dish category not found";
        break;
    }

    return {
      data: null,
      message,
      isError: true,
      status,
    };
  }

  // 5️⃣ Success
  return {
    data,
    message: "Dish category created successfully",
    isError: false,
    status: 201,
  };
}


export async function updateDishCategory(categoryData: DishCategory) {
  // 1️⃣ Validate input
  if (!categoryData.id) {
    return {
      data: null,
      message: "Dish category ID is required",
      isError: true,
      status: 400,
    };
  }

  // 2️⃣ Attempt update
  const { data, error } = await supabase
    .from("dish_category")
    .update(categoryData)
    .eq("id", categoryData.id)
    .select()
    .single();

  // 3️⃣ Handle errors
  if (error) {
    let status = 500;
    let message = error.message || "Failed to update dish category";

    if (error.code === "22P02") {
      status = 400; // Invalid ID format
      message = "Invalid category ID format";
    } else if (error.code === "PGRST116") {
      status = 404; // Not found
      message = "Dish category not found";
    }

    return {
      data: null,
      message,
      isError: true,
      status,
    };
  }

  // 4️⃣ Success
  return {
    data,
    message: "Dish category updated successfully",
    isError: false,
    status: 200,
  };
}



export async function deleteDishCategory(id: string) {
  // 1️⃣ Validate ID
  if (!id) {
    return {
      data: null,
      message: "Dish category ID is required",
      isError: true,
      status: 400,
    };
  }

  // 2️⃣ Attempt delete
  const { data, error } = await supabase
    .from("dish_category")
    .delete()
    .eq("id", id)
    .select()
    .single();

  // 3️⃣ Handle errors
  if (error) {
    let status = 500;
    let message = error.message || "Failed to delete dish category";

    switch (error.code) {
      case "22P02": // Invalid UUID or ID format
        status = 400;
        message = "Invalid category ID format";
        break;
      case "PGRST116": // No rows found for .single()
        status = 404;
        message = "Dish category not found";
        break;
      case "23503": // Foreign key violation (category in use)
        status = 409;
        message =
          "Cannot delete this category because it is linked to existing dishes";
        break;
    }

    return {
      data: null,
      message,
      isError: true,
      status,
    };
  }

  // 4️⃣ Success
  return {
    data,
    message: "Dish category deleted successfully",
    isError: false,
    status: 200,
  };
}


