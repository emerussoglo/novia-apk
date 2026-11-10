"use client";

import Image from "next/image";

interface TestimonialScreen {
  id: string;
  image: string;
  alt: string;
  tag?: string;
}

const screenshots: TestimonialScreen[] = [
  {
    id: "1",
    image: "/img/testimonials/avis-1.png", // Remplace par tes chemins d'images de captures
    alt: "Avis client CapCut Pro et outils",
    tag: "Vérifié WhatsApp",
  },
  {
    id: "2",
    image: "/img/testimonials/avis-2.png",
    alt: "Avis client Photoshop et montage",
    tag: "Satisfaction 100%",
  },
  {
    id: "3",
    image: "/img/testimonials/avis-3.png",
    alt: "Avis client livraison rapide",
    tag: "Support Réactif",
  },
];

export default function TestimonialsScreenshots() {
  return (
    <section className="exact-testimonials-section scroll-reveal">
      <div className="exact-testimonials-container">
        {/* En-tête de section */}
        <div className="exact-testimonials-header">
          <span className="exact-testimonials-badge">
            <i className="fa-solid fa-heart"></i> Témoignages
          </span>
          <h2 className="exact-testimonials-title">
            Ce que nos créateurs en disent.
          </h2>
          <p className="exact-testimonials-subtitle">
            Découvrez les retours authentiques de notre communauté d'utilisateurs passionnés.
          </p>
        </div>

        {/* Grille des captures d'écran */}
        <div className="exact-testimonials-grid">
          {screenshots.map((item) => (
            <div key={item.id} className="exact-testimonial-card">
              <div className="exact-testimonial-img-wrapper">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="exact-testimonial-img"
                />
              </div>
              {item.tag && (
                <div className="exact-testimonial-tag">
                  <i className="fa-solid fa-circle-check"></i> {item.tag}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}