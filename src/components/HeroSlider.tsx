"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
interface BannerSlide {
  id: string;
  image: string;
  alt: string;
  link: string;
  title: string;
  price: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: "capcut-phone",
    image: "/img/banners/capcut.png",
    alt: "CapCut Pro pour téléphone et ordinateur",
    link: "/produits/capcut-pro",
    title: "CapCut Pro",
    price: "Téléphone · 1 000 FCFA",
  },
  {
    id: "capcut-computer",
    image: "/img/banners/capcut.png",
    alt: "CapCut Pro pour ordinateur",
    link: "/produits/capcut-pc",
    title: "CapCut Pro",
    price: "Ordinateur · 2 000 FCFA",
  },
  {
    id: "photoshop",
    image: "/img/banners/photoshop.png",
    alt: "Adobe Photoshop",
    link: "/produits/photoshop",
    title: "Adobe Photoshop",
    price: "3 000 FCFA",
  },
  {
    id: "premiere-pro",
    image: "/img/banners/premiere.png",
    alt: "Adobe Premiere Pro",
    link: "/produits/premiere-pro",
    title: "Adobe Premiere Pro",
    price: "3 000 FCFA",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % bannerSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="hero-image-slider-wrapper scroll-reveal"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-banner-container">
        {bannerSlides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id}
              className={`hero-banner-slide ${isActive ? "active" : ""}`}
              aria-hidden={!isActive}
            >
              <Link href={slide.link} className="hero-banner-link">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="hero-banner-img"
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                />
                <span className="hero-banner-caption">
                  <strong>{slide.title}</strong>
                  <span>{slide.price}</span>
                </span>
              </Link>
            </div>
          );
        })}

        {/* Prev & Next Arrows */}
        <button
          type="button"
          className="banner-nav-arrow banner-arrow-prev"
          onClick={handlePrev}
          aria-label="Bannière précédente"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          type="button"
          className="banner-nav-arrow banner-arrow-next"
          onClick={handleNext}
          aria-label="Bannière suivante"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Pagination Dash Dots (like in Image 2 & 6: -- -) */}
      <div className="hero-dash-pagination">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`pagination-pill-dash ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
