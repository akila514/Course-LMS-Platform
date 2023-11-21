import React, { useEffect, useState } from "react";

export function UseDebounce<T>(value: T, delay?: number): T {
  const [debounceedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceedValue;
}
