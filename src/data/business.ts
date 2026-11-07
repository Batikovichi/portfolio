// Client-facing copy for Moldovan businesses (RO / RU).
// Keep claims honest: every project is a prototype or private build, no invented clients or results.

export type Lang = "ro" | "ru";

export const contact = {
  email: "adrian.fiodorov@gmail.com",
  // Fill in when Adrian confirms public contacts, e.g. "+37360000000" / "username".
  phone: "+37367540092" as string,
  telegram: "batikovichi" as string,
};

type BizProject = { name: string; tag: string; status: string; text: string; points: string[] };

export interface BizCopy {
  langLabel: string;
  otherLang: { href: string; label: string };
  heroKicker: string;
  heroTitle: [string, string];
  heroText: string;
  heroCta: string;
  heroCta2: string;
  servicesTitle: string;
  services: { title: string; text: string }[];
  demoKicker: string;
  demoTitle: string;
  demoText: string;
  stepsTitle: string;
  steps: { title: string; text: string }[];
  projectsTitle: string;
  projectsAside: string;
  projects: BizProject[];
  honestTitle: string;
  honestText: string;
  contactTitle: string;
  contactText: string;
  emailLabel: string;
  phoneLabel: string;
  telegramLabel: string;
  devPortfolio: string;
  calc: {
    type: string;
    kitchen: string;
    gate: string;
    fence: string;
    length: string;
    width: string;
    height: string;
    fenceLength: string;
    material: string;
    kitchenMaterials: [string, string, string];
    gateMaterials: [string, string, string];
    name: string;
    namePlaceholder: string;
    phone: string;
    result: string;
    from: string;
    to: string;
    send: string;
    sent: string;
    tgTitle: string;
    tgNew: string;
    tgClient: string;
    tgPhone: string;
    tgEstimate: string;
    disclaimer: string;
  };
}

export const copy: Record<Lang, BizCopy> = {
  ro: {
    langLabel: "RO",
    otherLang: { href: "/ru", label: "RU" },
    heroKicker: "SITE-URI · CALCULATOARE · CHAT-BOȚI",
    heroTitle: ["Clientul vede prețul,", "voi primiți cererea."],
    heroText:
      "Sunt Adrian, freelancer din Chișinău. Fac site-uri, calculatoare de preț și chat-boți pentru firme de mobilă, metal, construcții și producție, ca cererile să vină gata cu dimensiuni direct în Telegram.",
    heroCta: "Încercați calculatorul",
    heroCta2: "Scrieți-mi",
    servicesTitle: "Ce pot face pentru firma voastră",
    services: [
      { title: "Calculator de preț pe site", text: "Clientul introduce dimensiunile și vede un preț orientativ. Voi primiți cererea cu toate datele, gata pentru măsurare." },
      { title: "Cereri direct în Telegram", text: "Formularele de pe site, Facebook sau Instagram ajung într-un singur loc, cu notificare imediată pentru manager." },
      { title: "Chat-bot care răspunde seara", text: "Botul întreabă ce vrea clientul, dimensiunile și telefonul, iar dimineața managerul are totul pregătit." },
      { title: "Site nou sau actualizat", text: "Site rapid, pe telefon, în română și rusă, cu lucrările voastre și un buton clar de cerere." },
    ],
    demoKicker: "DEMO LIVE",
    demoTitle: "Încercați: așa ar arăta pe site-ul vostru",
    demoText: "Alegeți produsul și dimensiunile. În dreapta vedeți mesajul pe care l-ar primi managerul în Telegram.",
    stepsTitle: "Cum lucrăm",
    steps: [
      { title: "Apel de 10 minute", text: "Îmi spuneți cum primiți acum comenzile și unde se pierde timpul." },
      { title: "Schiță gratuită", text: "Fac o schiță pe exemplul firmei voastre. Dacă nu vă convine, nu pierdeți nimic." },
      { title: "Lansare și suport", text: "Pun totul pe site, conectez Telegram și ajustez după primele cereri reale." },
    ],
    projectsTitle: "Proiecte pe care le-am construit",
    projectsAside: "Lucrez ca freelancer de jumătate de an. Mai jos sunt proiecte reale, descrise exact așa cum sunt astăzi.",
    projects: [
      {
        name: "Site trilingv cu programări și CRM",
        tag: "Butic de haine, Chișinău",
        status: "Construit complet, lansarea publică în așteptare",
        text: "Site în română, rusă și engleză cu catalog și programare la probă, plus un panou pentru personal.",
        points: ["Programare pe stilist, zi și oră", "Istoricul clienților și preferințele lor", "Asistent AI pentru echipă"],
      },
      {
        name: "Sistem de programări online",
        tag: "BookFlow",
        status: "Prototip funcțional",
        text: "Clientul alege serviciul și ora liberă, iar sistemul nu permite două rezervări pe același interval.",
        points: ["Ore calculate pe fusul orar al Chișinăului", "Pagină publică de rezervare", "Configurare rapidă pentru o afacere nouă"],
      },
      {
        name: "Bot Telegram de programări",
        tag: "Bot cu panou pentru proprietar",
        status: "Versiune privată",
        text: "Clienții aleg serviciul și ora direct în Telegram, iar proprietarul vede toate programările.",
        points: ["Rezervare și anulare din chat", "Vedere a programărilor pentru proprietar", "Memento-uri automate"],
      },
      {
        name: "Diagnostic de afacere",
        tag: "Chestionar web în 3 limbi",
        status: "Prototip",
        text: "Un chestionar care găsește unde pierde timp sau bani afacerea și calculează efectul doar din cifrele introduse.",
        points: ["Română, rusă, engleză", "Întrebări care se adaptează răspunsurilor", "Colectează contactele în baza de date"],
      },
      {
        name: "Video promo cu AI",
        tag: "Producție video automată",
        status: "Funcționează local",
        text: "Din fotografii și un text scurt se generează video vertical cu voce, subtitrări și animație.",
        points: ["Format pentru Reels și TikTok", "Voce și subtitrări automate", "Două promo-uri de brand realizate"],
      },
    ],
    honestTitle: "De ce scriu „prototip”",
    honestText:
      "Nu am încă nume mari în portofoliu și nu vreau să inventez. De aceea propun o schiță gratuită pe exemplul firmei voastre: vedeți rezultatul înainte să decideți.",
    contactTitle: "Vă arăt pe un exemplu în 10 minute",
    contactText: "Scrieți-mi ce produceți și cum primiți acum comenzile. Răspund în aceeași zi.",
    emailLabel: "Email",
    phoneLabel: "Telefon",
    telegramLabel: "Telegram",
    devPortfolio: "Portofoliu tehnic (EN)",
    calc: {
      type: "Ce comandă clientul?",
      kitchen: "Bucătărie",
      gate: "Poartă",
      fence: "Gard",
      length: "Lungimea bucătăriei (m)",
      width: "Lățimea porții (m)",
      height: "Înălțimea (m)",
      fenceLength: "Lungimea gardului (m)",
      material: "Material / model",
      kitchenMaterials: ["PAL laminat", "MDF vopsit", "Lemn masiv"],
      gateMaterials: ["Profil simplu", "Tablă cu model", "Forjat"],
      name: "Nume",
      namePlaceholder: "Ion",
      phone: "Telefon",
      result: "Preț orientativ",
      from: "de la",
      to: "până la",
      send: "Trimite cererea",
      sent: "Cererea a ajuns la manager ✓",
      tgTitle: "Bot cereri · Telegram",
      tgNew: "Cerere nouă de pe site",
      tgClient: "Client",
      tgPhone: "Telefon",
      tgEstimate: "Estimare",
      disclaimer: "Tarifele din demo sunt exemple. Pe site-ul vostru calculatorul folosește prețurile voastre.",
    },
  },
  ru: {
    langLabel: "RU",
    otherLang: { href: "/ro", label: "RO" },
    heroKicker: "САЙТЫ · КАЛЬКУЛЯТОРЫ · ЧАТ-БОТЫ",
    heroTitle: ["Клиент видит цену,", "вы получаете заявку."],
    heroText:
      "Я Адриан, фрилансер из Кишинёва. Делаю сайты, калькуляторы стоимости и чат-боты для мебельщиков, металлистов, строителей и производителей, чтобы заявки приходили сразу с размерами в Telegram.",
    heroCta: "Попробовать калькулятор",
    heroCta2: "Написать мне",
    servicesTitle: "Что я могу сделать для вашей компании",
    services: [
      { title: "Калькулятор цены на сайте", text: "Клиент вводит размеры и видит ориентировочную цену. Вы получаете заявку со всеми данными, готовую к замеру." },
      { title: "Заявки сразу в Telegram", text: "Формы с сайта, Facebook и Instagram собираются в одном месте, менеджер получает уведомление сразу." },
      { title: "Чат-бот, который отвечает вечером", text: "Бот спрашивает, что нужно клиенту, размеры и телефон, а утром у менеджера всё готово." },
      { title: "Новый или обновлённый сайт", text: "Быстрый сайт для телефона на румынском и русском, с вашими работами и понятной кнопкой заявки." },
    ],
    demoKicker: "ЖИВОЕ ДЕМО",
    demoTitle: "Попробуйте: так это выглядело бы на вашем сайте",
    demoText: "Выберите изделие и размеры. Справа видно сообщение, которое получит менеджер в Telegram.",
    stepsTitle: "Как работаем",
    steps: [
      { title: "Звонок на 10 минут", text: "Рассказываете, как сейчас приходят заказы и где теряется время." },
      { title: "Бесплатный набросок", text: "Делаю набросок на примере вашей компании. Не подойдёт — вы ничего не теряете." },
      { title: "Запуск и поддержка", text: "Ставлю всё на сайт, подключаю Telegram и дорабатываю после первых реальных заявок." },
    ],
    projectsTitle: "Проекты, которые я сделал",
    projectsAside: "Работаю фрилансером полгода. Ниже реальные проекты, описанные ровно такими, какие они сейчас.",
    projects: [
      {
        name: "Трёхъязычный сайт с записью и CRM",
        tag: "Бутик одежды, Кишинёв",
        status: "Полностью собран, ждёт публичного запуска",
        text: "Сайт на румынском, русском и английском с каталогом и записью на примерку, плюс панель для персонала.",
        points: ["Запись по стилисту, дню и времени", "История клиентов и их предпочтения", "AI-ассистент для команды"],
      },
      {
        name: "Система онлайн-записи",
        tag: "BookFlow",
        status: "Рабочий прототип",
        text: "Клиент выбирает услугу и свободное время, а система не даёт записать двоих на один слот.",
        points: ["Время по часовому поясу Кишинёва", "Публичная страница записи", "Быстрая настройка для нового бизнеса"],
      },
      {
        name: "Telegram-бот записи",
        tag: "Бот с кабинетом владельца",
        status: "Частная версия",
        text: "Клиенты выбирают услугу и время прямо в Telegram, владелец видит все записи.",
        points: ["Запись и отмена в чате", "Просмотр записей для владельца", "Автоматические напоминания"],
      },
      {
        name: "Диагностика бизнеса",
        tag: "Веб-опросник на 3 языках",
        status: "Прототип",
        text: "Опросник находит, где бизнес теряет время или деньги, и считает эффект только по введённым цифрам.",
        points: ["Румынский, русский, английский", "Вопросы подстраиваются под ответы", "Сохраняет контакты в базу"],
      },
      {
        name: "Промо-видео с AI",
        tag: "Автоматический видеомонтаж",
        status: "Работает локально",
        text: "Из фотографий и короткого текста собирается вертикальное видео с голосом, субтитрами и анимацией.",
        points: ["Формат для Reels и TikTok", "Голос и субтитры автоматически", "Сделано два промо для брендов"],
      },
    ],
    honestTitle: "Почему я пишу «прототип»",
    honestText:
      "Громких имён в портфолио пока нет, и выдумывать я не хочу. Поэтому предлагаю бесплатный набросок на примере вашей компании: вы видите результат до того, как решите.",
    contactTitle: "Покажу на примере за 10 минут",
    contactText: "Напишите, что вы производите и как сейчас принимаете заказы. Отвечу в тот же день.",
    emailLabel: "Email",
    phoneLabel: "Телефон",
    telegramLabel: "Telegram",
    devPortfolio: "Техническое портфолио (EN)",
    calc: {
      type: "Что заказывает клиент?",
      kitchen: "Кухня",
      gate: "Ворота",
      fence: "Забор",
      length: "Длина кухни (м)",
      width: "Ширина ворот (м)",
      height: "Высота (м)",
      fenceLength: "Длина забора (м)",
      material: "Материал / модель",
      kitchenMaterials: ["ЛДСП", "Крашеный МДФ", "Массив"],
      gateMaterials: ["Простой профиль", "Лист с узором", "Кованые"],
      name: "Имя",
      namePlaceholder: "Иван",
      phone: "Телефон",
      result: "Ориентировочная цена",
      from: "от",
      to: "до",
      send: "Отправить заявку",
      sent: "Заявка ушла менеджеру ✓",
      tgTitle: "Бот заявок · Telegram",
      tgNew: "Новая заявка с сайта",
      tgClient: "Клиент",
      tgPhone: "Телефон",
      tgEstimate: "Оценка",
      disclaimer: "Тарифы в демо условные. На вашем сайте калькулятор считает по вашим ценам.",
    },
  },
};
