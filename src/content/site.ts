import type { NavItem } from "@/lib/types";

const navigation: readonly NavItem[] = [
  { label: "About", href: "/" },
  { label: "Publications", href: "/publications/" },
  { label: "Projects", href: "/projects/" },
  { label: "Travels", href: "/travels/" },
  { label: "CV", href: "/cv/" },
  {
    label: "More",
    children: [
      { label: "Teaching", href: "/teaching/" },
      { label: "Awards", href: "/awards/" },
      { label: "Academic Service", href: "/service/" },
    ],
  },
];

export const site = {
  name: "Shuo Xu",
  role: "Ph.D. Student",
  affiliation: "School of Advanced Manufacturing and Robotics, Peking University",
  email: "sxu25@stu.pku.edu.cn",
  github: "https://github.com/shuo456",
  advisor: {
    name: "Prof. Zhiyong Sun",
    href: "https://www.coe.pku.edu.cn/teaching/yongforeign/13424.html",
  },
  researchInterests: [
    "Robotics",
    "Safety-Critical Control",
    "Multi-Agent Systems",
  ],
  navigation,
} as const;
