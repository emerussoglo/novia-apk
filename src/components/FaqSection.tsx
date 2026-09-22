"use client";

import { useState } from "react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Ouvre la 2ème par défaut comme sur la capture

  const faqs = [
    {
      question: "Comment fonctionne l'achat ?",
      answer:
        "Tu choisis l'offre de ton choix, tu valides ton panier puis tu procèdes au paiement sécurisé. Une fois validé, tu reçois tes accès instantanément.",
    },
    {
      question: "Quels moyens de paiement sont disponibles ?",
      answer:
        "Mobile Money (MTN, Moov, Celtiis, Orange selon disponibilité), Carte bancaire et Wave selon le prestataire de paiement intégré.",
    },
    {
      question: "Quand vais-je recevoir mon accès ?",
      answer:
        "L'accès est transmis immédiatement après la confirmation de ton paiement, directement par e-mail et sur la page de confirmation.",
    },
    {
      question: "Que se passe-t-il après le paiement ?",
      answer:
        "Ton paiement est vérifié, ta commande est créée, puis les informations d'accès te sont transmises par e-mail et affichées sur ta page de confirmation.",
    },
    {
      question: "Puis-je utiliser mon accès sur plusieurs appareils ?",
      answer:
        "L'accès est configuré selon le type d'offre choisi. Il est recommandé de l'utiliser sur ton appareil principal conformément aux instructions reçues.",
    },
    {
      question: "Que faire si mon accès ne fonctionne pas ?",
      answer:
        "Notre support est disponible 7j/7. Tu peux nous contacter directement par WhatsApp ou via le formulaire de contact pour une résolution rapide.",
    },
    {
      question: "Puis-je demander un remboursement ?",
      answer:
        "En cas de problème technique non résolu par notre support sous 24h à 48h, nous procédons au remplacement ou au remboursement selon les conditions.",
    },
    {
      question: "Comment contacter le support ?",
      answer:
        "Tu peux nous contacter via le bouton WhatsApp présent sur le site ou par e-mail à notre adresse de support client.",
    },
    {
      question: "Est-ce une offre officielle ou une licence revendue ?",
      answer:
        "Toutes nos offres sont soigneusement testées et vérifiées pour garantir un fonctionnement optimal et sécurisé pour l'utilisateur.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      {/* En-tête de la section */}
      <div className="section-header">
        <span className="section-badge">FAQ</span>
        <h2 className="section-title">Questions fréquentes</h2>
      </div>

      {/* Liste de l'accordéon */}
      <div className="faq-container">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question-bar">
                <h3 className="faq-question">{faq.question}</h3>
                <button
                  aria-label="Toggle answer"
                  className={`faq-icon-btn ${isOpen ? "active-btn" : ""}`}
                >
                  <i
                    className={`fa-solid ${
                      isOpen ? "fa-chevron-up" : "fa-chevron-right"
                    }`}
                  ></i>
                </button>
              </div>

              {isOpen && (
                <div className="faq-answer-box">
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}