"use client";

import { useCart } from "@/components/CartProvider";

export default function SplitBanners() {
  const { addItem } = useCart();

  return (
    <section className="exact-split-section scroll-reveal">
      <div className="exact-split-grid">
        <div className="exact-split-card">
          <div className="exact-split-img split-img-photoshop"></div>
          <div className="exact-split-content exact-split-green">
            <h3>Retouchez et créez avec Photoshop.</h3>
            <button
              type="button"
              onClick={() => addItem("photoshop")}
              className="exact-split-pill-btn"
            >
              Découvrir
            </button>
          </div>
        </div>

        <div className="exact-split-card">
          <div className="exact-split-img split-img-premiere"></div>
          <div className="exact-split-content exact-split-orange">
            <h3>Réalisez vos montages avec Premiere Pro.</h3>
            <button
              type="button"
              onClick={() => addItem("premiere-pro")}
              className="exact-split-pill-btn"
            >
              Découvrir
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
