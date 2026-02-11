import { Product, SiteConfig } from "@/types/schema";

export const MOCK_SITE_CONFIG: SiteConfig = {
    id: "site_123",
    subdomain: "khmer-silk",
    name: "Khmer Silk & Fashion",
    description: "Authentic Cambodian silk products, hand-woven by local artisans. Elegant, traditional, and timeless.",
    contact: {
        phone: "+855 12 345 678",
        email: "bunthoeun@example.com",
        address: "#123, Street 456, Toul Tom Poung, Phnom Penh",
        facebookUrl: "https://facebook.com/khmersilk",
        telegramUrl: "https://t.me/khmersilk"
    },
    theme: "phnom-penh",
    themeConfig: {
        primaryColor: "#0ea5e9", // Sky blue
        secondaryColor: "#64748b",
        fontFamily: "Inter",
        borderRadius: "0.5rem"
    }
};

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "prod_1",
        title: "Traditional Silk Scarf (Krama)",
        description: "Premium hand-woven silk scarf suitable for formal occasions. Available in multiple colors. 100% organic silk.",
        price: 25.00,
        currency: "USD",
        images: ["https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600"],
        inStock: true,
        category: "Accessories",
        createdAt: "2024-02-10T10:00:00Z"
    },
    {
        id: "prod_2",
        title: "Hol Pidan Wall Hanging",
        description: "Intricate ikat design depicting traditional Khmer motifs. Perfect for home decoration.",
        price: 150000,
        currency: "KHR",
        images: ["https://images.unsplash.com/photo-1598555836967-8e65af824707?auto=format&fit=crop&q=80&w=600"],
        inStock: true,
        category: "Home Decor",
        createdAt: "2024-02-09T14:30:00Z"
    },
    {
        id: "prod_3",
        title: "Silk Blouse - Lotus Pattern",
        description: "Elegant silk blouse with lotus flower patterns. Custom tailored fit.",
        price: 45.00,
        currency: "USD",
        images: ["https://images.unsplash.com/photo-1551232864-3f522368a987?auto=format&fit=crop&q=80&w=600"],
        inStock: true,
        category: "Clothing",
        createdAt: "2024-02-08T09:15:00Z"
    },
    {
        id: "prod_4",
        title: "Handmade Silver Box",
        description: "Pumpkin-shaped silver box handcrafted by Kampong Luong artisans. 90% silver.",
        price: 85.00,
        currency: "USD",
        images: ["https://images.unsplash.com/photo-1616016149206-e74f88e40428?auto=format&fit=crop&q=80&w=600"],
        inStock: false,
        category: "Souvenirs",
        createdAt: "2024-02-05T11:20:00Z"
    }
];
