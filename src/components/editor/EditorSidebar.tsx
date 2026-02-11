
"use client";

import { useSite } from "@/context/site-context";
import { Copy, Eye, Palette, Rocket, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function EditorSidebar() {
    const { siteConfig, updateSiteConfig } = useSite();
    const [activeTab, setActiveTab] = useState<'theme' | 'info' | 'seo'>('info');

    return (
        <aside className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 z-50 flex flex-col shadow-lg">

            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="font-bold text-lg">Site Editor</h2>
                <div className="flex gap-2">
                    <Link href="/preview" target="_blank" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600 transition-colors" title="View Live">
                        <Eye size={18} />
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-zinc-800">
                <button
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'info' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Info
                </button>
                <button
                    onClick={() => setActiveTab('theme')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'theme' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Theme
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">

                {/* Info Tab */}
                {activeTab === 'info' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Site Name
                            </label>
                            <input
                                type="text"
                                value={siteConfig.name}
                                onChange={(e) => updateSiteConfig({ name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description
                            </label>
                            <textarea
                                value={siteConfig.description}
                                onChange={(e) => updateSiteConfig({ description: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={siteConfig.contact.phone || ""}
                                onChange={(e) => updateSiteConfig({ contact: { ...siteConfig.contact, phone: e.target.value } })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700"
                            />
                        </div>
                    </div>
                )}

                {/* Theme Tab */}
                {activeTab === 'theme' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Primary Color
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {['#0ea5e9', '#ef4444', '#22c55e', '#a855f7', '#f97316', '#000000'].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => updateSiteConfig({ themeConfig: { ...siteConfig.themeConfig, primaryColor: color } })}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${siteConfig.themeConfig.primaryColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Font Family
                            </label>
                            <select
                                value={siteConfig.themeConfig.fontFamily}
                                onChange={(e) => updateSiteConfig({ themeConfig: { ...siteConfig.themeConfig, fontFamily: e.target.value } })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-zinc-800 dark:border-zinc-700"
                            >
                                <option value="Inter">Inter (Clean)</option>
                                <option value="Battambang">Battambang (Khmer Standard)</option>
                                <option value="Siemreap">Siemreap (Traditional)</option>
                            </select>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-zinc-800 space-y-2">
                <button className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm">
                    <Rocket size={18} />
                    Publish Site
                </button>
                <button className="w-full flex justify-center items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md border border-gray-300 transition-colors shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-300">
                    <Settings size={18} />
                    Settings
                </button>
            </div>
        </aside>
    );
}
