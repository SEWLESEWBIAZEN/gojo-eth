import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FormatResponse {
  data: any;
  message: string;
  isError: boolean;
  statusCode: number;
}

export function formatResponse({data=null, message="", isError=false, statusCode=200}: FormatResponse) {
  return {
    data,
    message,
    isError,
    statusCode
  };
}


export function truncateText(text: string | undefined, maxLength: number) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

