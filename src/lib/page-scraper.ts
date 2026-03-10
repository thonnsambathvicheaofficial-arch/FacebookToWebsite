
/**
 * Public Facebook Page Scraper
 * Extracts data from public Facebook pages without requiring authentication
 */

export interface ScrapedPageData {
    id?: string;
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
    rating?: {
        score: number;
        count: number;
    };
    hours?: any;
    location?: any;
    _method?: string;
}

export interface ScrapedPost {
    id: string;
    text: string;
    images: string[];
    timestamp: string;
    url: string;
    type?: string;
}

const FIELD_MAP = {
    name: 'name',
    about: 'about',
    cover: 'cover{source,id}',
    picture: 'picture.type(large){url,width,height}',
    posts: 'posts.limit(10){message,story,created_time,attachments{media,type}}',
    phone: 'phone',
    website: 'website',
    category: 'category,category_list',
    hours: 'hours',
    location: 'location,single_line_address',
    rating: 'overall_star_rating,rating_count'
};

/**
 * Extract Facebook Page ID from various URL formats
 * Supports:
 * - facebook.com/pagename
 * - facebook.com/pages/pagename/123456
 * - fb.com/pagename
 */
export function extractPageIdentifier(url: string): string | null {
    try {
        const input = url.trim();
        if (/^\d+$/.test(input)) return input;

        // Patterns from fb-scraper-tool.html
        const pats = [
            /facebook\.com\/pages\/[^/]+\/(\d+)/,
            /facebook\.com\/profile\.php\?id=(\d+)/,
            /(?:web\.|m\.|www\.)?facebook\.com\/([^/?#]+)/,
            /fb\.com\/([^/?#]+)/
        ];

        for (const p of pats) {
            const m = input.match(p);
            if (m && m[1] && !['groups', 'marketplace', 'events', 'watch', 'reels', 'share'].includes(m[1])) {
                return m[1];
            }
        }

        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Method 2: oEmbed + Meta API
 * Fetch embed metadata - Lightweight and reliable for basics
 */
async function scrapeOEmbed(pageUrl: string, appToken: string): Promise<ScrapedPageData | null> {
    try {
        const endpoint = `https://graph.facebook.com/v19.0/oembed_page`;
        const res = await fetch(`${endpoint}?url=${encodeURIComponent(pageUrl)}&access_token=${appToken}`);
        const data = await res.json();

        if (data.error) return null;

        return {
            name: data.provider_name === "Facebook" ? data.title : data.provider_name,
            description: data.html ? "Visit Facebook page to see more." : "",
            profileImageUrl: "", // oEmbed doesn't always provide direct images
            coverImageUrl: "",
            category: "Business",
            posts: [],
            contact: { website: pageUrl },
            _method: 'oembed'
        };
    } catch (e) {
        return null;
    }
}

/**
 * Method 3: Proxy HTML Scrape (OG Tags)
 * Extract basic info from public HTML
 */
async function scrapePublicMetadata(pageUrl: string): Promise<ScrapedPageData | null> {
    try {
        const response = await fetch(pageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });

        if (!response.ok) return null;

        const html = await response.text();

        // Helper to extract OG tags
        const og = (prop: string) => {
            const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]+)"`, 'i'));
            return m ? m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>') : null;
        };

        const title = og('og:title');
        const desc = og('og:description');
        const image = og('og:image');
        const url = og('og:url');

        if (!title) return null;

        return {
            name: title.replace(/ \| Facebook$/i, '').replace(/ - Home$/i, ''),
            description: desc || "",
            profileImageUrl: image || "",
            coverImageUrl: image || "", 
            category: "Business",
            posts: [],
            contact: {
                website: url || pageUrl
            },
            _method: 'html_og'
        };
    } catch (error) {
        return null;
    }
}

/**
 * Main Scraper: Cascades through Graph API -> oEmbed -> HTML Scrape
 */
export async function scrapePublicPage(pageUrl: string): Promise<ScrapedPageData> {
    const pageId = extractPageIdentifier(pageUrl);
    const appToken = process.env.FACEBOOK_APP_TOKEN || '';

    // Step 1: Try Official Graph API (Method 1)
    if (appToken && pageId) {
        try {
            const fields = Object.values(FIELD_MAP).join(',');
            const apiUrl = `https://graph.facebook.com/v19.0/${pageId}?fields=${fields}&access_token=${appToken}`;
            
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.error) {
                return {
                    id: data.id,
                    name: data.name,
                    description: data.about || '',
                    profileImageUrl: data.picture?.data?.url || '',
                    coverImageUrl: data.cover?.source || '',
                    category: data.category || 'Business',
                    contact: {
                        phone: data.phone,
                        email: data.emails?.[0],
                        website: data.website || pageUrl,
                        address: data.location?.single_line_address || '',
                    },
                    rating: data.overall_star_rating ? {
                        score: data.overall_star_rating,
                        count: data.rating_count
                    } : undefined,
                    hours: data.hours,
                    location: data.location,
                    posts: (data.posts?.data || []).map((post: any) => ({
                        id: post.id,
                        text: post.message || post.story || '',
                        images: post.attachments?.data?.map((a: any) => a.media?.image?.src).filter(Boolean) || 
                                (post.full_picture ? [post.full_picture] : []),
                        timestamp: post.created_time,
                        url: `https://facebook.com/${post.id}`,
                    })),
                    _method: 'graph_api'
                };
            }
            console.warn('Graph API failed, falling back...', data.error.message);
        } catch (e) {
            console.error('Graph API Error:', e);
        }
    }

    // Step 2: Try oEmbed (Method 2)
    if (appToken) {
        const oEmbedData = await scrapeOEmbed(pageUrl, appToken);
        if (oEmbedData) return oEmbedData;
    }

    // Step 3: Try HTML Metadata Scrape (Method 3)
    const fallbackData = await scrapePublicMetadata(pageUrl);
    if (fallbackData) return fallbackData;

    throw new Error('Unable to access this Facebook page. Please make sure it is a public business page and the URL is correct.');
}
