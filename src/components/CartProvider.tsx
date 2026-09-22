"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/products";

export type CartItem = { productId: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  getItemProduct: (productId: string) => Product | undefined;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "prime-digital-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce(
        (sum, item) =>
          sum + (getProduct(item.productId)?.price ?? 0) * item.quantity,
        0,
      ),
      addItem: (productId) =>
        setItems((current) => {
          const existing = current.find((item) => item.productId === productId);
          if (existing)
            return current.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          return [...current, { productId, quantity: 1 }];
        }),
      updateQuantity: (productId, quantity) =>
        setItems((current) =>
          quantity > 0
            ? current.map((item) =>
                item.productId === productId ? { ...item, quantity } : item,
              )
            : current.filter((item) => item.productId !== productId),
        ),
      removeItem: (productId) =>
        setItems((current) =>
          current.filter((item) => item.productId !== productId),
        ),
      clear: () => setItems([]),
      getItemProduct: getProduct,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans CartProvider");
  return context;
}
