"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { getProduct } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductBox3D from "@/components/ProductBox3D";

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
  const [selectedVersion, setSelectedVersion] = useState("nouveau");
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product.id);
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
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
    <main className="exact-pdp-page-container">
      <div className="exact-pdp-window">
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

            {/* Price Line */}
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
              >
                {added ? "Ajouté !" : "Ajouter"}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="exact-pdp-btn-pay"
              >
                Commander
              </button>
            </div>

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
