
"use client";

import { useSite } from "@/context/site-context";
import { Eye } from "lucide-react";
import Navbar from "@/components/theme/Navbar";
import Hero from "@/components/theme/Hero";
import ProductCard from "@/components/theme/ProductCard";
import Footer from "@/components/theme/Footer";
import EditorSidebar from "@/components/editor/EditorSidebar";

export default function EditorPage() {
    const { siteConfig, products, toggleProductStock } = useSite();

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-zinc-950 font-sans">

            {/* Sidebar Editor */}
            <EditorSidebar />

            {/* Main Preview Area */}
            <main className="flex-1 ml-80 h-full overflow-y-auto relative">
                <Navbar siteName={siteConfig.name} logoUrl={siteConfig.logoUrl} />

                <Hero
                    title={siteConfig.name} // Dynamically update hero title as well
                    description={siteConfig.description}
                    coverImage={siteConfig.coverImageUrl}
                />

                {/* Product Grid Section */}
                <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Manage Products
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            Click the "Eye" icon to hide/show products on your live site.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {products.map((product) => (
                            <div key={product.id} className="relative group">
                                {/* Visual Indicator for Hidden Products */}
                                {!product.inStock && (
                                    <div className="absolute inset-0 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl pointer-events-none">
                                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            Hidden
                                        </span>
                                    </div>
                                )}

                                <ProductCard product={product} />

                                {/* Edit Controls Overlay */}
                                <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => toggleProductStock(product.id)}
                                        className={`p-2 rounded-full shadow-sm transition-colors ${!product.inStock ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-white text-gray-500 hover:text-blue-600'}`}
                                        title={product.inStock ? "Hide Product" : "Show Product"}
                                    >
                                        <Eye size={16} className={!product.inStock ? "line-through" : ""} />
                                    </button>
                                </div>
                            </div>
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

                <Footer config={siteConfig} />
            </main>
        </div>
    );
}
