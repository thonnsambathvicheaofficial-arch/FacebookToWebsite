"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Loader2, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [pageUrl, setPageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/scrape-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze page");
      }

      // Store the generated site data in sessionStorage for the editor
      sessionStorage.setItem("generatedSite", JSON.stringify(data));

      // Redirect to editor
      router.push("/editor");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-black dark:to-zinc-900">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Turn Your Facebook Page<br />Into a <span className="text-blue-600">Professional Website</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Built for Cambodian businesses. No coding required.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-zinc-700">

          {!session ? (
            <div className="space-y-8">

              {/* Option 1: Paste URL */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold">
                    1
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Paste Your Facebook Page URL
                  </h2>
                </div>

                <form onSubmit={handleUrlSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Facebook Page URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="url"
                        value={pageUrl}
                        onChange={(e) => setPageUrl(e.target.value)}
                        placeholder="https://facebook.com/yourpage"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Analyzing page...
                      </>
                    ) : (
                      "Generate Website"
                    )}
                  </button>
                </form>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-zinc-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-zinc-800 text-gray-500">OR</span>
                </div>
              </div>

              {/* Option 2: Facebook Login */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold">
                    2
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Connect with Facebook
                  </h2>
                </div>

                <button
                  onClick={() => signIn('facebook')}
                  className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </button>
                <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
                  We'll access your pages to generate your website
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="Avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">{session.user?.name}</p>
                  <p className="text-sm text-gray-500">Connected</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Select a Page to Continue
                </button>
                <button
                  onClick={() => signOut()}
                  className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Instant Setup</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generate your site in seconds</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Mobile-First</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for Cambodian networks</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-2">🇰🇭</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Khmer Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Full Unicode Khmer rendering</p>
          </div>
        </div>
      </div>
    </main>
  );
}
