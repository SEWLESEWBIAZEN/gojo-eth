import { signUp, signIn } from "@/lib/auth";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();
  const { email, password, action, role } = body;

  let result;
  if (action === 'signup') {
    result = await signUp(email, password, role);
  } else if (action === 'signin') {
    result = await signIn(email, password);
  } else {
    return new Response(
      JSON.stringify({ message: 'Invalid action' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // If signUp/signIn returns an object, wrap it in Response:
  return new Response(
    JSON.stringify(result),
    {
      status: result.statusCode || 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
