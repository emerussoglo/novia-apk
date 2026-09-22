import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-card">
        {/* Glow / Effet lumineux en arrière-plan */}
        <div className="cta-glow-overlay"></div>

        <div className="cta-content">
          <h2 className="cta-title">Ton prochain projet commence ici.</h2>
          <p className="cta-description">
            Choisis ton outil, sélectionne ton offre et commence à créer <br className="desktop-only" />
            avec les fonctionnalités incluses dans ton abonnement.
          </p>
          <Link href="#produits" className="primary-btn cta-btn">
            <span>Voir les offres</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}