/**
 * Utility to fetch data from Facebook Graph API
 */

const GRAPH_API_VERSION = "v19.0";
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

export async function fetchUserPages(accessToken: string) {
    const response = await fetch(`${BASE_URL}/me/accounts?access_token=${accessToken}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pages');
    }
    return response.json();
}

export async function fetchPageFeed(pageId: string, pageAccessToken: string) {
    // Fetch posts with fields relevant for product extraction
    const fields = "id,message,permalink_url,created_time,full_picture,attachments{media}";
    const url = `${BASE_URL}/${pageId}/feed?fields=${fields}&access_token=${pageAccessToken}&limit=20`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch page feed');
    }
    return response.json();
}

export function parsePostToProduct(post: any) {
    // Extract price and title from message
    const lines = post.message?.split('\n') || [];
    const title = lines[0] || "Untitled Product";

    // Basic heuristic for price
    const priceRegex = /(\$|USD|៛)\s?(\d+(\.\d{1,2})?)/i;
    let price = null;
    let currency = "USD";

    if (post.message) {
        const match = post.message.match(priceRegex);
        if (match) {
            currency = match[1] === "៛" ? "KHR" : "USD";
            price = parseFloat(match[2]);
        }
    }

    return {
        id: post.id,
        title,
        price,
        currency,
        description: post.message,
        images: [post.full_picture], // Simplified for now
        originalUrl: post.permalink_url
    };
}
