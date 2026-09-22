export default function ComparisonSection() {
  const comparisonData = [
    {
      feature: "Usage",
      capcut: "Montage vidéo mobile complet",
      moviebox: "Enrichissement de ton environnement vidéo",
    },
    {
      feature: "Type de créateur",
      capcut: "Créateurs de contenu mobile",
      moviebox: "Créateurs qui veulent plus de possibilités",
    },
    {
      feature: "Fonctionnalités incluses",
      capcut: "Selon le plan de l'offre",
      moviebox: "Selon le plan de l'offre",
    },
    {
      feature: "Durée",
      capcut: "À vie",
      moviebox: "À vie",
    },
    {
      feature: "Prix",
      capcut: "3 000 FCFA",
      moviebox: "2 000 FCFA",
    },
    {
      feature: "Activation",
      capcut: "Application mobile",
      moviebox: "Application mobile",
    },
    {
      feature: "Bonus",
      capcut: "Spotify Premium",
      moviebox: "Spotify Premium",
    },
  ];

  return (
    <section className="comparison-section">
      {/* En-tête de la section */}
      <div className="section-header">
        <span className="section-badge">COMPARAISON</span>
        <h2 className="section-title">Lequel choisir ?</h2>
      </div>

      {/* Conteneur avec scroll horizontal sur mobile */}
      <div className="comparison-table-wrapper">
        <div className="comparison-table">
          {/* Header du Tableau */}
          <div className="table-row table-header-row">
            <div className="table-cell feature-cell"></div>
            <div className="table-cell product-cell capcut-header">
              <h3 className="product-title">CapCut Pro</h3>
              <span className="product-price">3 000 FCFA</span>
            </div>
            <div className="table-cell product-cell moviebox-header">
              <h3 className="product-title">MovieBox Pro</h3>
              <span className="product-price">2 000 FCFA</span>
            </div>
          </div>

          {/* Lignes de données */}
          {comparisonData.map((row, index) => (
            <div key={index} className="table-row">
              <div className="table-cell feature-cell">{row.feature}</div>
              <div className="table-cell product-cell">{row.capcut}</div>
              <div className="table-cell product-cell">{row.moviebox}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}