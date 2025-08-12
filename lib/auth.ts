import supabase from "./supabase";

export const signUp = async (email: string, password: string, role = 'user') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
      },
    },
  });

  if (error) {
    return {
      data: null,
      message: error.message || 'Failed to sign up',
      isError: true,
      status: 500,
    };
  }

  return {
    data,
    message: "User signed up successfully",
    isError: false,
    status: 201,
  };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      data: null,
      message: error.message || 'Failed to sign in',
      isError: true,
      status: 500,
    };
  }

  return {
    data,
    message: "User signed in successfully",
    isError: false,
    status: 200,
  };
};
