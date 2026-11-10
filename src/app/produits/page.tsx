"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductMockup from "@/components/ProductMockup";
import { useDeliveryAvailability } from "@/hooks/useDeliveryAvailability";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();
  const { availableProducts, isLoading, error } = useDeliveryAvailability();

  const categories = [
    "Tous",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCat =
        selectedCategory === "Tous" || product.category === selectedCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!availableProducts[id]) return;
    addItem(id);
    setAddedId(id);
    window.setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="exact-catalog-container">
      <div className="exact-catalog-header scroll-reveal">
        <h1 className="exact-catalog-title">Nos outils créatifs</h1>
        <p className="exact-catalog-subtitle">
          CapCut pour téléphone et ordinateur, Photoshop, Premiere Pro et effets
          sonores.
        </p>

        <div className="exact-catalog-controls">
          <div className="exact-search-input-wrap">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Rechercher (CapCut, Photoshop, Premiere...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="exact-search-clear"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="exact-cat-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`exact-cat-tab ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="exact-nouveautes-row">
        {filteredProducts.map((product) => {
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
              </Link>
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
            </article>
          );
        })}
      </div>
      {error && (
        <p role="status" className="exact-product-availability-error">
          {error} Les achats restent désactivés tant que la disponibilité ne
          peut pas être vérifiée.
        </p>
      )}

    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="exact-catalog-page">
      <Suspense fallback={<div className="exact-catalog-container"><p style={{ textAlign: "center", padding: "3rem" }}>Chargement du catalogue...</p></div>}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}
