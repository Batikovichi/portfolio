import Link from "next/link";
import { ArrowDown, ArrowUpRight, Calculator, Bot, MessageSquareText, MonitorSmartphone, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { PriceCalculator } from "@/components/price-calculator";
import { contact, copy, type Lang } from "@/data/business";

const serviceIcons = [Calculator, Send, Bot, MonitorSmartphone];

export function BusinessPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <main className="biz" lang={lang}>
      <section className="container biz-hero">
        <div className="biz-topline">
          <span className="eyebrow">{t.heroKicker}</span>
          <nav className="biz-lang" aria-label="Language">
            <span aria-current="page">{t.langLabel}</span>
            <Link href={t.otherLang.href}>{t.otherLang.label}</Link>
          </nav>
        </div>
        <h1>
          {t.heroTitle[0]}
          <br />
          <em>{t.heroTitle[1]}</em>
        </h1>
        <p className="biz-lead">{t.heroText}</p>
        <div className="hero-actions">
          <Button asChild>
            <a href="#demo">
              {t.heroCta} <ArrowDown size={17} />
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href="#contact">
              {t.heroCta2} <ArrowUpRight size={17} />
            </a>
          </Button>
        </div>
      </section>

      <section className="section container">
        <h2 className="biz-h2">{t.servicesTitle}</h2>
        <div className="biz-services">
          {t.services.map((s, i) => {
            const Icon = serviceIcons[i] ?? MessageSquareText;
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="biz-card">
                  <span className="capability-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="demo" className="section biz-demo">
        <div className="container">
          <span className="eyebrow">{t.demoKicker}</span>
          <h2 className="biz-h2">{t.demoTitle}</h2>
          <p className="biz-sub">{t.demoText}</p>
          <PriceCalculator t={t.calc} />
        </div>
      </section>

      <section className="section container">
        <h2 className="biz-h2">{t.stepsTitle}</h2>
        <ol className="biz-steps">
          {t.steps.map((s, i) => (
            <li key={s.title}>
              <span className="biz-step-n">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section container">
        <h2 className="biz-h2">{t.projectsTitle}</h2>
        <p className="biz-sub">{t.projectsAside}</p>
        <div className="biz-projects">
          {t.projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.04}>
              <article className="biz-card biz-project">
                <div className="biz-project-top">
                  <span>{p.tag}</span>
                  <span className="status-badge">{p.status}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <ul>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="biz-honest">
          <h3>{t.honestTitle}</h3>
          <p>{t.honestText}</p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-inner">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <div className="biz-contacts">
            <a href={`mailto:${contact.email}`}>
              <Mail size={20} /> {contact.email}
            </a>
            {contact.phone && (
              <a href={`tel:${contact.phone}`}>
                <Phone size={20} /> {contact.phone}
              </a>
            )}
            {contact.telegram && (
              <a href={`https://t.me/${contact.telegram}`} target="_blank" rel="noopener noreferrer">
                <Send size={20} /> @{contact.telegram}
              </a>
            )}
          </div>
          <Link className="biz-dev-link" href="/">
            {t.devPortfolio} <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
