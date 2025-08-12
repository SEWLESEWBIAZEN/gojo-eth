import { signUp, signIn } from "@/lib/auth";
import { FormatResponse, formatResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<FormatResponse>> {
  const body = await request.json();
  const { email, password, action, role } = body;

  let result;

  if (action === 'signup') {
    result = await signUp(email, password, role);
  } else if (action === 'signin') {
    result = await signIn(email, password);
  } else {
    return formatResponse({
      data: null,
      message: 'Invalid action',
      isError: true,
      status: 400,
    });
  }

  return formatResponse({
    data: result?.data ?? null,
    message: result?.message || 'Success',
    isError: result?.isError || false,
    status: result?.status || 200,
  });
}
