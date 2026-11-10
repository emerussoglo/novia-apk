import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import ScrollRevealObserver from "@/components/ScrollRevealObserver";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaStudio — Outils de création numérique",
  description:
    "Découvrez CapCut Pro pour téléphone et ordinateur, Adobe Photoshop, Premiere Pro et des effets sonores pour le montage vidéo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link rel="shortcut icon" href="/img/logo.png" type="image/x-icon" />
      </head>
      <body>
        <ScrollRevealObserver />
        <CartProvider>
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
