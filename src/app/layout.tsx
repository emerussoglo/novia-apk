import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prime Digital",
  description: "Créateur de solutions numériques",
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
