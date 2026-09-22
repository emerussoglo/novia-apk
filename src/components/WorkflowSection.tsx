export default function WorkflowSection() {
  const features = [
    {
      icon: "fa-bolt",
      title: "Créer plus vite",
      description:
        "Passe moins de temps à chercher tes outils et plus de temps à créer.",
    },
    {
      icon: "fa-chart-line",
      title: "Améliorer tes contenus",
      description:
        "Utilise les fonctionnalités de ton offre pour donner plus de possibilités à tes projets.",
    },
    {
      icon: "fa-rocket",
      title: "Gagner en productivité",
      description:
        "Centralise ton workflow et avance plus efficacement sur tes contenus.",
    },
    {
      icon: "fa-heart",
      title: "Rester créatif",
      description:
        "Concentre-toi sur tes idées plutôt que sur les limites de ton environnement.",
    },
  ];

  return (
    <section className="workflow-section">
      {/* Header */}
      <div className="section-header">
        <span className="section-badge alt-badge">POURQUOI CES OUTILS ?</span>
        <h2 className="section-title">
          Plus qu'un abonnement. <br />
          Un meilleur workflow.
        </h2>
      </div>

      {/* Grid 4 colonnes */}
      <div className="workflow-grid">
        {features.map((item, index) => (
          <div key={index} className="workflow-card">
            <div className="workflow-icon-box">
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <h3 className="workflow-card-title">{item.title}</h3>
            <p className="workflow-card-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}