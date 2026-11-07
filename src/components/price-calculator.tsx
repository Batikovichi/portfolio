"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import type { BizCopy } from "@/data/business";

type Kind = "kitchen" | "gate" | "fence";

// Demonstration rates only (EUR). A real client's calculator uses their own price list.
const RATES = {
  kitchen: [[650, 850], [900, 1200], [1400, 1900]], // per linear metre
  gate: [[70, 95], [110, 150], [180, 260]], // per m²
  fence: [[35, 50], [55, 80], [95, 140]], // per running metre at 1.8 m height
} as const;

const fmt = (n: number) => Math.round(n / 10) * 10;

export function PriceCalculator({ t }: { t: BizCopy["calc"] }) {
  const [kind, setKind] = useState<Kind>("kitchen");
  const [length, setLength] = useState(3.2);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(1.8);
  const [fenceLength, setFenceLength] = useState(25);
  const [material, setMaterial] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const materials = kind === "kitchen" ? t.kitchenMaterials : t.gateMaterials;

  const { low, high, size } = useMemo(() => {
    const [a, b] = RATES[kind][material];
    if (kind === "kitchen") return { low: fmt(a * length), high: fmt(b * length), size: `${length} m` };
    if (kind === "gate") {
      const area = width * height;
      return { low: fmt(a * area), high: fmt(b * area), size: `${width} × ${height} m` };
    }
    const k = height / 1.8;
    return { low: fmt(a * fenceLength * k), high: fmt(b * fenceLength * k), size: `${fenceLength} m × ${height} m` };
  }, [kind, material, length, width, height, fenceLength]);

  const label = kind === "kitchen" ? t.kitchen : kind === "gate" ? t.gate : t.fence;
  const reset = () => setSent(false);

  return (
    <div className="calc">
      <form
        className="calc-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <fieldset>
          <legend>{t.type}</legend>
          <div className="calc-tabs" role="radiogroup">
            {(["kitchen", "gate", "fence"] as Kind[]).map((k) => (
              <button
                type="button"
                key={k}
                role="radio"
                aria-checked={kind === k}
                className={kind === k ? "active" : ""}
                onClick={() => {
                  setKind(k);
                  setMaterial(0);
                  reset();
                }}
              >
                {k === "kitchen" ? t.kitchen : k === "gate" ? t.gate : t.fence}
              </button>
            ))}
          </div>
        </fieldset>

        {kind === "kitchen" && (
          <label>
            {t.length}: <b>{length} m</b>
            <input type="range" min={1.5} max={8} step={0.1} value={length} onChange={(e) => { setLength(+e.target.value); reset(); }} />
          </label>
        )}
        {kind === "gate" && (
          <label>
            {t.width}: <b>{width} m</b>
            <input type="range" min={2} max={8} step={0.1} value={width} onChange={(e) => { setWidth(+e.target.value); reset(); }} />
          </label>
        )}
        {kind === "fence" && (
          <label>
            {t.fenceLength}: <b>{fenceLength} m</b>
            <input type="range" min={5} max={150} step={1} value={fenceLength} onChange={(e) => { setFenceLength(+e.target.value); reset(); }} />
          </label>
        )}
        {kind !== "kitchen" && (
          <label>
            {t.height}: <b>{height} m</b>
            <input type="range" min={1.2} max={2.5} step={0.1} value={height} onChange={(e) => { setHeight(+e.target.value); reset(); }} />
          </label>
        )}

        <fieldset>
          <legend>{t.material}</legend>
          <div className="calc-tabs small">
            {materials.map((m, i) => (
              <button type="button" key={m} className={material === i ? "active" : ""} aria-pressed={material === i} onClick={() => { setMaterial(i); reset(); }}>
                {m}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="calc-result" aria-live="polite">
          <span>{t.result}</span>
          <strong>
            {low.toLocaleString("ro-MD")} – {high.toLocaleString("ro-MD")} €
          </strong>
        </div>

        <div className="calc-contact">
          <label>
            {t.name}
            <input value={name} placeholder={t.namePlaceholder} onChange={(e) => { setName(e.target.value); reset(); }} />
          </label>
          <label>
            {t.phone}
            <input value={phone} inputMode="tel" placeholder="069 000 000" onChange={(e) => { setPhone(e.target.value); reset(); }} />
          </label>
        </div>
        <button type="submit" className="calc-send">
          <Send size={17} /> {t.send}
        </button>
        <p className="calc-note">{t.disclaimer}</p>
      </form>

      <div className="tg" aria-label={t.tgTitle}>
        <div className="tg-head">
          <span className="tg-avatar">🤖</span>
          <span>{t.tgTitle}</span>
        </div>
        <div className="tg-body">
          <div className={`tg-msg ${sent ? "arrived" : ""}`}>
            <b>🔔 {t.tgNew}</b>
            <span>📦 {label} · {materials[material]}</span>
            <span>📐 {size}</span>
            <span>💶 {t.tgEstimate}: {low.toLocaleString("ro-MD")}–{high.toLocaleString("ro-MD")} €</span>
            <span>👤 {t.tgClient}: {name || "—"}</span>
            <span>📞 {t.tgPhone}: {phone || "—"}</span>
          </div>
          {sent && <p className="tg-sent">{t.sent}</p>}
        </div>
      </div>
    </div>
  );
}
