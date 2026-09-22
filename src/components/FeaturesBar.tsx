export default function FeaturesBar() {
  const features = [
    {
      icon: "fa-bolt",
      title: "Activation rapide",
      description: "Dès confirmation du paiement",
    },
    {
      icon: "fa-lock",
      title: "Paiement sécurisé",
      description: "Traitement par prestataire",
    },
    {
      icon: "fa-comment-dots",
      title: "Support disponible",
      description: "Assistance en cas de besoin",
    },
    {
      icon: "fa-check",
      title: "Offre claire",
      description: "Tu sais ce que tu achètes",
    },
  ];

  return (
    <section className="features-bar-section">
      <div className="features-bar-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon-box">
              <i className={`fa-solid ${feature.icon}`}></i>
            </div>
            <div className="feature-text">
              <h4 className="feature-title">{feature.title}</h4>
              <p className="feature-desc">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}