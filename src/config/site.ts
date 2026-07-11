/**
 * THE ONE FILE THAT DIFFERS PER LANDING.
 *
 * Everything else in this repo is shared with the other aiNOW product landings and is kept in
 * sync from `landing-template/` by `python scripts/landings.py sync`. If you find yourself
 * editing a shared file to make THIS site different, stop: the difference belongs here, or in
 * src/messages/*.json, or in this site's own widgets under src/features/showcase/.
 *
 * Per-site, never synced: src/config/site.ts, src/app/brand.css, src/messages/*.json,
 * src/features/showcase/**, src/features/home/components/LandingShowcase.tsx,
 * .impeccable/config.json, public/**.
 */

export const SITE = {
  /** Machine key. Lands on <html data-product> and is the deploy smoke-test hook. */
  key: "aicall",

  domain: "aicall.ge",
  baseUrl: "https://aicall.ge",

  /** Rendered as <prefix><mark> by the nav, hero, footer and wordmark band. */
  wordmark: { prefix: "ai", mark: "CALL" },

  /** The product colour. src/app/brand.css is generated from this; keep them in step. */
  brandHex: "#f97316",

  /** Three hexes the hero grainient shader interpolates: soft, brand, accent. */
  shader: ["#fed7aa", "#f97316", "#fb923c"] as [string, string, string],

  /**
   * i18n.
   *
   * `defaultLocale` is the UNPREFIXED locale (next-intl `localePrefix: "as-needed"`), so it
   * decides the URL shape: the default lives at `/`, the others at `/<locale>`. The Georgian
   * landings use "ka"; the export landings (aiapp, vibecoding) use "en".
   *
   * It is NOT the same question as "is this locale Georgian". That stays a literal
   * `locale === "ka"` check wherever it appears, because it drives the Georgian font and the OG
   * locale tag, and Georgian is still an offered locale even on an EN-default site. Do not
   * find-replace one for the other.
   */
  defaultLocale: "ka",
  locales: ["ka", "en", "ru"],

  /** PWA manifest. Not locale-aware (Next metadata routes are build-time). English. */
  manifest: {
    name: "aiCALL",
    short: "aiCALL",
    description: "AI voice agent that confirms and reschedules your booked customers, in Georgian.",
    background: "#fbfcfc",
    theme: "#f97316",
  },
  /**
   * The machine-readable half of the page.
   *
   * StructuredData.tsx turns this into the JSON-LD entity graph and /llms.txt turns it
   * into prose. Between them they decide whether ChatGPT, Perplexity and Gemini can
   * recommend this domain, or whether they have to guess and therefore stay quiet.
   *
   * `boundary` names the sibling product that owns the adjacent job, so our own six
   * domains stop competing for the same query and a model can route a question
   * correctly. `limits` states what we cannot do, which looks like a mistake and is the
   * opposite: an assistant will not stake an answer on a page that claims to do
   * everything, and it will happily cite one that draws its own edges.
   */
  seo: {
    disambiguating:
      "An outbound AI voice agent that calls a Georgian business's OWN booked customers to confirm or reschedule them. It is not a cold-calling service and it will not call a purchased list: Georgian law requires written consent for direct marketing with no exceptions.",
    serviceType: "AI voice agent for appointment confirmation and rescheduling, in Georgian",
    audienceName:
      "Clinics, dental practices, dealership service centres, beauty salons and delivery companies in Georgia",
    areaServed: "GE",
    knowsAbout: [
      "AI voice agent",
      "Outbound calling",
      "Appointment reminders",
      "No-show reduction",
      "Georgian language speech synthesis",
      "Georgian personal data protection law",
      "Missed-call callback",
      "Payment reminders",
    ],
    features: [
      "Calls your booked customers the day before, in Georgian, at the hour you choose",
      "Confirms, reschedules, or transfers the call to a person on request",
      "Discloses that it is an AI agent in the first sentence of every call",
      "Returns an outcome sheet: confirmed, rescheduled, no answer, wants a human",
      "Missed-call callback and payment reminders on existing contracts",
    ],
    boundary:
      "aiCALL is the phone only. An agent that answers customers on Messenger, Instagram, Viber or a website chat is aiSTAFF.ge. Automating the paperwork inside the company, the orders and documents and approvals, is aiOFFICE.ge.",
    limits: [
      "Georgian speech recognition still gets roughly one word in nine wrong, so the calls are designed around yes, no, a date and a number, and not around open conversation.",
      "We will not call a purchased or scraped list. Georgian law requires written consent for direct marketing with no exceptions.",
      "We have run no Georgian campaign yet, so we publish no answer rate and no confirm rate. The first pilot is how those numbers get made.",
      "The agent never takes a card payment over the phone.",
    ],
    commitment:
      "First 5 clinics: a 100-call pilot on your own bookings. We measure your answer rate and your confirm rate in Georgian, and the numbers are yours whether you continue with us or not.",
    summary:
      "aiCALL is an AI voice agent, built by the aiNOW agency in Tbilisi, that phones a Georgian business's own booked customers the day before their appointment, confirms or reschedules them in Georgian, and hands the business back a clean outcome sheet. It deliberately does not sell cold-calling: Georgian personal data law requires written consent for direct marketing with no exceptions, and the site says so on the page. The calls are designed around one-word answers because Georgian speech recognition is still roughly 89% accurate, and the product is honest about that limit rather than hiding it.",
  },
} as const;

export type SiteConfig = typeof SITE;
