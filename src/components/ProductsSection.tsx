"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductMockup from "@/components/ProductMockup";
import { useDeliveryAvailability } from "@/hooks/useDeliveryAvailability";

export default function ProductsSection() {
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();
  const { availableProducts, isLoading, error } = useDeliveryAvailability();

  const handleAdd = (id: string) => {
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
              <article
                key={product.id}
                className="exact-product-card scroll-reveal"
              >
                <Link
                  href={`/produits/${product.id}`}
                  className="exact-product-card-link"
                >
                  <div className="exact-product-img-box">
                    <ProductMockup product={product} placement="card" />
                  </div>
                  
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
                </Link>
                <button
                  type="button"
                  onClick={() => handleAdd(product.id)}
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
              </article>
            );
          })}
        </div>
      </div>

    </section>
  );
}
