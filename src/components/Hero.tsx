import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Effets de lumière / Glows néon en arrière-plan */}
      <div className="glow glow-purple"></div>
      <div className="glow glow-blue"></div>

      <div className="hero-container">
        {/* Colonne de gauche : Textes & CTA */}
        <div className="hero-content">
          {/* Badge haut */}
          <div className="hero-badge">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>OUTILS PREMIUM POUR CRÉATEURS</span>
          </div>

          {/* Titre principal avec dégradé */}
          <h1 className="hero-title">
            Crée. Monte. <br />
            Publie. <span className="gradient-text">Sans limites.</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            Découvre des outils premium conçus pour t'aider à créer du contenu
            plus facilement, plus rapidement et avec une finition professionnelle.
          </p>

          {/* Boutons d'action */}
          <div className="hero-buttons">
            <Link href="/offres" className="primary-btn hero-btn">
              <span>Découvrir les offres</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>

            <Link href="#comment-ca-marche" className="secondary-btn hero-btn">
              <span>Voir comment ça marche</span>
            </Link>
          </div>

          {/* Points de rassurance / Garanties */}
          <div className="hero-features">
            <div className="feature-item">
              <i className="fa-solid fa-check"></i>
              <span>Paiement sécurisé</span>
            </div>
            <div className="feature-item">
              <i className="fa-solid fa-check"></i>
              <span>Activation selon l'offre choisie</span>
            </div>
            <div className="feature-item">
              <i className="fa-solid fa-check"></i>
              <span>Assistance disponible</span>
            </div>
          </div>
        </div>

        {/* Colonne de droite : Mockup Visuel & Badges flottants */}
        <div className="hero-visual">
          <div className="visual-card">
            {/* Badge haut-droit */}
            <div className="floating-tag top-right">
              <i className="fa-solid fa-mobile-screen-button"></i>
              <span>Apps mobiles</span>
            </div>

            {/* Illustration Smartphone / Visuel principal */}
            <div className="mockup-wrapper">
              <div className="phone-mockup">
                <i className="fa-solid fa-sliders mockup-icon"></i>
                <div className="wave-animation">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            {/* Badge flottant bas : Spotify Premium */}
            <div className="floating-card bonus-card">
              <div className="spotify-icon">
                <i className="fa-brands fa-spotify"></i>
              </div>
              <div className="bonus-info">
                <span className="bonus-label">Bonus inclus</span>
                <span className="bonus-title">Spotify Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}