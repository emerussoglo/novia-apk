export default function BonusBanner() {
  const perks = ["WPS Office", "InShot"];

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
            Deux applications achetées,
            <br className="desktop-only" />
            <span className="bonus-highlight"> deux bonus offerts.</span>
          </h2>

          <p className="bonus-description">
            <strong>WPS Office et InShot</strong> sont offerts uniquement lorsque
            tu achètes CapCut Pro et MovieBox Pro ensemble.
          </p>

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