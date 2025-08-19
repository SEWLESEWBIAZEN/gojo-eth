import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();       
    const supabase = createMiddlewareClient({ req, res });
    
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Protect all routes starting with /dashboard
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        if (!session) {
            // redirect to login if not authenticated
            const redirectUrl = req.nextUrl.clone();
            redirectUrl.pathname = "/login";
            return NextResponse.redirect(redirectUrl);
        }
        // Check user role from profiles
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

        if (profile?.role !== "admin") {
            const redirectUrl = req.nextUrl.clone();
            redirectUrl.pathname = "/not-authorized";
            return NextResponse.redirect(redirectUrl);
        }
    }

    return res;
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
