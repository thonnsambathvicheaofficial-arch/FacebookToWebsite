
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";

    // Define allowed domains (including localhost for dev and your vercel production domain)
    const allowedDomains = [
        "localhost:3000",
        "facebook-to-website.vercel.app",
        "your-production-domain.com"
    ];

    // Check if the current hostname is a subdomain
    // We also ignore the base vercel.app domain if it's the root
    const isSubdomain = !allowedDomains.includes(hostname) && hostname !== "vercel.app";

    if (isSubdomain) {
        // Extract subdomain (e.g., "demo" from "demo.localhost:3000")
        const subdomain = hostname.split(".")[0];

        // Rewrite the URL to a dynamic route handler for sites
        // e.g. demo.localhost:3000 -> localhost:3000/sites/demo
        // We haven't built /sites/[subdomain] yet, but let's point to /preview for now
        // or better yet, a dedicated dynamic route we will build next.
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
