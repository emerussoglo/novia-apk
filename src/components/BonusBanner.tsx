"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function BonusBanner() {
  const { addItem } = useCart();

  const bonuses = [
    {
      name: "WPS Office Pro",
      icon: "fa-file-lines",
      desc: "Suite bureautique complète (Word, Excel, PDF illimités)",
      value: "Valeur 15 000 FCFA",
    },
    {
      name: "InShot Pro VIP",
      icon: "fa-video",
      desc: "Application de montage pour formats courts (Reels & TikTok)",
      value: "Valeur 12 000 FCFA",
    },
  ];

  return (
    <section className="bonus-showcase-section">
      <div className="bonus-showcase-card">
        {/* Decorative corner tag */}
        <div className="bonus-ribbon">CADEAU EXCLUSIF</div>

        <div className="bonus-showcase-grid">
          <div className="bonus-showcase-text">
            <span className="bonus-eyebrow">
              <i className="fa-solid fa-gift"></i> OFFRE DUO PROMOTIONNELLE
            </span>
            <h2 className="bonus-headline">
              Deux applications choisies, <br />
              <span className="bonus-highlight-orange">deux bonus premium offerts.</span>
            </h2>
            <p className="bonus-paragraph">
              Commandez <strong>CapCut Pro</strong> et <strong>MovieBox Pro</strong> ensemble (ou optez pour le Pack Duo à 1 800 FCFA) et recevez immédiatement l&apos;accès complet à <strong>WPS Office</strong> et <strong>InShot Pro</strong> sans frais supplémentaires.
            </p>

            <div className="bonus-action-row">
              <button
                type="button"
                onClick={() => addItem("pack-duo")}
                className="bonus-claim-btn"
              >
                <i className="fa-solid fa-bolt"></i>
                <span>Profiter du Pack Duo + Bonus (1 800 FCFA)</span>
              </button>
            </div>
          </div>

          <div className="bonus-cards-list">
            {bonuses.map((b, i) => (
              <div key={i} className="bonus-item-pill-card">
                <div className="bonus-icon-wrapper">
                  <i className={`fa-solid ${b.icon}`}></i>
                </div>
                <div className="bonus-item-details">
                  <div className="bonus-name-row">
                    <h4>{b.name}</h4>
                    <span className="bonus-free-badge">OFFERT</span>
                  </div>
                  <p>{b.desc}</p>
                  <span className="bonus-value-tag">{b.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
