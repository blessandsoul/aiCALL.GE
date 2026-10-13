import { getTranslations } from "next-intl/server";
import { ServiceSchema } from "./ServiceSchema";
import { BreadcrumbSchema } from "./BreadcrumbSchema";

const SERVICES_LABEL: Record<string, string> = {
  ka: "სერვისები",
  en: "Services",
  ru: "Услуги",
  de: "Services",
};

type Offer = {
  name: string;
  price: string;
  priceCurrency?: string;
  unitText?: string;
};

type Props = {
  locale: string;
  namespace?: string;
  copy?: { title: string; description: string };
  siteName?: string;
  siteUrl?: string;
  path: string;
  serviceType: string;
  offers?: Offer[];
};

export async function ServiceSchemaForPage({
  locale,
  namespace,
  copy,
  siteName = "aiNOW",
  siteUrl = "https://ainow.ge",
  path,
  serviceType,
  offers,
}: Props) {
  const t = namespace ? await getTranslations({ locale, namespace }) : undefined;
  const title = copy?.title ?? t?.("title") ?? "";
  const description = copy?.description ?? t?.("description") ?? "";
  const normalizedSiteUrl = siteUrl.replace(/\/$/u, "");
  const base = locale === "ka" ? normalizedSiteUrl : `${normalizedSiteUrl}/${locale}`;
  const url = `${base}${path}`;

  const crumbs = [{ name: siteName, item: base || normalizedSiteUrl }];
  if (path.startsWith("/services/")) {
    crumbs.push({ name: SERVICES_LABEL[locale] ?? "Services", item: `${base}/services` });
  }
  crumbs.push({ name: title, item: url });

  return (
    <>
      <ServiceSchema
        name={title}
        description={description}
        url={url}
        serviceType={serviceType}
        siteName={siteName}
        siteUrl={normalizedSiteUrl}
        offers={offers}
      />
      <BreadcrumbSchema crumbs={crumbs} />
    </>
  );
}
