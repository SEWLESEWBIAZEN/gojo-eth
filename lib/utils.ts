import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string | undefined) {
  if (!name) return "";
  const parts = name.split(/[\s@.]+/); // split by space, @, or dot
  const initials = parts
    .map((part) => part[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");
  return initials;
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
      status
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
  price: number;
  spicy: boolean;
  vegan: boolean;
  featured: boolean;
  rating: number;
  images: string[];
  category: Category;
  todays?: boolean;

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
  category_id?: string;
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
export interface Category {
  id: string;
  name: string;
  description: string;
}


export interface DailyMenu {
  id?: string;
  date: Date;
}

export interface Reservation {
  id?: string;
  email: string;
  full_name: string;
  reservation_date: string;
  reservation_time: string;
  partySize?: number;
  phone_number?: string;
  status: "pending" | "active" | "cancelled" | "inactive";
}

export interface ReservationCancellation {
  email: string;
}

export interface Image {
  id?: string;
  url: string;
  title: string;
}

export interface Video {
  id?: string;
  url: string;
  title: string;
}

export interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user?: any;
}

export interface DailyMenuDish {
  id: string;
  name: string;
  description: string;
  price: number;
  featured: boolean;
  rating: number;
  category: string;
  spicy: boolean;
  vegan: boolean;
  images: string[];
}

export interface DishFormData {
  name: string
  category: string
  description: string
  price: number
  featured: boolean
  spicy: boolean
  vegan: boolean
  images: File[]
}

