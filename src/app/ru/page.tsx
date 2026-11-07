import type { Metadata } from "next";
import { BusinessPage } from "@/components/business-page";

export const metadata: Metadata = {
  title: "Сайты, калькуляторы стоимости и чат-боты для бизнеса",
  description: "Адриан, фрилансер из Кишинёва: калькуляторы цены на сайте, заявки сразу в Telegram, чат-боты и сайты для мебельщиков, металлистов, строителей и производителей.",
  alternates: { languages: { ro: "/ro", ru: "/ru" } },
};

export default function Page() {
  return <BusinessPage lang="ru" />;
}
