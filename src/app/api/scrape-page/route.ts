
import { NextRequest, NextResponse } from "next/server";
import { scrapePublicPage } from "@/lib/page-scraper";
import { generateSiteFromScrapedData } from "@/lib/generator-v2";

export async function POST(req: NextRequest) {
    try {
        const { pageUrl } = await req.json();

        if (!pageUrl) {
            return NextResponse.json(
                { error: 'Facebook page URL is required' },
                { status: 400 }
            );
        }

        // Validate URL format
        if (!pageUrl.includes('facebook.com') && !pageUrl.includes('fb.com')) {
            return NextResponse.json(
                { error: 'Please provide a valid Facebook page URL' },
                { status: 400 }
            );
        }

        // Scrape the public page
        const scrapedData = await scrapePublicPage(pageUrl);

        // Generate site configuration from scraped data
        const { site, products } = generateSiteFromScrapedData(scrapedData, pageUrl);

        return NextResponse.json({
            success: true,
            site,
            products,
            message: `Successfully analyzed ${scrapedData.name}!`
        });

    } catch (error: any) {
        console.error('Scraping error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to analyze Facebook page' },
            { status: 500 }
        );
    }
}
