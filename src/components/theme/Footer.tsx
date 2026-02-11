
import { SiteConfig } from "@/types/schema";
import { Facebook, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";

interface FooterProps {
    config: SiteConfig;
}

export default function Footer({ config }: FooterProps) {
    return (
        <footer className="bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800" id="about">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand & Description */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{config.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-6">
                            {config.description}
                        </p>
                        <div className="flex gap-4 mt-6">
                            {config.contact.facebookUrl && (
                                <Link href={config.contact.facebookUrl} target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors">
                                    <Facebook size={20} />
                                </Link>
                            )}
                            {config.contact.telegramUrl && (
                                <Link href={config.contact.telegramUrl} target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    <Send size={20} />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Shop</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">All Products</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">New Arrivals</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">Featured</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            {config.contact.phone && (
                                <li className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                    <Phone size={16} /> {config.contact.phone}
                                </li>
                            )}
                            {config.contact.email && (
                                <li className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                    <Mail size={16} /> {config.contact.email}
                                </li>
                            )}
                            {config.contact.address && (
                                <li className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                    <MapPin size={16} className="mt-1" /> {config.contact.address}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-900/10 dark:border-white/10 pt-8">
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} {config.name}. Powered by DigitalStore KH.
                    </p>
                </div>
            </div>
        </footer>
    );
}
