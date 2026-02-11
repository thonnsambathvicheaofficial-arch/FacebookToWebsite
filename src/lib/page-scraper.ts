
/**
 * Public Facebook Page Scraper
 * Extracts data from public Facebook pages without requiring authentication
 */

export interface ScrapedPageData {
    name: string;
    description: string;
    profileImageUrl: string;
    coverImageUrl: string;
    category: string;
    posts: ScrapedPost[];
    contact: {
        phone?: string;
        email?: string;
        website?: string;
        address?: string;
    };
}

export interface ScrapedPost {
    id: string;
    text: string;
    images: string[];
    timestamp: string;
    url: string;
}

/**
 * Extract Facebook Page ID from various URL formats
 * Supports:
 * - facebook.com/pagename
 * - facebook.com/pages/pagename/123456
 * - fb.com/pagename
 */
export function extractPageIdentifier(url: string): string | null {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;

        // Remove leading/trailing slashes
        const cleanPath = pathname.replace(/^\/|\/$/g, '');

        // Handle /pages/name/id format
        if (cleanPath.startsWith('pages/')) {
            const parts = cleanPath.split('/');
            return parts[parts.length - 1]; // Return the ID
        }

        // Handle direct page name
        const pageName = cleanPath.split('/')[0];
        return pageName || null;
    } catch (error) {
        return null;
    }
}

/**
 * Fetch public page data using Facebook's public endpoints
 * Note: This uses the public Graph API which doesn't require auth for public pages
 */
export async function scrapePublicPage(pageUrl: string): Promise<ScrapedPageData> {
    const pageIdentifier = extractPageIdentifier(pageUrl);

    if (!pageIdentifier) {
        throw new Error('Invalid Facebook page URL');
    }

    // Use Facebook's public Graph API (no auth required for public data)
    const fields = 'id,name,about,category,cover,picture,emails,phone,website,location';
    const apiUrl = `https://graph.facebook.com/v19.0/${pageIdentifier}?fields=${fields}&access_token=${process.env.FACEBOOK_APP_TOKEN || ''}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch page data. Make sure the page is public.');
        }

        const data = await response.json();

        // Fetch recent posts (public feed)
        const postsUrl = `https://graph.facebook.com/v19.0/${data.id}/posts?fields=id,message,full_picture,created_time,permalink_url&limit=20&access_token=${process.env.FACEBOOK_APP_TOKEN || ''}`;
        const postsResponse = await fetch(postsUrl);
        const postsData = await postsResponse.json();

        return {
            name: data.name,
            description: data.about || '',
            profileImageUrl: data.picture?.data?.url || '',
            coverImageUrl: data.cover?.source || '',
            category: data.category || 'Business',
            contact: {
                phone: data.phone,
                email: data.emails?.[0],
                website: data.website,
                address: data.location?.street || data.location?.city || '',
            },
            posts: (postsData.data || []).map((post: any) => ({
                id: post.id,
                text: post.message || '',
                images: post.full_picture ? [post.full_picture] : [],
                timestamp: post.created_time,
                url: post.permalink_url,
            })),
        };
    } catch (error) {
        console.error('Scraping error:', error);
        throw new Error('Unable to access this Facebook page. It may be private or the URL is incorrect.');
    }
}
