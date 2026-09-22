"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";

export default function BuyNowButton({
  productId,
  children,
  className,
}: {
  productId: string;
  children: React.ReactNode;
  className: string;
}) {
  const router = useRouter();
  const { addItem } = useCart();

  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        addItem(productId);
        router.push("/panier");
      }}
    >
      {children}
    </button>
  );
}
