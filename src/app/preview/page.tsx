
import Navbar from "@/components/theme/Navbar";
import Hero from "@/components/theme/Hero";
import ProductCard from "@/components/theme/ProductCard";
import Footer from "@/components/theme/Footer";
import { MOCK_SITE_CONFIG, MOCK_PRODUCTS } from "@/lib/mock-data";

export default function PreviewPage() {
    const config = MOCK_SITE_CONFIG;
    const products = MOCK_PRODUCTS;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans">
            {/* Navigation */}
            <Navbar siteName={config.name} logoUrl={config.logoUrl} />

            <main>
                {/* Hero Section */}
                <Hero
                    title="Authentic Cambodian Silk"
                    description={config.description}
                    coverImage={config.coverImageUrl}
                />

                {/* Product Grid Section */}
                <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Featured Products
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            Discover our latest collection of hand-crafted items.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </section>

                {/* About Section (Placeholder) */}
                <section className="bg-white dark:bg-zinc-900 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Story</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Crafted with Love in Cambodia
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                We work directly with local artisans in Takeo and Kampong Cham to bring you the finest quality silk.
                                By purchasing from us, you are supporting sustainable livelihoods and preserving ancient traditions.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer config={config} />
        </div>
    );
}
