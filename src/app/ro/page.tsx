import type { Metadata } from "next";
import { BusinessPage } from "@/components/business-page";

export const metadata: Metadata = {
  title: "Site-uri, calculatoare de preț și chat-boți pentru firme",
  description: "Adrian, freelancer din Chișinău: calculatoare de preț pe site, cereri direct în Telegram, chat-boți și site-uri pentru firme de mobilă, metal, construcții și producție.",
  alternates: { languages: { ro: "/ro", ru: "/ru" } },
};

export default function Page() {
  return <BusinessPage lang="ro" />;
}
