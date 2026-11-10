"use client";

import { useState } from "react";
import Link from "next/link";
import { products, Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductBox3D from "@/components/ProductBox3D";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleAdd = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem(id);
    setAddedId(id);
    window.setTimeout(() => setAddedId(null), 1500);
  };

  const getVariant = (id: string): "capcut" | "moviebox" | "duo" => {
    if (id === "capcut-pro") return "capcut";
    if (id === "moviebox-pro") return "moviebox";
    return "duo";
  };

  return (
    <section className="exact-nouveautes-section">
      <div className="exact-nouveautes-container">
        <h2 className="exact-nouveautes-heading">Nouveautés</h2>

        <div className="exact-nouveautes-row">
          {products.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <div
                key={product.id}
                className="exact-product-card"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Visual Soft Grey Container */}
                <div className="exact-product-img-box">
                  <ProductBox3D
                    title={product.name.split("—")[0]}
                    subtitle="Licence à vie"
                    variant={getVariant(product.id)}
                    size="md"
                    badge={product.discount}
                  />
                </div>

                {/* Title */}
                <h3 className="exact-product-title">{product.name}</h3>

                {/* Price Row: Tag + Price + Old Price + Discount */}
                <div className="exact-product-price-row">
                  <div className="exact-price-lead">
                    <i className="fa-solid fa-tag"></i>
                    <span className="exact-price-val">
                      {product.price.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <span className="exact-price-old">
                    {product.originalPrice.toLocaleString("fr-FR")} FCFA
                  </span>
                  <span className="exact-price-badge">{product.discount}</span>
                </div>

                {/* Pill Button "Ajouter" */}
                <button
                  type="button"
                  onClick={(e) => handleAdd(product.id, e)}
                  className={`exact-product-add-btn ${isAdded ? "added" : ""}`}
                >
                  {isAdded ? "Ajouté" : "Ajouter"}
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
