
"use client";

import { SiteProvider } from "@/context/site-context";
import EditorPage from "@/components/editor/EditorPage";

export default function Page() {
    return (
        <SiteProvider>
            <EditorPage />
        </SiteProvider>
    );
}
