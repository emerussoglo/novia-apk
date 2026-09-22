"use client";

import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductsSection() {
  const products = [
    {
      id: "capcut-pro",
      badge: "POPULAIRE",
      platform: "Application mobile uniquement",
      title: "CapCut Pro",
      description:
        "Une solution pensée pour les créateurs qui souhaitent disposer des fonctionnalités incluses dans leur offre premium et travailler plus efficacement sur leurs contenus vidéo.",
      features: [
        "Offre premium sélectionnée",
        "Fonctionnalités incluses selon le plan",
        "Utilisation pour tes projets créatifs",
        "Activation selon les modalités indiquées",
        "Assistance disponible",
      ],
      price: "3000",
      period: "/ à vie",
      popular: true,
      btnText: "Découvrir CapCut Pro",
      link: "/produits",
    },
    {
      id: "moviebox-pro",
      badge: null,
      platform: "Application mobile uniquement",
      title: "MovieBox Pro",
      description:
        "Une solution pour les créateurs qui souhaitent enrichir leur environnement de création vidéo avec les fonctionnalités incluses dans leur offre.",
      features: [
        "Offre premium sélectionnée",
        "Fonctionnalités incluses selon le plan",
        "Utilisation pour tes projets",
        "Activation selon les modalités indiquées",
        "Assistance disponible",
      ],
      price: "2000",
      period: "/ à vie",
      popular: false,
      btnText: "Découvrir MovieBox Pro",
      link: "/produits",
    },
  ];

  return (
    <section className="products-section" id="produits">
      {/* En-tête de la section */}
      <div className="section-header">
        <span className="section-badge">NOS PRODUITS</span>
        <h2 className="section-title">
          Choisis ton outil. <br />
          Commence à créer.
        </h2>
        <p className="section-subtitle">
          Deux solutions. Deux usages. Une expérience d&apos;achat simple.
        </p>
      </div>

      {/* Grille des cartes de tarification */}
      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className={`product-card ${product.popular ? "featured" : ""}`}
          >
            {/* Tag populaire au-dessus de la carte */}
            {product.popular && (
              <div className="popular-badge">
                <i className="fa-solid fa-star"></i>
                <span>{product.badge}</span>
              </div>
            )}

            {/* Support / Plateforme */}
            <div className="product-platform">
              <i className="fa-solid fa-mobile-screen"></i>
              <span>{product.platform}</span>
            </div>

            {/* Nom & Description */}
            <h3 className="product-name">{product.title}</h3>
            <p className="product-description">{product.description}</p>

            {/* Liste des fonctionnalités */}
            <ul className="product-features">
              {product.features.map((feat, idx) => (
                <li key={idx}>
                  <i className="fa-solid fa-check"></i>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Prix */}
            <div className="product-price-box">
              <div className="price-value">
                <span className="price">{product.price}</span>
                <span className="currency">FCFA</span>
              </div>
              <span className="period">{product.period}</span>
            </div>

            {/* Boutons d'action */}
            <div className="product-actions">
              <Link
                href={product.link}
                className={
                  product.popular
                    ? "primary-btn block-btn"
                    : "outline-btn block-btn"
                }
              >
                <span>{product.btnText}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>

              <AddToCartButton productId={product.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
