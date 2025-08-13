import { ClockFading } from 'lucide-react';
import supabase from '../supabase';
import { DishToBeUpdated, formatResponse, NewDish } from '../utils';

export interface DishInput {
  name: string;
  description?: string;
  category_id?: string;
  images?: File[];
}

export async function createDish(dishData: NewDish) {
  // 1️⃣ Check if dish name already exists
  const { data: existingDish, error: findError } = await supabase
    .from("dishes")
    .select("*")
    .eq("name", dishData.name)  

  if (findError) {    
    return {
      data: null,
      message: findError.message || "Error checking dish name",
      isError: true,
      status: 500,
    };
  }

  if (existingDish) {
    return {
      data: null,
      message: "A dish with this name already exists",
      isError: true,
      status: 409, // Conflict
    };
  }

  // 2️⃣ Insert if no duplicates
  const { data, error } = await supabase
    .from("dishes")
    .insert([dishData])
    .select()
    .single();

  if (error) {
    return {
      data: null,
      message: error.message || "Failed to create dish",
      isError: true,
      status: 500,
    };
  }

  return {
    data,
    message: "Dish created successfully",
    isError: false,
    status: 201,
  };
}

export async function updateDish(dish: DishToBeUpdated) {

  const { data, error } = await supabase
    .from('dishes')
    .update(dish)
    .eq('id', dish.id)
    .select()
    .single();

  if (error) {
    return ({
      data: null,
      message: error.message || 'Failed to update dish',
      isError: true,
      status: error?.code === '22P02' ? 400 : 500
    });
  }
  return ({
    data,
    message: "Dish updated successfully",
    isError: false,
    status: 201
  });
}

export async function uploadImageToDish(dishImages?: string[], dishId?: string) {
  // Validate required fields
  if (!dishImages?.length) {
    return { data: null, message: 'Dish images are required', isError: true, status: 400 };
  }
  if (!dishId) {
    return { data: null, message: 'Dish ID is required', isError: true, status: 400 };
  }

  // Fetch the dish
  const { data: dish, error: fetchError } = await supabase
    .from('dishes')
    .select('images')
    .eq('id', dishId)
    .single();



  if (fetchError !== null || !dish) {
    return {
      data: null,
      message: fetchError?.message || 'Dish not found',
      isError: true,
      status: fetchError?.code === '22P02' ? 400 : 404,
    };
  }

  // Merge and remove duplicates
  const previousImages = dish.images || [];
  const updatedImages = Array.from(new Set([...previousImages, ...dishImages]));

  // Update the dish
  const { data: updatedDish, error: updateError } = await supabase
    .from('dishes')
    .update({ images: updatedImages })
    .eq('id', dishId)
    .select()
    .single();


  if (updateError) {

    return {
      data: null,
      message: updateError.message || 'Failed to upload images',
      isError: true,
      status: updateError?.code === '22P02' ? 400 : 500,
    };
  }

  return {
    data: updatedDish,
    message: 'Images uploaded successfully',
    isError: false,
    status: 200,
  };
}


export async function getAllDishes() {
  const { data, error } = await supabase.from('dishes').select('*');
  if (error) {
    return {
      data: null,
      message: error.message || 'Failed to fetch dishes',
      isError: true,
      status: 500,
    };
  }

  return {
    data,
    message: 'Dishes fetched successfully',
    isError: false,
    status: 200,
  };
}


export async function getDishById(id: string) {
  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    let status = 500;
    if (error.code === "22P02") {
      status = 400; // Bad request - invalid ID format
    } else if (error.code === "PGRST116") {
      status = 404; // Not found
    }

    return {
      data: null,
      message:
        error.code === "PGRST116"
          ? "Dish not found"
          : error.message || "Failed to fetch dish",
      isError: true,
      status,
    };
  }

  return {
    data,
    message: "Dish fetched successfully",
    isError: false,
    status: 200,
  };
}

export async function deleteDish(id: string) {
  const { data, error } = await supabase.from('dishes').delete().eq('id', id);
  if (error) {
    return {
      data: null,
      message: error.message || 'Failed to delete dish',
      isError: true,
      status: error?.code === '22P02' ? 400 : 500,
    };
  }
  return {
    data,
    message: "Dish deleted successfully!",
    isError: false,
    status: 200
  };
}





