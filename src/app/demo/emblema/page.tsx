import type { Metadata } from "next";
import { FamilyBotDemo } from "@/components/family-bot-demo";

export const metadata: Metadata = {
  title: "Asistent pentru Emblema și Metalic.md",
  description: "Demo: un asistent pe site și în Telegram care răspunde clienților Emblema și Metalic.md 24/7, în română și rusă.",
  robots: { index: false, follow: false },
};

const stats = [
  { n: "24/7", t: "răspunde și seara, și în weekend" },
  { n: "RO / RU", t: "în limba în care scrie clientul" },
  { n: "0", t: "prețuri inventate — doar de pe site-ul vostru" },
];

export default function Page() {
  return (
    <main className="fb" lang="ro">
      <section className="fb-hero">
        <div className="container">
          <span className="fb-kicker">Pregătit de Adrian pentru nanu Misha · Emblema + Metalic.md</span>
          <h1>
            Clienții întreabă prețul. <em>Asistentul răspunde imediat</em> — și vă trimite comanda gata.
          </h1>
          <p>
            Un asistent pe site, în WhatsApp sau Telegram, care cunoaște produsele, prețurile și condițiile de livrare ale Emblema și Metalic.md. Pentru
            etichete cu logo, seifuri sau rafturi, unde prețul se face la comandă, adună detaliile și le trimite managerului.
          </p>
          <div className="fb-stats">
            {stats.map((s) => (
              <div key={s.n}>
                <b>{s.n}</b>
                <span>{s.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container fb-demo">
        <h2>Încercați-l acum</h2>
        <p className="fb-note">
          Demo: prețurile sunt cele publicate pe emblema.md și metalic.md (noiembrie 2026). Butoanele de jos sunt întrebări gata făcute — sau scrieți orice.
        </p>
        <FamilyBotDemo />
      </section>

      <section className="container fb-steps">
        <h2>Cum ar funcționa la voi</h2>
        <ol>
          <li>
            <b>Îi dăm ce aveți deja</b>
            <p>Catalogul de pe site, prețurile, condițiile de livrare. Nimic nou de scris.</p>
          </li>
          <li>
            <b>Îl punem unde vă scriu clienții</b>
            <p>Pe emblema.md și metalic.md, în WhatsApp sau într-un bot de Telegram.</p>
          </li>
          <li>
            <b>Voi primiți doar cererile serioase</b>
            <p>Cu produs, cantitate, oraș și telefon — direct în Telegram-ul managerului.</p>
          </li>
        </ol>
      </section>

      <section className="fb-cta">
        <div className="container">
          <h2>Vă arăt în 10 minute cum ar arăta pe site-ul vostru.</h2>
          <p>
            Adrian · <a href="tel:+37367540092">+373 675 40 092</a> ·{" "}
            <a href="https://t.me/batikovichi" target="_blank" rel="noopener noreferrer">
              Telegram @batikovichi
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
