import supabase from '../supabase';
import { formatResponse } from '../utils';

export interface DishInput {
  name: string;
  description?: string;
  category_id?: string;
  image_url?: string;
}

export async function createDish(dish: DishInput) {
  const { name, description, category_id, image_url } = dish;
  const { data, error } = await supabase
    .from('dishes')
    .insert([{ name, description, category_id, image_url }])
    .select()
    .single();

  if (error) {
    return formatResponse({
      data: null,
      message: error.message || 'Failed to create dish',
      isError: true,
      statusCode: 500
    });
  }
  return formatResponse({
    data,
    message: "Dish created successfully",
    isError: false,
    statusCode: 201
  });
}


export async function getAllDishes() {
  const { data, error } = await supabase.from('dishes').select('*');
  if (error) return formatResponse({data: null, message: error.message || 'Failed to fetch dishes', isError: true, statusCode: 500});
  return formatResponse({
    data,
    message: "Dishes fetched successfully",
    isError: false,
    statusCode: 200
  });
}

export async function getDishById(id: string) {
  const { data, error } = await supabase.from('dishes').select('*').eq('id', id).single();
  if (error) {    
    return formatResponse({
      data: null,
      message: error.message || 'Failed to fetch dish',
      isError: true,
      statusCode:  500
    });
  }
  return formatResponse({
    data,
    message: "Dish fetched successfully",
    isError: false,
    statusCode: 200
  });
}
