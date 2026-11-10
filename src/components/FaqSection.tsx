"use client";

import { useState } from "react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment se déroule la livraison ?",
      answer: "Livraison instantanée par email dès validation de votre paiement.",
    },
    {
      question: "Quels moyens de paiement sont acceptés ?",
      answer: "Mobile Money (MTN, Moov, Celtiis, Wave, Orange) et Cartes bancaires.",
    },
    {
      question: "Est-ce un paiement unique ?",
      answer: "Oui, un achat unique sans abonnement récurrent ni frais cachés.",
    },
    {
      question: "Sur quels appareils fonctionne l'accès ?",
      answer: "Smartphones et tablettes Android et iOS.",
    },
    {
      question: "Que faire en cas de difficulté ?",
      answer: "Notre support WhatsApp vous répond 7j/7 en moins de 15 minutes.",
    },
  ];

  return (
    <section className="exact-faq-section" id="faq">
      <div className="exact-faq-container">
        <h2 className="exact-faq-heading">Questions fréquentes</h2>

        <div className="exact-faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`exact-faq-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="exact-faq-toggle"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="exact-faq-q">{faq.question}</span>
                  <i
                    className={`fa-solid ${isOpen ? "fa-minus" : "fa-plus"} exact-faq-icon`}
                  ></i>
                </button>
                {isOpen && (
                  <div className="exact-faq-a">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
