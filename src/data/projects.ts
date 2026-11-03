export type ProjectStatus = "Prototype" | "In development" | "Private build";
export type ProjectVisual = "bookflow" | "univer" | "lead-hunter" | "diagnostic" | "lectureai" | "beauty" | "shorts" | "daypilot" | "boutique" | "agents";

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
    solution: "I built a local multi-salon experience with search, a booking wizard and an account view, then started a multi-tenant SaaS version with its own API, database and availability engine.",
    features: ["Search across four illustrative salons", "Time slots calculated in Europe/Chisinau", "Availability engine that intersects schedules and guards concurrent reservations", "Business setup wizard, catalog and public booking page"],
    stack: ["React", "TypeScript", "Vite", "Node.js", "PostgreSQL", "Redis", "Docker"],
    outcome: "Working local MVP with demonstrative salon data. The SaaS rebuild is complete through its fifth milestone; public booking lifecycle, notifications and payments are still future work.",
    repository: "Private repository",
    mediaWishList: ["Search and discovery screen", "Service and time selection", "Booking confirmation", "10–20 second booking flow recording"],
  },
  {
    slug: "univer",
    name: "Univer",
    eyebrow: "Learning workflow · 2026",
    summary: "A local pipeline that turns long lecture recordings into structured notes for Obsidian.",
    status: "In development",
    featured: false,
    visual: "univer",
    number: "04",
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
    featured: false,
    visual: "lead-hunter",
    number: "05",
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
    summary: "A trilingual web quiz that finds a business bottleneck and estimates impact only from supplied numbers.",
    status: "Prototype",
    featured: false,
    visual: "diagnostic",
    number: "06",
    problem: "Generic questionnaires jump to recommendations before they understand a real bottleneck.",
    solution: "The interview adapts its next question and builds an evidence-linked report with 30/50/70% improvement scenarios, with a deterministic path when AI is unavailable.",
    features: ["Romanian, Russian and English sessions", "Adaptive questions and answer-supported estimates", "Lead capture into local SQLite", "Optional guarded AI follow-ups"],
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
    number: "07",
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
    number: "08",
    problem: "Handling appointment requests in chat makes available times and changes hard to track.",
    solution: "I built a conversational flow for browsing services, choosing a time, managing bookings and reviewing appointments as the owner.",
    features: ["Service and calendar menus", "Booking and cancellation flows", "Owner appointment views", "Reminder job"],
    stack: ["Python", "Telegram Bot API"],
    outcome: "Code for the bot and its flows is in a private repository. Live operation and real customer use have not been verified.",
    repository: "Private repository",
    mediaWishList: ["Redacted customer booking conversation", "Owner calendar view"],
  },
  {
    slug: "boutique-crm",
    name: "Boutique Site & CRM",
    eyebrow: "Client website · 2026",
    summary: "A trilingual website for a fashion boutique in Chișinău, with fitting bookings and a staff CRM.",
    status: "Private build",
    featured: false,
    visual: "boutique",
    number: "09",
    problem: "A small boutique handled its catalog, fitting appointments and client notes across separate channels.",
    solution: "I built a storefront with a lookbook and fitting booking, plus a staff panel with stylist calendars, client history and an AI operations assistant.",
    features: ["Russian, Romanian and English versions", "Fitting booking by stylist, date and time", "Client CRM with visit history and preferences", "Notification log and optional Gemini assistant"],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Gemini API"],
    outcome: "Complete local build with a demonstration mode when no AI key is set. Public launch and real client data have not been verified.",
    repository: "Private repository",
    mediaWishList: ["Homepage and lookbook", "Fitting booking flow", "Redacted staff calendar"],
  },
  {
    slug: "ai-video-studio",
    name: "AI Video Studio",
    eyebrow: "Media automation · 2026",
    summary: "Local pipelines that turn a researched script into finished vertical and horizontal videos with voice, subtitles and animation.",
    status: "In development",
    featured: true,
    visual: "shorts",
    number: "02",
    problem: "Producing a short video requires repetitive scripting, narration, footage selection, editing and checks before publishing.",
    solution: "I connected those steps into code-driven pipelines: sourced scripts, local text-to-speech, word-timed subtitles, programmatic animation and automated QA of every render.",
    features: ["Episode scaffolding, validation and QA commands", "Local voices with word-level timing", "Animated scenes rendered in code at 1080×1920", "Brand promo videos from uploaded photos", "Source and media-license tracking"],
    stack: ["TypeScript", "Remotion", "Python", "FFmpeg", "Kokoro / Qwen TTS", "whisper.cpp"],
    outcome: "Dozens of episodes and two brand promos rendered locally. Audience results and automated publishing have not been verified for this portfolio.",
    repository: "Private repository",
    mediaWishList: ["Approved example output video", "Pipeline diagram", "Contact sheet of a rendered episode"],
  },
  {
    slug: "daypilot",
    name: "DayPilot AI",
    eyebrow: "Personal assistant · 2026",
    summary: "A Telegram assistant that keeps tasks, reminders, class schedule, calendar and weather in one chat.",
    status: "Private build",
    featured: true,
    visual: "daypilot",
    number: "03",
    problem: "Daily planning was spread across a calendar, a university timetable, reminders and weather apps.",
    solution: "I built a Telegram assistant that understands plain-language commands offline and hands harder questions to an AI model, while keeping every core feature working when the AI is unavailable.",
    features: ["Plain-language tasks and reminders", "Timetable with odd/even weeks and cancellations", "Read-only Google Calendar sync", "Morning briefing with weather and clothing tips"],
    stack: ["Python", "aiogram 3", "Gemini API", "Google Calendar API", "SQLite", "APScheduler", "Docker"],
    outcome: "Running build with automated tests for parsing, scheduling and handlers. Used by its author; not offered as a public service.",
    repository: "Private repository",
    mediaWishList: ["Morning briefing message", "Reminder conversation", "Weekly schedule view"],
  },
  {
    slug: "agent-system",
    name: "AI Agent System",
    eyebrow: "Developer tooling · 2026",
    summary: "A local orchestrator that runs replaceable AI coding workers inside isolated Git worktrees with approval gates.",
    status: "In development",
    featured: false,
    visual: "agents",
    number: "10",
    problem: "Delegating coding tasks to AI agents is risky without isolation, review and explicit approval before changes land.",
    solution: "I designed a deterministic orchestration core that stops at clarification, review, failure and approval gates, with commit and merge approved separately.",
    features: ["Task worktree per job", "Pluggable executors, including Codex CLI", "Resumable finalization after approval", "Schema-validated task records"],
    stack: ["Python", "Git", "Codex CLI", "JSON Schema"],
    outcome: "Version 1 core with an automated test suite. Used locally; not packaged for others.",
    repository: "Private repository",
    mediaWishList: ["Task run in the terminal", "Approval gate example"],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const moreProjects = projects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
