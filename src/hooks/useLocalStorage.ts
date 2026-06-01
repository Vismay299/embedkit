"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Generic hook for persisting state to localStorage.
 * Loads value from localStorage on mount, falls back to initialValue on parse errors.
 * Never accesses window during SSR (initial render uses initialValue).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`useLocalStorage: error reading key "${key}"`, error);
      // Fall back to initialValue silently
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue =
          typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
          console.warn(`useLocalStorage: error setting key "${key}"`, error);
        }
        return newValue;
      });
    },
    [key],
  );

  return [storedValue, setValue];
}
