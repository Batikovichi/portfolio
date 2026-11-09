import type { Metadata } from "next";
import Link from "next/link";
import { CatalogBotDemo } from "@/components/catalog-bot-demo";

export const metadata: Metadata = {
  title: "Demo: bot care răspunde din catalogul și prețurile firmei",
  description: "Demo: un asistent pe site sau în Telegram care răspunde clienților din catalogul, prețurile și condițiile firmei, în română și rusă.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="atl" lang="ro">
      <div className="container">
        <p className="atl-banner">
          Demo cu o firmă fictivă (MetalDemo) și prețuri exemplu. În versiunea reală botul primește catalogul, prețurile și condițiile firmei voastre.
        </p>
        <header className="atl-hero">
          <span className="eyebrow">ASISTENT PE SITE ȘI ÎN TELEGRAM · RO / RU</span>
          <h1>
            Clientul întreabă la 23:00. <em>Botul răspunde din prețurile voastre.</em>
          </h1>
          <p>
            Prețuri, culori, livrare, montaj — răspunsuri pe loc, cu calcul pentru suprafața clientului. Ce nu e în catalog, botul nu inventează: trimite
            întrebarea managerului.
          </p>
        </header>
        <CatalogBotDemo />
        <section className="atl-how">
          <div><b>Pentru client</b><p>Primește prețul și condițiile imediat, în limba lui, fără să aștepte un apel.</p></div>
          <div><b>Pentru manageri</b><p>Mai puține întrebări repetate la telefon. Primesc doar clienții gata de comandă și întrebările noi.</p></div>
          <div><b>Ce trebuie de la voi</b><p>Catalogul, lista de prețuri și condițiile de livrare — în orice format: PDF, Excel, Word.</p></div>
        </section>
        <p className="atl-foot">
          Adrian · site-uri, chat-boți și automatizări pentru firme · <a href="tel:+37367540092">+373 675 40 092</a> ·{" "}
          <a href="https://t.me/batikovichi" target="_blank" rel="noopener noreferrer">Telegram @batikovichi</a> · <Link href="/demo/atelier">alt demo</Link> ·{" "}
          <Link href="/ro">despre mine</Link>
        </p>
      </div>
    </main>
  );
}
