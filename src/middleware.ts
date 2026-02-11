
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const hostname = req.headers.get("host") || "";

    // 1. If it's the main domain (including sub-aliases or vercel previews), show the landing page
    if (
        hostname.includes("facebook-to-website") ||
        hostname.includes("localhost") ||
        hostname === "vercel.app"
    ) {
        return NextResponse.next();
    }

    // 2. Identify and rewrite subdomains
    const segments = hostname.split(".").filter(Boolean);
    if (segments.length > (hostname.endsWith(".vercel.app") ? 3 : 1)) {
        const subdomain = segments[0];
        return NextResponse.rewrite(new URL(`/sites/${subdomain}`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
