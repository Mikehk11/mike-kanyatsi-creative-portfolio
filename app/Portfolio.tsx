"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "EmpowerGen Africa", type: "Nonprofit platform · 2026", summary: "A bilingual digital home for youth programs, stories, events and community action across Ottawa and Africa.", image: "/empowergen-preview.png", href: "https://empowergenafrica.org", displayUrl: "empowergenafrica.org", tone: "coral", status: "Live" },
  { title: "Professional portfolio", type: "Data + technology · 2026", summary: "A focused professional portfolio presenting analytical work, technical strengths and practical business outcomes.", image: "/pro-portfolio-preview.png", href: "https://mikekanyatsi-portfolio.vercel.app", displayUrl: "mikekanyatsi-portfolio.vercel.app", tone: "blue", status: "Live" },
  { title: "Your website could be here", type: "Next collaboration", summary: "A reserved showcase slot for the next business ready for a clearer, faster and more memorable website.", image: "", href: "#request", displayUrl: "yourbusiness.ca", tone: "lime", status: "Open" },
];

const words = {
  en: {
    nav: ["Work", "Services", "Request"], start: "Request a site", availability: "Booking new projects · Canada", kicker: "Web design + creative development",
    headlineA: "Clear websites.", headlineB: "More", headlineAccent: "movement.", intro: "I design bilingual, modern websites that make established businesses easier to understand, trust and contact.",
    primary: "See the work", secondary: "Start a project", proof: ["Ottawa based", "EN + FR", "Design to launch"], workLabel: "Selected work", workTitle: "Real projects, not generic demos.", view: "View live site",
    servicesLabel: "What I deliver", servicesTitle: "A focused studio built around your business.",
    services: [["Strategy + structure", "A clear message, page plan and conversion path before visual design begins."], ["Design + motion", "A distinctive interface with purposeful animation, strong hierarchy and accessible reading."], ["Build + integration", "Responsive development connected to your domain, CMS, database or existing business platform."]],
    process: ["Discover", "Design", "Build", "Launch"], processCopy: "One working direction, frequent previews and a clean handoff. No months of disconnected mockups.",
    requestLabel: "Project request", requestTitle: "Tell me what the website needs to do.", requestIntro: "Share the basics now. I’ll review the request, reply by email and confirm a free time before sending a Microsoft Teams invitation.", email: "Or email directly",
    labels: { name: "Your name", email: "Email address", company: "Business / organization", website: "Current website (optional)", service: "What do you need?", budget: "Estimated budget", message: "What should the new website improve?", call: "Preferred Teams call date", time: "Preferred time", teams: "I would like a Microsoft Teams discovery call" },
    options: ["New website", "Website redesign", "Landing page", "Visual refresh", "Existing platform integration"], budgets: ["Not sure yet", "$2k–$4k CAD", "$4k–$8k CAD", "$8k–$15k CAD", "$15k+ CAD"],
    submit: "Prepare my request", privacy: "This opens a prepared email to Mike. Your preferred call time is confirmed before the Teams invitation is sent.", ready: "Your project request is ready in your email app.", footer: "Independent web design · Ottawa / Montréal / Remote",
  },
  fr: {
    nav: ["Projets", "Services", "Demande"], start: "Demander un site", availability: "Nouveaux projets · Canada", kicker: "Design web + développement créatif",
    headlineA: "Des sites clairs.", headlineB: "Plus de", headlineAccent: "mouvement.", intro: "Je conçois des sites bilingues et modernes qui rendent les entreprises établies plus faciles à comprendre, à croire et à contacter.",
    primary: "Voir les projets", secondary: "Démarrer un projet", proof: ["Basé à Ottawa", "FR + EN", "Du design au lancement"], workLabel: "Projets sélectionnés", workTitle: "De vrais projets, pas des démos génériques.", view: "Voir le site",
    servicesLabel: "Ce que je livre", servicesTitle: "Un studio concentré sur votre entreprise.",
    services: [["Stratégie + structure", "Un message clair, un plan de pages et un parcours de conversion avant le design visuel."], ["Design + mouvement", "Une interface distinctive avec animation utile, hiérarchie forte et lecture accessible."], ["Développement + intégration", "Un site adaptatif relié à votre domaine, CMS, base de données ou plateforme existante."]],
    process: ["Découvrir", "Designer", "Bâtir", "Lancer"], processCopy: "Une direction fonctionnelle, des aperçus fréquents et un transfert propre. Pas des mois de maquettes isolées.",
    requestLabel: "Demande de projet", requestTitle: "Expliquez-moi ce que le site doit accomplir.", requestIntro: "Partagez l’essentiel. Je révise la demande, réponds par courriel et confirme une plage libre avant d’envoyer l’invitation Microsoft Teams.", email: "Ou écrire directement",
    labels: { name: "Votre nom", email: "Adresse courriel", company: "Entreprise / organisme", website: "Site actuel (facultatif)", service: "De quoi avez-vous besoin?", budget: "Budget estimé", message: "Que doit améliorer le nouveau site?", call: "Date préférée pour Teams", time: "Heure préférée", teams: "Je souhaite un appel découverte sur Microsoft Teams" },
    options: ["Nouveau site", "Refonte de site", "Page d’atterrissage", "Rafraîchissement visuel", "Intégration à une plateforme existante"], budgets: ["Pas encore certain", "2 k$–4 k$ CAD", "4 k$–8 k$ CAD", "8 k$–15 k$ CAD", "15 k$+ CAD"],
    submit: "Préparer ma demande", privacy: "Ceci ouvre un courriel préparé pour Mike. La plage horaire est confirmée avant l’envoi de l’invitation Teams.", ready: "Votre demande est prête dans votre application courriel.", footer: "Design web indépendant · Ottawa / Montréal / À distance",
  },
};

type Language = keyof typeof words;

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>("en");
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const t = words[language];
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [language]);

  const moveLight = (event: React.PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const box = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--pointer-x", `${event.clientX - box.left}px`);
    heroRef.current.style.setProperty("--pointer-y", `${event.clientY - box.top}px`);
  };

  const tiltCard = (event: React.PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--card-x", `${((event.clientX - box.left) / box.width - 0.5) * 7}deg`);
    card.style.setProperty("--card-y", `${((event.clientY - box.top) / box.height - 0.5) * -7}deg`);
  };
  const resetCard = (event: React.PointerEvent<HTMLElement>) => { event.currentTarget.style.setProperty("--card-x", "0deg"); event.currentTarget.style.setProperty("--card-y", "0deg"); };

  const submitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Website request — ${form.get("company") || form.get("name")}`;
    const body = [`Name: ${form.get("name")}`, `Email: ${form.get("email")}`, `Business: ${form.get("company")}`, `Current website: ${form.get("website") || "None provided"}`, `Project type: ${form.get("service")}`, `Budget: ${form.get("budget")}`, `Teams call requested: ${form.get("teams") ? "Yes" : "No"}`, `Preferred date: ${form.get("date") || "Flexible"}`, `Preferred time: ${form.get("time") || "Flexible"}`, "", "Project goals:", `${form.get("message")}`].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:mmkanyatsi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top">MIKE<span> / WEB</span></a>
        <div className="nav-links"><a href="#work">{t.nav[0]}</a><a href="#services">{t.nav[1]}</a><a href="#request">{t.nav[2]}</a></div>
        <div className="nav-actions"><button className="language" onClick={() => setLanguage(language === "en" ? "fr" : "en")}>{language === "en" ? "FR" : "EN"}</button><a className="nav-cta" href="#request">{t.start}<span>↗</span></a></div>
      </nav>

      <section className="hero" id="top" ref={heroRef} onPointerMove={moveLight}>
        <div className="hero-glow" aria-hidden="true" /><div className="hero-grid" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="hero-copy">
          <div className="availability"><span />{t.availability}</div><p className="hero-kicker">{t.kicker}</p>
          <h1><span>{t.headlineA}</span><span>{t.headlineB} <em>{t.headlineAccent}</em></span></h1>
          <p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button-primary" href="#work">{t.primary} <span>↓</span></a><a className="button-text" href="#request">{t.secondary} ↗</a></div>
        </div>
        <div className="motion-panel" aria-hidden="true"><div className="motion-window"><span>01</span><b>Make it clear.</b><div className="signal"><i /><i /><i /><i /><i /></div></div><div className="motion-card card-a"><small>DESIGN</small><b>Purpose</b></div><div className="motion-card card-b"><small>MOTION</small><b>Feeling</b></div><div className="motion-cross">+</div></div>
        <ul className="proof-row">{t.proof.map((item, i) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ul>
      </section>

      <div className="ticker" aria-hidden="true"><div>WEBSITES THAT MOVE WITH PURPOSE • OTTAWA • MONTRÉAL • STRATEGY • DESIGN • DEVELOPMENT • WEBSITES THAT MOVE WITH PURPOSE •</div></div>

      <section className="work compact-section" id="work">
        <header className="section-head" data-reveal><p>{t.workLabel}</p><h2>{t.workTitle}</h2><span>02 / WORK</span></header>
        <div className="project-grid">{projects.map((project, index) => (
          <a className={`project-card ${project.tone} ${index === 0 ? "featured" : ""}`} href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={project.title} data-reveal onPointerMove={tiltCard} onPointerLeave={resetCard}>
            <div className="project-top"><span>0{index + 1}</span><span>{project.status} <i /></span></div>
            {project.image ? (
              <div className="project-preview browser-preview">
                <div className="browser-bar" aria-hidden="true">
                  <span className="browser-controls"><i /><i /><i /></span>
                  <span className="browser-address"><i>●</i>{project.displayUrl}</span>
                  <span className="browser-open">↗</span>
                </div>
                <div className="browser-viewport">
                  <img src={project.image} alt={`${project.title} website homepage preview`} />
                  <span className="preview-action">Open live website <i>↗</i></span>
                </div>
              </div>
            ) : (
              <div className="project-preview placeholder-preview"><span>YOUR<br />PROJECT</span><i>+</i></div>
            )}
            <div className="project-copy"><p>{project.type}</p><h3>{project.title}</h3><p>{project.summary}</p><b>{index < 2 ? t.view : t.start} ↗</b></div>
          </a>
        ))}</div>
      </section>

      <section className="services compact-section" id="services">
        <header className="section-head inverse" data-reveal><p>{t.servicesLabel}</p><h2>{t.servicesTitle}</h2><span>03 / SERVICES</span></header>
        <div className="service-layout"><div className="service-list">{t.services.map(([title, description], index) => <article key={title} data-reveal><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><b>↗</b></article>)}</div><aside className="process-card" data-reveal><span>HOW IT MOVES</span><p>{t.processCopy}</p><ol>{t.process.map((step, index) => <li key={step}><i>0{index + 1}</i>{step}</li>)}</ol></aside></div>
      </section>

      <section className="request compact-section" id="request">
        <div className="request-intro" data-reveal><p>{t.requestLabel}</p><h2>{t.requestTitle}</h2><p>{t.requestIntro}</p><a href="mailto:mmkanyatsi@gmail.com">{t.email}<strong>mmkanyatsi@gmail.com</strong></a><div className="calendar-mark" aria-hidden="true"><span>TEAMS</span><b>30</b><i>MIN</i></div></div>
        <form className="request-form" onSubmit={submitRequest} data-reveal>
          <div className="field"><label htmlFor="name">{t.labels.name}</label><input id="name" name="name" autoComplete="name" required /></div><div className="field"><label htmlFor="email">{t.labels.email}</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
          <div className="field"><label htmlFor="company">{t.labels.company}</label><input id="company" name="company" autoComplete="organization" required /></div><div className="field"><label htmlFor="website">{t.labels.website}</label><input id="website" name="website" type="url" placeholder="https://" /></div>
          <div className="field"><label htmlFor="service">{t.labels.service}</label><select id="service" name="service" required defaultValue=""><option value="" disabled>—</option>{t.options.map((option) => <option key={option}>{option}</option>)}</select></div><div className="field"><label htmlFor="budget">{t.labels.budget}</label><select id="budget" name="budget" required defaultValue=""><option value="" disabled>—</option>{t.budgets.map((option) => <option key={option}>{option}</option>)}</select></div>
          <div className="field full"><label htmlFor="message">{t.labels.message}</label><textarea id="message" name="message" rows={4} required /></div>
          <label className="teams-choice"><input type="checkbox" name="teams" defaultChecked /><span><i>✓</i>{t.labels.teams}</span></label>
          <div className="field"><label htmlFor="date">{t.labels.call}</label><input id="date" name="date" type="date" min={today} /></div><div className="field"><label htmlFor="time">{t.labels.time}</label><select id="time" name="time" defaultValue=""><option value="">Flexible</option><option>09:30</option><option>11:00</option><option>13:30</option><option>15:00</option><option>17:30</option></select></div>
          <div className="form-footer"><p>{submitted ? t.ready : t.privacy}</p><button type="submit">{t.submit}<span>↗</span></button></div>
        </form>
      </section>

      <footer><a className="brand" href="#top">MIKE<span> / WEB</span></a><p>{t.footer}</p><a href="mailto:mmkanyatsi@gmail.com">mmkanyatsi@gmail.com</a></footer>
    </main>
  );
}
