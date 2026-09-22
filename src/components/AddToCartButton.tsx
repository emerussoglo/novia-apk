"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({
  productId,
  className = "cart-btn block-btn",
}: {
  productId: string;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(productId);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button className={className} onClick={handleAdd} type="button">
      <i className={`fa-solid ${added ? "fa-check" : "fa-cart-shopping"}`}></i>
      <span>{added ? "Ajouté au panier" : "Ajouter au panier"}</span>
    </button>
  );
}
