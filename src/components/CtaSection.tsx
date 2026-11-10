"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CtaSection() {
  const { addItem } = useCart();

  return (
    <section className="exact-cta-section">
      <div className="exact-cta-box">
        <h2 className="exact-cta-title">
          Prêt à créer et profiter de vos contenus sans limites ?
        </h2>
        <div className="exact-cta-buttons">
          <button
            type="button"
            onClick={() => addItem("pack-duo")}
            className="exact-cta-btn-orange"
          >
            Commander le Pack Duo (1 800 FCFA)
          </button>
          <Link href="/produits" className="exact-cta-btn-outline">
            Voir les produits
          </Link>
        </div>
      </div>
    </section>
  );
}
