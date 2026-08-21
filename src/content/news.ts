import type { NewsItem } from "@/lib/types";

export const news = [
  {
    year: 2026,
    text: "Our paper will appear at IFAC 2026.",
  },
  {
    year: 2025,
    text: "I started my Ph.D. at Peking University.",
  },
] as const satisfies readonly NewsItem[];
