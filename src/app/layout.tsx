import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: { default: "Adrian — Software & AI projects", template: "%s | Adrian" },
  description: "Selected software, AI and workflow projects by Adrian. Clear ideas, considered interfaces, working prototypes.",
  applicationName: "Adrian Portfolio",
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  openGraph: {
    title: "Adrian — Software & AI projects",
    description: "Selected software, AI and workflow projects by Adrian.",
    type: "website",
    siteName: "Adrian Portfolio",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const themeScript = `try{const saved=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=saved==='dark'||saved==='light'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.theme='light'}`;

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}} /></head><body className={`${display.variable} ${body.variable}`} id="top"><SiteHeader/>{children}<SiteFooter/></body></html>;
}
