"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CtaSection() {
  const { addItem } = useCart();

  return (
    <section className="exact-cta-section scroll-reveal">
      <div className="exact-cta-box">
        <h2 className="exact-cta-title">
          Prêt à donner vie à votre prochain projet créatif ?
        </h2>
        <div className="exact-cta-buttons">
          <button
            type="button"
            onClick={() => addItem("capcut-pro")}
            className="exact-cta-btn-orange"
          >
            Découvrir CapCut Pro
          </button>
          <Link href="/produits" className="exact-cta-btn-outline">
            Voir les produits
          </Link>
        </div>
      </div>
    </section>
  );
}
