import type { Project } from "@/lib/types";

export const projects = [
  {
    slug: "fma-cbf",
    title: "Feasibility-Margin-Based Control Barrier Functions",
    summary:
      "A feasibility-margin-based control barrier function framework for safety-critical control under polytopic input constraints.",
    href: "/projects/fma-cbf/",
    videos: [
      {
        label: "Unicycle comparison",
        description: "Comparison of unicycle obstacle-avoidance simulations.",
        src: "/media/ifac-case2-comparison.mp4",
        poster: "/media/unicycle-poster.png",
      },
      {
        label: "Quadrotor gate comparison",
        description: "Comparison of quadrotor gate-navigation simulations.",
        src: "/media/quadrotor-gate-comparison.mp4",
        poster: "/media/quadrotor-poster.png",
      },
    ],
  },
] as const satisfies readonly Project[];
