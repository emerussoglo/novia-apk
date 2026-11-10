import Link from "next/link";

type LegalSection = { title: string; paragraphs: string[] };

export default function LegalPage({
  label,
  title,
  intro,
  sections,
}: {
  label: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="legal-page-clean">
      <div className="legal-container-clean">
        <header className="legal-header-clean">
          <span className="legal-badge-pill">{label}</span>
          <h1 className="legal-title-clean">{title}</h1>
          <p className="legal-intro-clean">{intro}</p>
        </header>

        <article className="legal-card-box">
          {sections.map((section) => (
            <div key={section.title} className="legal-section-block">
              <h2 className="legal-section-title">{section.title}</h2>
              {section.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="legal-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </article>

        <div className="legal-footer-nav">
          <Link href="/" className="legal-back-clean">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
