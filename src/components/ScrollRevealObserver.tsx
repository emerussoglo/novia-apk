"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".scroll-reveal")
        .forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("has-scroll-reveal");
    const targets = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
          targets.delete(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    const observeRevealElements = (root: ParentNode) => {
      for (const element of root.querySelectorAll(".scroll-reveal")) {
        if (targets.has(element)) continue;
        targets.add(element);
        observer.observe(element);
      }
    };

    observeRevealElements(document);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(".scroll-reveal")) {
            targets.add(node);
            observer.observe(node);
          }
          observeRevealElements(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      targets.clear();
      document.documentElement.classList.remove("has-scroll-reveal");
    };
  }, []);

  return null;
}
