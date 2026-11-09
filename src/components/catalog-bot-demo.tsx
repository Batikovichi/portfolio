"use client";

import { useEffect, useRef, useState } from "react";
import { FileSpreadsheet, FileText, Send } from "lucide-react";

/*
 * Demo bot for a fictional metal-roofing company. Answers come only from the sample
 * catalog below (no external AI call), so it works offline and never invents data.
 * A real version is fed the client's own catalog, price list and delivery terms.
 */

type L = "ro" | "ru";
type Msg = { from: "user" | "bot"; text: string; src?: string; handoff?: boolean };

const PRICES = {
  profnastil: { "0.45": 98, "0.5": 112 },
  tigla: { "0.45": 125, "0.5": 139 },
  gard: 690, // lei per running metre, h 1.8 m, installed
  poarta: 28000,
  montajAcoperis: 45,
};

const CITIES: Record<string, { km: number; ro: string; ru: string }> = {
  balti: { km: 135, ro: "Bălți", ru: "Бельцы" },
  orhei: { km: 45, ro: "Orhei", ru: "Орхей" },
  cahul: { km: 165, ro: "Cahul", ru: "Кагул" },
  ungheni: { km: 105, ro: "Ungheni", ru: "Унгены" },
  soroca: { km: 160, ro: "Soroca", ru: "Сороки" },
  comrat: { km: 95, ro: "Comrat", ru: "Комрат" },
  ialoveni: { km: 15, ro: "Ialoveni", ru: "Яловены" },
  straseni: { km: 25, ro: "Strășeni", ru: "Страшены" },
};
const CITY_KEYS: Record<string, string[]> = {
  balti: ["balti", "бельц", "бэлць"],
  orhei: ["orhei", "орхе"],
  cahul: ["cahul", "кагул"],
  ungheni: ["ungheni", "унген"],
  soroca: ["soroca", "сорок"],
  comrat: ["comrat", "комрат"],
  ialoveni: ["ialoveni", "яловен"],
  straseni: ["straseni", "страшен"],
};

const lei = (n: number) => `${Math.round(n).toLocaleString("ro-MD")} lei`;
const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ё/g, "е");
const has = (t: string, words: string[]) => words.some((w) => t.includes(w));

function area(t: string) {
  const m = t.match(/(\d+(?:[.,]\d+)?)\s*(m2|m²|mp|м2|м²|кв|metri patrati|metri p)/);
  return m ? parseFloat(m[1].replace(",", ".")) : null;
}
function metres(t: string) {
  const m = t.match(/(\d+(?:[.,]\d+)?)\s*(m\b|metri|метр|м\b)/);
  return m ? parseFloat(m[1].replace(",", ".")) : null;
}
const thick = (t: string) => (/0[.,]5\b|0[.,]50/.test(t) ? "0.5" : "0.45");
const shown = (th: string) => th.replace(".", ",");

export function answer(raw: string): Omit<Msg, "from"> {
  const t = norm(raw);
  const lang: L = /[а-я]/.test(t) ? "ru" : "ro";
  const r = (ro: string, ru: string, src?: string, handoff?: boolean) => ({ text: lang === "ro" ? ro : ru.replace(/ lei/g, " лей"), src, handoff });

  const city = Object.keys(CITY_KEYS).find((k) => has(t, CITY_KEYS[k]));
  const a = area(t);

  if (has(t, ["profnastil", "profil", "профнастил", "профлист"])) {
    const th = thick(t);
    const p = PRICES.profnastil[th as "0.45"];
    if (a)
      return r(
        `Profnastil C8, ${shown(th)} mm: ${a} m² × ${lei(p)} = ${lei(a * p)}. Recomand +5% la tăieri. E în stoc, livrare în 1–2 zile. Vreți să vă calculăm și accesoriile (șuruburi, coamă)?`,
        `Профнастил C8, ${shown(th)} мм: ${a} м² × ${lei(p)} = ${lei(a * p)}. Советую +5% на подрезку. Есть на складе, доставка 1–2 дня. Посчитать и комплектующие (саморезы, конёк)?`,
        "Prețuri 2026.xlsx · rândul 4–5",
      );
    return r(
      `Profnastil C8: 0,45 mm — ${lei(PRICES.profnastil["0.45"])}/m², 0,5 mm — ${lei(PRICES.profnastil["0.5"])}/m². Culori: vișiniu, maro, verde, grafit, negru. Scrieți câți m² vă trebuie și calculez suma.`,
      `Профнастил C8: 0,45 мм — ${lei(PRICES.profnastil["0.45"])}/м², 0,5 мм — ${lei(PRICES.profnastil["0.5"])}/м². Цвета: вишня, коричневый, зелёный, графит, чёрный. Напишите, сколько м², посчитаю сумму.`,
      "Prețuri 2026.xlsx · rândul 4–5",
    );
  }

  if (has(t, ["tigla", "acoperis", "черепиц", "крыш", "кровл"])) {
    const th = thick(t);
    const p = PRICES.tigla[th as "0.45"];
    if (a)
      return r(
        `Țiglă metalică ${shown(th)} mm: ${a} m² × ${lei(p)} = ${lei(a * p)}. Cu montaj (+${PRICES.montajAcoperis} lei/m²): ${lei(a * (p + PRICES.montajAcoperis))}. Se produce în 3 zile lucrătoare. Măsurarea în Chișinău e gratuită.`,
        `Металлочерепица ${shown(th)} мм: ${a} м² × ${lei(p)} = ${lei(a * p)}. С монтажом (+${PRICES.montajAcoperis} лей/м²): ${lei(a * (p + PRICES.montajAcoperis))}. Изготовление 3 рабочих дня. Замер по Кишинёву бесплатный.`,
        "Prețuri 2026.xlsx · rândul 7–8 · Montaj.docx",
      );
    return r(
      `Țiglă metalică: 0,45 mm — ${lei(PRICES.tigla["0.45"])}/m², 0,5 mm — ${lei(PRICES.tigla["0.5"])}/m². Montaj de la ${PRICES.montajAcoperis} lei/m². Garanție la vopsea 15 ani. Ce suprafață are acoperișul?`,
      `Металлочерепица: 0,45 мм — ${lei(PRICES.tigla["0.45"])}/м², 0,5 мм — ${lei(PRICES.tigla["0.5"])}/м². Монтаж от ${PRICES.montajAcoperis} лей/м². Гарантия на покрытие 15 лет. Какая площадь крыши?`,
      "Prețuri 2026.xlsx · rândul 7–8",
    );
  }

  if (has(t, ["poart", "ворот"]))
    return r(
      `Poartă glisantă 4 m cu automatizare: de la ${lei(PRICES.poarta)}, montată. Prețul exact depinde de lățime și umplutură — un manager vine la măsurare gratuit. Vă programez?`,
      `Откатные ворота 4 м с автоматикой: от ${lei(PRICES.poarta)} с монтажом. Точная цена зависит от ширины и заполнения — менеджер приедет на бесплатный замер. Записать вас?`,
      "Catalog porți.pdf · pag. 3",
    );

  if (has(t, ["gard", "забор", "огражд"])) {
    const m = metres(t);
    if (m)
      return r(
        `Gard din profnastil h 1,8 m, montat: ${m} m × ${lei(PRICES.gard)} = ${lei(m * PRICES.gard)} (stâlpi, lonjeroane și montaj incluse).`,
        `Забор из профнастила h 1,8 м с монтажом: ${m} м × ${lei(PRICES.gard)} = ${lei(m * PRICES.gard)} (столбы, лаги и монтаж включены).`,
        "Prețuri 2026.xlsx · rândul 12",
      );
    return r(
      `Gard din profnastil h 1,8 m: ${lei(PRICES.gard)} pe metru liniar, cu stâlpi și montaj. Câți metri are gardul?`,
      `Забор из профнастила h 1,8 м: ${lei(PRICES.gard)} за погонный метр со столбами и монтажом. Сколько метров забор?`,
      "Prețuri 2026.xlsx · rândul 12",
    );
  }

  if (has(t, ["livr", "transport", "достав", "привез"]) || city) {
    if (city) {
      const c = CITIES[city];
      return r(
        `Livrare în ${c.ro}: ~${c.km} km × 9 lei = ${lei(c.km * 9)}. Mașina noastră, descărcare inclusă, de obicei a doua zi după plată.`,
        `Доставка в ${c.ru}: ~${c.km} км × 9 лей = ${lei(c.km * 9)}. Наша машина, разгрузка включена, обычно на следующий день после оплаты.`,
        "Livrare.docx · p. 2",
      );
    }
    return r(
      "Livrare în Chișinău: gratuit de la 5 000 lei, altfel 300 lei. În raioane — 9 lei/km. În ce localitate aveți nevoie?",
      "Доставка по Кишинёву: бесплатно от 5 000 лей, иначе 300 лей. По районам — 9 лей/км. В какой населённый пункт?",
      "Livrare.docx · p. 1",
    );
  }

  if (has(t, ["culo", "ral", "цвет"]))
    return r(
      "Culori în stoc: RAL 3005 vișiniu, 8017 maro, 6005 verde, 7024 grafit, 9005 negru. Alte culori RAL — la comandă, +5 zile.",
      "Цвета в наличии: RAL 3005 вишня, 8017 коричневый, 6005 зелёный, 7024 графит, 9005 чёрный. Другие RAL — под заказ, +5 дней.",
      "Catalog 2026.pdf · pag. 2",
    );

  if (has(t, ["montaj", "monta", "монтаж", "установ"]))
    return r(
      `Da, facem montaj: acoperiș de la ${PRICES.montajAcoperis} lei/m², gardul se dă deja cu montaj. Echipa noastră, garanție la lucrări 3 ani.`,
      `Да, монтируем: крыша от ${PRICES.montajAcoperis} лей/м², забор сразу с монтажом. Своя бригада, гарантия на работы 3 года.`,
      "Montaj.docx",
    );

  if (has(t, ["masur", "замер"]))
    return r(
      "Măsurarea în Chișinău și până la 20 km e gratuită. Lăsați numărul de telefon și managerul vă sună pentru o oră convenabilă.",
      "Замер по Кишинёву и до 20 км бесплатный. Оставьте номер телефона — менеджер перезвонит и согласует время.",
      "Montaj.docx · p. 1",
    );

  if (has(t, ["stoc", "termen", "cand", "наличи", "срок", "когда"]))
    return r(
      "Profnastilul e în stoc, livrare în 1–2 zile. Țigla metalică se produce în 3 zile lucrătoare, culorile la comandă +5 zile.",
      "Профнастил есть на складе, доставка 1–2 дня. Металлочерепица изготавливается за 3 рабочих дня, цвета под заказ +5 дней.",
      "Catalog 2026.pdf · pag. 1",
    );

  if (has(t, ["plat", "factur", "tva", "card", "оплат", "счет", "ндс", "карт"]))
    return r(
      "Plata: transfer, card sau numerar. Pentru firme emitem factură fiscală cu TVA.",
      "Оплата: перевод, карта или наличные. Для фирм выставляем налоговую накладную с НДС.",
      "Condiții.docx",
    );

  if (has(t, ["garant", "гарант"]))
    return r("Garanție la vopsea 15 ani, la montaj 3 ani.", "Гарантия на покрытие 15 лет, на монтаж 3 года.", "Condiții.docx");

  if (has(t, ["program", "adres", "unde", "orar", "график", "адрес", "где", "работаете"]))
    return r(
      "Depozit: Chișinău (adresă exemplu). Program: L–V 8:00–18:00, S 9:00–14:00. Botul răspunde non-stop.",
      "Склад: Кишинёв (адрес-пример). График: пн–пт 8:00–18:00, сб 9:00–14:00. Бот отвечает круглосуточно.",
      "Contacte.docx",
    );

  if (has(t, ["salut", "buna", "привет", "здравств", "добр"]))
    return r(
      "Bună ziua! Sunt asistentul firmei. Întrebați despre prețuri, culori, livrare sau montaj — răspund pe loc, în română sau rusă.",
      "Здравствуйте! Я помощник фирмы. Спрашивайте про цены, цвета, доставку или монтаж — отвечу сразу, на русском или румынском.",
    );

  return r(
    "Nu am găsit asta în catalog și nu vreau să inventez. Am transmis întrebarea managerului — vă răspunde în program. Lăsați un număr de telefon?",
    "Этого нет в каталоге, а выдумывать я не буду. Передал вопрос менеджеру — он ответит в рабочее время. Оставите номер телефона?",
    undefined,
    true,
  );
}

const QUICK = {
  ro: ["Cât costă 120 m² țiglă metalică 0,5?", "Livrare în Bălți?", "Gard 40 metri", "Ce culori aveți?", "Faceți și fațade ventilate?"],
  ru: ["Сколько стоит профнастил 80 м2?", "Доставка в Кагул?", "Сколько стоят ворота?", "Есть счёт с НДС?"],
};

export function CatalogBotDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Bună ziua! Întrebați-mă despre prețuri, culori, livrare sau montaj. Пишите и по-русски." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [handoffs, setHandoffs] = useState<string[]>([]);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const a = answer(text);
      setMsgs((m) => [...m, { from: "bot", ...a }]);
      if (a.handoff) setHandoffs((h) => [...h, text]);
      setTyping(false);
    }, 650);
  };

  return (
    <div className="cb-grid">
      <aside className="cb-docs">
        <span className="cb-label">Ce i-am dat botului</span>
        {[
          { n: "Catalog 2026.pdf", I: FileText },
          { n: "Prețuri 2026.xlsx", I: FileSpreadsheet },
          { n: "Catalog porți.pdf", I: FileText },
          { n: "Livrare.docx", I: FileText },
          { n: "Montaj.docx", I: FileText },
          { n: "Condiții.docx", I: FileText },
        ].map(({ n, I }) => (
          <div className="cb-doc" key={n}>
            <I size={17} /> {n}
          </div>
        ))}
        <p>Răspunde doar din aceste fișiere și arată sursa. Ce nu știe — transmite managerului.</p>

        <div className="cb-manager">
          <span className="cb-label">Telegram-ul managerului</span>
          {handoffs.length === 0 ? (
            <p className="cb-empty">Aici apar întrebările la care botul nu a găsit răspuns. Încercați „Faceți și fațade ventilate?”</p>
          ) : (
            handoffs.map((h, i) => (
              <div className="cb-alert" key={i}>
                <b>❓ Întrebare fără răspuns în catalog</b>
                <span>„{h}”</span>
              </div>
            ))
          )}
        </div>
      </aside>

      <div className="cb-chat">
        <div className="cb-head">
          <span className="cb-ava">M</span>
          <div>
            <b>MetalDemo · asistent</b>
            <small>{typing ? "scrie…" : "online 24/7"}</small>
          </div>
        </div>
        <div className="cb-body" ref={body} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`cb-msg ${m.from}`}>
              {m.text}
              {m.src && <small className="cb-src">📎 {m.src}</small>}
            </div>
          ))}
          {typing && <div className="cb-msg bot cb-typing"><i /><i /><i /></div>}
        </div>
        <div className="cb-quick">
          {[...QUICK.ro, ...QUICK.ru].map((q) => (
            <button type="button" key={q} onClick={() => ask(q)}>
              {q}
            </button>
          ))}
        </div>
        <form
          className="cb-input"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Scrieți o întrebare… / Напишите вопрос…" aria-label="Întrebare" />
          <button type="submit" aria-label="Trimite">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
