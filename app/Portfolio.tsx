"use client";

import { useEffect, useRef, useState } from "react";

const copy = {
  en: {
    nav: ["Work", "Services", "Process"],
    location: "Ottawa · Montréal · Remote",
    start: "Start a project",
    role: "Independent designer & creative developer",
    titleA: "Websites",
    titleB: "people",
    titleItalic: "feel",
    titleC: "businesses use.",
    intro: "Bilingual digital experiences for established businesses ready to look as credible online as they are in real life.",
    explore: "Explore selected work",
    workKicker: "Selected work · 2026",
    workTitle: "Built to be remembered. Designed to perform.",
    concept: "Concept project",
    cases: [
      { n: "01", title: "Northline", type: "Home services · Ottawa", desc: "A bilingual quote experience that turns decades of local trust into a clear digital advantage.", tags: ["Strategy", "Web design", "Lead flow"] },
      { n: "02", title: "Rivière", type: "Wellness clinic · Montréal", desc: "A calm, French-first booking journey designed around accessibility, confidence and care.", tags: ["UX design", "Accessibility", "Booking"] },
      { n: "03", title: "Maison Forme", type: "Artisan brand · Québec", desc: "A tactile product story where editorial type and a sculptural object move as one composition.", tags: ["Art direction", "3D motion", "Commerce"] },
    ],
    servicesKicker: "What I do",
    servicesTitle: "The craft of a studio. The attention of one partner.",
    services: [
      ["01", "Digital direction", "Positioning, content structure and the clearest path from attention to action."],
      ["02", "Web design", "Distinct visual systems that remain readable, useful and unmistakably yours."],
      ["03", "Creative development", "Responsive builds, purposeful motion and technical care from prototype to launch."],
      ["04", "Platform integration", "WordPress, Shopify, existing databases and business tools—preserved when they still work."],
    ],
    processKicker: "A clear process",
    processTitle: "No mystery between the first call and launch day.",
    steps: [
      ["Discover", "We audit the business, customers, current website and technical setup."],
      ["Define", "We agree on outcomes, scope, content, schedule and one clear creative direction."],
      ["Design + build", "You review a working experience, not a stack of disconnected mockups."],
      ["Launch + grow", "We protect SEO, connect the domain, test everything and measure what happens next."],
    ],
    offerKicker: "Ways to work together",
    offerTitle: "Choose the level of transformation.",
    offers: [
      ["Website refresh", "For an established business whose current website no longer reflects its quality.", "From $3k CAD"],
      ["Bilingual growth site", "A complete English/French presence with stronger lead, booking or sales journeys.", "From $5.5k CAD"],
      ["Signature experience", "Original motion, illustration or 3D for brands competing on experience and perception.", "From $10k CAD"],
    ],
    aboutKicker: "About Mike",
    aboutTitle: "Business thinking, visual ambition and code in the same room.",
    aboutBody: "I build expressive websites without losing sight of the person trying to understand, trust and contact the business. Based in Ottawa, working bilingually across Ontario, Québec and beyond.",
    ctaSmall: "Have a website that should be working harder?",
    ctaTitle: "Let’s make it impossible to overlook.",
    ctaButton: "Request a website audit",
    footer: "Independent design & development · Canada",
  },
  fr: {
    nav: ["Projets", "Services", "Processus"],
    location: "Ottawa · Montréal · À distance",
    start: "Démarrer un projet",
    role: "Designer indépendant et développeur créatif",
    titleA: "Des sites",
    titleB: "qui font",
    titleItalic: "sentir",
    titleC: "et agir.",
    intro: "Des expériences numériques bilingues pour les entreprises établies qui veulent inspirer autant confiance en ligne que dans la vraie vie.",
    explore: "Découvrir les projets",
    workKicker: "Projets sélectionnés · 2026",
    workTitle: "Mémorables par leur forme. Performants par leur fonction.",
    concept: "Projet conceptuel",
    cases: [
      { n: "01", title: "Northline", type: "Services résidentiels · Ottawa", desc: "Une expérience de soumission bilingue qui transforme des décennies de confiance locale en avantage numérique.", tags: ["Stratégie", "Design web", "Conversion"] },
      { n: "02", title: "Rivière", type: "Clinique bien-être · Montréal", desc: "Un parcours de réservation calme, pensé d’abord en français autour de l’accessibilité et de la confiance.", tags: ["UX", "Accessibilité", "Réservation"] },
      { n: "03", title: "Maison Forme", type: "Marque artisanale · Québec", desc: "Un récit produit tactile où la typographie éditoriale et l’objet sculptural évoluent ensemble.", tags: ["Direction artistique", "Mouvement 3D", "Commerce"] },
    ],
    servicesKicker: "Ce que je fais",
    servicesTitle: "Le savoir-faire d’un studio. L’attention d’un seul partenaire.",
    services: [
      ["01", "Direction numérique", "Positionnement, structure du contenu et chemin clair de l’attention vers l’action."],
      ["02", "Design web", "Des systèmes visuels distinctifs qui restent lisibles, utiles et fidèles à votre marque."],
      ["03", "Développement créatif", "Sites adaptatifs, mouvement intentionnel et rigueur technique jusqu’au lancement."],
      ["04", "Intégration de plateformes", "WordPress, Shopify, bases de données et outils existants—conservés lorsqu’ils fonctionnent."],
    ],
    processKicker: "Un processus clair",
    processTitle: "Aucune zone grise entre le premier appel et le lancement.",
    steps: [
      ["Découvrir", "Audit de l’entreprise, de la clientèle, du site actuel et de l’environnement technique."],
      ["Définir", "Objectifs, portée, contenu, calendrier et direction créative sont validés ensemble."],
      ["Concevoir + bâtir", "Vous révisez une expérience fonctionnelle, pas une série de maquettes isolées."],
      ["Lancer + évoluer", "Référencement protégé, domaine connecté, tests complets et résultats mesurés."],
    ],
    offerKicker: "Façons de collaborer",
    offerTitle: "Choisissez le niveau de transformation.",
    offers: [
      ["Refonte essentielle", "Pour une entreprise établie dont le site ne reflète plus la qualité.", "Dès 3 k$ CAD"],
      ["Site bilingue croissance", "Une présence français/anglais avec de meilleurs parcours de demande, réservation ou vente.", "Dès 5,5 k$ CAD"],
      ["Expérience signature", "Mouvement, illustration ou 3D originale pour les marques qui misent sur l’expérience.", "Dès 10 k$ CAD"],
    ],
    aboutKicker: "À propos de Mike",
    aboutTitle: "Réflexion d’affaires, ambition visuelle et code dans la même pièce.",
    aboutBody: "Je crée des sites expressifs sans oublier la personne qui cherche à comprendre, faire confiance et contacter l’entreprise. Basé à Ottawa, je travaille en français et en anglais en Ontario, au Québec et ailleurs.",
    ctaSmall: "Votre site devrait-il en faire davantage?",
    ctaTitle: "Rendons votre entreprise impossible à ignorer.",
    ctaButton: "Demander un audit du site",
    footer: "Design et développement indépendant · Canada",
  },
};

type Language = keyof typeof copy;

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>("en");
  const heroRef = useRef<HTMLElement>(null);
  const t = copy[language];

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const moveObject = (event: React.PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    heroRef.current.style.setProperty("--mx", `${x * 15}deg`);
    heroRef.current.style.setProperty("--my", `${y * -12}deg`);
  };

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Mike Kanyatsi, home">MK<span>®</span></a>
        <div className="desktop-links">
          <a href="#work">{t.nav[0]}</a><a href="#services">{t.nav[1]}</a><a href="#process">{t.nav[2]}</a>
        </div>
        <div className="nav-actions">
          <button className="language" onClick={() => setLanguage(language === "en" ? "fr" : "en")} aria-label={language === "en" ? "Passer au français" : "Switch to English"}>{language === "en" ? "FR" : "EN"}</button>
          <a className="contact-pill" href="mailto:hello@mikekanyatsi.ca">{t.start} <span aria-hidden="true">↗</span></a>
        </div>
      </nav>

      <section className="hero" id="top" ref={heroRef} onPointerMove={moveObject}>
        <p className="eyebrow">{t.role}</p>
        <h1 className="hero-title">
          <span>{t.titleA}</span>
          <span className="title-indent">{t.titleB} <i>{t.titleItalic}</i></span>
          <span>{t.titleC}</span>
        </h1>
        <div className="hero-object" aria-hidden="true">
          <div className="orb orb-back" /><div className="orb orb-mid" /><div className="orb orb-front" />
          <div className="orbit-label">DESIGN / CODE / MOTION /</div>
        </div>
        <div className="hero-footer">
          <p>{t.intro}</p>
          <a href="#work" className="scroll-cue">{t.explore} <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <div className="ticker" aria-hidden="true"><div>STRATEGY ✦ DESIGN ✦ DEVELOPMENT ✦ BILINGUAL ✦ MOTION ✦ STRATEGY ✦ DESIGN ✦ DEVELOPMENT ✦</div></div>

      <section className="work section-pad" id="work">
        <header className="section-heading" data-reveal><p>{t.workKicker}</p><h2>{t.workTitle}</h2></header>
        <div className="case-list">
          {t.cases.map((item, index) => (
            <article className={`case case-${index + 1}`} key={item.title} data-reveal>
              <div className="case-visual" aria-hidden="true">
                {index === 0 && <><div className="roofline" /><div className="quote-card"><b>48h</b><span>Quote response</span></div><div className="project-no">N / 01</div></>}
                {index === 1 && <><div className="clinic-ring"><span>R</span></div><div className="appointment"><small>Next opening</small><b>10:30</b><span>Tuesday · Consultation</span></div><div className="pulse-line" /></>}
                {index === 2 && <><div className="vessel"><span>MF</span></div><div className="product-type">FORM<br />FOLLOWS<br /><i>feeling</i></div></>}
              </div>
              <div className="case-copy">
                <div><span>{item.n}</span><span className="concept-tag">{t.concept}</span></div>
                <h3>{item.title}</h3><p className="case-type">{item.type}</p><p className="case-desc">{item.desc}</p>
                <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services dark-section section-pad" id="services">
        <header className="section-heading light" data-reveal><p>{t.servicesKicker}</p><h2>{t.servicesTitle}</h2></header>
        <div className="service-list">
          {t.services.map(([n, title, desc]) => <article key={n} data-reveal><span>{n}</span><h3>{title}</h3><p>{desc}</p><b aria-hidden="true">↗</b></article>)}
        </div>
      </section>

      <section className="process section-pad" id="process">
        <header className="section-heading" data-reveal><p>{t.processKicker}</p><h2>{t.processTitle}</h2></header>
        <div className="steps">
          {t.steps.map(([title, desc], i) => <article key={title} data-reveal><span>0{i + 1}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </section>

      <section className="offers section-pad">
        <header className="section-heading compact" data-reveal><p>{t.offerKicker}</p><h2>{t.offerTitle}</h2></header>
        <div className="offer-grid">
          {t.offers.map(([title, desc, price], i) => <article key={title} data-reveal><span>0{i + 1}</span><h3>{title}</h3><p>{desc}</p><b>{price}</b></article>)}
        </div>
      </section>

      <section className="about section-pad">
        <div className="about-stamp" aria-hidden="true"><span>MK</span><i>Independent / Canada / 2026</i></div>
        <div className="about-copy" data-reveal><p>{t.aboutKicker}</p><h2>{t.aboutTitle}</h2><div><p>{t.aboutBody}</p><ul><li>EN / FR</li><li>Accessible by default</li><li>Built for ownership</li></ul></div></div>
      </section>

      <section className="final-cta section-pad">
        <p data-reveal>{t.ctaSmall}</p><h2 data-reveal>{t.ctaTitle}</h2>
        <a data-reveal href="mailto:hello@mikekanyatsi.ca?subject=Website%20audit" className="cta-orbit">{t.ctaButton}<span aria-hidden="true">↗</span></a>
      </section>

      <footer><a className="brand" href="#top">MK<span>®</span></a><p>{t.footer}</p><p>© 2026</p></footer>
    </main>
  );
}
