import { useEffect, useRef } from "react";

export function useAutoScroll<T>(dependency: T, enabled: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enabled && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dependency, enabled]);

  return ref;
}
