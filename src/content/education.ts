import type { EducationEntry } from "@/lib/types";

export const education = [
  {
    period: "2025–Present",
    role: "Ph.D. Student",
    school: "School of Advanced Manufacturing and Robotics, Peking University",
  },
  {
    period: "2021–2025",
    role: "B.Eng.",
    field: "Artificial Intelligence",
    school:
      "College of Intelligence Science and Technology, National University of Defense Technology",
  },
] as const satisfies readonly EducationEntry[];
