import type { MetadataRoute } from "next";
import { getAvailableLocales, getPosts } from "@/features/blog/lib/api";
import { APP_DOMAIN, SITE_CONTENT_UPDATED } from "@/lib/constants/app.constants";

const BASE_URL = `https://${APP_DOMAIN}`;
const BUILD_DATE = new Date(SITE_CONTENT_UPDATED);
const INDEXED_LOCALES = ["ka", "en", "ru"] as const;
const STATIC_PATHS = ["", "/pricing", "/contact", "/integrations", "/security", "/blog", "/privacy", "/terms", "/refund"] as const;

function localeUrl(locale: string, path: string): string {
  return locale === "ka" ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`;
}

function languageMap(path: string): Record<string, string> {
  return Object.fromEntries([
    ...INDEXED_LOCALES.map((locale) => [locale, localeUrl(locale, path)]),
    ["x-default", localeUrl("ka", path)],
  ]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = STATIC_PATHS.flatMap((path) => INDEXED_LOCALES.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified: BUILD_DATE,
    changeFrequency: path === "/blog" ? "daily" as const : "monthly" as const,
    priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.7,
    alternates: { languages: languageMap(path) },
  })));

  const postsByLocale = new Map(await Promise.all(INDEXED_LOCALES.map(async (locale) => [locale, await getPosts(locale)] as const)));
  const slugs = [...new Set([...postsByLocale.values()].flatMap((posts) => posts.map((post) => post.slug)))];
  const blogPages = slugs.flatMap((slug) => {
    const locales = getAvailableLocales(slug).filter((locale): locale is typeof INDEXED_LOCALES[number] => INDEXED_LOCALES.includes(locale as typeof INDEXED_LOCALES[number]));
    const languages = Object.fromEntries([
      ...locales.map((locale) => [locale, localeUrl(locale, `/blog/${slug}`)]),
      ...(locales.includes("ka") ? [["x-default", localeUrl("ka", `/blog/${slug}`)]] : []),
    ]);
    return locales.map((locale) => {
      const post = postsByLocale.get(locale)?.find((item) => item.slug === slug);
      return {
        url: localeUrl(locale, `/blog/${slug}`),
        lastModified: post?.updated || post?.date ? new Date(post.updated || post.date) : BUILD_DATE,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages },
      };
    });
  });

  return [...staticPages, ...blogPages];
}
