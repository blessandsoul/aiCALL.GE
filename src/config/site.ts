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
      "An AI phone operator for inbound calls and individually started outbound calls to approved Georgian +995 numbers. It can use a business's approved information, switch between Georgian, English and Russian, save a confirmed callback request, and optionally retain a recording and transcript. Bulk campaigns and workflow actions are on the roadmap and are not available yet.",
    serviceType: "AI phone operator for inbound and approved outbound business calls in Georgia",
    audienceName:
      "Clinics, dental practices, dealership service centres, beauty salons and delivery companies in Georgia",
    areaServed: "GE",
    knowsAbout: [
      "AI voice agent",
      "Inbound call automation",
      "Outbound calling",
      "Call recording and transcription",
      "Multilingual voice conversations",
      "Georgian language speech synthesis",
      "Georgian personal data protection law",
    ],
    features: [
      "Answers inbound calls on an assigned phone number using business-approved information",
      "Starts an approved individual outbound call to a Georgian +995 number",
      "Detects Georgian, English or Russian during the conversation and replies in the same language",
      "Lets the caller interrupt naturally while the AI is speaking",
      "Confirms and saves an inbound callback request with the caller's number and reason",
      "Optionally records the call with disclosure and keeps a timestamped transcript and private call history",
    ],
    boundary:
      "aiCALL is the phone only. An agent that answers customers on Messenger, Instagram, Viber or a website chat is aiSTAFF.ge. Automating the paperwork inside the company, the orders and documents and approvals, is aiOFFICE.ge.",
    limits: [
      "Bulk CSV campaigns, scheduled queues, automatic redial, voicemail handling, live human transfer, calendar or CRM actions, multiple phone numbers and advanced analytics are planned and are not available yet.",
      "Calls use short, fixed questions; open or uncertain questions go to a person instead of being guessed.",
      "Outbound calls currently start one at a time and only to Georgian +995 numbers. One call is limited to 10 minutes.",
      "aiNOW does not call a purchased or scraped list. Consent is required for direct marketing regardless of source. Written consent is specifically required when personal data beyond name, surname, address, phone and email are processed; aiNOW's launch policy asks for a written or electronic consent record before every marketing launch.",
      "aiNOW teams do not present another campaign's answer or confirmation rate as yours. An approved campaign produces its own measured outcomes.",
      "The agent never takes a card payment over the phone.",
    ],
    commitment:
      "Inbound and outbound calls start with approved information and rules. Outbound calls require an approved lawful contact basis. Recording is optional and is enabled only with the required disclosure.",
    summary:
      "aiCALL is an AI phone operator built by aiNOW in Tbilisi. Today it answers inbound calls, starts approved individual outbound calls to Georgian +995 numbers, uses business-approved information, switches between Georgian, English and Russian, saves confirmed callback requests, and can retain a disclosed recording and timestamped transcript. Bulk campaigns, scheduling, automatic retries, voicemail handling, live transfer, calendar and CRM actions, multiple numbers and advanced analytics are planned and are not available yet. Direct marketing calls require a lawful basis and the required consent record.",
  },
} as const;

export type SiteConfig = typeof SITE;
