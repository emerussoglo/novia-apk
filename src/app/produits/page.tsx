"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import ProductBox3D from "@/components/ProductBox3D";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialItem = searchParams.get("item") || "";

  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (initialItem) {
      const match = products.find((p) => p.id === initialItem);
      if (match) setSelectedProduct(match);
    }
  }, [initialItem]);

  const categories = [
    "Tous",
    "Vidéo & Montage",
    "Streaming & Médias",
    "Bundles & Packs",
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
    <div className="exact-catalog-container">
      {/* Simple Page Header */}
      <div className="exact-catalog-header">
        <h1 className="exact-catalog-title">Nos Licences & Abonnements</h1>
        <p className="exact-catalog-subtitle">
          Sélectionnez votre produit et profitez d&apos;une activation immédiate par email.
        </p>

        {/* Search + Category Tabs */}
        <div className="exact-catalog-controls">
          <div className="exact-search-input-wrap">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Rechercher (CapCut, MovieBox...)"
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

      {/* Products Grid (Matching Screenshot 3) */}
      <div className="exact-nouveautes-row">
        {filteredProducts.map((product) => {
          const isAdded = addedId === product.id;
          return (
            <div
              key={product.id}
              className="exact-product-card"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="exact-product-img-box">
                <ProductBox3D
                  title={product.name.split("—")[0]}
                  subtitle="Licence à vie"
                  variant={getVariant(product.id)}
                  size="md"
                  badge={product.discount}
                />
              </div>

              <h3 className="exact-product-title">{product.name}</h3>

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

      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
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
