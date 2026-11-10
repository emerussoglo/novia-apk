"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CommunitySubscriptions() {
  const { addItem } = useCart();

  const tools = [
    {
      id: "capcut-pro",
      name: "CapCut Pro",
      bgHeader: "#0A2A1E",
      price: "1 000 FCFA/à vie",
      avatars: ["#F86011", "#10B981", "#3B82F6"],
    },
    {
      id: "moviebox-pro",
      name: "MovieBox Pro",
      bgHeader: "#111827",
      price: "1 000 FCFA/à vie",
      avatars: ["#8B5CF6", "#EC4899", "#F59E0B"],
    },
    {
      id: "pack-duo",
      name: "Pack Duo VIP",
      bgHeader: "#F86011",
      price: "1 800 FCFA/à vie",
      avatars: ["#0A2A1E", "#F86011", "#10B981"],
    },
  ];

  return (
    <section className="exact-community-section">
      <div className="exact-community-container">
        {/* Left Column */}
        <div className="exact-community-left">
          <h2 className="exact-community-title">
            Plus de 50 abonnements partageables
          </h2>
          <Link href="/produits" className="exact-community-cta">
            Voir tous les abonnements
          </Link>
        </div>

        {/* Right Column: 3 Cards */}
        <div className="exact-community-cards">
          {tools.map((item) => (
            <div key={item.id} className="exact-tool-card">
              <div
                className="exact-tool-header"
                style={{ backgroundColor: item.bgHeader }}
              >
                <span>{item.name}</span>
              </div>
              <div className="exact-tool-body">
                <div className="exact-tool-avatars">
                  {item.avatars.map((col, i) => (
                    <div
                      key={i}
                      className="exact-avatar-circle"
                      style={{ backgroundColor: col }}
                    >
                      <i className="fa-solid fa-user"></i>
                    </div>
                  ))}
                </div>
                <strong className="exact-tool-price">{item.price}</strong>
                <button
                  type="button"
                  onClick={() => addItem(item.id)}
                  className="exact-tool-join-btn"
                >
                  Commander
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
