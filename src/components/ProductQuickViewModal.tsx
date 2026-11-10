"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";
import ProductBox3D from "@/components/ProductBox3D";

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({
  product,
  onClose,
}: ProductQuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVersion, setSelectedVersion] = useState("nouveau");
  const { addItem } = useCart();
  const router = useRouter();

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product.id);
    }
    onClose();
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product.id);
    }
    router.push("/panier");
  };

  const boxVariant =
    product.id === "capcut-pro"
      ? "capcut"
      : product.id === "moviebox-pro"
        ? "moviebox"
        : "duo";

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
              subtitle="Licence Officielle"
              variant={boxVariant}
              size="lg"
              badge={product.discount}
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

            {/* Price Row: Current (Bold) + Strike + Green Discount Badge */}
            <div className="exact-pdp-price-row">
              <span className="exact-pdp-price">
                {product.price.toLocaleString("fr-FR")} FCFA
              </span>
              <span className="exact-pdp-strike">
                {product.originalPrice.toLocaleString("fr-FR")} FCFA
              </span>
              <span className="exact-pdp-discount">{product.discount}</span>
            </div>

            {/* Version Dropdown */}
            <div className="exact-pdp-group">
              <label className="exact-pdp-label">Version</label>
              <div className="exact-select-box">
                <select
                  value={selectedVersion}
                  onChange={(e) => setSelectedVersion(e.target.value)}
                  className="exact-pdp-select"
                >
                  <option value="nouveau">Nouveau compte / Clé active</option>
                  <option value="renouvellement">Renouvellement immédiat</option>
                </select>
                <i className="fa-solid fa-chevron-down exact-select-arrow"></i>
              </div>
            </div>

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
              >
                Ajouter
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="exact-pdp-btn-pay"
              >
                Commander
              </button>
            </div>

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

            {/* Partner Certification Badges (Exact Screenshot 8) */}
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
    </div>
  );
}
