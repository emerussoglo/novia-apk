"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";
import ProductBox3D from "@/components/ProductBox3D";
import { useDeliveryAvailability } from "@/hooks/useDeliveryAvailability";

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({
  product,
  onClose,
}: ProductQuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();
  const { availableProducts, isLoading, error } = useDeliveryAvailability();

  if (!product) return null;
  const isAvailable = availableProducts[product.id] === true;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product.id);
    }
    onClose();
  };

  const handleBuyNow = () => {
    if (!isAvailable) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product.id);
    }
    router.push("/panier");
  };

  return (
    <div className="exact-modal-overlay" onClick={onClose}>
      <div
        className="exact-modal-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Close Button */}
        <button
          className="exact-modal-close"
          onClick={onClose}
          type="button"
          aria-label="Fermer"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

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
            {/* Share Icon Top Right */}
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

            {/* Product Title */}
            <h1 className="exact-pdp-title">{product.name}</h1>

            <div className="exact-pdp-price-row">
              <span className="exact-pdp-price">
                {product.price.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
            <p className="exact-pdp-description">{product.description}</p>

            {/* Quantity Stepper + Ajouter + PayPal/Commander (Exact Screenshot 8) */}
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
                {isLoading
                  ? "Vérification..."
                  : isAvailable
                    ? "Ajouter"
                    : "Indisponible"}
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
                    : "Indisponible"}
              </button>
            </div>
            {!isAvailable && !isLoading && (
              <p className="exact-pdp-availability">
                {error ||
                  "Ce produit sera disponible dès que son fichier de livraison sera prêt."}
              </p>
            )}

            {/* 3 Reassurance Bullets (Exact Screenshot 8) */}
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

            
          </div>
        </div>
      </div>
    </div>
  );
}
