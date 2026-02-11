
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const hostname = req.headers.get("host") || "";

    // 1. If it's the main domain, show the landing page
    if (hostname === "facebook-to-website.vercel.app" || hostname === "localhost:3000") {
        return NextResponse.next();
    }

    // 2. Identify if it's a subdomain on vercel.app
    const segments = hostname.split(".").filter(Boolean);
    if (hostname.endsWith(".vercel.app") && segments.length > 3) {
        const subdomain = segments[0];
        return NextResponse.rewrite(new URL(`/sites/${subdomain}`, req.url));
    }

    // 3. Handle other custom subdomains
    if (!hostname.endsWith(".vercel.app") && segments.length > 2) {
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
