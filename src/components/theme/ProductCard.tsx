
import { Product } from "@/types/schema";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";

interface ProductCardProps {
    product: Product;
    currencySymbol?: string;
}

export default function ProductCard({ product, currencySymbol = "$" }: ProductCardProps) {
    const formattedPrice = product.currency === "USD"
        ? `$${product.price.toFixed(2)}`
        : `${product.price.toLocaleString()} ៛`;

    return (
        <div className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-zinc-800">
            {/* Image Container */}
            <div className="relative aspect-square w-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                {product.images[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                        No Image
                    </div>
                )}

                {/* Quick Action Overlay (Desktop) */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm flex gap-2 justify-center">
                    <button className="p-2 rounded-full bg-black text-white hover:bg-zinc-800 transition-colors" title="Quick View">
                        <Eye size={18} />
                    </button>
                    <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors" title="Add to Cart">
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 min-h-[2.5rem]">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                        {formattedPrice}
                    </span>
                    {/* Mobile 'Buy' Button (visible distinct from hover overlay above) */}
                    <button className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white">
                        <ShoppingBag size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
