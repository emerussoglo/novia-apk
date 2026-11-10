export default function WorkflowSection() {
  const steps = [
    {
      icon: "fa-bolt",
      title: "Créer sans restrictions",
      description:
        "Accédez immédiatement à tous les filtres, transitions, polices et effets sans aucun filigrane gênant.",
    },
    {
      icon: "fa-film",
      title: "Qualité cinéma 4K",
      description:
        "Exportez vos vidéos en 4K 60FPS pour vos réseaux ou profitez d'un streaming cinéma sans latence.",
    },
    {
      icon: "fa-clock",
      title: "Gain de temps massif",
      description:
        "Sous-titres automatiques en 1 clic et suppression de fond intelligente pour monter vos vidéos en un éclair.",
    },
    {
      icon: "fa-shield-halved",
      title: "Activation garantie à vie",
      description:
        "Pas d'abonnement mensuel caché. Une seule commande, des applications prêtes à l'emploi et une assistance dédiée.",
    },
  ];

  return (
    <section className="workflow-section-clean">
      <div className="workflow-container">
        <div className="section-header-center">
          <span className="section-badge-light">POURQUOI NOS CLIENTS ADORENT</span>
          <h2 className="section-title-dark">
            Plus qu&apos;une simple licence, <br />
            un boost immédiat pour vos projets.
          </h2>
        </div>

        <div className="workflow-cards-grid">
          {steps.map((item, index) => (
            <div key={index} className="workflow-card-clean">
              <div className="workflow-card-icon">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h3 className="workflow-card-title">{item.title}</h3>
              <p className="workflow-card-text">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
