"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { count } = useCart();

  const navLinks = [
    { name: "CapCut Pro", href: "/produits?item=capcut-pro" },
    { name: "Photoshop", href: "/produits?item=photoshop" },
    { name: "Premiere Pro", href: "/produits?item=premiere-pro" },
    { name: "Contact", href: "https://wa.me/2290166935805" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produits?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Main Solid Orange Navbar (Matching Image 1 & Image 6) */}
      <header className="solid-header-nav">
        <div className="solid-header-container">
          {/* Logo on Left (Solid white logo text/mark) */}
          <Link href="/" className="solid-nav-logo">
            <span className="logo-main-text">NovaStudio</span>
          </Link>

          {/* Desktop Categories Links (White, clean, bold, uncrowded) */}
          <nav className="solid-desktop-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="solid-link-item"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons (Search, Cart with counter bubble, Profile) */}
          <div className="solid-right-actions">
            {/* Search Icon */}
            <button
              type="button"
              className="solid-icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Rechercher"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {/* Cart with Counter Badge (0) */}
            <Link
              href="/panier"
              className="solid-cart-link"
              aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="solid-cart-counter">{count}</span>
            </Link>

            {/* Profile / Account Icon with Chevron */}
            <a
              href="https://wa.me/2290166935805"
              target="_blank"
              rel="noopener noreferrer"
              className="solid-user-link"
              title="Assistance & Compte"
            >
              <i className="fa-regular fa-user"></i>
              <i className="fa-solid fa-chevron-down user-chevron"></i>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="solid-hamburger-btn"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Working Search Bar Dropdown */}
        {searchOpen && (
          <div className="solid-search-bar-open">
            <form onSubmit={handleSearchSubmit} className="search-inline-form">
              <i className="fa-solid fa-magnifying-glass search-inline-icon"></i>
              <input
                type="text"
                placeholder="Rechercher un outil (CapCut, Photoshop...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="search-inline-submit">
                Rechercher
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="search-inline-close"
                aria-label="Fermer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="solid-drawer-overlay"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer (Matching Image 9) */}
      <aside
        className={`solid-mobile-drawer ${isOpen ? "open" : ""}`}
        aria-label="Menu mobile"
      >
        {/* Header with solid color and close button */}
        <div className="solid-drawer-top">
          <span className="drawer-logo-title">NovaStudio</span>
          <button
            className="solid-drawer-close"
            onClick={toggleMenu}
            aria-label="Fermer le menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Categories list with chevrons on right (Image 9) */}
        <nav className="solid-drawer-list">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="drawer-category-row"
              onClick={toggleMenu}
            >
              <span>{link.name}</span>
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
          ))}
          <Link
            href="/panier"
            className="drawer-category-row highlight-cart"
            onClick={toggleMenu}
          >
            <span>Mon Panier ({count})</span>
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </nav>
      </aside>
    </>
  );
}
