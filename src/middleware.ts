
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";

    // List of domains that are considered "root" and should show the landing page
    const rootDomains = ["localhost:3000", "facebook-to-website.vercel.app", "your-production-domain.com"];

    // Logic to determine if this is a subdomain request
    let isSubdomain = false;

    if (rootDomains.includes(hostname)) {
        isSubdomain = false;
    } else if (hostname.endsWith(".vercel.app")) {
        // For vercel.app, if it has more than 2 segments (excluding vercel.app itself)
        // e.g. "facebook-to-website.vercel.app" has segments: ["facebook-to-website", "vercel", "app"]
        const segments = hostname.split(".");
        isSubdomain = segments.length > 3;
    } else {
        // Fallback for custom domains
        isSubdomain = !rootDomains.includes(hostname);
    }

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
