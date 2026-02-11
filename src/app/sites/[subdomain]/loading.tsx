
export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-950">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your site...</p>
            </div>
        </div>
    );
}
