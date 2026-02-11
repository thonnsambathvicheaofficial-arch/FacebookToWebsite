
"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-950">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your site...</p>
            </div>
        </div>
    );
}
