"use client";

interface Testimonial {
  id: string;
  name: string;
  handle: string;
  time: string;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Koffi Agossou",
    handle: "Créateur Vidéo",
    time: "Il y a 1 mois",
    comment: "CapCut Pro activé en quelques secondes sur mon téléphone ! Le service client sur WhatsApp est ultra réactif. Je recommande à 100% pour les monteurs.",
  },
  {
    id: "2",
    name: "Sika Dossou",
    handle: "Graphiste Freelance",
    time: "Il y a 2 mois",
    comment: "Avoir Photoshop et Premiere Pro à ce prix-là en Afrique avec le paiement Mobile Money, c'est une vraie bénédiction pour mon agence. Merci NovaStudio !",
  },
  {
    id: "3",
    name: "Marc Tognon",
    handle: "Vidéaste Web",
    time: "Il y a 3 semaines",
    comment: "Livraison instantanée par e-mail nickel. Le fichier et les accès fonctionnent à la perfection, aucun bug. Du travail de pro.",
  },
  {
    id: "4",
    name: "Amandine Bio",
    handle: "Monteuse Pro",
    time: "Il y a 2 semaines",
    comment: "Franchement top ! J'avais un peu d'hésitation au début mais le support m'a guidée sur WhatsApp en 2 minutes. Mes montages avancent enfin sans limite.",
  },
  {
    id: "5",
    name: "Félicien Soglo",
    handle: "Infographiste",
    time: "Il y a 3 jours",
    comment: "Pack Photoshop installé sans aucun souci. Les liens de téléchargement et les instructions par mail sont super clairs. Je valide fort !",
  },
  {
    id: "6",
    name: "Yasmine Hodonou",
    handle: "Créatrice de Contenu",
    time: "Hier",
    comment: "Le meilleur site pour obtenir ses outils de création numérique en toute sécurité depuis le Bénin. Service rapide et super pro.",
  },
];

export default function TestimonialsCards() {
  // On duplique la liste pour assurer une boucle fluide et infinie sans rupture
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="nova-testimonials-section scroll-reveal">
      <div className="nova-testimonials-container">
        {/* En-tête de section */}
        <div className="nova-testimonials-header">
          {/* <span className="nova-testimonials-badge">
            <i className="fa-solid fa-heart"></i> Avis Vérifiés
          </span> */}
          <h2 className="nova-testimonials-title">
            Ils ont payé. Voilà ce qu'ils en pensent.
          </h2>
          <p className="nova-testimonials-subtitle">
            Découvrez les retours d'expérience en continu de nos créateurs et professionnels satisfaits.
          </p>
        </div>
      </div>

      {/* Conteneur du carrousel déroulant avec effet de masquage sur les bords */}
      <div className="nova-marquee-wrapper">
        <div className="nova-marquee-track">
          {duplicatedTestimonials.map((item, index) => (
            <div key={`${item.id}-${index}`} className="nova-testimonial-card">
              <div className="nova-testimonial-top">
                <div className="nova-testimonial-user-info">
                  <div className="nova-testimonial-avatar">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="nova-user-name-row">
                      <strong>{item.name}</strong>
                      <i className="fa-solid fa-circle-check nova-verified-icon"></i>
                    </div>
                    <span className="nova-user-handle">{item.handle} · {item.time}</span>
                  </div>
                </div>
                <div className="nova-testimonial-badge-icon">
                  <i className="fa-solid fa-thumbs-up"></i>
                </div>
              </div>
              <p className="nova-testimonial-text">
                "{item.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}