import type { Publication } from "@/lib/types";

export const publications = [
  {
    slug: "fma-cbf",
    title:
      "Analysis of Feasibility Margin as a Control Barrier Function under Input Constraints",
    authors: ["Shuo Xu", "Zhengning Gong", "Yicheng Lin", "Zhiyong Sun"],
    status: "To appear in IFAC 2026",
    abstract:
      "Quadratic Programs (QP) subject to Control Barrier Function (CBF)-based constraints are widely employed to design safety-critical controllers. However, ensuring the feasibility of the QP under input constraints remains a significant challenge. In this work, we propose a feasibility-margin-based CBF as a proactive safety filter to guarantee the feasibility of CBF-QP with input constraints. We first characterize the feasibility margin using support functions defined by the geometry of input constraints. We then propose a novel method that employs the feasibility margin as a Control Barrier Function (FMA-CBF) for safety-critical control systems subject to polytopic input constraints. Furthermore, we formulate a unified QP that enforces both the original safety constraints and the feasibility margin constraints to guarantee feasibility. The efficacy of the proposed method is validated through double-integrator systems and unicycle robots with obstacle avoidance tasks.",
    keywords: [
      "Safety-Critical Control",
      "Control barrier function",
      "Feasibility margin",
      "Input Constraints",
    ],
    paperHref: "/papers/fma-cbf-paper.pdf",
    projectHref: "/projects/fma-cbf/",
  },
] as const satisfies readonly Publication[];
