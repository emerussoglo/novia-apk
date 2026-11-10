import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductMockup({
  product,
  placement,
}: {
  product: Product;
  placement: "card" | "detail";
}) {
  return (
    <div className={`product-mockup product-mockup-${placement}`}>
      <Image
        src={product.mockupImage}
        alt={`Mockup ${product.name}`}
        fill
        sizes={
          placement === "card"
            ? "(max-width: 640px) 90vw, 320px"
            : "(max-width: 768px) 100vw, 50vw"
        }
        className="product-mockup-image"
        priority={placement === "detail"}
      />
    </div>
  );
}
