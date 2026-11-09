"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ImageUp, Send } from "lucide-react";

// Demo prices only (MDL). A real version uses the atelier's own price list.
const PRODUCTS = [
  { id: "tricou", label: "Tricou", base: 120, shape: "tee" },
  { id: "hanorac", label: "Hanorac", base: 350, shape: "hoodie" },
  { id: "camasa", label: "Cămașă", base: 280, shape: "shirt" },
  { id: "echipament", label: "Echipament de lucru", base: 420, shape: "work" },
  { id: "sapca", label: "Șapcă", base: 110, shape: "cap" },
] as const;

const COLORS = [
  { id: "alb", label: "Alb", hex: "#f4f3ee" },
  { id: "negru", label: "Negru", hex: "#1d1f22" },
  { id: "bleumarin", label: "Bleumarin", hex: "#1f2d4a" },
  { id: "gri", label: "Gri", hex: "#8c9093" },
  { id: "verde", label: "Verde", hex: "#2f5d46" },
];

const SIZES = [
  { id: "mic", label: "Mic", hint: "până la 8 cm", price: 45, scale: 0.7 },
  { id: "mediu", label: "Mediu", hint: "până la 15 cm", price: 80, scale: 1 },
  { id: "mare", label: "Mare", hint: "până la 25 cm", price: 160, scale: 1.7 },
];

const PLACES = [
  { id: "piept-st", label: "Piept stânga" },
  { id: "piept-c", label: "Piept centru" },
  { id: "spate", label: "Spate" },
  { id: "maneca", label: "Mânecă" },
];

const SETUP = 300; // one-time logo digitization, demo value

const discountFor = (q: number) => (q >= 100 ? 0.15 : q >= 30 ? 0.1 : q >= 10 ? 0.05 : 0);
const lei = (n: number) => `${Math.round(n).toLocaleString("ro-MD")} lei`;

export function EmbroideryDemo() {
  const [product, setProduct] = useState<(typeof PRODUCTS)[number]["id"]>("tricou");
  const [color, setColor] = useState(COLORS[2].id);
  const [qty, setQty] = useState(30);
  const [own, setOwn] = useState(false);
  const [size, setSize] = useState("mic");
  const [places, setPlaces] = useState<string[]>(["piept-st"]);
  const [logo, setLogo] = useState<string | null>(null);
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const p = PRODUCTS.find((x) => x.id === product)!;
  const c = COLORS.find((x) => x.id === color)!;
  const s = SIZES.find((x) => x.id === size)!;
  const isCap = p.shape === "cap";
  const activePlaces = isCap ? ["fata"] : places.length ? places : ["piept-st"];

  useEffect(() => () => { if (logo) URL.revokeObjectURL(logo); }, [logo]);

  const calc = useMemo(() => {
    const garment = own ? 0 : p.base;
    const embroidery = s.price * activePlaces.length;
    const d = discountFor(qty);
    const unit = garment + embroidery * (1 - d);
    return { garment, embroidery, d, unit, total: unit * qty + SETUP };
  }, [own, p, s, activePlaces.length, qty]);

  const touch = () => setSent(false);
  const togglePlace = (id: string) => {
    touch();
    setPlaces((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };
  const placeLabel = isCap ? "Față" : activePlaces.map((id) => PLACES.find((x) => x.id === id)?.label).join(", ");
  const showBack = !isCap && activePlaces.length === 1 && activePlaces[0] === "spate";

  return (
    <div className="atl-grid">
      <form
        className="atl-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <Step n="1" title="Produsul">
          <div className="atl-chips">
            {PRODUCTS.map((x) => (
              <button type="button" key={x.id} className={product === x.id ? "on" : ""} aria-pressed={product === x.id} onClick={() => { setProduct(x.id); touch(); }}>
                {x.label}
              </button>
            ))}
          </div>
          <div className="atl-colors" aria-label="Culoarea">
            {COLORS.map((x) => (
              <button type="button" key={x.id} title={x.label} aria-label={x.label} aria-pressed={color === x.id} className={color === x.id ? "on" : ""} style={{ background: x.hex }} onClick={() => { setColor(x.id); touch(); }} />
            ))}
            <span>{c.label}</span>
          </div>
          <label className="atl-check">
            <input type="checkbox" checked={own} onChange={(e) => { setOwn(e.target.checked); touch(); }} />
            Aduc articolele mele, doar broderia
          </label>
        </Step>

        <Step n="2" title="Logoul">
          <label className="atl-upload">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) { setLogo(URL.createObjectURL(f)); touch(); }
              }}
            />
            <ImageUp size={20} />
            <span>{logo ? "Logo încărcat — schimbă" : "Încarcă logoul (PNG, JPG)"}</span>
          </label>
          <p className="atl-hint">Fișierul rămâne în browserul dvs., nu se trimite nicăieri.</p>
          <div className="atl-sub">Dimensiunea</div>
          <div className="atl-chips">
            {SIZES.map((x) => (
              <button type="button" key={x.id} className={size === x.id ? "on" : ""} aria-pressed={size === x.id} onClick={() => { setSize(x.id); touch(); }}>
                {x.label} <small>{x.hint}</small>
              </button>
            ))}
          </div>
          {!isCap && (
            <>
              <div className="atl-sub">Unde brodăm (se pot alege mai multe)</div>
              <div className="atl-chips">
                {PLACES.map((x) => (
                  <button type="button" key={x.id} className={activePlaces.includes(x.id) ? "on" : ""} aria-pressed={activePlaces.includes(x.id)} onClick={() => togglePlace(x.id)}>
                    {activePlaces.includes(x.id) && <Check size={14} />} {x.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </Step>

        <Step n="3" title="Cantitatea">
          <label className="atl-range">
            <b>{qty} buc.</b>
            <input type="range" min={1} max={300} value={qty} onChange={(e) => { setQty(+e.target.value); touch(); }} />
          </label>
          <div className="atl-tiers">
            {[10, 30, 100].map((t) => (
              <span key={t} className={qty >= t ? "on" : ""}>
                {t}+ buc. −{Math.round(discountFor(t) * 100)}%
              </span>
            ))}
          </div>
        </Step>

        <Step n="4" title="Contact">
          <div className="atl-contact">
            <input value={company} placeholder="Firma" onChange={(e) => { setCompany(e.target.value); touch(); }} />
            <input value={phone} inputMode="tel" placeholder="Telefon" onChange={(e) => { setPhone(e.target.value); touch(); }} />
          </div>
          <button type="submit" className="atl-send">
            <Send size={17} /> Trimite cererea
          </button>
        </Step>
      </form>

      <aside className="atl-side">
        <div className="atl-preview" style={{ ["--garment" as string]: c.hex }}>
          <Garment shape={p.shape} back={showBack} />
          {activePlaces.map((pl) => {
            if (showBack !== (pl === "spate")) return null;
            return (
              <div key={pl} className={`atl-logo at-${isCap ? "cap" : pl}${showBack ? " at-back" : ""}`} style={{ ["--s" as string]: s.scale }}>
                {logo ? <img src={logo} alt="" /> : <span>{company || "LOGO"}</span>}
              </div>
            );
          })}
          <span className="atl-view">{showBack ? "spate" : "față"}</span>
        </div>

        <div className="atl-price" aria-live="polite">
          <div><span>Articol</span><span>{own ? "al clientului" : lei(calc.garment)}</span></div>
          <div><span>Broderie × {activePlaces.length}</span><span>{lei(calc.embroidery)}</span></div>
          {calc.d > 0 && <div className="disc"><span>Reducere {qty}+ buc.</span><span>−{Math.round(calc.d * 100)}% la broderie</span></div>}
          <div><span>Digitizare logo (o singură dată)</span><span>{lei(SETUP)}</span></div>
          <div className="unit"><span>Preț per bucată</span><span>{lei(calc.unit)}</span></div>
          <div className="total"><span>Total {qty} buc.</span><strong>{lei(calc.total)}</strong></div>
          <p>Prețuri demonstrative. În versiunea reală — lista de prețuri a atelierului.</p>
        </div>

        <div className="atl-wa">
          <div className="atl-wa-head">
            <span>A</span>
            <div><b>Atelier · cereri broderie</b><small>WhatsApp</small></div>
          </div>
          <div className="atl-wa-body">
            <div className={`atl-wa-msg${sent ? " in" : ""}`}>
              <b>🧵 Cerere nouă de pe site</b>
              <span>👕 {p.label}, {c.label.toLowerCase()}{own ? " (articolele clientului)" : ""}</span>
              <span>📍 {placeLabel} · {s.label.toLowerCase()} ({s.hint})</span>
              <span>🔢 {qty} buc.</span>
              <span>💰 ~{lei(calc.total)} ({lei(calc.unit)}/buc.)</span>
              <span>🏢 {company || "—"} · 📞 {phone || "—"}</span>
              <span>🖼 Logo: {logo ? "atașat" : "nu încă"}</span>
            </div>
            {sent && <p className="atl-wa-ok">✓ Așa ajunge cererea la atelier. Clientul vede prețul, voi primiți comanda gata calculată.</p>}
          </div>
        </div>
      </aside>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="atl-step">
      <legend>
        <span>{n}</span> {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Garment({ shape, back }: { shape: string; back: boolean }) {
  const stroke = "rgba(0,0,0,.18)";
  if (shape === "cap")
    return (
      <svg viewBox="0 0 300 300" className="atl-svg" aria-hidden>
        <path d="M60 190 Q60 90 150 85 Q240 90 240 190 Z" fill="var(--garment)" stroke={stroke} strokeWidth="2" />
        <path d="M40 190 Q150 175 260 190 Q275 215 240 222 Q150 205 60 222 Q25 215 40 190Z" fill="var(--garment)" stroke={stroke} strokeWidth="2" style={{ filter: "brightness(.85)" }} />
        <circle cx="150" cy="86" r="6" fill="var(--garment)" stroke={stroke} />
      </svg>
    );
  const hood = shape === "hoodie";
  const collar = shape === "shirt" || shape === "work";
  return (
    <svg viewBox="0 0 300 300" className="atl-svg" aria-hidden>
      <path
        d="M105 40 L60 58 L18 112 L52 136 L75 112 L75 270 L225 270 L225 112 L248 136 L282 112 L240 58 L195 40 Q150 64 105 40Z"
        fill="var(--garment)"
        stroke={stroke}
        strokeWidth="2"
      />
      {hood && !back && <path d="M105 40 Q110 92 150 96 Q190 92 195 40 Q150 64 105 40Z" fill="var(--garment)" stroke={stroke} strokeWidth="2" style={{ filter: "brightness(.88)" }} />}
      {hood && back && <path d="M100 42 Q150 -6 200 42 Q150 70 100 42Z" fill="var(--garment)" stroke={stroke} strokeWidth="2" style={{ filter: "brightness(.88)" }} />}
      {hood && !back && <rect x="110" y="200" width="80" height="44" rx="8" fill="none" stroke={stroke} strokeWidth="2" />}
      {collar && !back && (
        <>
          <path d="M105 40 L150 82 L135 98 L112 58Z M195 40 L150 82 L165 98 L188 58Z" fill="var(--garment)" stroke={stroke} strokeWidth="2" style={{ filter: "brightness(.9)" }} />
          <line x1="150" y1="82" x2="150" y2="270" stroke={stroke} strokeWidth="2" />
        </>
      )}
      {shape === "work" && !back && (
        <>
          <rect x="88" y="170" width="44" height="40" rx="4" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="168" y="170" width="44" height="40" rx="4" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      )}
      {shape === "tee" && !back && <path d="M120 46 Q150 70 180 46" fill="none" stroke={stroke} strokeWidth="2" />}
    </svg>
  );
}
