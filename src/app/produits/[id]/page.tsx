"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getProduct } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductBox3D from "@/components/ProductBox3D";
import { useDeliveryAvailability } from "@/hooks/useDeliveryAvailability";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProduct(id);
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { availableProducts, isLoading, error } = useDeliveryAvailability();

  if (!product) {
    notFound();
  }
  const isAvailable = availableProducts[product.id] === true;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product.id);
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!isAvailable) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product.id);
    }
    router.push("/panier");
  };

  return (
    <main className="exact-pdp-page-container">
      <div className="exact-pdp-window">
        <div className="exact-pdp-layout">
          {/* Left Column: 3D Product Box */}
          <div className="exact-pdp-visual">
            <ProductBox3D
              title={product.name.split("—")[0]}
              subtitle={product.badge}
              variant={product.visualVariant}
              size="lg"
              badge={product.badge}
            />
          </div>

          {/* Right Column: Exact Layout from Screenshot 8 */}
          <div className="exact-pdp-details">
            {/* Category and Share */}
            <div className="exact-pdp-topbar">
              <span className="exact-pdp-category">{product.category}</span>
              <button
                type="button"
                className="exact-pdp-share-icon"
                title="Partager"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      url: window.location.href,
                    });
                  }
                }}
              >
                <i className="fa-solid fa-share-nodes"></i>
              </button>
            </div>

            {/* Title */}
            <h1 className="exact-pdp-title">{product.name}</h1>

            <div className="exact-pdp-price-row">
              <span className="exact-pdp-price">
                {product.price.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
            <p className="exact-pdp-description">{product.description}</p>

            {/* Actions: Stepper + Ajouter + Commander */}
            <div className="exact-pdp-actions">
              <div className="exact-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="exact-pdp-btn-add"
                disabled={!isAvailable}
              >
                {added
                  ? "Ajouté !"
                  : isLoading
                    ? "Vérification..."
                    : isAvailable
                      ? "Ajouter"
                      : "Bientôt disponible"}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="exact-pdp-btn-pay"
                disabled={!isAvailable}
              >
                {isLoading
                  ? "Vérification..."
                  : isAvailable
                    ? "Commander"
                    : "Bientôt disponible"}
              </button>
            </div>
            {!isAvailable && !isLoading && (
              <p className="exact-pdp-availability">
                {error ||
                  "Ce produit sera disponible dès que son fichier de livraison sera prêt."}
              </p>
            )}

            {/* 3 Trust items */}
            <div className="exact-pdp-trust-list">
              <div className="exact-trust-row">
                <i className="fa-solid fa-shield-halved exact-row-icon"></i>
                <div className="exact-row-text">
                  <strong>Sécurité garantie</strong>
                  <p>Paiements 100% sécurisés avec cryptage SSL via Saspay et Mobile Money</p>
                </div>
              </div>

              <div className="exact-trust-row">
                <i className="fa-solid fa-paper-plane exact-row-icon"></i>
                <div className="exact-row-text">
                  <strong>Livraison immédiate</strong>
                  <p>Recevez le code directement par email, actif 24/7</p>
                </div>
              </div>

              <div className="exact-trust-row">
                <i className="fa-solid fa-headset exact-row-icon"></i>
                <div className="exact-row-text">
                  <strong>Support gratuit</strong>
                  <p>Nos experts sont toujours prêts à vous aider, gratuitement.</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="exact-pdp-certifs">
              <span className="exact-certif-chip">
                <i className="fa-solid fa-award"></i> Partenaire Certifié
              </span>
              <span className="exact-certif-chip">
                <i className="fa-solid fa-lock"></i> SSL 256-Bit
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
