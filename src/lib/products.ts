export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  category: string;
  badge?: string;
  description: string;
  image: string;
  downloadFile: string;
  rating?: number;
  reviewCount?: number;
  deviceType?: string;
  features?: string[];
  bonus?: string;
};

export const products: Product[] = [
  {
    id: "capcut-pro",
    name: "CapCut Pro — Licence Illimitée",
    price: 1000,
    originalPrice: 5000,
    discount: "-80%",
    category: "Vidéo & Montage",
    badge: "MEILLEURE VENTE",
    deviceType: "Application Mobile (Android & iOS)",
    description:
      "Toutes les fonctionnalités Pro débloquées : effets IA, suppression de fond en 1 clic, sous-titres automatiques et export 4K 60FPS sans aucun filigrane.",
    image: "/img/capcut.jpeg",
    downloadFile: "/img/capcut.txt",
    rating: 4.9,
    reviewCount: 1420,
    bonus: "WPS Office et InShot offerts avec le Pack Duo ou l'achat groupé.",
    features: [
      "Exportation vidéo 4K à 60 FPS sans filigrane",
      "Bibliothèque complète d'effets, filtres & transitions VIP",
      "Suppression d'arrière-plan IA instantanée",
      "Génération automatique des sous-titres multilingues",
      "Stockage Cloud et synchronisation de vos projets",
      "Accès immédiat et assistance 7j/7",
    ],
  },
  {
    id: "moviebox-pro",
    name: "MovieBox Pro — Streaming VIP 4K",
    price: 1000,
    originalPrice: 5000,
    discount: "-80%",
    category: "Streaming & Médias",
    badge: "POPULAIRE",
    deviceType: "Application Mobile (Android & iOS)",
    description:
      "Accédez à l'intégralité du cinéma et des séries en qualité 4K Ultra HD sans aucune interruption publicitaire et avec serveurs ultra-rapides.",
    image: "/img/moviebox.jpeg",
    downloadFile: "/img/moviebox.txt",
    rating: 4.8,
    reviewCount: 980,
    bonus: "WPS Office et InShot offerts avec le Pack Duo ou l'achat groupé.",
    features: [
      "Catalogue illimité de films, documentaires & séries en 4K/HD",
      "Zéro publicité, visionnage fluide garanti",
      "Téléchargement hors-ligne pour regarder n'importe où",
      "Pistes audio multilingues et sous-titres personnalisés",
      "Compatibilité mobile haute performance",
      "Mises à jour quotidiennes du catalogue",
    ],
  },
  {
    id: "pack-duo",
    name: "Pack Créateur Duo (CapCut Pro + MovieBox Pro)",
    price: 1800,
    originalPrice: 10000,
    discount: "-82%",
    category: "Bundles & Packs",
    badge: "OFFRE SPÉCIALE DUO",
    deviceType: "Pack Complet Mobile (Android & iOS)",
    description:
      "Le pack ultime pour créer et se divertir : CapCut Pro + MovieBox Pro avec en bonus exclusif WPS Office et InShot entièrement offerts.",
    image: "/img/image.png",
    downloadFile: "/img/pack.txt",
    rating: 5.0,
    reviewCount: 2310,
    bonus: "Inclus gratuitement : WPS Office Premium + InShot Pro débloqués.",
    features: [
      "CapCut Pro à vie avec export 4K sans filigrane",
      "MovieBox Pro à vie avec streaming 4K sans pub",
      "Bonus 1 : WPS Office version complète offerte",
      "Bonus 2 : InShot Pro application mobile offerte",
      "Fichier d'accès et guide pas-à-pas immédiat",
      "Support prioritaire WhatsApp 7j/7",
    ],
  },
];

export const bundleBonuses = ["WPS Office", "InShot"] as const;

export function getOrderDelivery(productIds: string[]) {
  const hasCapCut = productIds.includes("capcut-pro");
  const hasMovieBox = productIds.includes("moviebox-pro");
  const hasPackDuo = productIds.includes("pack-duo");
  const isBundle = (hasCapCut && hasMovieBox) || hasPackDuo;

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
