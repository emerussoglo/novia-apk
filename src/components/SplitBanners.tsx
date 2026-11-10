"use client";

import { useCart } from "@/components/CartProvider";

export default function SplitBanners() {
  const { addItem } = useCart();

  return (
    <section className="exact-split-section">
      <div className="exact-split-grid">
        {/* Banner 1 */}
        <div className="exact-split-card">
          <div className="exact-split-img split-img-office"></div>
          <div className="exact-split-content exact-split-green">
            <h3>Travaillez mieux, créez plus !</h3>
            <button
              type="button"
              onClick={() => addItem("capcut-pro")}
              className="exact-split-pill-btn"
            >
              Découvrir CapCut
            </button>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="exact-split-card">
          <div className="exact-split-img split-img-windows"></div>
          <div className="exact-split-content exact-split-orange">
            <h3>Le divertissement le plus fluide qui soit !</h3>
            <button
              type="button"
              onClick={() => addItem("moviebox-pro")}
              className="exact-split-pill-btn"
            >
              Acheter MovieBox
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
