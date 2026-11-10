export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  badge: string;
  deviceType: string;
  description: string;
  highlights: string[];
  mockupImage: string;
  downloadFile: string;
  availableForPurchase: boolean;
  visualVariant: "capcut" | "photoshop" | "premiere" | "sound-effects";
};

export const products: Product[] = [
  {
    id: "capcut-pro",
    name: "CapCut Pro — Téléphone",
    price: 1000,
    category: "Montage vidéo",
    badge: "TÉLÉPHONE",
    deviceType: "Téléphone",
    description: "CapCut Pro pour une utilisation sur téléphone.",
    highlights: [
      "Montez vos vidéos directement sur téléphone.",
      "Profitez d’outils et d’effets créatifs premium.",
      "Retrouvez votre fichier de livraison après confirmation du paiement.",
    ],
    mockupImage: "/img/mockup/CapCut.png",
    downloadFile: "/img/capcut.txt",
    availableForPurchase: true,
    visualVariant: "capcut",
  },
  {
    id: "capcut-pc",
    name: "CapCut Pro — Ordinateur",
    price: 2000,
    category: "Montage vidéo",
    badge: "ORDINATEUR",
    deviceType: "Ordinateur",
    description: "CapCut Pro pour une utilisation sur ordinateur.",
    highlights: [
      "Montez vos vidéos sur ordinateur.",
      "Travaillez vos projets avec les outils CapCut Pro.",
      "Retrouvez votre fichier de livraison après confirmation du paiement.",
    ],
    mockupImage: "/img/mockup/CapCut.png",
    downloadFile: "/img/capcut-pc.txt",
    availableForPurchase: true,
    visualVariant: "capcut",
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    price: 3000,
    category: "Design graphique",
    badge: "ORDINATEUR",
    deviceType: "Ordinateur",
    description: "Adobe Photoshop pour la création et la retouche d’images.",
    highlights: [
      "Créez et retouchez vos images.",
      "Composez des visuels pour vos projets créatifs.",
      "Retrouvez votre fichier de livraison après confirmation du paiement.",
    ],
    mockupImage: "/img/mockup/Photoshop.png",
    downloadFile: "/img/photoshop.txt",
    availableForPurchase: true,
    visualVariant: "photoshop",
  },
  {
    id: "premiere-pro",
    name: "Adobe Premiere Pro",
    price: 3000,
    category: "Montage vidéo",
    badge: "ORDINATEUR",
    deviceType: "Ordinateur",
    description: "Adobe Premiere Pro pour le montage vidéo.",
    highlights: [
      "Montez et organisez vos projets vidéo.",
      "Travaillez vos séquences et votre rythme.",
      "Retrouvez votre fichier de livraison après confirmation du paiement.",
    ],
    mockupImage: "/img/mockup/premiere.png",
    downloadFile: "/img/premiere.txt",
    availableForPurchase: true,
    visualVariant: "premiere",
  },
  {
    id: "sfx",
    name: "Sound Effects (SFX)",
    price: 2500,
    category: "Audio",
    badge: "EFFETS SONORES",
    deviceType: "Montage vidéo",
    description: "Une sélection d’effets sonores pour le montage vidéo.",
    highlights: [
      "Ajoutez des effets sonores à vos montages.",
      "Renforcez transitions, actions et ambiances.",
      "Le fichier de livraison sera disponible prochainement.",
    ],
    mockupImage: "/img/mockup/sfx.png",
    downloadFile: "/img/sfx.txt",
    availableForPurchase: false,
    visualVariant: "sound-effects",
  },
];

export function getOrderDelivery(productIds: string[]) {
  return {
    files: Array.from(
      new Set(
        products
          .filter((product) => productIds.includes(product.id))
          .map((product) => product.downloadFile),
      ),
    ),
  };
}

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}
