export default function TrustBar() {
  const items = [
  {
    icon: "fa-solid fa-bolt",
    title: "Livraison instantanée",
    subtitle: "Accès par e-mail en 2 min",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "100% Sécurisé",
    subtitle: "Paiement Mobile Money & Carte",
  },
  {
  icon: "fa-solid fa-users",
  title: "Communauté active",
  subtitle: "Créateurs qui nous font confiance",
},
  {
    icon: "fa-solid fa-headset",
    title: "Support Réactif",
    subtitle: "Assistance WhatsApp & Chat",
  },
  {
    icon: "fa-solid fa-rotate-right",
    title: "Mises à jour",
    subtitle: "Profitez des dernières versions",
  },
];

  return (
    <section className="exact-trust-bar-section scroll-reveal">
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
