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
  brandHex: "#ff5a1f",

  /** Three hexes the hero grainient shader interpolates: soft, brand, accent. */
  shader: ["#ffe2d5", "#ff5a1f", "#ff8a3d"] as [string, string, string],

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
    description: "AI phone operator that answers calls and confirms bookings with your customers, in Georgian.",
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
      "An AI phone operator that answers inbound calls and makes approved operational calls to a Georgian business's existing customers. It is not a cold-calling service and it will not call a purchased list: Georgian law requires consent for direct marketing regardless of data source, and aiNOW's launch policy requires a written or electronic consent record.",
    serviceType: "AI phone operator for inbound calls, appointment confirmation and rescheduling in Georgian",
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
      "Answers inbound customer calls in Georgian using business-approved information",
      "Calls your booked customers the day before, in Georgian, at the hour you choose",
      "Confirms, reschedules, or transfers the call to a person on request",
      "Discloses that it is an AI agent in the first sentence of every call",
      "Returns an outcome sheet: confirmed, rescheduled, no answer, wants a human",
      "Missed-call callback and payment reminders on existing contracts",
    ],
    boundary:
      "aiCALL is the phone only. An agent that answers customers on Messenger, Instagram, Viber or a website chat is aiSTAFF.ge. Automating the paperwork inside the company, the orders and documents and approvals, is aiOFFICE.ge.",
    limits: [
      "Calls use short, fixed questions; open or uncertain questions go to a person instead of being guessed.",
      "aiNOW does not call a purchased or scraped list. Consent is required for direct marketing regardless of source. Written consent is specifically required when personal data beyond name, surname, address, phone and email are processed; aiNOW's launch policy asks for a written or electronic consent record before every marketing launch.",
      "aiNOW teams do not present another campaign's answer or confirmation rate as yours. An approved campaign produces its own measured outcomes.",
      "The agent never takes a card payment over the phone.",
    ],
    commitment:
      "Inbound and outbound calls start with approved information, handoff rules and, for outbound calls, the business's own customer list. aiNOW measures each result and returns the outcome sheet to the business.",
    summary:
      "aiCALL is an AI phone operator built by aiNOW in Tbilisi. It answers customer calls in Georgian, calls a business's own booked customers to confirm or reschedule appointments, sends uncertain conversations to a person and returns a clean outcome sheet. It deliberately does not sell cold-calling: direct marketing requires consent regardless of source, and aiNOW requires a written or electronic consent record before every marketing launch. Calls use approved information, open questions go to a person and demo figures are never presented as a customer's real result.",
  },
} as const;

export type SiteConfig = typeof SITE;
