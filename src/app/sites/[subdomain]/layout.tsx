
import { MOCK_SITE_CONFIG } from "@/lib/mock-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { subdomain: string } }): Promise<Metadata> {
    const config = MOCK_SITE_CONFIG;
    return {
        title: `${config.name} | Official Store`,
        description: config.description,
        openGraph: {
            type: "website",
            title: config.name,
            description: config.description,
            images: [config.coverImageUrl || ""],
        },
        // Add mobile-specific meta tags here if not already global
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    // Apply theme-specific fonts and colors dynamically
    return (
        <div className={`font-${MOCK_SITE_CONFIG.themeConfig.fontFamily.toLowerCase()}`}>
            {children}
        </div>
    );
}
