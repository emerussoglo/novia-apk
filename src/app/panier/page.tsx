"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { getOrderDelivery } from "@/lib/products";

const formatPrice = (amount: number) =>
  `${amount.toLocaleString("fr-FR")} FCFA`;
const PENDING_PAYMENT_KEY = "prime-digital-pending-payment";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clear, getItemProduct } =
    useCart();
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [purchasedFiles, setPurchasedFiles] = useState<string[]>([]);
  const [purchasedBonuses, setPurchasedBonuses] = useState<string[]>([]);
  const emailSentRef = useRef(false);
  const orderBonuses = getOrderDelivery(
    items.map((item) => item.productId),
  ).bonuses;

  useEffect(() => {
    const pending = window.localStorage.getItem(PENDING_PAYMENT_KEY);
    if (!pending) return;
    let payment: { sessionId: string };
    try {
      payment = JSON.parse(pending) as { sessionId: string };
    } catch {
      window.localStorage.removeItem(PENDING_PAYMENT_KEY);
      return;
    }
    if (!/^[0-9a-f-]{36}$/i.test(payment.sessionId)) {
      window.localStorage.removeItem(PENDING_PAYMENT_KEY);
      return;
    }

    let cancelled = false;
    const checkPayment = async () => {
      try {
        const response = await fetch(
          `/api/payment/checkout/${payment.sessionId}`,
        );
        const result = await response.json();
        if (cancelled) return;
        if (!response.ok) {
          setMessage(
            result.error ?? "Vérification du paiement impossible. Nouvelle tentative...",
          );
          window.setTimeout(checkPayment, 3000);
          return;
        }
        if (result.status === "PENDING") {
          setMessage("Vérification de votre paiement en cours...");
        }
        if (result.verified === true) {
          const files = Array.isArray(result.downloadFiles)
            ? result.downloadFiles.filter(
                (file: unknown): file is string => typeof file === "string",
              )
            : [];
          if (files.length === 0) {
            setMessage(
              "Paiement confirmé, mais les fichiers sont indisponibles. Contactez l’assistance.",
            );
            return;
          }

          let emailMessage = "Paiement confirmé. Vos fichiers sont prêts.";
          if (!emailSentRef.current) {
            emailSentRef.current = true;
            try {
              const emailResponse = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId: payment.sessionId }),
              });
              if (!emailResponse.ok) {
                emailMessage =
                  "Paiement confirmé. Les fichiers sont prêts, mais l’e-mail n’a pas pu être envoyé.";
              }
            } catch {
              emailMessage =
                "Paiement confirmé. Les fichiers sont prêts, mais l’e-mail n’a pas pu être envoyé.";
            }
          }
          setPurchasedFiles(files);
          setPurchasedBonuses(
            Array.isArray(result.bonuses)
              ? result.bonuses.filter(
                  (bonus: unknown): bonus is string =>
                    typeof bonus === "string",
                )
              : [],
          );
          clear();
          window.localStorage.removeItem(PENDING_PAYMENT_KEY);
          setMessage(emailMessage);
          return;
        }
        if (result.status === "FAILED" || result.status === "EXPIRED") {
          window.localStorage.removeItem(PENDING_PAYMENT_KEY);
          setMessage("Le paiement n’a pas abouti. Vous pouvez réessayer.");
          return;
        }
        window.setTimeout(checkPayment, 3000);
      } catch {
        if (!cancelled) {
          setMessage(
            "Vérification du paiement impossible. Nouvelle tentative...",
          );
          window.setTimeout(checkPayment, 3000);
        }
      }
    };
    void checkPayment();
    return () => {
      cancelled = true;
    };
  }, [clear, getItemProduct]);

  async function handlePayment() {
    if (!customer.name || !customer.email || items.length === 0) {
      setMessage("Renseignez votre nom et votre adresse email avant de payer.");
      return;
    }
    setIsPaying(true);
    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          name: customer.name,
          email: customer.email,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.checkoutUrl || !result.id) {
        throw new Error(result.error ?? "Impossible de lancer le paiement.");
      }
      window.localStorage.setItem(
        PENDING_PAYMENT_KEY,
        JSON.stringify({ sessionId: result.id }),
      );
      window.location.href = result.checkoutUrl;
    } catch (error) {
      setIsPaying(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Impossible de lancer le paiement.",
      );
    }
  }

  return (
    <main className="cart-page-clean">
      <div className="cart-header-clean">
        <h1 className="cart-title-clean">Mon Panier</h1>
        <p className="cart-subtitle-clean">Paiement sécurisé en FCFA</p>
      </div>

      {items.length === 0 ? (
        <section className="cart-empty-clean">
          <div className="cart-empty-icon-wrap">
            <i
              className={`fa-solid ${purchasedFiles.length ? "fa-circle-check" : "fa-basket-shopping"}`}
            ></i>
          </div>
          <h2>
            {purchasedFiles.length
              ? "Commande confirmée !"
              : "Votre panier est vide"}
          </h2>
          <p>
            {purchasedFiles.length
              ? `Vos fichiers sont débloqués ci-dessous.${purchasedBonuses.length ? ` Bonus inclus : ${purchasedBonuses.join(" et ")}.` : ""}`
              : "Ajoutez un article pour continuer."}
          </p>

          {purchasedFiles.length ? (
            <div className="download-links-clean">
              {purchasedFiles.map((file) => (
                <a key={file} href={file} download className="download-btn-clean">
                  <i className="fa-solid fa-download"></i> Télécharger (
                  {file.split("/").pop()})
                </a>
              ))}
            </div>
          ) : (
            <Link href="/produits" className="cart-return-shop-btn">
              Voir les produits
            </Link>
          )}
        </section>
      ) : (
        <div className="cart-layout-clean">
          <section className="cart-items-card">
            <div className="cart-card-header">
              <h2>Votre sélection ({items.reduce((s, i) => s + i.quantity, 0)})</h2>
            </div>

            {orderBonuses.length > 0 && (
              <div className="cart-bonus-notice">
                <i className="fa-solid fa-gift"></i>
                <span>Bonus inclus : {orderBonuses.join(" et ")}</span>
              </div>
            )}

            <div className="cart-items-list">
              {items.map((item) => {
                const product = getItemProduct(item.productId);
                if (!product) return null;
                return (
                  <article className="cart-item-row" key={item.productId}>
                    <div className="cart-item-main">
                      <h3 className="cart-item-title">{product.name}</h3>
                      <span className="cart-item-meta">
                        {formatPrice(product.price)} · Licence à vie
                      </span>
                    </div>

                    <div className="cart-item-stepper">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="stepper-count">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-price-col">
                      <strong>{formatPrice(product.price * item.quantity)}</strong>
                    </div>

                    <button
                      className="cart-item-remove-btn"
                      onClick={() => removeItem(item.productId)}
                      aria-label="Supprimer"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="cart-checkout-summary-card">
            <h2>Récapitulatif</h2>

            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Total</span>
                <strong className="summary-total-price">{formatPrice(total)}</strong>
              </div>
            </div>

            <div className="checkout-fields-form">
              <div className="input-group-clean">
                <label htmlFor="customer-name">Nom complet</label>
                <input
                  id="customer-name"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div className="input-group-clean">
                <label htmlFor="customer-email">Email</label>
                <input
                  id="customer-email"
                  type="email"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <button
                className="checkout-submit-btn"
                onClick={handlePayment}
                disabled={isPaying}
                type="button"
              >
                {isPaying
                  ? "Ouverture du paiement..."
                  : `Payer ${formatPrice(total)}`}
              </button>

              {message && (
                <div className="checkout-status-banner" role="status">
                  <span>{message}</span>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
