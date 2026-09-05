import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { SITE } from '@/config/site';
import { BlogIndex } from '@/features/blog/components/BlogIndex';
import { getBlogLocales, getPosts } from '@/features/blog/lib/blog';
import { getBlogCopy } from '@/features/blog/lib/copy';
import { publishedRoute } from '@/features/product-pages/routes';
import { localeUrl } from '@/i18n/seo-locales';

type Props = { params: Promise<{ locale: string }> };

function blogAlternates(locale: string) {
  const languages: Record<string, string> = {};
  for (const available of getBlogLocales()) {
    languages[available] = localeUrl(available, '/blog');
  }
  const defaultAvailable = getBlogLocales()[0];
  if (defaultAvailable) languages['x-default'] = localeUrl(defaultAvailable, '/blog');
  return { canonical: localeUrl(locale, '/blog'), languages };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!publishedRoute('blog')) notFound();
  const { locale } = await params;
  if (getPosts(locale).length === 0) notFound();
  const copy = getBlogCopy(locale);
  const title = `${copy.pageTitle}: ${SITE.seo.serviceType}`;
  return {
    title,
    description: copy.subtitle,
    alternates: blogAlternates(locale),
    openGraph: {
      title,
      description: copy.subtitle,
      url: localeUrl(locale, '/blog'),
      type: 'website',
      images: [{ url: `${SITE.baseUrl}/og/landing-20260905.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description: copy.subtitle, images: [`${SITE.baseUrl}/og/landing-20260905.png`] },
  };
}

export default async function BlogPage({ params }: Props) {
  if (!publishedRoute('blog')) notFound();
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getPosts(locale);
  if (posts.length === 0) notFound();
  return <BlogIndex posts={posts} locale={locale} contentLocale={locale} />;
}
