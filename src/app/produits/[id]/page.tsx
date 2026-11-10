"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getProduct } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductMockup from "@/components/ProductMockup";
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
          <div className="exact-pdp-visual">
            <ProductMockup product={product} placement="detail" />
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
             

              <ul className="exact-pdp-highlights">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>
                    <i className="fa-solid fa-check"></i>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>


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
                  <p>
                    Recevez votre fichier de livraison par e-mail après
                    confirmation du paiement.
                  </p>
                </div>
              </div>

              
            </div>

            
          </div>
        </div>
      </div>
    </main>
  );
}
