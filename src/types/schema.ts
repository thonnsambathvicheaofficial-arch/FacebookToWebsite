export type ThemeTemplate = 'phnom-penh' | 'siem-reap' | 'kampot';

export interface ThemeConfig {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
}

export interface SiteConfig {
    id: string;
    subdomain: string;
    customDomain?: string;
    name: string;
    description: string;
    logoUrl?: string;
    coverImageUrl?: string;
    contact: {
        phone?: string;
        email?: string;
        address?: string;
        facebookUrl?: string;
        telegramUrl?: string;
    };
    theme: ThemeTemplate;
    themeConfig: ThemeConfig;
}

export interface Product {
    id: string;
    facebookPostId?: string;
    title: string;
    description: string;
    price: number;
    currency: 'USD' | 'KHR';
    images: string[];
    category?: string;
    inStock: boolean;
    createdAt: string;
}
