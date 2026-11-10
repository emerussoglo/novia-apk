export default function TrustBar() {
  const items = [
    {
      icon: "fa-regular fa-thumbs-up",
      title: "Support gratuit",
      subtitle: "Email & Live Chat",
    },
    {
      icon: "fa-regular fa-face-smile",
      title: "350K+",
      subtitle: "Clients satisfaits",
    },
    {
      icon: "fa-solid fa-bolt",
      title: "Rapide",
      subtitle: "Envoi en quelques secondes",
    },
    {
      icon: "fa-solid fa-lock",
      title: "100%",
      subtitle: "Paiements sécurisés SSL",
    },
    {
      icon: "fa-regular fa-sun",
      title: "18+",
      subtitle: "Des années de succès",
    },
  ];

  return (
    <section className="exact-trust-bar-section">
      <div className="exact-trust-container">
        {items.map((item, index) => (
          <div key={index} className="exact-trust-item">
            <div className="exact-trust-icon">
              <i className={item.icon}></i>
            </div>
            <strong className="exact-trust-title">{item.title}</strong>
            <span className="exact-trust-sub">{item.subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
