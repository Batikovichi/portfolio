import type { Metadata } from "next";
import Link from "next/link";
import { EmbroideryDemo } from "@/components/embroidery-demo";

export const metadata: Metadata = {
  title: "Demo: comandă broderie cu logo pentru firme",
  description: "Demo conceptual: clientul alege produsul, încarcă logoul, vede prețul și trimite cererea gata calculată.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="atl" lang="ro">
      <div className="container">
        <p className="atl-banner">
          Demo conceptual pregătit de Adrian pentru Atelier.md. Nu este site-ul oficial al atelierului; prețurile sunt orientative.
        </p>
        <header className="atl-hero">
          <span className="eyebrow">BRODERIE COMPUTERIZATĂ PENTRU FIRME</span>
          <h1>
            Logoul vostru pe uniforme. <em>Prețul — în 30 de secunde.</em>
          </h1>
          <p>Alegeți produsul, încărcați logoul și cantitatea. Vedeți cum arată și cât costă, iar cererea ajunge la atelier gata calculată.</p>
        </header>
        <EmbroideryDemo />
        <section className="atl-how">
          <div><b>Pentru client</b><p>Vede prețul imediat, chiar seara sau în weekend, fără să aștepte un răspuns.</p></div>
          <div><b>Pentru atelier</b><p>Primește pe WhatsApp cererea completă: produs, loc, mărime, cantitate, logo și telefon.</p></div>
          <div><b>Ce se adaptează</b><p>Prețurile, produsele, reducerile și textele — după lista voastră. Poate funcționa și în rusă.</p></div>
        </section>
        <p className="atl-foot">
          Adrian · site-uri, chat-boți și automatizări pentru firme · <a href="tel:+37367540092">+373 675 40 092</a> ·{" "}
          <a href="https://t.me/batikovichi" target="_blank" rel="noopener noreferrer">Telegram @batikovichi</a> · <Link href="/ro">alte exemple</Link>
        </p>
      </div>
    </main>
  );
}
