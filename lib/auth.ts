// lib/auth.ts
import supabase from "@/lib/supabase";
import { formatResponse } from "@/lib/utils";

export const signUp = async (email: string, password: string, role='user') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role
      }
    }
  });
  if (error) return formatResponse({ data: null, message: error.message || 'Failed to sign up', isError: true, statusCode: 500 });
  return formatResponse({ data, message: "User signed up successfully", isError: false, statusCode: 201 });
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return formatResponse({ data: null, message: error.message || 'Failed to sign in', isError: true, statusCode: 500 });
  return formatResponse({ data, message: "User signed in successfully", isError: false, statusCode: 200 });
};
