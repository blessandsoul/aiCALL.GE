export type AiNowHomeLocale = "ka" | "en" | "ru" | "de" | "tr" | "fa" | "zh";

export type HomeProblemId = "chats" | "calls" | "content" | "website";
export type HomeCategoryId = "communication" | "marketing" | "internal" | "products";
export type HomeIndustryId = "healthcare" | "horeca" | "real-estate" | "ecommerce" | "auto" | "legal";
export type HomeFaqCategory = "all" | "pricing" | "tech" | "safety";

type ProductCopy = Record<string, string>;

export interface AiNowHomeCopy {
  productLabels: ProductCopy;
  nav: {
    products: string;
    customerCommunication: string;
    marketingContent: string;
    internalOperations: string;
    webApps: string;
    specializedSolutions: string;
    operations: string;
    growth: string;
    resources: string;
    resourcesBlog: string;
    capabilities: string;
    architecture: string;
    pricing: string;
    contact: string;
    consultation: string;
    themeLight: string;
    themeDark: string;
    themeToggle: string;
    menuOpen: string;
    menuClose: string;
    productDescriptions: ProductCopy;
    resourceItems: Record<string, { title: string; subtitle: string }>;
  };
  banner: Record<string, string>;
  hero: { titleLine1: string; titleLine2: string; description: string; primaryCta: string; catalogCta: string; hint: string };
  ecosystemHub: {
    satellites: Record<string, { title: string; subtitle: string; alt: string }>;
    centerSubtitle: string;
    badge: string;
  };
  comparison: {
    title: string;
    description: string;
    action: string;
    labels: { inspect: string; firstStep: string; ask: string };
    problems: Record<HomeProblemId, {
      question: string;
      description: string;
      detailHeading: string;
      firstStep: string;
      solution: string;
      builds: string[];
      materials: string;
    }>;
  };
  categories: {
    title: string;
    description: string;
    items: Record<HomeCategoryId, { title: string; subtitle: string; products: ProductCopy }>;
  };
  industries: {
    eyebrow: string;
    title: string;
    description: string;
    items: Record<HomeIndustryId, { title: string; tag: string; description: string; action: string; points: string[] }>;
  };
  process: { title: string; description: string; steps: Array<{ title: string; description: string }> };
  architecture: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
    principle: string;
    rule: string;
    specs: Array<{ title: string; description: string }>;
  };
  team: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    names: { andro: string; nika: string; giorgi: string };
    roles: { founder: string; commercial: string; businessDevelopment: string };
    location: string;
    year: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    filters: Record<HomeFaqCategory, string>;
    searchLabel: string;
    searchPlaceholder: string;
    questionPrefix: string;
    calloutTitle: string;
    calloutAction: string;
    items: Record<string, { question: string; answer: string }>;
  };
  clientFit: { title: string; description: string; ariaLabel: string; signals: string[]; notForTitle: string; notForDescription: string; uncertain: string };
  closingCta: { title: string; description: string; successPrefix: string; checks: string[] };
  footer: {
    tagline: string;
    description: string;
    action: string;
    products: string;
    industries: string;
    resources: string;
    language: string;
    legal: string;
    blog: string;
    howWeStart: string;
    faq: string;
    sendTask: string;
    email: string;
    privacy: string;
    terms: string;
    location: string;
    rights: string;
    backToTop: string;
    industryLinks: string[];
  };
}

const familyProductLabels = {
  aichats: "Customer messaging",
  aicall: "AI phone operations",
  aicontent: "AI content",
  aiweb: "Websites and web products",
  aistaff: "AI specialist recruitment",
  iai: "Process coordination",
};

const en: AiNowHomeCopy = {
  productLabels: familyProductLabels,
  nav: {
    products: "Products",
    customerCommunication: "Customer communication",
    marketingContent: "Marketing and content",
    internalOperations: "Internal operations",
    webApps: "Websites and apps",
    specializedSolutions: "Coordination and specialist solutions",
    operations: "Operational AI",
    growth: "Growth and marketing",
    resources: "Resources",
    resourcesBlog: "Resources and blog",
    capabilities: "Capabilities",
    architecture: "Architecture",
    pricing: "Pricing",
    contact: "Contact",
    consultation: "Consultation",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    themeToggle: "Toggle theme",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    productDescriptions: {
      aichats: "Customer messaging",
      aicall: "Inbound and approved outbound voice operations",
      aistaff: "Real AI specialists for your company",
      aicontent: "AI video and advertising creative",
      aiads: "Meta and Google ad management",
      aimusic: "Music and audio for your brand",
      aibrain: "Company knowledge and rules in one place",
      aioffice: "Tasks, documents and internal workflows",
      aidocs: "Document processing and review",
      aiweb: "Websites and web products",
      aiapp: "Mobile apps for business",
      vibecoding: "Secure application development",
      iai: "Process coordination",
      aijurist: "Legal research and document drafts",
      aitaxi: "Taxi-fleet operations management",
    },
    resourceItems: {
      blog: { title: "Blog", subtitle: "Call workflows, limits and examples" },
      architecture: { title: "Architecture", subtitle: "How a bounded call workflow is built" },
      updates: { title: "Updates", subtitle: "Product and scope updates" },
      industries: { title: "Industries", subtitle: "Call workflows by sector" },
    },
  },
  banner: {
    aichats: "Customer messaging management",
    aicall: "Voice AI for inbound calls and approved outbound work",
    aicontent: "Advertising video and business content",
    aiads: "Meta and Google advertising management",
    aistaff: "Real AI specialists for your company",
    airadar: "Market and reputation monitoring",
    aiweb: "Business websites and applications",
    iai: "Process coordination",
  },
  hero: {
    titleLine1: "Customers call.",
    titleLine2: "AI answers.",
    description: "aiCALL answers customer calls and can call existing customers for an agreed task. We confirm the scenario and business information with you before setup.",
    primaryCta: "Start a pilot",
    catalogCta: "See indicative pricing",
    hint: "Begin with one call task and the rules behind it.",
  },
  ecosystemHub: {
    satellites: {
      chats: { title: "Inbound", subtitle: "Answer customer calls", alt: "Inbound customer calls" },
      calls: { title: "Outbound", subtitle: "Approved customer follow-up", alt: "Approved outbound calls" },
      content: { title: "Rules", subtitle: "Context, script and limits", alt: "Call rules and context" },
      apps: { title: "Outcome", subtitle: "Booking · order · follow-up", alt: "Confirmed call outcome" },
    },
    centerSubtitle: "AI calls for business",
    badge: "From a call objective to a recorded outcome ⤴",
  },
  comparison: {
    title: "Where are calls being lost?",
    description: "Choose the call moment you recognise.",
    action: "Discuss a call task",
    labels: { inspect: "What we will clarify", firstStep: "First step", ask: "What we need from you" },
    problems: {
      chats: { question: "Do customers call when your team is busy?", description: "Questions, booking requests and orders still need an answer when the usual operator is unavailable.", detailHeading: "A missed call is a workflow problem", firstStep: "We choose one common incoming call and write the greeting, questions and result.", solution: "Without a clear call flow, the same request gets different answers and the next action can be lost.", builds: ["Which incoming calls aiCALL will answer.", "What the caller needs to learn or confirm.", "When the call should stop or move to a person.", "What result should be recorded after the call."], materials: "Your greeting, business information, sample calls and human follow-up rules." },
      calls: { question: "Do follow-up calls depend on one person?", description: "Existing customers may need a reminder, confirmation or delivery call, but the task stays on someone's list.", detailHeading: "An outbound task needs a clear objective", firstStep: "We define the customer list, purpose, script boundaries and what counts as a connected call.", solution: "Outbound calls need permission, timing and a clear result; this does not by itself mean a batch campaign or automatic retries.", builds: ["Which existing customers may be called.", "What the call should accomplish.", "What information the voice agent may use.", "What status remains after an answer or no answer."], materials: "The customer list, purpose, script, timing and escalation rules." },
      content: { question: "Do call results disappear after the conversation?", description: "A booking, order, callback or survey answer is easy to lose when no one records the result.", detailHeading: "The outcome matters after the call", firstStep: "We define the result fields and test one call from greeting to recorded outcome.", solution: "A transcript alone is not the business result; the workflow needs a confirmed, postponed or unanswered status.", builds: ["Which result the call should capture.", "What the caller must confirm.", "What gets written to call history.", "Who reviews exceptions or uncertain answers."], materials: "Your result fields, status rules, sample calls and the person responsible for exceptions." },
      website: { question: "Need voice AI but unsure what it should do?", description: "The phone channel is clear, but the first call task, connected system and boundaries are not.", detailHeading: "Start with one call task", firstStep: "We scope one real scenario, then confirm the language, phone setup, information and result fields.", solution: "A focused pilot makes the call behavior testable before the scope grows.", builds: ["What the first call task is.", "Which language and business information apply.", "Which tools or handoffs are actually available.", "How the result will be checked."], materials: "The first call scenario, business information, phone requirements and review criteria." },
    },
  },
  categories: {
    title: "Choose the first call task",
    description: "aiCALL is shaped around a concrete incoming or agreed outgoing call task. We confirm the language, phone setup, connected tools and any extra capacity separately.",
    items: {
      communication: { title: "Inbound call operations", subtitle: "Answer questions, bookings and orders with a clear call flow.", products: { aichats: "Questions within the agreed call flow", aicall: "Inbound answers, bookings and orders" } },
      marketing: { title: "Agreed outbound work", subtitle: "Use existing-customer lists for reminders, deliveries, payments or surveys.", products: { aicontent: "Calls to existing customers for an agreed task", aiads: "Approved reminder conversations", aimusic: "Approved delivery conversations", aicall: "Reminder and delivery calls" } },
      internal: { title: "Call rules and follow-up", subtitle: "Define the information, recording choices, outcomes and point for human review.", products: { aistaff: "Business context and call rules", aibrain: "Georgian, English and Russian wording", aioffice: "Confirmed, postponed or unanswered status", aidocs: "Uncertain cases need human follow-up", aicall: "Call history and exception review" } },
      products: { title: "Connected call workflows", subtitle: "Start with the phone setup and tools the scenario actually needs.", products: { aiweb: "Assigned number and initial setup", aiapp: "One included inbound channel; extras by approval", vibecoding: "Plan, setup and usage confirmed before purchase", aicall: "Recorded booking or order details" } },
    },
  },
  industries: {
    eyebrow: "Your field has its own call rules",
    title: "One voice workflow cannot fit every business",
    description: "Objectives, information, language and human review points vary by industry, so define the scenario before setup.",
    items: {
      healthcare: { title: "Clinics and appointment desks", tag: "Health and beauty", description: "Patients call for appointments, preparation details and follow-up.", action: "Discuss a clinic call", points: ["Service, clinician and appointment information guide answers.", "You decide which information the agent should use.", "Bookings and callbacks are recorded as defined.", "Medical advice stays with your clinical team."] },
      horeca: { title: "Restaurants and HoReCa", tag: "Restaurants and food", description: "Guests call about tables, menus, hours and group requests.", action: "Discuss a restaurant call", points: ["Menus, allergens and hours follow your rules.", "Booking details are defined before the call flow starts.", "Terrace, dining room and group requests can have separate rules.", "Your team handles special or uncertain requests."] },
      "real-estate": { title: "Real estate and development", tag: "Real estate", description: "Buyers call about properties, budgets and viewing requests.", action: "Discuss a real-estate call", points: ["Property, price and availability come from the information you provide.", "Budget, area and timing become clear questions.", "Viewing requests are recorded under the agreed path.", "Your specialist reviews complex financial or legal questions."] },
      ecommerce: { title: "E-commerce and retail", tag: "Online store", description: "Buyers call about products, orders, delivery and returns.", action: "Discuss an online-store call", points: ["Product and delivery answers follow your catalogue.", "Order details are captured as separate fields.", "Payment and return questions follow defined boundaries.", "The responsible team member handles exceptions."] },
      auto: { title: "Auto service and detailing", tag: "Auto service", description: "Vehicle owners call about service, price and available time.", action: "Discuss an auto-service call", points: ["Make, model and job type are identified in the first questions.", "Prices and service terms follow your rate card.", "Bay and time requests are recorded under agreed rules.", "Your technician handles complex diagnostics."] },
      legal: { title: "Legal and professional services", tag: "Professional services", description: "Clients call to explain a matter and ask what happens next.", action: "Discuss a professional call", points: ["Issue type and deadlines are clarified without giving advice outside the agreed scope.", "The required information and document path follow your process.", "Your specialist reviews confidential or uncertain matters.", "A call record remains working material until a person reviews it."] },
    },
  },
  process: { title: "How we set up your voice agent", description: "Before setup, we define the scenario, the information the call may use, the phone path and how to check the result.", steps: [{ title: "Scope the call", description: "Choose one incoming or agreed outgoing objective, languages, inputs, boundaries and result." }, { title: "Configure and test", description: "Set up the number and call flow, connect available tools where needed, and test representative calls." }, { title: "Operate and review", description: "Run within the agreed scope, review call history and outcomes, and change the workflow through the agreed process." }] },
  architecture: { eyebrow: "Voice operations with control", title: "Your call rules, your approval", description: "aiCALL uses the business information and instructions you provide. We separate incoming and outgoing objectives, confirm connected tools and decide when a person must review a call.", action: "Discuss call setup and controls", principle: "Principle", rule: "● Your approval", specs: [{ title: "Use the information your team provides", description: "Greetings, services, prices, hours and terms come from the material you choose for the call." }, { title: "Separate incoming and outgoing objectives", description: "Answering incoming calls and calling existing customers are scoped as different tasks." }, { title: "Define what the call must achieve", description: "Bookings, orders, reminders, deliveries, payments and surveys each need a clear result." }, { title: "Review uncertain conversations", description: "Complex or uncertain calls follow the human-review path available for the agreed plan; it is not universal." }, { title: "Record only the history you choose", description: "Recording, transcripts and call history depend on the plan and settings; confirm them before use." }, { title: "Keep capacity and connections explicit", description: "The number of parallel channels, connected tools and APIs is agreed separately for the selected plan." }] },
  team: { eyebrow: "Our role", title: "A focused voice workflow for real business work", paragraphs: ["We are aiNOW, a Tbilisi team building AI systems for real business work.", "For aiCALL, we clarify the scenario, the information, phone setup and review path before a pilot.", "From the start, the call objective, result and human responsibility stay visible."], names: { andro: "Andro Kasparov", nika: "Nika Skhirtladze", giorgi: "Giorgi Darbaiseli" }, roles: { founder: "Founder", commercial: "Commercial director", businessDevelopment: "Business Development Director" }, location: "Tbilisi, Georgia", year: "2026" },
  faq: { eyebrow: "[Answers to common questions]", title: "Questions about aiCALL", description: "Short answers about aiCALL's call tasks, controls, pricing and limits.", filters: { all: "All", pricing: "Price and scope", tech: "Starting and call flow", safety: "Data and control" }, searchLabel: "Search questions", searchPlaceholder: "Find a question...", questionPrefix: "Question", calloutTitle: "Still have a specific call task?", calloutAction: "Describe the scenario", items: { q1: { question: "What is aiCALL?", answer: "aiCALL is an AI voice agent for incoming calls and agreed outgoing calls for bookings, orders, reminders, deliveries, payments and surveys." }, q2: { question: "Can aiCALL answer incoming calls?", answer: "aiCALL can answer incoming calls. We first confirm the number, expected volume and setup for your scenario." }, q3: { question: "Can it call existing customers?", answer: "Yes, for a defined objective such as a reminder or confirmation. We define the customer list, purpose and call flow first; batch campaigns and automatic retries depend on the selected plan." }, q4: { question: "Which languages does it support?", answer: "aiCALL can be prepared for Georgian, Russian and English. We check the exact script and scenario before launch so the language and terminology fit your business." }, q5: { question: "What information does it use?", answer: "It uses the business information and instructions you provide: greetings, services, prices, hours, order or booking rules and other material." }, q6: { question: "Can it capture bookings or orders?", answer: "aiCALL can record a confirmed booking, order, reminder, delivery, payment or survey outcome when that result is part of the agreed call task. We define the fields and destination during setup." }, q7: { question: "Does it transfer calls to a person?", answer: "If you need live transfer to your team, we first confirm whether your plan and phone setup support it. The handoff route and the situations that require a person are agreed before launch." }, q8: { question: "Does it include a knowledge base?", answer: "Knowledge-base support depends on the selected plan and setup. We confirm what information aiCALL can use and how it will be updated before launch." }, q9: { question: "Can it run batch call campaigns or retries?", answer: "Batch campaigns, scheduling and automatic retries depend on the selected plan and setup. We define the call list, timing and retry rules before enabling them; capacity beyond the agreed scope is not assumed." }, q10: { question: "What happens after a call?", answer: "After the call, the agreed result can be recorded as confirmed, postponed or unanswered. If enabled, the transcript and call history are saved; the follow-up path is defined with you." }, q11: { question: "Are recording and transcripts included?", answer: "Recording, transcripts and call history may depend on the plan and settings. Confirm consent, retention and the selected plan before enabling them." }, q12: { question: "Can it connect a calendar, CRM or API?", answer: "Calendar and CRM actions, API and webhooks depend on the selected plan and setup. We confirm each connection and its permitted actions before launch." }, q13: { question: "How are incoming and outgoing calls billed?", answer: "The pricing page lists no separate per-minute charge for inbound minutes. The monthly plan, phone setup and outgoing usage are quoted separately." }, q14: { question: "What fees should I expect?", answer: "We quote the monthly plan, one-time phone setup and usage separately before you decide. Extra channels or connected tools are confirmed for the selected plan." }, q15: { question: "How do I start a pilot?", answer: "Start with one call objective, business information, languages, phone requirements and the result you want to check. We confirm scope, fees and next steps before work starts; the result is measured in the agreed way." } } },
  clientFit: { title: "Who aiCALL is for", description: "For businesses with a repeatable incoming or agreed outgoing call task and a clear result to track.", ariaLabel: "Who aiCALL is for", signals: ["Your team misses calls or follow-up tasks.", "You can describe the business information and call objective.", "You can specify where a person must review or take over.", "You are ready to test one scenario before expanding scope."], notForTitle: "aiCALL may not be right if...", notForDescription: "You need an untested connection, an automatic outbound campaign or a business result before a scenario has been tested.", uncertain: "Not sure which call task to start with? Describe one real scenario." },
  closingCta: { title: "Start with one call task", description: "Tell us which calls you want to answer or make, what the agent may say, and what outcome it must record. We will confirm the phone setup, scope and indicative fees before purchase.", successPrefix: "Thank you! Your request has been received.", checks: ["We define the call objective and business information first.", "We separate phone setup, plan scope and usage-related fees.", "We confirm any human handoff before presenting it as part of the setup."] },
  footer: { tagline: "Consulting. Technology. Voice workflows.", description: "aiCALL is aiNOW's voice-agent product for incoming calls and agreed outgoing call tasks.", action: "Start a pilot", products: "Products", industries: "Industries", resources: "Resources", language: "Language", legal: "Legal and security", blog: "Blog", howWeStart: "How we start", faq: "Questions and answers", sendTask: "Discuss your calls", email: "Email us", privacy: "Privacy", terms: "Terms of service", location: "Tbilisi, Georgia", rights: "All rights reserved.", backToTop: "Back to top ↑", industryLinks: ["Clinics and aesthetics", "Restaurants and HoReCa", "Real estate and development", "E-commerce and retail", "Auto service and detailing", "Legal and professional services"] },
};

const ka: AiNowHomeCopy = {
  ...en,
  productLabels: { ...en.productLabels, aicall: "ხმოვანი AI ოპერაციები" },
  nav: { ...en.nav, products: "პროდუქტები", customerCommunication: "კლიენტებთან კომუნიკაცია", marketingContent: "მარკეტინგი და კონტენტი", internalOperations: "შიდა პროცესები", webApps: "საიტები და აპები", specializedSolutions: "სპეციალური გადაწყვეტილებები", operations: "ყოველდღიური ოპერაციები", growth: "ზრდა და მარკეტინგი", resources: "რესურსები", resourcesBlog: "რესურსები და ბლოგი", capabilities: "შესაძლებლობები", architecture: "არქიტექტურა", pricing: "ფასები", contact: "კონტაქტი", consultation: "კონსულტაცია", themeLight: "ნათელ თემაზე გადართვა", themeDark: "ბნელ თემაზე გადართვა", themeToggle: "თემის გადართვა", menuOpen: "მენიუს გახსნა", menuClose: "მენიუს დახურვა", productDescriptions: { ...en.nav.productDescriptions, aichats: "კლიენტებთან მიმოწერა", aicall: "შემომავალი და დამტკიცებული გამავალი ზარები" }, resourceItems: { blog: { title: "ბლოგი", subtitle: "ზარები, წესები და პრაქტიკული მაგალითები" }, architecture: { title: "არქიტექტურა", subtitle: "როგორ იგეგმება კონტროლირებადი ზარის პროცესი" }, updates: { title: "განახლებები", subtitle: "პროდუქტისა და მასშტაბის ცვლილებები" }, industries: { title: "სფეროები", subtitle: "ზარის სცენარები სხვადასხვა სფეროში" } } },
  banner: { ...en.banner, aicall: "ხმოვანი AI შემომავალი ზარებისა და დამტკიცებული გამავალი ამოცანებისთვის" },
  hero: { titleLine1: "ხმოვანი AI თქვენი ბიზნესისთვის.", titleLine2: "შემომავალი ზარები, დადასტურებული შედეგი.", description: "aiCALL პასუხობს შემომავალ ზარებს და დამტკიცებული მიზნისთვის არსებულ კლიენტებსაც ურეკავს. იყენებს თქვენს მიერ დამტკიცებულ ინფორმაციასა და წესებს — ჯავშნის, შეკვეთის, შეხსენების, მიწოდების, გადახდის ან გამოკითხვის სცენარებში — და ზარის შედეგს შემდგომი მუშაობისთვის აფიქსირებს.", primaryCta: "პილოტის დაწყება", catalogCta: "საორიენტაციო ფასების ნახვა", hint: "დაიწყეთ ერთი ზარის ამოცანით და იმ წესებით, რომლებიც მას მართავს." },
  ecosystemHub: { satellites: { chats: { title: "შემომავალი", subtitle: "უპასუხეთ კლიენტის ზარს", alt: "შემომავალი კლიენტის ზარები" }, calls: { title: "გამავალი", subtitle: "დამტკიცებული დაკავშირება", alt: "დამტკიცებული გამავალი ზარები" }, content: { title: "წესები", subtitle: "კონტექსტი, სცენარი და საზღვრები", alt: "ზარის წესები და კონტექსტი" }, apps: { title: "შედეგი", subtitle: "ჯავშანი · შეკვეთა · callback", alt: "დაფიქსირებული ზარის შედეგი" } }, centerSubtitle: "ზარის პროცესი · OS", badge: "ზარის მიზნიდან დაფიქსირებულ შედეგამდე ⤴" },
  categories: { title: "აირჩიეთ პირველი ზარის ამოცანა", description: "aiCALL კონკრეტულ შემომავალ ან დამტკიცებულ გამავალ ამოცანაზე იგეგმება. ენა, ნომრის გამართვა, დაკავშირებული ინსტრუმენტები და დამატებითი სიმძლავრე ცალკე დასტურდება.", items: { communication: { title: "შემომავალი ზარების მართვა", subtitle: "უპასუხეთ კითხვებს, ჯავშნებსა და შეკვეთებს დამტკიცებული წესებით.", products: { aicall: "შემომავალი პასუხები, ჯავშნები და შეკვეთები" } }, marketing: { title: "დამტკიცებული გამავალი ამოცანები", subtitle: "არსებული კლიენტების სია გამოიყენეთ შეხსენებისთვის, მიწოდებისთვის, გადახდისთვის ან გამოკითხვისთვის.", products: { aicall: "დამტკიცებული შეხსენებისა და მიწოდების ზარები" } }, internal: { title: "ზარის წესები და შემდგომი მოქმედება", subtitle: "განსაზღვრეთ კონტექსტი, ჩაწერის არჩევანი, შედეგები და ადამიანური შემოწმების ზღვარი.", products: { aicall: "ზარის ისტორია და გამონაკლისების შემოწმება" } }, products: { title: "დაკავშირებული ზარის პროცესი", subtitle: "დაიწყეთ იმ ნომრითა და ინსტრუმენტებით, რომლებიც კონკრეტულ სცენარს ნამდვილად სჭირდება.", products: { aicall: "ჯავშნის ან შეკვეთის შედეგის გზა" } } } },
  process: { title: "როგორ ვამზადებთ თქვენს ხმოვან აგენტს", description: "გამართვამდე განვსაზღვრავთ სცენარს, დამტკიცებულ ინფორმაციას, სატელეფონო გზას და იმას, როგორ შემოწმდება შედეგი.", steps: [{ title: "განსაზღვრეთ ზარი", description: "აირჩიეთ ერთი შემომავალი ან დამტკიცებული გამავალი მიზანი, ენა, ინფორმაცია, საზღვრები და შედეგი." }, { title: "გაამართეთ და გამოცადეთ", description: "ვაწყობთ ნომერსა და წესებს, საჭიროების შემთხვევაში ვაერთებთ დამტკიცებულ ინსტრუმენტებს და ვამოწმებთ რეალურ სცენარებს." }, { title: "ამუშავეთ და გადაამოწმეთ", description: "პროცესი შეთანხმებული შეზღუდვებით მუშაობს; ამოწმებთ ზარის ისტორიასა და შედეგებს და ცვლილებებს შეთანხმებული გზით აკეთებთ." }] },
  architecture: { eyebrow: "კონტროლირებადი ხმოვანი ოპერაციები", title: "თქვენი ზარის წესები, თქვენი თანხმობა", description: "aiCALL იყენებს თქვენს მიერ დამტკიცებულ კონტექსტსა და წესებს. შემომავალი და გამავალი მიზნები, ინსტრუმენტები, ჩაწერა და ადამიანური შემოწმება ცალკე განისაზღვრება.", action: "ზარის გამართვისა და კონტროლის განხილვა", principle: "პრინციპი", rule: "● თქვენი თანხმობა", specs: [{ title: "გამოიყენეთ დამტკიცებული ინფორმაცია", description: "მისალმება, მომსახურება, ფასები, საათები და პირობები იმ წყაროდან მოდის, რომელსაც თქვენ ამტკიცებთ." }, { title: "გამიჯნეთ შემომავალი და გამავალი მიზნები", description: "შემომავალ პასუხსა და არსებულ კლიენტთან ზარს სხვადასხვა დამტკიცებული ამოცანა აქვს." }, { title: "განსაზღვრეთ, რას უნდა მიაღწიოს ზარმა", description: "ჯავშანს, შეკვეთას, შეხსენებას, მიწოდებას, გადახდასა და გამოკითხვას თავისი შედეგი სჭირდება." }, { title: "შეამოწმეთ გაურკვეველი საუბარი", description: "რთული ან გაურკვეველი ზარი შეთანხმებული გეგმის ადამიანური შემოწმების გზას მიჰყვება; ეს უნივერსალური ფუნქცია არ არის." }, { title: "ჩაწერეთ მხოლოდ არჩეული ისტორია", description: "ჩაწერა, ტრანსკრიპტი და ზარის ისტორია არჩევითი ან გეგმით განსაზღვრულია; ჩართვამდე დაადასტურეთ პირობები." }, { title: "სიმძლავრე და კავშირები ცხადი იყოს", description: "არხების რაოდენობა, დაკავშირებული ინსტრუმენტები და API ცალკე თანხმდება არჩეული გეგმისთვის." }] },
  team: { eyebrow: "ჩვენი როლი", title: "შეზღუდული ხმოვანი პროცესი, არა ზოგადი დაპირება", paragraphs: ["ჩვენ ვართ aiNOW — თბილისიდან მომუშავე გუნდი, რომელიც AI სისტემებს რეალური ბიზნესსაქმისთვის ქმნის.", "aiCALL-ისთვის პილოტამდე ვაზუსტებთ სცენარს, დამტკიცებულ ინფორმაციას, ნომრის გამართვასა და შემოწმების გზას.", "თავიდანვე თვალსაჩინოს ვტოვებთ ზარის მიზანს, საბოლოო შედეგსა და ადამიანის პასუხისმგებლობას."], names: en.team.names, roles: { founder: "დამფუძნებელი", commercial: "კომერციული დირექტორი", businessDevelopment: "ბიზნესის განვითარების დირექტორი" }, location: "თბილისი, საქართველო", year: "2026" },
  clientFit: { title: "ვისთვის არის aiCALL", description: "ბიზნესებისთვის, რომლებსაც აქვთ განმეორებადი შემომავალი ან დამტკიცებული გამავალი ზარის ამოცანა და შედეგის მკაფიო წესები.", ariaLabel: "ვისთვის არის aiCALL", signals: ["თქვენი გუნდი ზარებს ან შემდგომ მოქმედებებს ვერ ასწრებს.", "შეგიძლიათ დაამტკიცოთ ბიზნესკონტექსტი და ზარის მიზანი.", "შეგიძლიათ დაასახელოთ, სად უნდა ჩაერთოს ან გადაამოწმოს ადამიანმა.", "მზად ხართ, მასშტაბის გაზრდამდე ერთი სცენარი გამოცადოთ."], notForTitle: "aiCALL შეიძლება არ გამოგადგეთ, თუ...", notForDescription: "გჭირდებათ შეუზღუდავი სიმძლავრე, დაუდასტურებელი ინტეგრაცია, ავტომატური გამავალი კამპანია ან გარანტირებული შედეგი სცენარის გამოცდამდე.", uncertain: "არ იცით, რომელი ზარის ამოცანით დაიწყოთ? აღწერეთ ერთი რეალური სცენარი." },
  closingCta: { title: "დაიწყეთ ერთი ზარის ამოცანით", description: "მოგვწერეთ, რომელ ზარებს უნდა უპასუხოს ან განახორციელოს აგენტმა, რისი თქმა შეუძლია და რა შედეგი უნდა დააფიქსიროს. შეძენამდე დაგიდასტურებთ ნომრის გამართვას, მასშტაბსა და საორიენტაციო საფასურს.", successPrefix: "გმადლობთ! თქვენი მოთხოვნა მიღებულია.", checks: ["ჯერ ვადგენთ ზარის მიზანსა და დამტკიცებულ კონტექსტს.", "ცალ-ცალკე ვასახელებთ ნომრის გამართვას, გეგმის მასშტაბსა და გამოყენების საფასურს.", "შედეგს ან ადამიანთან გადაცემას დადასტურებამდე არ ვპირდებით."] },
  footer: { tagline: "კონსულტაცია. ტექნოლოგია. ხმოვანი პროცესები.", description: "aiCALL არის aiNOW-ის ხმოვანი აგენტის პროდუქტი შემომავალი და დამტკიცებული გამავალი ზარებისთვის.", action: "პილოტის დაწყება", products: "პროდუქტები", industries: "სფეროები", resources: "რესურსები", language: "ენა", legal: "სამართლებრივი და უსაფრთხოება", blog: "ბლოგი", howWeStart: "როგორ ვიწყებთ", faq: "კითხვები და პასუხები", sendTask: "ამოცანის გამოგზავნა", email: "მოგვწერეთ", privacy: "კონფიდენციალურობა", terms: "წესები და პირობები", location: "თბილისი, საქართველო", rights: "ყველა უფლება დაცულია.", backToTop: "თავში დაბრუნება ↑", industryLinks: ["კლინიკები და ესთეტიკა", "რესტორნები და HoReCa", "უძრავი ქონება და დეველოპმენტი", "ონლაინ ვაჭრობა და საცალო ბიზნესი", "ავტოსერვისი და დეტეილინგი", "იურიდიული და პროფესიული მომსახურება"] },
};

const ru: AiNowHomeCopy = {
  ...en,
  productLabels: { ...en.productLabels, aicall: "Голосовые операции AI" },
  nav: { ...en.nav, products: "Продукты", customerCommunication: "Общение с клиентами", marketingContent: "Маркетинг и контент", internalOperations: "Внутренние процессы", webApps: "Сайты и приложения", specializedSolutions: "Специальные решения", operations: "Операционный AI", growth: "Рост и маркетинг", resources: "Ресурсы", resourcesBlog: "Ресурсы и блог", capabilities: "Возможности", architecture: "Архитектура", pricing: "Цены", contact: "Контакты", consultation: "Консультация", themeLight: "Включить светлую тему", themeDark: "Включить тёмную тему", themeToggle: "Сменить тему", menuOpen: "Открыть меню", menuClose: "Закрыть меню", productDescriptions: { ...en.nav.productDescriptions, aichats: "Общение с клиентами", aicall: "Входящие и одобренные исходящие звонки" }, resourceItems: { blog: { title: "Блог", subtitle: "Звонки, правила и практические примеры" }, architecture: { title: "Архитектура", subtitle: "Как устроен управляемый процесс звонка" }, updates: { title: "Обновления", subtitle: "Изменения продукта и границ" }, industries: { title: "Сферы", subtitle: "Сценарии звонков по отраслям" } } },
  banner: { ...en.banner, aicall: "Голосовой AI для входящих и одобренных исходящих задач" },
  hero: { titleLine1: "Голосовой AI для бизнеса.", titleLine2: "Входящие звонки, follow-up, результат.", description: "aiCALL отвечает на входящие звонки и может звонить существующим клиентам по одобренной задаче. Он использует утверждённые вами сведения и правила для бронирований, заказов, напоминаний, доставки, платежей или опросов и фиксирует подтверждённый результат для дальнейшей работы.", primaryCta: "Начать пилот", catalogCta: "Посмотреть ориентировочные цены", hint: "Начните с одной задачи звонка и правил, которые ею управляют." },
  ecosystemHub: { satellites: { chats: { title: "Входящие", subtitle: "Ответить на звонок клиента", alt: "Входящие звонки клиентов" }, calls: { title: "Исходящие", subtitle: "Одобренный follow-up", alt: "Одобренные исходящие звонки" }, content: { title: "Правила", subtitle: "Контекст, сценарий и границы", alt: "Правила и контекст звонка" }, apps: { title: "Результат", subtitle: "Бронь · заказ · callback", alt: "Подтверждённый результат звонка" } }, centerSubtitle: "Процесс звонка · OS", badge: "От цели звонка к зафиксированному результату ⤴" },
  categories: { title: "Выберите первую задачу звонка", description: "aiCALL строится вокруг конкретной входящей или одобренной исходящей задачи. Язык, телефонная настройка, инструменты и дополнительная ёмкость подтверждаются отдельно.", items: { communication: { title: "Входящие звонки", subtitle: "Ответы на вопросы, бронирования и заказы по утверждённым правилам.", products: { aicall: "Входящие ответы, брони и заказы" } }, marketing: { title: "Одобренные исходящие задачи", subtitle: "Списки существующих клиентов для напоминаний, доставки, платежей или опросов.", products: { aicall: "Одобренные звонки о напоминании и доставке" } }, internal: { title: "Правила звонка и follow-up", subtitle: "Контекст, запись, результат и граница проверки человеком.", products: { aicall: "История звонка и проверка исключений" } }, products: { title: "Связанный процесс звонка", subtitle: "Начните с номера и инструментов, которые нужны именно этому сценарию.", products: { aicall: "Путь результата брони или заказа" } } } },
  process: { title: "Как мы настраиваем голосового агента", description: "До настройки определяем сценарий, одобренную информацию, телефонный путь и способ проверки результата.", steps: [{ title: "Определить звонок", description: "Выбрать одну входящую или одобренную исходящую цель, язык, данные, границы и результат." }, { title: "Настроить и проверить", description: "Настроить номер и правила, подключить одобренные инструменты и проверить типичные звонки." }, { title: "Работать и пересматривать", description: "Работать в согласованных пределах, проверять историю и результаты и менять процесс по договорённому пути." }] },
  architecture: { eyebrow: "Голосовые операции под контролем", title: "Ваши правила звонка, ваше согласование", description: "aiCALL использует утверждённый вами контекст и правила. Входящие и исходящие цели, инструменты, запись и участие человека определяются отдельно.", action: "Обсудить настройку и контроль", principle: "Принцип", rule: "● Ваше согласование", specs: en.architecture.specs },
  team: { eyebrow: "Наша роль", title: "Ограниченный голосовой процесс, а не общее обещание", paragraphs: ["Мы — aiNOW, команда из Тбилиси, которая создаёт AI-системы для реальной работы бизнеса.", "Для aiCALL до пилота уточняем сценарий, одобренную информацию, настройку телефона и путь проверки.", "С самого начала видны цель звонка, итог и ответственность человека."], names: en.team.names, roles: { founder: "Основатель", commercial: "Коммерческий директор", businessDevelopment: "Директор по развитию бизнеса" }, location: "Тбилиси, Грузия", year: "2026" },
  clientFit: { title: "Для кого подходит aiCALL", description: "Для бизнеса с повторяющейся входящей или одобренной исходящей задачей звонка и ясными правилами результата.", ariaLabel: "Для кого подходит aiCALL", signals: ["Команда пропускает звонки или задачи follow-up.", "Вы можете определить одобренный контекст и цель звонка.", "Вы можете указать, где нужен просмотр или участие человека.", "Вы готовы проверить один сценарий до расширения объёма."], notForTitle: "aiCALL может не подойти, если...", notForDescription: "До проверки сценария вам нужны неограниченная ёмкость, непроверенная интеграция, автоматические исходящие кампании или гарантия бизнес-результата.", uncertain: "Не знаете, с какой задачей звонка начать? Опишите один реальный сценарий." },
  closingCta: { title: "Начните с одной задачи звонка", description: "Расскажите, на какие звонки нужно отвечать или звонить, что агент может говорить и какой результат фиксировать. До покупки подтвердим настройку телефона, объём и ориентировочные расходы.", successPrefix: "Спасибо! Запрос получен.", checks: ["Сначала определяем цель звонка и одобренный контекст.", "Отдельно указываем настройку телефона, объём плана и расходы на использование.", "Не обещаем результат или перевод человеку до подтверждения."] },
  footer: { tagline: "Консультация. Технологии. Голосовые процессы.", description: "aiCALL — голосовой продукт aiNOW для входящих и одобренных исходящих задач звонка.", action: "Начать пилот", products: "Продукты", industries: "Сферы", resources: "Ресурсы", language: "Язык", legal: "Право и безопасность", blog: "Блог", howWeStart: "Как начинаем", faq: "Вопросы и ответы", sendTask: "Отправить задачу", email: "Написать нам", privacy: "Конфиденциальность", terms: "Условия", location: "Тбилиси, Грузия", rights: "Все права защищены.", backToTop: "Наверх ↑", industryLinks: ["Клиники и эстетика", "Рестораны и HoReCa", "Недвижимость и девелопмент", "E-commerce и розница", "Автосервис и детейлинг", "Юридические и профессиональные услуги"] },
};

const kaLocalized: AiNowHomeCopy = {
  ...ka,
  productLabels: {
    aichats: "კლიენტებთან მიმოწერა",
    aicall: "AI ზარები",
    aicontent: "AI კონტენტი",
    aiweb: "საიტები და ვებპროდუქტები",
    aistaff: "AI სპეციალისტების შერჩევა",
    iai: "პროცესების კოორდინაცია",
  },
  nav: {
    ...ka.nav,
    productDescriptions: {
      aichats: "კლიენტებთან მიმოწერა",
      aicall: "შემომავალი და შეთანხმებული გამავალი ზარები",
      aistaff: "რეალური AI სპეციალისტები თქვენი კომპანიისთვის",
      aicontent: "AI ვიდეო და სარეკლამო კრეატივი",
      aiads: "Meta-სა და Google-ის რეკლამების მართვა",
      aimusic: "მუსიკა და აუდიო თქვენი ბრენდისთვის",
      aibrain: "კომპანიის ცოდნა და წესები ერთ სივრცეში",
      aioffice: "ამოცანები, დოკუმენტები და შიდა პროცესები",
      aidocs: "დოკუმენტების დამუშავება და შემოწმება",
      aiweb: "საიტები და ვებპროდუქტები",
      aiapp: "ბიზნესის მობილური აპები",
      vibecoding: "აპლიკაციების უსაფრთხო განვითარება",
      iai: "პროცესების კოორდინაცია",
      aijurist: "სამართლებრივი კვლევა და დოკუმენტის პროექტები",
      aitaxi: "ტაქსის ფლოტის ოპერაციების მართვა",
    },
  },
  banner: {
    ...ka.banner,
    aichats: "კლიენტებთან მიმოწერის მართვა",
    aicall: "ხმოვანი AI შემომავალი ზარებისა და შეთანხმებული გამავალი ამოცანებისთვის",
    aicontent: "სარეკლამო ვიდეო და ბიზნესკონტენტი",
    aiads: "Meta-სა და Google-ის რეკლამების მართვა",
    aistaff: "რეალური AI სპეციალისტები თქვენი კომპანიისთვის",
    airadar: "ბაზრისა და რეპუტაციის მონიტორინგი",
    aiweb: "ბიზნესის საიტები და აპლიკაციები",
    iai: "პროცესების კოორდინაცია",
  },
  hero: {
    ...ka.hero,
    titleLine1: "კლიენტები რეკავენ.",
    titleLine2: "AI პასუხობს.",
    description: "aiCALL პასუხობს კლიენტების ზარებს, აგროვებს ჯავშნისა და შეკვეთის დეტალებს და შეთანხმებული მიზნით არსებულ კლიენტებსაც ურეკავს. დაწყებამდე თქვენთან ვაზუსტებთ სცენარსა და ბიზნესინფორმაციას.",
    hint: "დაიწყეთ ერთი ზარის ამოცანით და მისი წესებით.",
  },
  ecosystemHub: {
    ...ka.ecosystemHub,
    satellites: {
      ...ka.ecosystemHub.satellites,
      calls: { title: "გამავალი", subtitle: "შეთანხმებული შემდგომი ზარი", alt: "შეთანხმებული გამავალი ზარები" },
      apps: { title: "შედეგი", subtitle: "ჯავშანი · შეკვეთა · შემდგომი მოქმედება", alt: "დაფიქსირებული ზარის შედეგი" },
    },
    centerSubtitle: "AI ზარები ბიზნესისთვის",
  },
  comparison: {
    title: "სად იკარგება ზარები?",
    description: "აირჩიეთ ზარის ის მომენტი, რომელიც თქვენთვის ნაცნობია.",
    action: "განვიხილოთ ზარის ამოცანა",
    labels: { inspect: "რას დავაზუსტებთ", firstStep: "პირველი ნაბიჯი", ask: "რა გვჭირდება თქვენგან" },
    problems: {
      chats: {
        question: "თქვენი გუნდის დაკავებულობისას კლიენტები რეკავენ?",
        description: "კითხვებს, ჯავშნის მოთხოვნებსა და შეკვეთებს პასუხი მაშინაც სჭირდება, როცა ჩვეულებრივი ოპერატორი მიუწვდომელია.",
        detailHeading: "გამოტოვებული ზარი პროცესის პრობლემაა",
        firstStep: "ვირჩევთ ერთ ტიპურ შემომავალ ზარს და ვწერთ მისალმებას, კითხვებსა და შედეგს.",
        solution: "თუ ზარის პროცესი მკაფიო არ არის, ერთსა და იმავე მოთხოვნაზე პასუხი იცვლება და შემდეგი მოქმედება შეიძლება დაიკარგოს.",
        builds: ["რომელ შემომავალ ზარებს უპასუხებს aiCALL.", "რა უნდა გაიგოს ან დაადასტუროს დამრეკმა.", "როდის უნდა შეწყდეს ზარი ან ჩაერთოს ადამიანი.", "რა შედეგი უნდა ჩაიწეროს ზარის შემდეგ."],
        materials: "თქვენი მისალმება, ბიზნესინფორმაცია, ზარების მაგალითები და ადამიანური შემდგომი მოქმედების წესები.",
      },
      calls: {
        question: "შემდგომი ზარები ერთ ადამიანზეა დამოკიდებული?",
        description: "არსებულ კლიენტებს შეიძლება შეხსენება, დადასტურება ან მიწოდების ზარი დასჭირდეთ, მაგრამ ეს საქმე ხშირად ვიღაცის სიაში რჩება.",
        detailHeading: "გამავალი ამოცანა მკაფიო მიზანს მოითხოვს",
        firstStep: "ვადგენთ კლიენტების სიას, მიზანს, სცენარის საზღვრებს და იმას, როდის ითვლება ზარი დაკავშირებულად.",
        solution: "გამავალ ზარს სჭირდება თანხმობა, დრო და მკაფიო შედეგი; ეს თავისთავად არ ნიშნავს მასობრივ კამპანიას ან ავტომატურ განმეორებას.",
        builds: ["რომელ არსებულ კლიენტებთან შეიძლება დარეკვა.", "რის მიღწევას უნდა ემსახურებოდეს ზარი.", "რა ინფორმაციის გამოყენება შეუძლია აგენტს.", "რა სტატუსი რჩება პასუხის ან უპასუხობის შემდეგ."],
        materials: "კლიენტების სია, მიზანი, სცენარი, დრო და გამონაკლისებზე რეაგირების წესები.",
      },
      content: {
        question: "საუბრის შემდეგ ზარის შედეგი იკარგება?",
        description: "ჯავშნის, შეკვეთის, უკუკავშირის ან გამოკითხვის პასუხის დაკარგვა ადვილია, თუ დადასტურებულ შედეგს არავინ აფიქსირებს.",
        detailHeading: "ზარის შემდეგ შედეგი მნიშვნელოვანია",
        firstStep: "ვადგენთ შედეგის ველებს და ერთ ზარს მისალმებიდან დადასტურებულ შედეგამდე ვამოწმებთ.",
        solution: "ტრანსკრიპტი თავისთავად ბიზნესშედეგი არ არის; პროცესს სჭირდება დადასტურებული, გადადებული ან უპასუხო სტატუსი.",
        builds: ["რომელი შედეგი უნდა დააფიქსიროს ზარმა.", "რა უნდა დაადასტუროს დამრეკმა.", "რა ჩაიწერება ზარის ისტორიაში.", "ვინ ამოწმებს გამონაკლისებს ან გაურკვეველ პასუხებს."],
        materials: "თქვენი შედეგის ველები, სტატუსის წესები, ზარების მაგალითები და გამონაკლისებზე პასუხისმგებელი პირი.",
      },
      website: {
        question: "გსურთ ხმოვანი AI, მაგრამ არ იცით, რას უნდა აკეთებდეს?",
        description: "ტელეფონის არხი გასაგებია, მაგრამ პირველი ზარის ამოცანა, დაკავშირებული სისტემა და საზღვრები ჯერ დასაზუსტებელია.",
        detailHeading: "დაიწყეთ ერთი ზარის ამოცანით",
        firstStep: "ვარჩევთ ერთ რეალურ სცენარს, შემდეგ ვაზუსტებთ ენას, ნომრის გამართვას, ინფორმაციასა და შედეგის ველებს.",
        solution: "ფოკუსირებული პილოტი ზარის ქცევის შემოწმებას საშუალებას იძლევა, სანამ მასშტაბს გაზრდით.",
        builds: ["რა არის პირველი ზარის ამოცანა.", "რომელი ენა და ბიზნესინფორმაცია გამოიყენება.", "რომელი ინსტრუმენტები ან გადაცემის გზებია ხელმისაწვდომი.", "როგორ შემოწმდება შედეგი."],
        materials: "პირველი ზარის სცენარი, ბიზნესინფორმაცია, სატელეფონო მოთხოვნები და შემოწმების კრიტერიუმები.",
      },
    },
  },
  categories: {
    title: "აირჩიეთ პირველი ზარის ამოცანა",
    description: "aiCALL კონკრეტული შემომავალი ან შეთანხმებული გამავალი ამოცანისთვის იგეგმება. ენას, ნომრის გამართვას, დაკავშირებულ ინსტრუმენტებსა და დამატებით სიმძლავრეს ცალ-ცალკე ვადასტურებთ.",
    items: {
      communication: { title: "შემომავალი ზარების მართვა", subtitle: "უპასუხეთ კითხვებს, ჯავშნებსა და შეკვეთებს განსაზღვრული წესებით.", products: { aichats: "კითხვებზე პასუხი შეთანხმებული ზარის პროცესით", aicall: "შემომავალი პასუხები, ჯავშნები და შეკვეთები" } },
      marketing: { title: "შეთანხმებული გამავალი ამოცანები", subtitle: "არსებული კლიენტების სია გამოიყენეთ შეხსენებისთვის, მიწოდებისთვის, გადახდისთვის ან გამოკითხვისთვის.", products: { aicontent: "არსებულ კლიენტებთან შეთანხმებული მიზნით დარეკვა", aiads: "დამტკიცებული საუბრები შეხსენებაზე", aimusic: "დამტკიცებული საუბრები მიწოდებაზე", aicall: "შეთანხმებული შეხსენებისა და მიწოდების ზარები" } },
      internal: { title: "ზარის წესები და შემდგომი მოქმედება", subtitle: "განსაზღვრეთ ინფორმაცია, ჩაწერის არჩევანი, შედეგები და ადამიანის შემოწმების წერტილი.", products: { aistaff: "ბიზნესკონტექსტი და ზარის წესები", aibrain: "ქართული, ინგლისური და რუსული ფორმულირებები", aioffice: "დადასტურებული, გადადებული ან უპასუხო სტატუსი", aidocs: "გაურკვეველ შემთხვევებზე ადამიანის შემდგომი კავშირი", aicall: "ზარის ისტორია და გამონაკლისების შემოწმება" } },
      products: { title: "ზართან დაკავშირებული პროცესი", subtitle: "დაიწყეთ იმ ნომრითა და ინსტრუმენტებით, რომლებიც კონკრეტულ სცენარს ნამდვილად სჭირდება.", products: { aiweb: "მინიჭებული ნომერი და საწყისი გამართვა", aiapp: "ერთი შემომავალი არხი; დამატებითი — შეთანხმებით", vibecoding: "გეგმა, გამართვა და გამოყენება შეძენამდე დასტურდება", aicall: "დაფიქსირებული ჯავშნის ან შეკვეთის დეტალები" } },
    },
  },
  industries: {
    eyebrow: "თქვენს სფეროს თავისი ზარის წესები აქვს",
    title: "ერთი ხმოვანი პროცესი ყველა ბიზნესს ვერ მოერგება",
    description: "ზარის მიზანი, ინფორმაცია, ენა და ადამიანის ჩართულობის წერტილები სფეროს მიხედვით იცვლება, ამიტომ სცენარი გამართვამდე უნდა განისაზღვროს.",
    items: {
      healthcare: { title: "კლინიკები და ჩაწერის ცენტრები", tag: "ჯანმრთელობა და სილამაზე", description: "პაციენტები ჩაწერის, მომზადების დეტალებისა და შემდგომი კავშირის შესახებ რეკავენ.", action: "განვიხილოთ კლინიკის ზარი", points: ["მომსახურების, ექიმისა და ჩაწერის შესახებ ინფორმაცია პასუხებს წარმართავს.", "თქვენ წყვეტთ, რომელი ინფორმაცია გამოიყენოს აგენტმა.", "ჩანაწერები და შემდგომი ზარები შეთანხმებული წესით ფიქსირდება.", "სამედიცინო რჩევა თქვენს კლინიკურ გუნდთან რჩება."] },
      horeca: { title: "რესტორნები და HoReCa", tag: "რესტორნები და კვება", description: "სტუმრები მაგიდას, მენიუს, სამუშაო საათებსა და ჯგუფურ შეკვეთებს ეკითხებიან.", action: "განვიხილოთ რესტორნის ზარი", points: ["მენიუ, ალერგენები და სამუშაო საათები თქვენი წესებით იმართება.", "ჯავშნის დეტალები ზარის პროცესის დაწყებამდე განისაზღვრება.", "ტერასას, დარბაზსა და ჯგუფურ შეკვეთებს შეიძლება ცალკე წესები ჰქონდეს.", "განსაკუთრებულ ან გაურკვეველ მოთხოვნებს თქვენი გუნდი ამუშავებს."] },
      "real-estate": { title: "უძრავი ქონება და დეველოპმენტი", tag: "უძრავი ქონება", description: "მყიდველები ქონების, ბიუჯეტისა და ნახვის შესახებ რეკავენ.", action: "განვიხილოთ უძრავი ქონების ზარი", points: ["ქონების, ფასისა და ხელმისაწვდომობის შესახებ ინფორმაცია თქვენი წყაროდან მოდის.", "ბიუჯეტი, ფართობი და ვადა მკაფიო კითხვებად იქცევა.", "ნახვის მოთხოვნა შეთანხმებული გზით ფიქსირდება.", "რთულ ფინანსურ ან სამართლებრივ საკითხებს თქვენი სპეციალისტი განიხილავს."] },
      ecommerce: { title: "ონლაინ ვაჭრობა და საცალო ბიზნესი", tag: "ონლაინ მაღაზია", description: "მყიდველები პროდუქტს, შეკვეთას, მიწოდებასა და დაბრუნებას ეკითხებიან.", action: "განვიხილოთ ონლაინ-მაღაზიის ზარი", points: ["პროდუქტისა და მიწოდების პასუხები თქვენი კატალოგით იმართება.", "შეკვეთის დეტალები ცალკე ველებად იწერება.", "გადახდისა და დაბრუნების კითხვებს განსაზღვრული საზღვრები აქვს.", "გამონაკლისს პასუხისმგებელი თანამშრომელი განიხილავს."] },
      auto: { title: "ავტოსერვისი და დეტეილინგი", tag: "ავტოსერვისი", description: "ავტომობილის მფლობელები მომსახურების, ფასისა და თავისუფალი დროის შესახებ რეკავენ.", action: "განვიხილოთ ავტოსერვისის ზარი", points: ["პირველ კითხვებში ირკვევა მარკა, მოდელი და სამუშაოს ტიპი.", "ფასი და მომსახურების პირობები თქვენს ტარიფებს მიჰყვება.", "ბოქსისა და დროის მოთხოვნა შეთანხმებული წესით იწერება.", "რთულ დიაგნოსტიკას თქვენი სპეციალისტი ატარებს."] },
      legal: { title: "იურიდიული და პროფესიული მომსახურება", tag: "პროფესიული მომსახურება", description: "კლიენტები საქმის ასახსნელად და შემდეგი ნაბიჯის გასაგებად რეკავენ.", action: "განვიხილოთ პროფესიული ზარი", points: ["საკითხის ტიპი და ვადები ზუსტდება შეთანხმებული ფარგლების გარეთ რჩევის გაცემის გარეშე.", "საჭირო ინფორმაცია და დოკუმენტის გზა თქვენს პროცესს მიჰყვება.", "კონფიდენციალურ ან გაურკვეველ საკითხს თქვენი სპეციალისტი განიხილავს.", "ზარის ჩანაწერი სამუშაო მასალად რჩება, სანამ ადამიანი არ გადაამოწმებს."] },
    },
  },
  process: { title: "როგორ ვამზადებთ თქვენს ხმოვან აგენტს", description: "გამართვამდე განვსაზღვრავთ სცენარს, ზარში გამოსაყენებელ ინფორმაციას, სატელეფონო გზასა და შედეგის შემოწმების მეთოდს.", steps: [{ title: "განსაზღვრეთ ზარი", description: "აირჩიეთ ერთი შემომავალი ან შეთანხმებული გამავალი მიზანი, ენა, ინფორმაცია, საზღვრები და შედეგი." }, { title: "გაამართეთ და გამოცადეთ", description: "ვაწყობთ ნომერსა და ზარის პროცესს, საჭიროების შემთხვევაში ვაერთებთ ხელმისაწვდომ ინსტრუმენტებს და ვამოწმებთ რეალურ სცენარებს." }, { title: "ამუშავეთ და გადაამოწმეთ", description: "პროცესი შეთანხმებულ ფარგლებში მუშაობს; ამოწმებთ ზარის ისტორიასა და შედეგებს და ცვლილებებს შეთანხმებული გზით აკეთებთ." }] },
  architecture: { eyebrow: "კონტროლირებადი ხმოვანი ოპერაციები", title: "თქვენი ზარის წესები, თქვენი თანხმობა", description: "aiCALL იყენებს თქვენს მიერ მოწოდებულ ბიზნესინფორმაციასა და ინსტრუქციებს. შემომავალ და გამავალ მიზნებს, დაკავშირებულ ინსტრუმენტებსა და ადამიანის მიერ ზარის შემოწმებას ცალ-ცალკე ვაზუსტებთ.", action: "ზარის გამართვისა და კონტროლის განხილვა", principle: "პრინციპი", rule: "● თქვენი თანხმობა", specs: [{ title: "გამოიყენეთ თქვენი გუნდის ინფორმაცია", description: "მისალმება, მომსახურება, ფასები, საათები და პირობები იმ მასალიდან მოდის, რომელსაც ზარისთვის ირჩევთ." }, { title: "გამიჯნეთ შემომავალი და გამავალი მიზნები", description: "შემომავალ ზარებზე პასუხი და არსებულ კლიენტებთან დარეკვა სხვადასხვა ამოცანად იგეგმება." }, { title: "განსაზღვრეთ, რას უნდა მიაღწიოს ზარმა", description: "ჯავშანს, შეკვეთას, შეხსენებას, მიწოდებას, გადახდასა და გამოკითხვას მკაფიო შედეგი სჭირდება." }, { title: "შეამოწმეთ გაურკვეველი საუბარი", description: "რთული ან გაურკვეველი ზარი შეთანხმებული გეგმის ადამიანური შემოწმების გზას მიჰყვება; ეს უნივერსალური ფუნქცია არ არის." }, { title: "ჩაწერეთ მხოლოდ არჩეული ისტორია", description: "ჩაწერა, ტრანსკრიპტი და ზარის ისტორია გეგმისა და პარამეტრების მიხედვით განისაზღვრება; ჩართვამდე დაადასტურეთ პირობები." }, { title: "სიმძლავრე და კავშირები ცხადი იყოს", description: "არხების რაოდენობა, დაკავშირებული ინსტრუმენტები და API ცალკე თანხმდება არჩეული გეგმისთვის." }] },
  team: { eyebrow: "ჩვენი როლი", title: "AI ზარები თქვენი ბიზნესისთვის", paragraphs: ["ჩვენ ვართ aiNOW — თბილისიდან მომუშავე გუნდი, რომელიც AI სისტემებს რეალური ბიზნესსაქმისთვის ქმნის.", "aiCALL-ისთვის პილოტამდე ვაზუსტებთ სცენარს, ინფორმაციას, ნომრის გამართვასა და შემოწმების გზას.", "თავიდანვე თვალსაჩინოს ვტოვებთ ზარის მიზანს, შედეგსა და ადამიანის პასუხისმგებლობას."], names: ka.team.names, roles: ka.team.roles, location: "თბილისი, საქართველო", year: "2026" },
  faq: { eyebrow: "[პასუხები გავრცელებულ კითხვებზე]", title: "კითხვები aiCALL-ის შესახებ", description: "მოკლე პასუხები aiCALL-ის ზარის ამოცანებზე, კონტროლზე, ფასებსა და შეზღუდვებზე.", filters: { all: "ყველა", pricing: "ფასი და მოცულობა", tech: "დაწყება და ზარის პროცესი", safety: "მონაცემები და კონტროლი" }, searchLabel: "კითხვების ძებნა", searchPlaceholder: "იპოვეთ კითხვა...", questionPrefix: "კითხვა", calloutTitle: "კონკრეტული ზარის ამოცანა გაქვთ?", calloutAction: "აღწერეთ სცენარი", items: { q1: { question: "რა არის aiCALL?", answer: "aiCALL არის AI ხმოვანი აგენტი შემომავალი და შეთანხმებული გამავალი ზარებისთვის — ჯავშნების, შეკვეთების, შეხსენებების, მიწოდების, გადახდებისა და გამოკითხვებისთვის." }, q2: { question: "შეუძლია aiCALL-ს შემომავალ ზარებზე პასუხი?", answer: "aiCALL-ს შეუძლია შემომავალ ზარებზე პასუხი. ჯერ ვადასტურებთ ნომერს, მოსალოდნელ მოცულობასა და თქვენი სცენარის გამართვას." }, q3: { question: "შეუძლია არსებულ კლიენტებთან დარეკვა?", answer: "დიახ, განსაზღვრული მიზნისთვის, მაგალითად შეხსენებისთვის ან დასადასტურებლად. წინასწარ განვსაზღვრავთ კლიენტების სიას, მიზანსა და ზარის პროცესს; მასობრივი კამპანია და ავტომატური განმეორებითი ზარები გეგმის მიხედვით განისაზღვრება." }, q4: { question: "რომელ ენებზე მუშაობს?", answer: "aiCALL-ის მომზადება შესაძლებელია ქართულ, რუსულ და ინგლისურ ენებზე. გაშვებამდე ვამოწმებთ ზუსტ სცენარსა და ტექსტს, რათა ენა და ტერმინოლოგია თქვენს ბიზნესს მოერგოს." }, q5: { question: "რა ინფორმაციას იყენებს?", answer: "ის იყენებს თქვენს მიერ მოწოდებულ ბიზნესინფორმაციასა და ინსტრუქციებს: მისალმებას, მომსახურებას, ფასებს, სამუშაო საათებს, შეკვეთის ან ჯავშნის წესებს და სხვა მასალას." }, q6: { question: "შეუძლია ჯავშნის ან შეკვეთის დაფიქსირება?", answer: "aiCALL-ს შეუძლია დააფიქსიროს დადასტურებული ჯავშანი, შეკვეთა, შეხსენება, მიწოდება, გადახდა ან გამოკითხვის შედეგი, თუ ეს არჩეული ზარის ამოცანის ნაწილია. გამართვისას განვსაზღვრავთ ველებსა და დანიშნულებას." }, q7: { question: "გადასცემს ზარს ადამიანს?", answer: "თუ თქვენს გუნდთან პირდაპირი გადაცემა გჭირდებათ, ჯერ ვამოწმებთ, უჭერს თუ არა ამას მხარს არჩეული გეგმა და სატელეფონო გამართვა. გადაცემის გზა და ადამიანის ჩართვის შემთხვევები გაშვებამდე თანხმდება." }, q8: { question: "აქვს ცოდნის ბაზა?", answer: "ცოდნის ბაზის მხარდაჭერა გეგმასა და გამართვაზეა დამოკიდებული. გაშვებამდე ვადასტურებთ, რა ინფორმაციის გამოყენება შეუძლია aiCALL-ს და როგორ განახლდება ის." }, q9: { question: "შეუძლია მასობრივი კამპანიის ან განმეორებითი ზარების გაშვება?", answer: "მასობრივი კამპანია, დაგეგმვა და ავტომატური განმეორებითი ზარები არჩეულ გეგმასა და გამართვაზეა დამოკიდებული. ჩართვამდე განვსაზღვრავთ სიას, დროსა და განმეორების წესებს; შეთანხმებულ ფარგლებს მიღმა სიმძლავრე არ იგულისხმება." }, q10: { question: "რა ხდება ზარის შემდეგ?", answer: "ზარის შემდეგ შეთანხმებული შედეგი შეიძლება ჩაიწეროს როგორც დადასტურებული, გადადებული ან უპასუხო. ჩართვის შემთხვევაში ინახება ტრანსკრიპტი და ზარის ისტორია; შემდგომი მოქმედების გზას თქვენთან ერთად განვსაზღვრავთ." }, q11: { question: "შედის ჩაწერა და ტრანსკრიპტი?", answer: "ჩაწერა, ტრანსკრიპტი და ზარის ისტორია გეგმასა და პარამეტრებზე შეიძლება იყოს დამოკიდებული. ჩართვამდე დაადასტურეთ თანხმობა, შენახვის ვადა და არჩეული გეგმა." }, q12: { question: "უკავშირდება კალენდარს, CRM-ს ან API-ს?", answer: "კალენდრისა და CRM-ის მოქმედებები, API და ვებჰუკები არჩეულ გეგმასა და გამართვაზეა დამოკიდებული. გაშვებამდე ვადასტურებთ თითოეულ კავშირსა და მის ნებადართულ მოქმედებებს." }, q13: { question: "როგორ ითვლება შემომავალი და გამავალი ზარების ფასი?", answer: "ფასების გვერდზე შემომავალი წუთებისთვის ცალკე წუთობრივი გადასახადი არ არის მითითებული. თვიური გეგმა, ნომრის გამართვა და გამავალი გამოყენება ცალ-ცალკე ფასდება." }, q14: { question: "რა ხარჯს უნდა ველოდო?", answer: "გადაწყვეტილებამდე ცალ-ცალკე გეტყვით თვიური გეგმის, ერთჯერადი ნომრის გამართვისა და გამოყენების ხარჯებს. დამატებითი არხები და დაკავშირებული ინსტრუმენტები არჩეული გეგმისთვის ცალკე დასტურდება." }, q15: { question: "როგორ დავიწყო პილოტი?", answer: "დაიწყეთ ერთი ზარის მიზნით, ბიზნესინფორმაციით, ენებით, სატელეფონო მოთხოვნებითა და იმ შედეგით, რომლის შემოწმებაც გსურთ. მუშაობის დაწყებამდე ვადასტურებთ მოცულობას, ხარჯებსა და შემდეგ ნაბიჯებს; შედეგი შეთანხმებული წესით იზომება." } } },
  clientFit: { title: "ვისთვის არის aiCALL", description: "ბიზნესებისთვის, რომლებსაც განმეორებადი შემომავალი ან შეთანხმებული გამავალი ზარის ამოცანა და დასაფიქსირებელი შედეგი აქვთ.", ariaLabel: "ვისთვის არის aiCALL", signals: ["თქვენი გუნდი ზარებს ან შემდგომ მოქმედებებს ვერ ასწრებს.", "შეგიძლიათ აღწეროთ ბიზნესინფორმაცია და ზარის მიზანი.", "შეგიძლიათ დაასახელოთ, სად უნდა ჩაერთოს ან გადაამოწმოს ადამიანმა.", "მზად ხართ, მასშტაბის გაზრდამდე ერთი სცენარი გამოცადოთ."], notForTitle: "aiCALL შეიძლება არ გამოგადგეთ, თუ...", notForDescription: "გჭირდებათ ჯერ გამოუცდელი კავშირის დაუყოვნებლივ ამუშავება, ავტომატური გამავალი კამპანია ან ბიზნესშედეგი სცენარის გამოცდამდე.", uncertain: "არ იცით, რომელი ზარის ამოცანით დაიწყოთ? აღწერეთ ერთი რეალური სცენარი." },
  closingCta: { title: "დაიწყეთ ერთი ზარის ამოცანით", description: "მოგვწერეთ, რომელ ზარებს უნდა უპასუხოს აგენტმა ან რომელი ზარები უნდა განახორციელოს, რა შეიძლება თქვას და რა შედეგი უნდა დაფიქსირდეს. დაწყებამდე დაგიდასტურებთ ნომრის გამართვას, მოცულობასა და საორიენტაციო ხარჯებს.", successPrefix: "გმადლობთ! თქვენი მოთხოვნა მიღებულია.", checks: ["ჯერ ვაზუსტებთ ზარის მიზანსა და ბიზნესინფორმაციას.", "ცალ-ცალკე განვმარტავთ ნომრის გამართვას, გეგმის მოცულობასა და გამოყენების ხარჯებს.", "ადამიანთან გადაცემას შეთავაზებაში მხოლოდ შერჩეულ გეგმაში ამ ფუნქციის ხელმისაწვდომობის დადასტურების შემდეგ ჩავრთავთ."] },
  footer: { tagline: "კონსულტაცია. ტექნოლოგია. ხმოვანი პროცესები.", description: "aiCALL aiNOW-ის ხმოვანი პროდუქტია შემომავალი და შეთანხმებული გამავალი ზარებისთვის.", action: "პილოტის დაწყება", products: "პროდუქტები", industries: "სფეროები", resources: "რესურსები", language: "ენა", legal: "სამართლებრივი და უსაფრთხოება", blog: "ბლოგი", howWeStart: "როგორ ვიწყებთ", faq: "კითხვები და პასუხები", sendTask: "ზარის განხილვა", email: "მოგვწერეთ", privacy: "კონფიდენციალურობა", terms: "წესები და პირობები", location: "თბილისი, საქართველო", rights: "ყველა უფლება დაცულია.", backToTop: "თავში დაბრუნება ↑", industryLinks: ["კლინიკები და ესთეტიკა", "რესტორნები და HoReCa", "უძრავი ქონება და დეველოპმენტი", "ონლაინ ვაჭრობა და საცალო ბიზნესი", "ავტოსერვისი და დეტეილინგი", "იურიდიული და პროფესიული მომსახურება"] },
};

const ruLocalized: AiNowHomeCopy = {
  ...ru,
  productLabels: {
    aichats: "Общение с клиентами",
    aicall: "Голосовые операции AI",
    aicontent: "AI-контент",
    aiweb: "Сайты и веб-продукты",
    aistaff: "Подбор AI-специалистов",
    iai: "Координация процессов",
  },
  nav: {
    ...ru.nav,
    productDescriptions: {
      aichats: "Общение с клиентами",
      aicall: "Входящие и согласованные исходящие звонки",
      aistaff: "Реальные AI-специалисты для вашей компании",
      aicontent: "AI-видео и рекламный креатив",
      aiads: "Управление рекламой Meta и Google",
      aimusic: "Музыка и аудио для бренда",
      aibrain: "Знания и правила компании в одном месте",
      aioffice: "Задачи, документы и внутренние процессы",
      aidocs: "Обработка и проверка документов",
      aiweb: "Сайты и веб-продукты",
      aiapp: "Мобильные приложения для бизнеса",
      vibecoding: "Безопасная разработка приложений",
      iai: "Координация процессов",
      aijurist: "Юридические исследования и проекты документов",
      aitaxi: "Управление работой таксопарка",
    },
  },
  banner: {
    ...ru.banner,
    aichats: "Управление общением с клиентами",
    aicall: "Голосовой AI для входящих и согласованных исходящих задач",
    aicontent: "Рекламное видео и бизнес-контент",
    aiads: "Управление рекламой Meta и Google",
    aistaff: "Реальные AI-специалисты для вашей компании",
    airadar: "Мониторинг рынка и репутации",
    aiweb: "Сайты и приложения для бизнеса",
    iai: "Координация процессов",
  },
  hero: {
    ...ru.hero,
    titleLine1: "Клиенты звонят.",
    titleLine2: "AI отвечает.",
    description: "aiCALL отвечает на входящие звонки и звонит действующим клиентам по согласованной задаче. До настройки мы вместе уточняем сценарий и бизнес-информацию.",
    hint: "Начните с одной задачи звонка и её правил.",
  },
  ecosystemHub: {
    ...ru.ecosystemHub,
    satellites: {
      ...ru.ecosystemHub.satellites,
      calls: { title: "Исходящие", subtitle: "Согласованный последующий звонок", alt: "Согласованные исходящие звонки" },
      apps: { title: "Результат", subtitle: "Бронь · заказ · дальнейшее действие", alt: "Зафиксированный результат звонка" },
    },
    centerSubtitle: "AI-звонки для бизнеса",
  },
  comparison: {
    title: "Где теряются звонки?",
    description: "Выберите знакомый момент в работе со звонком.",
    action: "Обсудить задачу звонка",
    labels: { inspect: "Что мы уточним", firstStep: "Первый шаг", ask: "Что нам нужно от вас" },
    problems: {
      chats: {
        question: "Клиенты звонят, когда команда занята?",
        description: "На вопросы, запросы бронирования и заказы нужно отвечать даже тогда, когда обычный оператор недоступен.",
        detailHeading: "Пропущенный звонок — это проблема процесса",
        firstStep: "Мы выбираем один типичный входящий звонок и описываем приветствие, вопросы и результат.",
        solution: "Без понятного сценария один и тот же запрос получает разные ответы, а следующее действие может потеряться.",
        builds: ["Какие входящие звонки будет принимать aiCALL.", "Что клиент должен узнать или подтвердить.", "Когда звонок должен завершиться или перейти человеку.", "Какой результат нужно записать после звонка."],
        materials: "Ваше приветствие, информация о бизнесе, примеры звонков и правила дальнейших действий человека.",
      },
      calls: {
        question: "Зависит ли следующий звонок от одного человека?",
        description: "Действующим клиентам может понадобиться напоминание, подтверждение или звонок о доставке, но задача часто остаётся в чьём-то списке.",
        detailHeading: "Исходящей задаче нужна ясная цель",
        firstStep: "Мы определяем список клиентов, цель, границы сценария и то, что считается соединённым звонком.",
        solution: "Исходящему звонку нужны согласие, время и понятный результат; это само по себе не означает массовую кампанию или автоматические повторы.",
        builds: ["С какими действующими клиентами можно связаться.", "Чего должен достичь звонок.", "Какую информацию может использовать голосовой агент.", "Какой статус остаётся после ответа или отсутствия ответа."],
        materials: "Список клиентов, цель, сценарий, время и правила работы с исключениями.",
      },
      content: {
        question: "Исчезает ли результат звонка после разговора?",
        description: "Бронь, заказ, обратный звонок или ответ на опрос легко потерять, если никто не фиксирует результат.",
        detailHeading: "Результат важен после звонка",
        firstStep: "Мы определяем поля результата и проверяем один звонок от приветствия до записи итога.",
        solution: "Один транскрипт не является бизнес-результатом: процессу нужен статус — подтверждено, отложено или нет ответа.",
        builds: ["Какой результат должен зафиксировать звонок.", "Что клиент должен подтвердить.", "Что попадёт в историю звонков.", "Кто проверяет исключения или неясные ответы."],
        materials: "Поля результата, правила статусов, примеры звонков и ответственный за исключения.",
      },
      website: {
        question: "Нужен голосовой AI, но непонятно, что он должен делать?",
        description: "Телефонный канал понятен, но первая задача звонка, подключённая система и границы ещё не определены.",
        detailHeading: "Начните с одной задачи звонка",
        firstStep: "Мы выбираем один реальный сценарий, затем уточняем язык, настройку номера, информацию и поля результата.",
        solution: "Фокусный пилот позволяет проверить поведение звонка до расширения объёма.",
        builds: ["Какова первая задача звонка.", "Какие язык и бизнес-информация нужны.", "Какие инструменты или пути передачи доступны.", "Как будет проверяться результат."],
        materials: "Первый сценарий звонка, бизнес-информация, требования к телефону и критерии проверки.",
      },
    },
  },
  categories: {
    title: "Выберите первую задачу звонка",
    description: "aiCALL строится вокруг конкретной входящей или согласованной исходящей задачи. Язык, настройка номера, подключённые инструменты и дополнительная ёмкость подтверждаются отдельно.",
    items: {
      communication: { title: "Входящие звонки", subtitle: "Отвечайте на вопросы, брони и заказы по понятному сценарию.", products: { aichats: "Вопросы по согласованному сценарию", aicall: "Входящие ответы, брони и заказы" } },
      marketing: { title: "Согласованные исходящие задачи", subtitle: "Используйте списки действующих клиентов для напоминаний, доставки, платежей или опросов.", products: { aicontent: "Звонки действующим клиентам по задаче", aiads: "Согласованные разговоры о напоминании", aimusic: "Согласованные разговоры о доставке", aicall: "Звонки о напоминании и доставке" } },
      internal: { title: "Правила звонка и дальнейшие действия", subtitle: "Определите информацию, запись, результат и момент участия человека.", products: { aistaff: "Бизнес-контекст и правила звонка", aibrain: "Формулировки на грузинском, английском и русском", aioffice: "Статус: подтверждено, отложено или нет ответа", aidocs: "Неясные случаи требуют связи с сотрудником", aicall: "История звонка и проверка исключений" } },
      products: { title: "Подключённый процесс звонка", subtitle: "Начните с номера и инструментов, которые нужны именно этому сценарию.", products: { aiweb: "Назначенный номер и первичная настройка", aiapp: "Один входящий канал; дополнительные — по согласованию", vibecoding: "План, настройка и использование подтверждаются до покупки", aicall: "Зафиксированные детали брони или заказа" } },
    },
  },
  industries: {
    eyebrow: "У вашей сферы свои правила звонков",
    title: "Один голосовой процесс не подходит всем",
    description: "Цель звонка, информация, язык и моменты участия человека зависят от сферы, поэтому сценарий нужно определить до настройки.",
    items: {
      healthcare: { title: "Клиники и запись на приём", tag: "Здоровье и красота", description: "Пациенты звонят для записи, уточнения подготовки и дальнейшей связи.", action: "Обсудить звонок клиники", points: ["Информация об услуге, специалисте и записи направляет ответы.", "Вы решаете, какую информацию может использовать агент.", "Записи и обратные звонки фиксируются по согласованным правилам.", "Медицинские рекомендации остаются за клинической командой."] },
      horeca: { title: "Рестораны и HoReCa", tag: "Рестораны и питание", description: "Гости звонят насчёт столиков, меню, часов работы и групповых запросов.", action: "Обсудить звонок ресторана", points: ["Меню, аллергены и часы работы следуют вашим правилам.", "Детали бронирования определяются до запуска сценария.", "Для террасы, зала и групповых запросов могут действовать разные правила.", "Особые или неясные запросы обрабатывает ваша команда."] },
      "real-estate": { title: "Недвижимость и девелопмент", tag: "Недвижимость", description: "Покупатели звонят о недвижимости, бюджете и просмотре объектов.", action: "Обсудить звонок по недвижимости", points: ["Информация об объекте, цене и наличии берётся из предоставленных данных.", "Бюджет, площадь и сроки превращаются в понятные вопросы.", "Запрос на просмотр фиксируется по согласованному пути.", "Сложные финансовые или юридические вопросы рассматривает ваш специалист."] },
      ecommerce: { title: "Онлайн-торговля и розница", tag: "Интернет-магазин", description: "Покупатели звонят о товарах, заказах, доставке и возвратах.", action: "Обсудить звонок интернет-магазина", points: ["Ответы о товарах и доставке следуют вашему каталогу.", "Данные заказа записываются отдельными полями.", "Для вопросов об оплате и возврате определяются границы.", "Исключения рассматривает ответственный сотрудник."] },
      auto: { title: "Автосервис и детейлинг", tag: "Автосервис", description: "Владельцы автомобилей звонят об услуге, цене и свободном времени.", action: "Обсудить звонок автосервиса", points: ["В первых вопросах уточняются марка, модель и тип работы.", "Цены и условия следуют вашему прайс-листу.", "Запрос на бокс и время фиксируется по согласованным правилам.", "Сложной диагностикой занимается ваш специалист."] },
      legal: { title: "Юридические и профессиональные услуги", tag: "Профессиональные услуги", description: "Клиенты звонят, чтобы объяснить ситуацию и узнать следующий шаг.", action: "Обсудить профессиональный звонок", points: ["Тип вопроса и сроки уточняются без советов за пределами согласованного объёма.", "Нужная информация и путь документов следуют вашему процессу.", "Конфиденциальные или неясные вопросы рассматривает ваш специалист.", "Запись звонка остаётся рабочим материалом до проверки человеком."] },
    },
  },
  process: { title: "Как мы настраиваем голосового агента", description: "До настройки мы определяем сценарий, информацию для звонка, телефонный путь и способ проверки результата.", steps: [{ title: "Определить звонок", description: "Выбрать одну входящую или согласованную исходящую цель, язык, данные, границы и результат." }, { title: "Настроить и проверить", description: "Настроить номер и сценарий, при необходимости подключить доступные инструменты и проверить типичные звонки." }, { title: "Работать и пересматривать", description: "Работать в согласованных рамках, проверять историю и результаты и менять процесс по договорённому пути." }] },
  architecture: { eyebrow: "Голосовые операции под контролем", title: "Ваши правила звонка, ваше согласование", description: "aiCALL использует предоставленную вами информацию и инструкции. Входящие и исходящие цели, подключённые инструменты и участие человека определяются отдельно.", action: "Обсудить настройку и контроль", principle: "Принцип", rule: "● Ваше согласование", specs: [{ title: "Использовать информацию вашей команды", description: "Приветствие, услуги, цены, часы работы и условия берутся из материалов, выбранных для звонка." }, { title: "Разделить входящие и исходящие цели", description: "Ответы на входящие звонки и звонки действующим клиентам планируются как разные задачи." }, { title: "Определить результат звонка", description: "Брони, заказы, напоминания, доставки, платежи и опросы требуют понятного результата." }, { title: "Проверять неясные разговоры", description: "Сложные или неясные звонки следуют доступному для согласованного плана пути проверки человеком; это не универсальная функция." }, { title: "Записывать только выбранную историю", description: "Запись, транскрипты и история звонков зависят от плана и настроек; подтвердите их до включения." }, { title: "Ясно указывать объём и подключения", description: "Количество параллельных каналов, подключённых инструментов и API согласуется отдельно для выбранного плана." }] },
  team: { eyebrow: "Наша роль", title: "Фокусный голосовой процесс для реальной работы бизнеса", paragraphs: ["Мы — aiNOW, команда из Тбилиси, которая создаёт AI-системы для реальной работы бизнеса.", "Для aiCALL до пилота уточняем сценарий, информацию, настройку телефона и путь проверки.", "С самого начала видны цель звонка, результат и ответственность человека."], names: ru.team.names, roles: ru.team.roles, location: "Тбилиси, Грузия", year: "2026" },
  faq: { eyebrow: "[Ответы на частые вопросы]", title: "Вопросы об aiCALL", description: "Короткие ответы о задачах звонка, контроле, цене и ограничениях aiCALL.", filters: { all: "Все", pricing: "Цена и объём", tech: "Старт и процесс звонка", safety: "Данные и контроль" }, searchLabel: "Поиск вопросов", searchPlaceholder: "Найти вопрос...", questionPrefix: "Вопрос", calloutTitle: "У вас есть конкретная задача звонка?", calloutAction: "Опишите сценарий", items: { q1: { question: "Что такое aiCALL?", answer: "aiCALL — голосовой AI-агент для входящих и согласованных исходящих звонков: бронирований, заказов, напоминаний, доставок, платежей и опросов." }, q2: { question: "Может ли aiCALL отвечать на входящие звонки?", answer: "aiCALL может отвечать на входящие звонки. Сначала мы подтверждаем номер, ожидаемый объём и настройку сценария." }, q3: { question: "Может ли он звонить действующим клиентам?", answer: "Да, для определённой цели — например, напоминания или подтверждения. Сначала мы определяем список клиентов, цель и сценарий; массовые кампании и автоматические повторы зависят от выбранного плана." }, q4: { question: "Какие языки поддерживаются?", answer: "aiCALL можно подготовить для грузинского, русского и английского языков. До запуска мы проверяем точный текст и сценарий, чтобы язык и термины подходили бизнесу." }, q5: { question: "Какую информацию он использует?", answer: "Он использует предоставленные вами информацию и инструкции: приветствие, услуги, цены, часы работы, правила заказа или бронирования и другие материалы." }, q6: { question: "Может ли он фиксировать брони или заказы?", answer: "aiCALL может записать подтверждённую бронь, заказ, напоминание, доставку, платёж или результат опроса, если это входит в задачу звонка. При настройке мы определяем поля и назначение." }, q7: { question: "Передаёт ли он звонок человеку?", answer: "Если нужен прямой перевод вашей команде, сначала проверяем поддержку этой функции в плане и телефонной настройке. Путь передачи и ситуации участия человека согласуются до запуска." }, q8: { question: "Есть ли база знаний?", answer: "Поддержка базы знаний зависит от плана и настройки. До запуска мы подтверждаем, какую информацию может использовать aiCALL и как она будет обновляться." }, q9: { question: "Может ли он запускать массовые кампании или повторы?", answer: "Массовые кампании, планирование и автоматические повторы зависят от плана и настройки. До включения мы определяем список, время и правила повтора; объём сверх согласованных рамок не предполагается." }, q10: { question: "Что происходит после звонка?", answer: "После звонка согласованный результат можно записать как подтверждённый, отложенный или без ответа. Если включены соответствующие настройки, сохраняются транскрипт и история; дальнейший путь определяется вместе с вами." }, q11: { question: "Входят ли запись и транскрипты?", answer: "Запись, транскрипты и история звонков могут зависеть от плана и настроек. До включения подтвердите согласие, срок хранения и выбранный план." }, q12: { question: "Можно ли подключить календарь, CRM или API?", answer: "Действия в календаре и CRM, API и вебхуки зависят от плана и настройки. До запуска мы подтверждаем каждое подключение и разрешённые действия." }, q13: { question: "Как рассчитывается цена входящих и исходящих звонков?", answer: "На странице цен для входящих минут не указана отдельная поминутная плата. Ежемесячный план, настройка номера и исходящее использование рассчитываются отдельно." }, q14: { question: "Какие расходы меня ожидают?", answer: "До решения мы отдельно указываем ежемесячный план, разовую настройку номера и расходы на использование. Дополнительные каналы и подключённые инструменты подтверждаются для выбранного плана." }, q15: { question: "Как начать пилот?", answer: "Начните с одной цели звонка, бизнес-информации, языков, требований к телефону и результата, который хотите проверить. До начала работы мы подтверждаем объём, расходы и следующие шаги; результат измеряется по согласованным правилам." } } },
  clientFit: { title: "Для кого подходит aiCALL", description: "Для бизнеса с повторяющейся входящей или согласованной исходящей задачей звонка и понятным результатом для фиксации.", ariaLabel: "Для кого подходит aiCALL", signals: ["Команда пропускает звонки или задачи дальнейшей связи.", "Вы можете описать бизнес-информацию и цель звонка.", "Вы можете указать, где нужен просмотр или участие человека.", "Вы готовы проверить один сценарий до расширения объёма."], notForTitle: "aiCALL может не подойти, если...", notForDescription: "Вам нужно сразу запустить непроверенное подключение, автоматическую исходящую кампанию или получить бизнес-результат до проверки сценария.", uncertain: "Не знаете, с какой задачей звонка начать? Опишите один реальный сценарий." },
  closingCta: { title: "Начните с одной задачи звонка", description: "Расскажите, на какие звонки нужно отвечать или звонить, что агент может говорить и какой результат фиксировать. До начала подтвердим настройку телефона, объём и ориентировочные расходы.", successPrefix: "Спасибо! Запрос получен.", checks: ["Сначала определяем цель звонка и бизнес-информацию.", "Отдельно указываем настройку телефона, объём плана и расходы на использование.", "Перевод человеку не представляем как часть настройки, пока он не подтверждён." ] },
  footer: { tagline: "Консультация. Технологии. Голосовые процессы.", description: "aiCALL — голосовой продукт aiNOW для входящих и согласованных исходящих задач звонка.", action: "Начать пилот", products: "Продукты", industries: "Сферы", resources: "Ресурсы", language: "Язык", legal: "Право и безопасность", blog: "Блог", howWeStart: "Как начинаем", faq: "Вопросы и ответы", sendTask: "Обсудить звонки", email: "Написать нам", privacy: "Конфиденциальность", terms: "Условия", location: "Тбилиси, Грузия", rights: "Все права защищены.", backToTop: "Наверх ↑", industryLinks: ["Клиники и эстетика", "Рестораны и HoReCa", "Недвижимость и девелопмент", "Онлайн-торговля и розница", "Автосервис и детейлинг", "Юридические и профессиональные услуги"] },
};

const FACT_ALIGNED_FAQ = {
  en: {
    q13: { question: "How are incoming and outgoing calls priced?", answer: "Incoming call minutes are free. The monthly plan, phone setup and connected outgoing call minutes are priced separately." },
    q7: { question: "Does it transfer calls to a person?", answer: "Live human handoff is not included in Starter or Business and is planned for Premium, Enterprise and Custom. We confirm the route before launch; universal live transfer is not included." },
    q8: { question: "Does it include a knowledge base?", answer: "Knowledge-base support is not included in Starter and is planned for the other plans. We confirm the information source and update path before launch." },
    q9: { question: "Can it run batch call campaigns or retries?", answer: "Batch call campaigns are not included in Starter and are planned for the other plans. Scheduling and automatic retries are not included in Starter or Business and are planned for Premium, Enterprise and Custom; we confirm the selected plan before enabling them." },
    q12: { question: "Can it connect a calendar, CRM or API?", answer: "Calendar and CRM actions are not included in Starter and are planned for the other plans. API and webhooks are not included in Starter or Business and are planned for Premium, Enterprise and Custom; we confirm each connection and its permitted actions before launch." },
  },
  ka: {
    q13: { question: "როგორ ითვლება შემომავალი და გამავალი ზარების ფასი?", answer: "შემომავალი წუთები უფასოა. თვიური პაკეტი, ნომრის გამართვა და გამავალი ზარების წუთები ცალკე ფასდება." },
    q7: { question: "გადასცემს ზარს ადამიანს?", answer: "ადამიანთან პირდაპირი გადაცემა Starter და Business გეგმებში არ შედის, ხოლო Premium, Enterprise და Custom გეგმებისთვის დაგეგმილია. გაშვებამდე ვადასტურებთ გზას; უნივერსალური გადაცემა არ შედის." },
    q8: { question: "აქვს ცოდნის ბაზა?", answer: "ცოდნის ბაზა Starter გეგმაში არ შედის, სხვა გეგმებისთვის კი დაგეგმილია. გაშვებამდე ვადასტურებთ ინფორმაციის წყაროსა და განახლების გზას." },
    q9: { question: "შეუძლია მასობრივი კამპანიის ან განმეორებითი ზარების გაშვება?", answer: "მასობრივი ზარები Starter გეგმაში არ შედის, სხვა გეგმებისთვის კი დაგეგმილია. დაგეგმვა და ავტომატური განმეორებითი ზარები Starter და Business გეგმებში არ შედის, Premium, Enterprise და Custom გეგმებისთვის კი დაგეგმილია; ჩართვამდე ვადასტურებთ არჩეულ გეგმას." },
    q12: { question: "უკავშირდება კალენდარს, CRM-ს ან API-ს?", answer: "კალენდრისა და CRM-ის მოქმედებები Starter გეგმაში არ შედის, სხვა გეგმებისთვის კი დაგეგმილია. API და ვებჰუკები Starter და Business გეგმებში არ შედის, Premium, Enterprise და Custom გეგმებისთვის კი დაგეგმილია; გაშვებამდე ვადასტურებთ თითოეულ კავშირსა და ნებადართულ მოქმედებებს." },
  },
  ru: {
    q13: { question: "Как рассчитывается цена входящих и исходящих звонков?", answer: "Входящие минуты бесплатны. Месячный пакет, настройка номера и минуты исходящих звонков оплачиваются отдельно." },
    q7: { question: "Передаёт ли он звонок человеку?", answer: "Прямая передача человеку не входит в Starter и Business и запланирована для Premium, Enterprise и Custom. До запуска мы подтверждаем путь; универсальная передача не включена." },
    q8: { question: "Есть ли база знаний?", answer: "База знаний не входит в Starter и запланирована для остальных планов. До запуска мы подтверждаем источник информации и путь обновления." },
    q9: { question: "Может ли он запускать массовые кампании или повторы?", answer: "Массовые кампании не входят в Starter и запланированы для остальных планов. Планирование и автоматические повторы не входят в Starter и Business и запланированы для Premium, Enterprise и Custom; до включения мы подтверждаем выбранный план." },
    q12: { question: "Можно ли подключить календарь, CRM или API?", answer: "Действия в календаре и CRM не входят в Starter и запланированы для остальных планов. API и вебхуки не входят в Starter и Business и запланированы для Premium, Enterprise и Custom; до запуска мы подтверждаем каждое подключение и разрешённые действия." },
  },
} as const;

Object.assign(en.faq.items, FACT_ALIGNED_FAQ.en);
Object.assign(kaLocalized.faq.items, FACT_ALIGNED_FAQ.ka);
Object.assign(ruLocalized.faq.items, FACT_ALIGNED_FAQ.ru);
kaLocalized.footer.legal = "წესები და უსაფრთხოება";
ruLocalized.closingCta.description = "Расскажите, на какие звонки нужно отвечать и кому нужно звонить, что агент может говорить и какой результат фиксировать. До начала подтвердим настройку телефона, объём и ориентировочные расходы.";
ruLocalized.process.steps[2].title = "Проверять звонки и улучшать сценарий";

export const AI_NOW_HOME_COPY: Record<AiNowHomeLocale, AiNowHomeCopy> = { ka: kaLocalized, en, ru: ruLocalized, de: en, tr: en, fa: en, zh: en };

const AICALL_BANNER_FUNCTIONS = {
  ka: { inbound: "უპასუხეთ შემომავალ ზარს", outbound: "დამტკიცებული შემდგომი ზარი", rules: "კონტექსტი და ზარის წესები", outcome: "დაფიქსირებული შედეგი", language: "ენა და ტერმინები", consent: "თანხმობა და ფარგლები", review: "ადამიანის შემოწმება", limits: "სიმძლავრე და კავშირები" },
  en: { inbound: "Answer an incoming call", outbound: "Approved customer follow-up", rules: "Call context and rules", outcome: "Record the agreed outcome", language: "Language and terminology", consent: "Consent and scope", review: "Human review path", limits: "Capacity and connections" },
  ru: { inbound: "Ответить на входящий звонок", outbound: "Звонок по согласованной задаче", rules: "Контекст и правила звонка", outcome: "Зафиксировать результат", language: "Язык и терминология", consent: "Согласие и границы", review: "Путь проверки человеком", limits: "Ёмкость и подключения" },
} as const;

export function getAiNowHomeCopy(locale: string): AiNowHomeCopy {
  const contentLocale = locale === "ka" || locale === "ru" ? locale : "en";
  const copy = AI_NOW_HOME_COPY[(locale in AI_NOW_HOME_COPY ? locale : "en") as AiNowHomeLocale];
  Object.assign(copy.banner, AICALL_BANNER_FUNCTIONS[contentLocale]);
  copy.architecture.rule = copy.architecture.rule.replace(/^●\s*/u, "");
  return copy;
}
