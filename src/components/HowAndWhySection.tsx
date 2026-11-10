export default function HowAndWhySection() {
  const steps = [
    {
      number: "01",
      title: "Choisissez votre outil",
      description:
        "Sélectionnez CapCut Pro, MovieBox Pro ou optez pour le Pack Duo avec ses 2 bonus offerts.",
    },
    {
      number: "02",
      title: "Paiement 100% sécurisé",
      description:
        "Réglez par Mobile Money (MTN, Moov, Celtiis, Orange, Wave) ou Carte bancaire via Saspay SSL.",
    },
    {
      number: "03",
      title: "Réception instantanée 24/7",
      description:
        "Recevez immédiatement votre lien d'accès, vos identifiants et le guide d'installation par e-mail.",
    },
  ];

  const guarantees = [
    {
      icon: "fa-shield-check",
      title: "Sécurité & Transparence",
      description: "Aucun abonnement récurrent automatique. Vous payez une seule fois ce que vous choisissez.",
    },
    {
      icon: "fa-bolt",
      title: "Livraison en 30 secondes",
      description: "Traitement automatisé : vos fichiers d'installation sont débloqués immédiatement.",
    },
    {
      icon: "fa-headset",
      title: "Support WhatsApp 7j/7",
      description: "Une équipe réactive prête à vous guider pas-à-pas en cas de moindre interrogation.",
    },
    {
      icon: "fa-certificate",
      title: "Garantie Fonctionnement",
      description: "Remplacement immédiat ou remboursement intégral si votre application rencontre un blocage.",
    },
  ];

  return (
    <div className="how-why-wrapper-clean">
      {/* 3 STEPS */}
      <section className="steps-section-clean">
        <div className="steps-container">
          <div className="section-header-center">
            <span className="section-badge-light">COMMENT ÇA MARCHE</span>
            <h2 className="section-title-dark">Votre commande en 3 étapes simples</h2>
          </div>

          <div className="steps-row">
            {steps.map((step, index) => (
              <div key={index} className="step-item-card">
                <div className="step-num-circle">{step.number}</div>
                <h3 className="step-heading">{step.title}</h3>
                <p className="step-body">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="why-section-clean" id="avis">
        <div className="why-container">
          <div className="section-header-center">
            <span className="section-badge-light">TRANSPARENCE & FIABILITÉ</span>
            <h2 className="section-title-dark">Pourquoi commander sur NovaStudio ?</h2>
          </div>

          <div className="why-cards-grid">
            {guarantees.map((item, index) => (
              <div key={index} className="why-card-clean">
                <div className="why-card-icon-box">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <h3 className="why-card-heading">{item.title}</h3>
                <p className="why-card-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
