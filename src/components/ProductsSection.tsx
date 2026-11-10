"use client";

import { useState } from "react";
import { products, type Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductBox3D from "@/components/ProductBox3D";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";
import { useDeliveryAvailability } from "@/hooks/useDeliveryAvailability";

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();
  const { availableProducts, isLoading, error } = useDeliveryAvailability();

  const handleAdd = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!availableProducts[id]) return;
    addItem(id);
    setAddedId(id);
    window.setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="exact-nouveautes-section scroll-reveal">
      <div className="exact-nouveautes-container">
        <h2 className="exact-nouveautes-heading">Nos outils créatifs</h2>
        {error && (
          <p role="status" className="exact-product-availability-error">
            {error} Les achats restent désactivés tant que la disponibilité ne
            peut pas être vérifiée.
          </p>
        )}

        <div className="exact-nouveautes-row">
          {products.map((product) => {
            const isAdded = addedId === product.id;
            const isAvailable = availableProducts[product.id] === true;
            return (
              <div
                key={product.id}
                className="exact-product-card scroll-reveal"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="exact-product-img-box">
                  <ProductBox3D
                    title={product.name}
                    subtitle={product.badge}
                    variant={product.visualVariant}
                    size="md"
                    badge={product.badge}
                  />
                </div>

                <h3 className="exact-product-title">{product.name}</h3>
                <p className="exact-product-description">
                  {product.description}
                </p>

                <div className="exact-product-price-row">
                  <div className="exact-price-lead">
                    <i className="fa-solid fa-tag"></i>
                    <span className="exact-price-val">
                      {product.price.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <span className="exact-product-device">
                    {product.deviceType}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleAdd(product.id, e)}
                  className={`exact-product-add-btn ${isAdded ? "added" : ""}`}
                  disabled={isLoading || !isAvailable}
                >
                  {isAdded
                    ? "Ajouté"
                    : isLoading
                      ? "Vérification..."
                      : isAvailable
                        ? "Ajouter au panier"
                        : "Bientôt disponible"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal (without Trustpilot) */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
