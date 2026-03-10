
import { ScrapedPageData } from "./page-scraper";
import { Product, SiteConfig } from "@/types/schema";
import { parsePostToProduct } from "./facebook-client";

/**
 * Generate site configuration from scraped Facebook page data
 */
export function generateSiteFromScrapedData(
    scrapedData: ScrapedPageData,
    pageUrl: string
): { site: SiteConfig; products: Product[] } {

    // Transform scraped posts to products
    const products: Product[] = scrapedData.posts
        .filter(post => post.images.length > 0) // Only posts with images
        .map(post => {
            // Use existing parser logic
            const extracted = parsePostToProduct({
                id: post.id,
                message: post.text,
                full_picture: post.images[0],
                created_time: post.timestamp,
                permalink_url: post.url,
            });

            return {
                id: extracted.id,
                facebookPostId: extracted.id,
                title: extracted.title,
                description: extracted.description || "",
                price: extracted.price || 0,
                currency: extracted.currency as 'USD' | 'KHR',
                images: post.images,
                inStock: true,
                category: "New Arrival",
                createdAt: post.timestamp,
            };
        });

    // Create site config
    const siteConfig: SiteConfig = {
        id: `site_${Date.now()}`,
        subdomain: scrapedData.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: scrapedData.name,
        description: scrapedData.description || `Welcome to ${scrapedData.name}`,
        logoUrl: scrapedData.profileImageUrl,
        coverImageUrl: scrapedData.coverImageUrl,
        contact: {
            phone: scrapedData.contact.phone,
            email: scrapedData.contact.email,
            address: scrapedData.contact.address,
            facebookUrl: pageUrl, // Store the original page URL
        },
        theme: 'phnom-penh',
        themeConfig: {
            primaryColor: '#0ea5e9',
            secondaryColor: '#64748b',
            fontFamily: 'Inter',
            borderRadius: '0.5rem',
        },
    };

    return { site: siteConfig, products };
}
