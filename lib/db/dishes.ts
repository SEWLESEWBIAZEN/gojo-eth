import supabase from '../supabase';
import { formatResponse } from '../utils';

export interface DishInput {
  name: string;
  description?: string;
  category_id?: string;
  images?: File[];
}

export async function createDish(dish: DishInput) {
  const { name, description, category_id, images } = dish;
  const { data, error } = await supabase
    .from('dishes')
    .insert([{ name, description, category_id, images }])
    .select()
    .single();

  if (error) {
    return formatResponse({
      data: null,
      message: error.message || 'Failed to create dish',
      isError: true,
      status: 500
    });
  }
  return formatResponse({
    data,
    message: "Dish created successfully",
    isError: false,
    status: 201
  });
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
  const { data, error } = await supabase.from('dishes').select('*').eq('id', id).single();
  if (error) {
    return {
      data: null,
      message: error.message || 'Failed to fetch dish',
      isError: true,
      status: 500,
    };
  }
  return {
    data,
    message: "Dish fetched successfully",
    isError: false,
    status: 200
  };
}

  



