export type ProjectStatus = "Prototype" | "In development" | "Private build";
export type ProjectVisual = "bookflow" | "univer" | "lead-hunter" | "diagnostic" | "lectureai" | "beauty" | "shorts";

export interface Project {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  status: ProjectStatus;
  featured: boolean;
  visual: ProjectVisual;
  number: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  outcome: string;
  repository: "Private repository" | "Not published";
  demoUrl?: string;
  sourceUrl?: string;
  mediaWishList: string[];
}

// Only reviewable, publication-safe summaries belong here. No private URLs, credentials or client data.
export const projects: Project[] = [
  {
    slug: "bookflow",
    name: "BookFlow AI",
    eyebrow: "Booking platform · 2026",
    summary: "A booking prototype that brings service discovery and appointment scheduling into one clear flow.",
    status: "Prototype",
    featured: true,
    visual: "bookflow",
    number: "01",
    problem: "Finding an available specialist often means jumping between listings, messages and calendars.",
    solution: "I built a local multi-salon experience with search, a booking wizard and an account view, backed by a shared availability calculation.",
    features: ["Search across four illustrative salons", "Time slots calculated in Europe/Chisinau", "Booking flow and account UI", "Local browser persistence for demo bookings"],
    stack: ["React", "TypeScript", "Vite", "Node.js", "Tailwind CSS"],
    outcome: "Working local MVP with demonstrative salon data. Production booking, identity checks, notifications and payments are still future work.",
    repository: "Private repository",
    mediaWishList: ["Search and discovery screen", "Service and time selection", "Booking confirmation", "10–20 second booking flow recording"],
  },
  {
    slug: "univer",
    name: "Univer",
    eyebrow: "Learning workflow · 2026",
    summary: "A local pipeline that turns long lecture recordings into structured notes for Obsidian.",
    status: "In development",
    featured: true,
    visual: "univer",
    number: "02",
    problem: "Long recordings are valuable but hard to revisit, search and turn into study material.",
    solution: "I designed an upload-to-notes pipeline with chunked transcription, resumable jobs and replaceable language-model adapters.",
    features: ["Audio upload through a small API", "Chunked transcription for long lectures", "SQLite-backed job state", "Structured Markdown output for Obsidian"],
    stack: ["Python", "FastAPI", "faster-whisper", "SQLite", "Docker"],
    outcome: "Local implementation and automated tests exist. Public hosting and a browser demo have not been verified.",
    repository: "Private repository",
    mediaWishList: ["Upload or job-status screen", "Redacted sample Markdown note", "Pipeline diagram", "Short upload-to-note recording"],
  },
  {
    slug: "lead-hunter",
    name: "Lead Hunter",
    eyebrow: "Research workflow · 2026",
    summary: "A bounded research workflow that prepares sourced prospect records and draft outreach for review.",
    status: "Private build",
    featured: true,
    visual: "lead-hunter",
    number: "03",
    problem: "Manual prospect research is repetitive, while unsourced contact data is difficult to trust.",
    solution: "I packaged a repeatable workflow that collects public-source evidence, validates structured output and leaves outreach to a human reviewer.",
    features: ["Source-linked prospect records", "Structured JSON and CSV output", "Validation for missing or unsafe contact evidence", "Draft-only outreach workflow"],
    stack: ["Python", "Codex CLI", "JSON", "CSV"],
    outcome: "The package passed a bounded live research check and validator tests. Deliverability, replies and sending were not tested.",
    repository: "Private repository",
    mediaWishList: ["Redacted research result", "Validation flow diagram", "10–20 second review walkthrough"],
  },
  {
    slug: "business-diagnostic",
    name: "Business Diagnostic",
    eyebrow: "Decision support · 2026",
    summary: "A local interview that asks follow-up questions and estimates business impact only from supplied numbers.",
    status: "Prototype",
    featured: false,
    visual: "diagnostic",
    number: "04",
    problem: "Generic questionnaires jump to recommendations before they understand a real bottleneck.",
    solution: "The interview adapts its next question and builds an evidence-linked report, with a deterministic path when AI is unavailable.",
    features: ["Adaptive questions", "Answer-supported estimates", "Local SQLite sessions", "Optional guarded AI follow-ups"],
    stack: ["Node.js", "JavaScript", "SQLite", "Gemini API"],
    outcome: "Local prototype with automated tests; phone access and live AI behavior depend on separate configuration.",
    repository: "Not published",
    mediaWishList: ["Interview screen", "Redacted results report"],
  },
  {
    slug: "lectureai",
    name: "LectureAI",
    eyebrow: "Student workspace · 2026",
    summary: "A study workspace concept for notes, flashcards, quizzes and a context-aware tutor.",
    status: "In development",
    featured: false,
    visual: "lectureai",
    number: "05",
    problem: "Study material is scattered across recordings, documents and notes.",
    solution: "I explored a single workspace around each lecture, with study tools and a planned ingestion pipeline.",
    features: ["Lecture workspace UI", "Notes and flashcard flows", "Quiz and tutor interfaces", "Planned ingestion workers"],
    stack: ["Next.js", "TypeScript", "React", "Supabase"],
    outcome: "Prototype UI and service modules exist. Some flows use mock data; end-to-end production ingestion is not verified.",
    repository: "Private repository",
    mediaWishList: ["Lecture workspace", "Flashcard and quiz screens"],
  },
  {
    slug: "beauty-bot",
    name: "Beauty Bot",
    eyebrow: "Appointment assistant · 2026",
    summary: "A private Telegram booking bot for a beauty service, with customer and owner flows.",
    status: "Private build",
    featured: false,
    visual: "beauty",
    number: "06",
    problem: "Handling appointment requests in chat makes available times and changes hard to track.",
    solution: "I built a conversational flow for browsing services, choosing a time, managing bookings and reviewing appointments as the owner.",
    features: ["Service and calendar menus", "Booking and cancellation flows", "Owner appointment views", "Reminder job"],
    stack: ["Python", "Telegram Bot API"],
    outcome: "Code for the bot and its flows is in a private repository. Live operation and real customer use have not been verified.",
    repository: "Private repository",
    mediaWishList: ["Redacted customer booking conversation", "Owner calendar view"],
  },
  {
    slug: "shorts-studio",
    name: "Shorts Studio",
    eyebrow: "Media automation · 2026",
    summary: "Experiments in turning a generated script, voice and stock footage into short videos.",
    status: "Prototype",
    featured: false,
    visual: "shorts",
    number: "07",
    problem: "Producing a short video requires repetitive scripting, narration, footage selection and editing.",
    solution: "I connected those steps in a Python pipeline and explored scheduled publishing as a separate step.",
    features: ["Script generation", "Text-to-speech narration", "Footage and subtitle assembly", "Optional upload workflow"],
    stack: ["Python", "MoviePy", "Pexels API", "YouTube API"],
    outcome: "Two private repository variants contain pipeline code. Automated publishing and output quality have not been verified for this portfolio.",
    repository: "Private repository",
    mediaWishList: ["Approved example output video", "Pipeline diagram", "Editing timeline or output screen"],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const moreProjects = projects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
