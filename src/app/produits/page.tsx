"use client";

import { useState } from "react";
import Image from "next/image";
import BuyNowButton from "@/components/BuyNowButton";

interface Product {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  deviceType: string;
  description: string;
  image: string;
  features: string[];
  bonus: string;
}

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: "capcut-pro",
      name: "CapCut Pro",
      badge: "POPULAIRE",
      price: "3000",
      period: "FCFA / à vie",
      deviceType: "Application mobile uniquement",
      description:
        "Une solution pensée pour les créateurs qui souhaitent disposer des fonctionnalités incluses dans leur offre premium et travailler plus efficacement sur leurs contenus vidéo.",
      image: "/img/capcut.jpg",
      bonus: "Spotify Premium offert en bonus à chaque commande",
      features: [
        "Accès complet aux effets et filtres Pro",
        "Exportation en qualité 4K / 60 FPS sans filigrane",
        "Suppression d'arrière-plan par IA ultra-rapide",
        "Sous-titres automatiques multi-langues",
        "Espace de stockage Cloud dédié",
        "Mises à jour et nouvelles fonctionnalités incluses",
      ],
    },
    {
      id: "moviebox-pro",
      name: "MovieBox Pro",
      price: "2000",
      period: "FCFA / à vie",
      deviceType: "Application mobile uniquement",
      description:
        "Une solution pour les créateurs qui souhaitent enrichir leur environnement de création vidéo avec les fonctionnalités incluses dans leur offre.",
      image: "/img/moviebox.jpg",
      bonus: "Spotify Premium offert en bonus à chaque commande",
      features: [
        "Catalogue complet de templates premium",
        "Outils de correction colorimétrique avancés",
        "Bibliothèque d'effets sonores et musiques libre de droits",
        "Rendus haute vitesse sans bridage",
        "Compatible Android et iOS",
        "Support prioritaire 7j/7",
      ],
    },
  ];

  return (
    <main className="products-page-container">
      {/* En-tête de la page */}
      <div className="products-header">
        <span className="products-badge">NOS PRODUITS</span>
        <h1 className="products-title">
          Choisis ton outil. <br />
          Commence à créer.
        </h1>
        <p className="products-subtitle">
          Deux applications mobiles premium, avec Spotify Premium offert en
          bonus à chaque commande.
        </p>
      </div>

      {/* Grille des produits */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {/* Visual Header / Image */}
            <div className="product-image-box">
              {product.badge && (
                <div className="product-badge">
                  <i className="fa-solid fa-star"></i> {product.badge}
                </div>
              )}
              <div className="product-poster-wrap">
                <Image
                  src={product.image}
                  alt={`Affiche ${product.name}`}
                  fill
                  sizes="(max-width: 820px) 100vw, 520px"
                  className="product-poster"
                  priority={product.id === "capcut-pro"}
                />
              </div>
            </div>

            {/* Content Body */}
            <div className="product-content">
              <div className="product-device-tag">
                <i className="fa-solid fa-mobile-screen"></i>{" "}
                {product.deviceType}
              </div>

              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>

              <div className="product-price-box">
                <span className="price-amount">{product.price}</span>
                <span className="price-period">{product.period}</span>
              </div>

              <div className="product-actions">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="btn-details"
                >
                  Voir les détails
                </button>
                <BuyNowButton productId={product.id} className="btn-buy">
                  Acheter
                </BuyNowButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODALE / DIALOG DES DÉTAILS DU PRODUIT */}
      {selectedProduct && (
        <div
          className="details-modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="details-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton de fermeture */}
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProduct(null)}
              aria-label="Fermer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="modal-header">
              <span className="modal-device-tag">
                <i className="fa-solid fa-mobile-screen"></i>{" "}
                {selectedProduct.deviceType}
              </span>
              <h3 className="modal-title">{selectedProduct.name}</h3>
              <div className="modal-price">
                <strong>{selectedProduct.price}</strong>{" "}
                {selectedProduct.period}
              </div>
            </div>

            <p className="modal-desc">{selectedProduct.description}</p>

            {/* Bonus Banner */}
            <div className="modal-bonus-box">
              <i className="fa-solid fa-gift"></i>
              <span>{selectedProduct.bonus}</span>
            </div>

            {/* Liste des fonctionnalités */}
            <div className="modal-features-section">
              <h4>Ce qui est inclus dans cette offre :</h4>
              <ul className="modal-features-list">
                {selectedProduct.features.map((feature, idx) => (
                  <li key={idx}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Footer */}
            <div className="modal-footer">
              <BuyNowButton
                productId={selectedProduct.id}
                className="modal-buy-btn"
              >
                Commander maintenant ({selectedProduct.price} FCFA)
              </BuyNowButton>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
