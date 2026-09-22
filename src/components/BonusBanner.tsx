export default function BonusBanner() {
  const perks = [
    "Musique sans publicité",
    "Écoute hors connexion",
    "Qualité audio premium",
  ];

  return (
    <section className="bonus-banner-section">
      <div className="bonus-banner-card">
        {/* Glow / Dégradé rose-violet à droite */}
        <div className="bonus-gradient-overlay"></div>

        <div className="bonus-content">
          {/* Badge haut */}
          <div className="bonus-badge">
            <i className="fa-solid fa-gift"></i>
            <span>BONUS EXCLUSIF</span>
          </div>

          {/* Titre principal */}
          <h2 className="bonus-title">
            La créativité sonne mieux en <br className="desktop-only" />
            <span className="bonus-highlight">Premium.</span>
          </h2>

          {/* Sous-titre / Description */}
          <p className="bonus-description">
            En bonus avec chaque commande : <strong>Spotify Premium</strong> pour
            écouter ta musique sans coupures pendant que tu crées.
          </p>

          {/* Liste des puces */}
          <ul className="bonus-list">
            {perks.map((perk, idx) => (
              <li key={idx}>
                <i className="fa-solid fa-check"></i>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}