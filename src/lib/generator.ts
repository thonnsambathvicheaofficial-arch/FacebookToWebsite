
import { FacebookPage, FacebookPost } from "@/types/facebook";
import { Product, SiteConfig } from "@/types/schema";
import { fetchPageFeed, parsePostToProduct } from "./facebook-client";

/**
 * The Generator Engine 
 * Orchestrates fetching from FB and transforming to our Schema
 */

export async function generateSiteFromPage(
    pageId: string,
    accessToken: string,
    pageInfo: FacebookPage
): Promise<{ site: SiteConfig, products: Product[] }> {

    // 1. Fetch Feed
    const feedData = await fetchPageFeed(pageId, accessToken);

    // 2. Transform Posts to Products
    const products: Product[] = feedData.data
        .filter((post: FacebookPost) => post.full_picture) // Only posts with images
        .map((post: FacebookPost) => {
            const extracted = parsePostToProduct(post);
            return {
                id: extracted.id,
                facebookPostId: extracted.id,
                title: extracted.title,
                description: extracted.description || "",
                price: extracted.price || 0,
                currency: extracted.currency,
                images: extracted.images.filter(Boolean) as string[],
                inStock: true,
                category: "New Arrival", // Default category
                createdAt: post.created_time
            };
        });

    // 3. Create Site Config
    const siteConfig: SiteConfig = {
        id: pageId,
        subdomain: pageInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'), // Basic slugify
        name: pageInfo.name,
        description: `Welcome to the official website of ${pageInfo.name}.`,
        // In a real app, we'd fetch the Page's profile pic and cover photo here
        logoUrl: `https://graph.facebook.com/${pageId}/picture?type=large`,
        contact: {
            facebookUrl: `https://facebook.com/${pageId}`
        },
        theme: 'phnom-penh',
        themeConfig: {
            primaryColor: '#000000',
            secondaryColor: '#ffffff',
            fontFamily: 'Inter',
            borderRadius: '0.5rem'
        }
    };

    return { site: siteConfig, products };
}
