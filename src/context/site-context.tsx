
"use client";

import { SiteConfig, Product } from "@/types/schema";
import { createContext, useContext, useState, ReactNode } from "react";
import { MOCK_SITE_CONFIG, MOCK_PRODUCTS } from "@/lib/mock-data";

interface SiteContextType {
    siteConfig: SiteConfig;
    products: Product[];
    updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
    updateProduct: (productId: string, updates: Partial<Product>) => void;
    // Let's add explicit 'toggle' functionality
    toggleProductStock: (productId: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
    const [siteConfig, setSiteConfig] = useState<SiteConfig>(MOCK_SITE_CONFIG);
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

    const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
        setSiteConfig((prev) => ({ ...prev, ...newConfig }));
    };

    const updateProduct = (productId: string, updates: Partial<Product>) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
        );
    };

    const toggleProductStock = (productId: string) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
        );
    };

    return (
        <SiteContext.Provider value={{
            siteConfig,
            products,
            updateSiteConfig,
            updateProduct,
            toggleProductStock
        }}>
            {children}
        </SiteContext.Provider>
    );
}

export function useSite() {
    const context = useContext(SiteContext);
    if (context === undefined) {
        throw new Error("useSite must be used within a SiteProvider");
    }
    return context;
}
