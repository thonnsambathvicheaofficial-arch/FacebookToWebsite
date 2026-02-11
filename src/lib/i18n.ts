
import enTranslations from "@/locales/en.json";
import kmTranslations from "@/locales/km.json";

export type Locale = "en" | "km";

const translations = {
    en: enTranslations.messages,
    km: kmTranslations.messages,
};

export function getTranslation(locale: Locale = "en") {
    return translations[locale] || translations.en;
}

// Helper function to get nested translation
export function t(locale: Locale, key: string): string {
    const trans = getTranslation(locale);
    const keys = key.split(".");
    let result: any = trans;

    for (const k of keys) {
        result = result?.[k];
    }

    return result || key;
}
