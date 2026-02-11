
import { MOCK_SITE_CONFIG, MOCK_PRODUCTS } from "@/lib/mock-data";
import Navbar from "@/components/theme/Navbar";
import Hero from "@/components/theme/Hero";
import ProductCard from "@/components/theme/ProductCard";
import Footer from "@/components/theme/Footer";

// Force static generation for demo purposes, 
// in prod this would pull from DB based on params
export async function generateStaticParams() {
    return [{ subdomain: "khmer-silk" }];
}

export default function SitePage({ params }: { params: { subdomain: string } }) {
    // In a real app, we fetch site config by subdomain from DB
    const siteConfig = MOCK_SITE_CONFIG;
    const products = MOCK_PRODUCTS;

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
            <Navbar siteName={siteConfig.name} logoUrl={siteConfig.logoUrl} />

            <main>
                <Hero
                    title={siteConfig.name}
                    description={siteConfig.description}
                    coverImage={siteConfig.coverImageUrl}
                />

                <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Featured Products
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currencySymbol={product.currency === 'KHR' ? '៛' : '$'}
                            />
                        ))}
                    </div>
                </section>
            </main>

            <Footer config={siteConfig} />
        </div>
    );
}
