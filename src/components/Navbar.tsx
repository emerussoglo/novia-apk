"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { count } = useCart();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Produits", href: "/produits" },
    { name: "CapCut Pro", href: "/produits" },
    { name: "MovieBox Pro", href: "/produits" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link href="/" className="navbar-brand">
            <div className="brand-icon">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <span className="brand-name">Prime Digital</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="navbar-actions">
            <Link
              href="/panier"
              className="icon-btn cart-nav-btn"
              aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>

            <Link href="/offres" className="primary-btn desktop-btn">
              <span>Voir les offres</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="icon-btn mobile-toggle"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {isOpen && <div className="mobile-overlay" onClick={toggleMenu} />}

      {/* Mobile Navigation Drawer */}
      <aside className={`mobile-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span className="brand-name">Prime Digital</span>
          <button
            className="icon-btn close-btn"
            onClick={toggleMenu}
            aria-label="Fermer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="mobile-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-nav-link ${isActive(link.href) ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span>{link.name}</span>
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
          ))}
        </nav>

        <div className="mobile-drawer-footer">
          <Link
            href="/offres"
            className="primary-btn block-btn"
            onClick={toggleMenu}
          >
            <span>Voir les offres</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>

          <Link
            href="/support"
            className="secondary-btn block-btn"
            onClick={toggleMenu}
          >
            <i className="fa-solid fa-headset"></i>
            <span>Contacter le support</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
