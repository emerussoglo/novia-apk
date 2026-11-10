"use client";

import { useCart } from "@/components/CartProvider";

export default function ComparisonSection() {
  const { addItem } = useCart();

  const comparisonData = [
    {
      feature: "Usage principal",
      capcut: "Montage vidéo pro, Reels, TikTok & YouTube",
      moviebox: "Streaming films, documentaires & séries",
      duo: "Solution intégrale : Création + Divertissement",
    },
    {
      feature: "Qualité & Résolution",
      capcut: "Exportation 4K 60FPS sans filigrane",
      moviebox: "Lecture 4K Ultra HD & Dolby",
      duo: "4K maximale sur les deux applications",
    },
    {
      feature: "Durée de validité",
      capcut: "Licence permanente à vie",
      moviebox: "Licence permanente à vie",
      duo: "Licence permanente à vie",
    },
    {
      feature: "Compatibilité",
      capcut: "Android & iOS",
      moviebox: "Android & iOS",
      duo: "Android & iOS (Multi-appareils)",
    },
    {
      feature: "Bonus inclus",
      capcut: "Non inclus seul",
      moviebox: "Non inclus seul",
      duo: "WPS Office Pro + InShot Pro offerts",
    },
    {
      feature: "Support & Assistance",
      capcut: "7j/7 WhatsApp & Email",
      moviebox: "7j/7 WhatsApp & Email",
      duo: "Support prioritaire VIP 7j/7",
    },
  ];

  return (
    <section className="comparison-section-clean" id="comparaison">
      <div className="comparison-container">
        <div className="section-header-center">
          <span className="section-badge-light">TABLEAU COMPARATIF</span>
          <h2 className="section-title-dark">Quel outil correspond à votre besoin ?</h2>
          <p className="section-desc-muted">
            Comparez nos offres pour faire le meilleur choix en toute transparence.
          </p>
        </div>

        <div className="table-responsive-wrapper">
          <table className="comparison-table-clean">
            <thead>
              <tr>
                <th className="feature-col-th">Caractéristiques</th>
                <th className="product-th capcut-th">
                  <div className="th-product-box">
                    <span className="th-name">CapCut Pro</span>
                    <strong className="th-price">1 000 FCFA</strong>
                    <button
                      type="button"
                      onClick={() => addItem("capcut-pro")}
                      className="th-cta-btn"
                    >
                      Ajouter
                    </button>
                  </div>
                </th>
                <th className="product-th moviebox-th">
                  <div className="th-product-box">
                    <span className="th-name">MovieBox Pro</span>
                    <strong className="th-price">1 000 FCFA</strong>
                    <button
                      type="button"
                      onClick={() => addItem("moviebox-pro")}
                      className="th-cta-btn"
                    >
                      Ajouter
                    </button>
                  </div>
                </th>
                <th className="product-th duo-th">
                  <div className="th-product-box popular-pack">
                    <span className="th-badge-flash">RECOMMANDÉ</span>
                    <span className="th-name">Pack Duo VIP</span>
                    <strong className="th-price">1 800 FCFA</strong>
                    <button
                      type="button"
                      onClick={() => addItem("pack-duo")}
                      className="th-cta-btn-accent"
                    >
                      Commander Pack
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "even-row" : "odd-row"}>
                  <td className="row-feature-title">{row.feature}</td>
                  <td className="row-feature-val">{row.capcut}</td>
                  <td className="row-feature-val">{row.moviebox}</td>
                  <td className="row-feature-val duo-col-val">
                    <strong>{row.duo}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
