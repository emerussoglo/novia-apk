"use client";

import { useEffect, useState } from "react";

type AvailabilityResponse = {
  products?: Record<string, boolean>;
  error?: string;
};

export function useDeliveryAvailability() {
  const [availableProducts, setAvailableProducts] = useState<
    Record<string, boolean>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadAvailability() {
      try {
        const response = await fetch("/api/products/availability", {
          signal: controller.signal,
          cache: "no-store",
        });
        const result = (await response.json()) as AvailabilityResponse;
        if (!response.ok || !result.products) {
          throw new Error(
            result.error ?? "Impossible de vérifier les disponibilités.",
          );
        }
        setAvailableProducts(result.products);
        setError("");
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Impossible de vérifier les disponibilités.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadAvailability();
    return () => controller.abort();
  }, []);

  return { availableProducts, isLoading, error };
}
