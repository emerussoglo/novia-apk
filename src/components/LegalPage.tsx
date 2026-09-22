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
    <main className="legal-page">
      <header className="legal-header">
        <span className="section-badge">{label}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <article className="legal-content">
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
      <Link href="/" className="legal-back">
        <i className="fa-solid fa-arrow-left"></i> Retour à l&apos;accueil
      </Link>
    </main>
  );
}
