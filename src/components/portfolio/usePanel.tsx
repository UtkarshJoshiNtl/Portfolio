import { useCallback, useState } from "react";

export type PanelId =
  | "astrosis"
  | "projects"
  | "roadmap"
  | "hobby"
  | "about"
  | "contact"
  | "blog"
  | "identity"
  | "art3d"
  | "music"
  | null;

export function usePanel(initial: PanelId = null) {
  const [active, setActive] = useState<PanelId>(initial);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const open = useCallback((id: Exclude<PanelId, null>, origin?: Element | null) => {
    if (origin && typeof origin.getBoundingClientRect === "function") {
      setOriginRect(origin.getBoundingClientRect());
    } else {
      setOriginRect(null);
    }
    setActive(id);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    setOriginRect(null);
  }, []);

  return { active, originRect, open, close } as const;
}
