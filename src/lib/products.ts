export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  downloadFiles: string[];
};

export const products: Product[] = [
  {
    id: "capcut-pro",
    name: "CapCut Pro",
    price: 3000,
    description:
      "Les fonctionnalités premium de CapCut pour tes projets créatifs.",
    image: "/img/CapCut.apk",
    downloadFiles: ["/img/CapCut.apk", "/img/Spotify.apk"],
  },
  {
    id: "moviebox-pro",
    name: "MovieBox Pro",
    price: 2000,
    description:
      "Une expérience premium pour enrichir ton environnement de création.",
    image: "/img/MovieBox.apk",
    downloadFiles: ["/img/MovieBox.apk", "/img/Spotify.apk"],
  },
];

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}
