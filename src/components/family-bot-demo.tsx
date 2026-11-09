"use client";

import { useEffect, useRef, useState } from "react";
import { FileSpreadsheet, FileText, Globe, Send } from "lucide-react";

/*
 * Demo assistants for Emblema (emblema.md) and Metalic.md.
 * Answers come only from facts and prices published on their sites (Nov 2026),
 * matched by keywords — no external AI call. Unknown questions go to the manager.
 */

type Lang = "ro" | "ru";
type Reply = { ro: string; ru: string; src?: string; lead?: string; awaitDetails?: string };
type Entry = { keys: string[]; reply: (qty: number | null) => Reply };
type Msg = { from: "user" | "bot"; text: string; src?: string };
type Brand = {
  id: string;
  name: string;
  logo?: string;
  sub: string;
  docs: { n: string; sheet?: boolean; web?: boolean }[];
  quick: string[];
  greet: string;
  kb: Entry[];
};

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ё/g, "е");
const lei = (n: number) => `${Math.round(n * 100) / 100 === Math.round(n) ? Math.round(n).toLocaleString("ro-MD") : n.toLocaleString("ro-MD", { minimumFractionDigits: 2 })} lei`;
const qtyOf = (t: string) => {
  const m = t.match(/(\d+)\s*(buc|bucati|role|rol|seturi|set|шт|штук|рулон|набор|pcs)/);
  return m ? parseInt(m[1], 10) : null;
};
const times = (q: number | null, price: number, unitRo: string, unitRu: string) =>
  q && q > 1
    ? { ro: ` ${q} ${unitRo} × ${lei(price)} = ${lei(q * price)}.`, ru: ` ${q} ${unitRu} × ${lei(price)} = ${lei(q * price)}.` }
    : { ro: "", ru: "" };

/* ---------------- Emblema ---------------- */
const EMBLEMA: Brand = {
  id: "emblema",
  name: "Emblema",
  logo: "https://emblema.md/wp-content/uploads/2026/02/Emblema-md.png",
  sub: "etichete, panglici, produse corporative",
  docs: [
    { n: "Magazin emblema.md (256 produse)", web: true },
    { n: "Livrare și retur.docx" },
    { n: "Servicii: gravare, printare.pdf" },
    { n: "Contacte Cahul / Galați.docx" },
  ],
  quick: [
    "Vreau etichete țesute cu logo",
    "Cât costă 5 role panglică satin 16 mm?",
    "Etichete de mărime satin?",
    "Livrare în România?",
    "În cât timp e gata comanda?",
    "Сколько стоят трофеи?",
    "Faceți medalii din aur?",
  ],
  greet: "Bună ziua! Sunt asistentul Emblema. Întrebați despre etichete, panglici, trofee, livrare — sau cereți o ofertă pentru etichete cu logo. Пишите и по-русски.",
  kb: [
    {
      keys: ["logo", "brand", "personaliz", "cu numele", "логотип", "бренд", "свои этикетки", "с названием"],
      reply: () => ({
        ro: "Etichetele cu logo se fac la comandă: țesute, satin, nailon sau carton. Ca să vă pregătim prețul, scrieți într-un mesaj: tipul, dimensiunea aproximativă și câte bucăți. Logoul îl puteți trimite după aceea pe WhatsApp.",
        ru: "Этикетки с логотипом делаем на заказ: тканые, атласные, нейлоновые или картонные. Чтобы рассчитать цену, напишите одним сообщением: тип, примерный размер и количество. Логотип можно прислать потом в WhatsApp.",
        src: "emblema.md › Etichete textile › Etichete de brand",
        awaitDetails: "Etichete cu logo",
      }),
    },
    {
      keys: ["panglic", "banda", "ruban", "лент"],
      reply: (q) => {
        const t16 = times(q, 96, "role", "рулонов");
        return {
          ro: `Panglică satin dublă față, rolă 91,4 m: 9 mm — 55,20 lei, 16 mm — 96 lei, 22 mm — 120 lei, 28 mm — 166 lei.${t16.ro ? " Pentru 16 mm:" + t16.ro : ""} Peste 2 000 lei livrarea în Moldova e gratuită.`,
          ru: `Атласная двусторонняя лента, рулон 91,4 м: 9 мм — 55,20 лей, 16 мм — 96 лей, 22 мм — 120 лей, 28 мм — 166 лей.${t16.ru ? " Для 16 мм:" + t16.ru : ""} От 2 000 лей доставка по Молдове бесплатная.`,
          src: "emblema.md › Panglici satin dublă față",
        };
      },
    },
    {
      keys: ["marime", "masura", "размер"],
      reply: () => ({
        ro: "Etichete de mărime (XS, S, M, L…): nailon — 45 lei, satin — 60 lei, țesute — 325 lei (prețul unui pachet din magazin). Le aveți gata, cu livrare.",
        ru: "Размерные этикетки (XS, S, M, L…): нейлон — 45 лей, атлас — 60 лей, тканые — 325 лей (цена упаковки в магазине). Есть в наличии, с доставкой.",
        src: "emblema.md › Etichete de mărime",
      }),
    },
    {
      keys: ["compozit", "bumbac", "made in", "состав", "хлопок"],
      reply: () => ({
        ro: "Etichete de compoziție din satin („100% BUMBAC”, „MADE IN MOLDOVA” etc.): 120–150 lei, majoritatea 140 lei.",
        ru: "Атласные этикетки состава («100% BUMBAC», «MADE IN MOLDOVA» и др.): 120–150 лей, в основном 140 лей.",
        src: "emblema.md › Etichete compoziție",
      }),
    },
    {
      keys: ["trofe", "cupa", "suport", "placut", "corporativ", "трофе", "кубок", "подставк", "корпоратив"],
      reply: (q) => {
        const t = times(q, 250, "buc.", "шт.");
        return {
          ro: `Produse corporative: trofee combinate — 250 lei,${t.ro} suport pentru medalii — 450 lei, suport telefon din lemn — 450 lei, suport cărți de vizită — 150 lei. Gravăm logoul pe lemn, sticlă sau metal.`,
          ru: `Корпоративная продукция: комбинированные трофеи — 250 лей,${t.ru} держатель для медалей — 450 лей, деревянная подставка для телефона — 450 лей, подставка для визиток — 150 лей. Гравируем логотип на дереве, стекле или металле.`,
          src: "emblema.md › Produse corporative",
        };
      },
    },
    {
      keys: ["carabin", "cataram", "accesori", "карабин", "пряжк", "фурнитур"],
      reply: () => ({
        ro: "Accesorii: carabiniere — set 50 buc. 200 lei, catarame 24 mm — 50 buc. 250 lei, tridente plastic 32 mm — 145 lei / 50 buc.",
        ru: "Фурнитура: карабины — набор 50 шт. 200 лей, пряжки 24 мм — 50 шт. 250 лей, пластиковые трезубцы 32 мм — 145 лей / 50 шт.",
        src: "emblema.md › Accesorii",
      }),
    },
    {
      keys: ["topper", "toper", "tort", "patiser", "торт", "топпер"],
      reply: () => ({
        ro: "Avem topere, platouri pentru tort și decor pentru patiserie, inclusiv cu text la comandă. Spuneți ce text și pentru ce dată — transmit managerului.",
        ru: "Есть топперы, подложки для тортов и декор для кондитерских, в том числе с надписью на заказ. Напишите текст и дату — передам менеджеру.",
        src: "emblema.md › Topere / Platouri tort",
        awaitDetails: "Topper / decor tort",
      }),
    },
    {
      keys: ["romania", "galati", "румын", "галац"],
      reply: () => ({
        ro: "Livrăm și în România: 20 RON pentru comenzi sub 500 RON, gratuit peste. Avem și punct în Galați, str. Combinatului 7.",
        ru: "Доставляем и в Румынию: 20 RON при заказе до 500 RON, дороже — бесплатно. Есть точка в Галаце, str. Combinatului 7.",
        src: "Livrare și retur.docx",
      }),
    },
    {
      keys: ["livr", "transport", "curier", "достав", "курьер"],
      reply: () => ({
        ro: "Livrare în Moldova: 80 lei pentru comenzi sub 2 000 lei, gratuit peste. Sau ridicare din oficiul din Cahul. Livrarea durează 2–4 zile lucrătoare după expediere.",
        ru: "Доставка по Молдове: 80 лей при заказе до 2 000 лей, дороже — бесплатно. Или самовывоз из офиса в Кагуле. Доставка 2–4 рабочих дня после отправки.",
        src: "Livrare și retur.docx",
      }),
    },
    {
      keys: ["cat timp", "termen", "gata", "cand", "срок", "когда", "сколько дней"],
      reply: () => ({
        ro: "Producția durează 5–10 zile lucrătoare, apoi livrarea 2–4 zile. Pentru produsele din stoc — doar livrarea.",
        ru: "Изготовление 5–10 рабочих дней, затем доставка 2–4 дня. Товары из наличия — только доставка.",
        src: "Livrare și retur.docx",
      }),
    },
    {
      keys: ["mostr", "macheta", "образец", "макет"],
      reply: () => ({
        ro: "Da, facem machete și mostre înainte de producție, ca să vedeți cum arată eticheta sau produsul.",
        ru: "Да, делаем макеты и образцы перед производством, чтобы вы увидели, как будет выглядеть изделие.",
        src: "Servicii: gravare, printare.pdf",
      }),
    },
    {
      keys: ["retur", "schimb", "возврат", "обмен"],
      reply: () => ({
        ro: "Retur în 14 zile pentru produsele standard. Produsele personalizate (cu logo sau text) nu se returnează.",
        ru: "Возврат в течение 14 дней для стандартных товаров. Персонализированные (с логотипом или надписью) не возвращаются.",
        src: "Livrare și retur.docx",
      }),
    },
    {
      keys: ["plat", "card", "numerar", "оплат", "карт", "наличн"],
      reply: () => ({
        ro: "Plata: numerar la livrare, card Visa/Mastercard sau iPay.",
        ru: "Оплата: наличными при получении, картой Visa/Mastercard или через iPay.",
        src: "emblema.md › Coș",
      }),
    },
    {
      keys: ["adres", "unde", "program", "telefon", "адрес", "где", "график", "телефон"],
      reply: () => ({
        ro: "Cahul, str. Ștefan cel Mare 112 B · Galați, str. Combinatului 7. Program 9:00–18:00. Telefon +373 799 49 900.",
        ru: "Кагул, ул. Штефан чел Маре 112 B · Галац, str. Combinatului 7. Работаем 9:00–18:00. Телефон +373 799 49 900.",
        src: "Contacte Cahul / Galați.docx",
      }),
    },
  ],
};

/* ---------------- Metalic.md ---------------- */
const METALIC: Brand = {
  id: "metalic",
  name: "Metalic.md",
  sub: "mobilier metalic pentru firme, depozite, ateliere",
  docs: [
    { n: "Catalog metalic.md", web: true },
    { n: "Prețuri dulapuri și bancuri.xlsx", sheet: true },
    { n: "Dulapuri cu celule, seifuri.pdf" },
    { n: "Contacte.docx" },
  ],
  quick: [
    "Сколько стоит шкаф для одежды?",
    "10 шт шкаф Sum 320R",
    "Banc de lucru pentru atelier",
    "Нужен метизный шкаф",
    "Cât costă un seif pentru contabilitate?",
    "Кровати для общежития",
    "Livrați la Cahul?",
  ],
  greet: "Здравствуйте! Я помощник Metalic.md: шкафы, верстаки, стеллажи, сейфы, кровати. Спросите цену или опишите задачу. Scrieți și în română.",
  kb: [
    {
      keys: ["seif", "сеиф", "сейф"],
      reply: () => ({
        ro: "Seifuri avem multe: contabile, de mobilier, de birou, pentru arme, antiefracție. Prețul îl confirmă managerul după model — spuneți pentru ce vă trebuie și ce dimensiune, transmit acum.",
        ru: "Сейфов много: бухгалтерские, мебельные, офисные, оружейные, взломостойкие. Цену подтверждает менеджер по модели — напишите, для чего и какого размера, сразу передам.",
        src: "Dulapuri cu celule, seifuri.pdf",
        awaitDetails: "Seif",
      }),
    },
    {
      keys: ["raft", "rafturi", "стеллаж"],
      reply: () => ({
        ro: "Rafturi metalice pentru depozit (Rmm 200, Rmm 300) și arhivă mobilă. Prețul depinde de înălțime și număr de polițe — scrieți dimensiunile depozitului sau câte rafturi, și managerul face oferta.",
        ru: "Металлические стеллажи для склада (Rmm 200, Rmm 300) и передвижные архивные. Цена зависит от высоты и количества полок — напишите размеры склада или сколько стеллажей, менеджер посчитает.",
        src: "Catalog metalic.md › Stelaje",
        awaitDetails: "Rafturi",
      }),
    },
    {
      keys: ["metiz", "suruburi", "piulit", "метиз", "болт", "крепеж"],
      reply: (q) => {
        const t = times(q, 14800, "buc.", "шт.");
        return {
          ro: `Dulapuri pentru șuruburi cu cutii: Swm 701-1 — 14 800 lei,${t.ro} Swm 701-2 — 16 800 lei, Swm 702-2 — 21 300 lei.`,
          ru: `Метизные шкафы с контейнерами: Swm 701-1 — 14 800 лей,${t.ru} Swm 701-2 — 16 800 лей, Swm 702-2 — 21 300 лей.`,
          src: "Prețuri dulapuri și bancuri.xlsx",
        };
      },
    },
    {
      keys: ["instrument", "scule", "инструмент"],
      reply: (q) => {
        const t = times(q, 12500, "buc.", "шт.");
        return {
          ro: `Dulapuri pentru scule: Swm 322 — 12 500 lei,${t.ro} Swm 202 — 14 500 lei, Swm 212 — 16 500 lei.`,
          ru: `Инструментальные шкафы: Swm 322 — 12 500 лей,${t.ru} Swm 202 — 14 500 лей, Swm 212 — 16 500 лей.`,
          src: "Prețuri dulapuri și bancuri.xlsx",
        };
      },
    },
    {
      keys: ["banc", "верстак", "workbench", "masa de lucru", "рабочий стол"],
      reply: (q) => {
        const t = times(q, 11150, "buc.", "шт.");
        return {
          ro: `Bancuri de lucru: cu blat din placaj Stw 321 — 5 628 lei, cu un sertar-dulap Stw 325-2M2B — 11 150 lei,${t.ro} serie grea Stw 324 — 19 000 lei, Stw 402 — 25 500 lei.`,
          ru: `Верстаки: со столешницей из фанеры Stw 321 — 5 628 лей, однотумбовый Stw 325-2M2B — 11 150 лей,${t.ru} тяжёлой серии Stw 324 — 19 000 лей, Stw 402 — 25 500 лей.`,
          src: "Prețuri dulapuri și bancuri.xlsx",
        };
      },
    },
    {
      keys: ["celul", "locker", "abonent", "ячеечн", "ячеи", "локер", "абонент", "почтов"],
      reply: () => ({
        ro: "Dulapuri cu celule: Wss 10 — 8 500 lei, Wss 20 — 12 000 lei, 62 de celule — 36 500 lei, locker antivandal Wss 72 — 38 000 lei.",
        ru: "Ячеечные шкафы: Wss 10 — 8 500 лей, Wss 20 — 12 000 лей, на 62 ячейки — 36 500 лей, антивандальный локер Wss 72 — 38 000 лей.",
        src: "Dulapuri cu celule, seifuri.pdf",
      }),
    },
    {
      keys: ["paturi", "pat militar", "pat supra", "camin", "кроват", "общежит"],
      reply: (q) => {
        const t = times(q, 6800, "buc.", "шт.");
        return {
          ro: `Paturi metalice: pat militar de câmp LMR-02 — 3 500 lei, pat supraetajat KDM-01 — 6 800 lei,${t.ro} KDM-06 — 7 499 lei. Pentru cămine și hoteluri facem ofertă la cantitate.`,
          ru: `Металлические кровати: армейская полевая ЛМР-02 — 3 500 лей, двухъярусная КДМ-01 — 6 800 лей,${t.ru} КДМ-06 — 7 499 лей. Для общежитий и гостиниц — предложение на количество.`,
          src: "Catalog metalic.md › Paturi",
        };
      },
    },
    {
      keys: ["uniform", "curaten", "hozia", "хозяй", "уборочн", "инвентар"],
      reply: () => ({
        ro: "Dulapuri de serviciu pentru inventar de curățenie: SMD 52 — 4 650 lei, SMD 62 — 5 900 lei, SMD 82 — 6 500 lei.",
        ru: "Хозяйственные шкафы для уборочного инвентаря: SMD 52 — 4 650 лей, SMD 62 — 5 900 лей, SMD 82 — 6 500 лей.",
        src: "Prețuri dulapuri și bancuri.xlsx",
      }),
    },
    {
      keys: ["dulap", "haine", "vestiar", "шкаф", "одежд", "раздевал"],
      reply: (q) => {
        const t = times(q, 5280, "buc.", "шт.");
        return {
          ro: `Dulapuri metalice pentru haine (demontabile): Sum 310R — 3 048 lei, Sum 320R — 5 280 lei,${t.ro} Sum 330R — 7 650 lei. Pentru vestiare de firmă — spuneți câți angajați și calculez.`,
          ru: `Металлические шкафы для одежды (разборные): Sum 310R — 3 048 лей, Sum 320R — 5 280 лей,${t.ru} Sum 330R — 7 650 лей. Для раздевалки на предприятии — напишите, сколько сотрудников, посчитаю.`,
          src: "Prețuri dulapuri și bancuri.xlsx",
        };
      },
    },
    {
      keys: ["livr", "transport", "cahul", "достав", "кагул", "привез"],
      reply: () => ({
        ro: "Livrăm în Chișinău și în toată Moldova. Costul exact pentru localitatea dvs. îl confirmă managerul — scrieți orașul și ce comandați.",
        ru: "Доставляем по Кишинёву и всей Молдове. Точную стоимость для вашего города подтвердит менеджер — напишите город и что заказываете.",
        src: "metalic.md › Livrare",
        awaitDetails: "Livrare",
      }),
    },
    {
      keys: ["telefon", "contact", "adres", "телефон", "контакт", "адрес"],
      reply: () => ({
        ro: "Telefon +373 79 476 449, e-mail limanigrup@gmail.com.",
        ru: "Телефон +373 79 476 449, e-mail limanigrup@gmail.com.",
        src: "Contacte.docx",
      }),
    },
  ],
};

const BRANDS = [EMBLEMA, METALIC];

function respond(brand: Brand, raw: string, pending: string | null): Reply & { lang: Lang } {
  const t = norm(raw);
  const lang: Lang = /[а-я]/.test(t) ? "ru" : "ro";
  const q = qtyOf(t);
  const hit = brand.kb.find((e) => e.keys.some((k) => t.includes(norm(k))));
  if (pending && !hit)
    return {
      lang,
      ro: "Mulțumesc! Am transmis cererea managerului, vă sună cu prețul în orele de lucru. Lăsați și numărul de telefon, dacă nu l-ați scris.",
      ru: "Спасибо! Передал заявку менеджеру, он перезвонит с ценой в рабочее время. Оставьте номер телефона, если ещё не написали.",
      lead: `📝 ${pending}: „${raw}”`,
    };
  if (hit) return { lang, ...hit.reply(q) };
  if (/^(salut|buna|privet|привет|здравств|добр)/.test(t))
    return { lang, ro: brand.greet, ru: brand.greet };
  return {
    lang,
    ro: "Nu am găsit asta în catalog și nu vreau să inventez. Am transmis întrebarea managerului — vă răspunde în orele de lucru.",
    ru: "Этого нет в каталоге, а выдумывать не буду. Передал вопрос менеджеру — он ответит в рабочее время.",
    lead: `❓ Fără răspuns în catalog: „${raw}”`,
  };
}

export function FamilyBotDemo() {
  const [bid, setBid] = useState(BRANDS[0].id);
  const brand = BRANDS.find((b) => b.id === bid)!;
  const [chats, setChats] = useState<Record<string, Msg[]>>(() =>
    Object.fromEntries(BRANDS.map((b) => [b.id, [{ from: "bot", text: b.greet }]])),
  );
  const [leads, setLeads] = useState<Record<string, string[]>>({ emblema: [], metalic: [] });
  const [pending, setPending] = useState<Record<string, string | null>>({ emblema: null, metalic: null });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: "smooth" });
  }, [chats, typing, bid]);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text || typing) return;
    const id = brand.id;
    setChats((c) => ({ ...c, [id]: [...c[id], { from: "user", text }] }));
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const r = respond(brand, text, pending[id]);
      const out = r.lang === "ro" ? r.ro : r.ru.replace(/ lei/g, " лей");
      setChats((c) => ({ ...c, [id]: [...c[id], { from: "bot", text: out, src: r.src }] }));
      if (r.lead) setLeads((l) => ({ ...l, [id]: [...l[id], r.lead!] }));
      setPending((p) => ({ ...p, [id]: r.awaitDetails ?? null }));
      setTyping(false);
    }, 650);
  };

  return (
    <>
      <div className="fb-tabs" role="tablist">
        {BRANDS.map((b) => (
          <button key={b.id} role="tab" aria-selected={bid === b.id} className={bid === b.id ? "on" : ""} onClick={() => setBid(b.id)}>
            <b>{b.name}</b>
            <small>{b.sub}</small>
          </button>
        ))}
      </div>

      <div className="cb-grid fb-grid">
        <aside className="cb-docs">
          <span className="cb-label">Ce știe asistentul</span>
          {brand.docs.map((d) => (
            <div className="cb-doc" key={d.n}>
              {d.web ? <Globe size={17} /> : d.sheet ? <FileSpreadsheet size={17} /> : <FileText size={17} />} {d.n}
            </div>
          ))}
          <p>Prețurile și condițiile sunt luate de pe site-ul {brand.name}. Ce nu e acolo, asistentul nu inventează — trimite managerului.</p>
          <div className="cb-manager">
            <span className="cb-label">Telegram-ul managerului</span>
            {leads[brand.id].length === 0 ? (
              <p className="cb-empty">
                Aici apar cererile gata de lucru. Încercați „{brand.id === "emblema" ? "Vreau etichete țesute cu logo" : "Cât costă un seif pentru contabilitate?"}”, apoi
                răspundeți cu detalii.
              </p>
            ) : (
              leads[brand.id].map((h, i) => (
                <div className="cb-alert" key={i}>
                  <b>{h.startsWith("📝") ? "Cerere nouă de pe site" : "Întrebare nouă"}</b>
                  <span>{h}</span>
                </div>
              ))
            )}
          </div>
        </aside>

        <div className="cb-chat fb-chat">
          <div className="cb-head">
            {brand.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="fb-logo" src={brand.logo} alt="" />
            ) : (
              <span className="cb-ava fb-ava">M</span>
            )}
            <div>
              <b>{brand.name} · asistent</b>
              <small>{typing ? "scrie…" : "online 24/7 · RO / RU"}</small>
            </div>
          </div>
          <div className="cb-body" ref={body} aria-live="polite">
            {chats[brand.id].map((m, i) => (
              <div key={i} className={`cb-msg ${m.from}`}>
                {m.text}
                {m.src && <small className="cb-src">📎 {m.src}</small>}
              </div>
            ))}
            {typing && (
              <div className="cb-msg bot cb-typing">
                <i />
                <i />
                <i />
              </div>
            )}
          </div>
          <div className="cb-quick">
            {brand.quick.map((q) => (
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
    </>
  );
}
