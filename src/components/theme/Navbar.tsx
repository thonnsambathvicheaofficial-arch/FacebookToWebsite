
import Link from "next/link";
import { ShoppingCart, Menu, Search } from "lucide-react";

interface NavbarProps {
    siteName: string;
    logoUrl?: string;
}

export default function Navbar({ siteName, logoUrl }: NavbarProps) {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo / Brand */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        {logoUrl ? (
                            <img className="h-8 w-8 rounded-full object-cover" src={logoUrl} alt={siteName} />
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                {siteName.charAt(0)}
                            </div>
                        )}
                        <Link href="/" className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                            {siteName}
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="#" className="text-gray-900 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                            <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Products</Link>
                            <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
                            <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800">
                            <Search size={20} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 relative">
                            <ShoppingCart size={20} />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full"></span>
                        </button>
                        {/* Mobile Start Menu */}
                        <button className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
