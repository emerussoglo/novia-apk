export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  downloadFiles: string[];
  driveUrl: string;
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
    driveUrl:
      "https://drive.google.com/drive/folders/1MD8f2kDp9nJ4VspnZGERwUoOycfiEmXR?usp=drive_link",
  },
  {
    id: "moviebox-pro",
    name: "MovieBox Pro",
    price: 2000,
    description:
      "Une expérience premium pour enrichir ton environnement de création.",
    image: "/img/MovieBox.apk",
    downloadFiles: ["/img/MovieBox.apk", "/img/Spotify.apk"],
    driveUrl:
      "https://drive.google.com/drive/folders/1S18AM4YXLGwb36QjC7Bm7ERW2XVJ5Xnc?usp=drive_link",
  },
];

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}
