import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaStudio — Licences Logicielles & Abonnements Premium",
  description:
    "Boutique officielle de licences à vie et abonnements premium : CapCut Pro, MovieBox Pro, Pack Duo Créateur. Activation immédiate 24/7 et assistance garantie.",
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
        <link rel="shortcut icon" href="/img/image.png" type="image/x-icon" />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
