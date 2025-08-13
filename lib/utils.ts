import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type FormatResponse = {
  data?: any;
  message?: string;
  isError?: boolean;
  status?: number;
};

export function formatResponse({
  data = null,
  message = "",
  isError = false,
  status = 200,
}: FormatResponse) {
  return NextResponse.json(
    {
      data,
      message,
      isError,
    },
    { status }
  );
}

export function truncateText(text: string | undefined, maxLength: number) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export interface Dish {
  id: string;
  name: string;
  description?: string;  
  price?: number;
  spicy?: boolean;
  vegan?: boolean;
  featured?: boolean;
  rating?: number;
  images?: string[];

}
export interface DishToBeUpdated {
  id: string;
  name?: string;
  description?: string;  
  price?: number;
  spicy?: boolean;
  vegan?: boolean;
  featured?: boolean;
  rating?: number;  
  images?: string[];
}

export interface NewDish {
  category_id: string;
  name: string;
  description: string;
  price: number;
  spicy: boolean;
  vegan: boolean;
  featured: boolean;
  rating: number;
  images: string[];
}

export interface DishCategory {
  id?: string;
  name: string;
  description?: string;
}
