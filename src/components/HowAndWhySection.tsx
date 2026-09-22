export default function HowAndWhySection() {
  const steps = [
    {
      number: "01",
      title: "Choisis ton offre",
      description:
        "Sélectionne le produit et la durée qui correspondent à tes besoins.",
    },
    {
      number: "02",
      title: "Paie en quelques clics",
      description:
        "Choisis le moyen de paiement disponible et finalise ta commande.",
    },
    {
      number: "03",
      title: "Reçois ton accès",
      description:
        "Après confirmation du paiement, reçois les instructions correspondant à ton achat.",
    },
  ];

  const benefits = [
    {
      icon: "fa-eye",
      title: "Transparence",
      description: "Tu sais ce que tu achètes avant de payer.",
    },
    {
      icon: "fa-bolt",
      title: "Rapidité",
      description: "Ton achat est traité dès confirmation du paiement.",
    },
    {
      icon: "fa-headset",
      title: "Support",
      description: "Une assistance est disponible en cas de difficulté.",
    },
    {
      icon: "fa-check",
      title: "Simplicité",
      description: "Pas de parcours compliqué : choisis, paie, reçois.",
    },
  ];

  return (
    <div className="how-and-why-wrapper">
      {/* ---------------------------------- */}
      {/* SECTION 1: COMMENT ÇA MARCHE     */}
      {/* ---------------------------------- */}
      <section className="steps-section">
        <div className="section-header">
          <span className="section-badge">COMMENT ÇA MARCHE</span>
          <h2 className="section-title">Acheter en 3 étapes</h2>
        </div>

        <div className="steps-grid">
          {/* Ligne horizontale de connexion (desktop) */}
          <div className="steps-connector"></div>

          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number-box">
                <span>{step.number}</span>
              </div>
              <h3 className="step-card-title">{step.title}</h3>
              <p className="step-card-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* SECTION 2: POURQUOI COMMANDER ICI  */}
      {/* ---------------------------------- */}
      <section className="why-section">
        <div className="section-header">
          <span className="section-badge">CONFIANCE</span>
          <h2 className="section-title">Pourquoi commander ici ?</h2>
        </div>

        <div className="why-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="why-card">
              <div className="why-icon-box">
                <i className={`fa-solid ${benefit.icon}`}></i>
              </div>
              <h3 className="why-card-title">{benefit.title}</h3>
              <p className="why-card-desc">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}