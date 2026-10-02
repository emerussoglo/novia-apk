export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  downloadFile: string;
};

export const products: Product[] = [
  {
    id: "capcut-pro",
    name: "CapCut Pro",
    price: 1000,
    description:
      "Les fonctionnalités premium de CapCut pour tes projets créatifs.",
    image: "/img/capcut.jpg",
    downloadFile: "/img/capcut.txt",
  },
  {
    id: "moviebox-pro",
    name: "MovieBox Pro",
    price: 1000,
    description:
      "Une expérience premium pour enrichir ton environnement de création.",
    image: "/img/moviebox.jpg",
    downloadFile: "/img/moviebox.txt",
  },
];

export const bundleBonuses = ["WPS Office", "InShot"] as const;

export function getOrderDelivery(productIds: string[]) {
  const hasCapCut = productIds.includes("capcut-pro");
  const hasMovieBox = productIds.includes("moviebox-pro");
  const isBundle = hasCapCut && hasMovieBox;

  return {
    files: isBundle
      ? ["/img/pack.txt"]
      : products
          .filter((product) => productIds.includes(product.id))
          .map((product) => product.downloadFile),
    bonuses: isBundle ? [...bundleBonuses] : [],
  };
}

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}
