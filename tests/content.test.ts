import { describe, expect, it } from "vitest";
import { education } from "@/content/education";
import { news } from "@/content/news";
import { publications } from "@/content/publications";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

describe("approved site content", () => {
  it("uses Shuo Xu's exact identity and contact links", () => {
    expect(site.name).toBe("Shuo Xu");
    expect(site.email).toBe("shuo.xu@stu.pku.edu.cn");
    expect(site.github).toBe("https://github.com/shuo456");
    expect(site.advisor.name).toBe("Prof. Zhiyong Sun");
  });

  it("contains only the approved education entries", () => {
    expect(education.map((entry) => entry.period)).toEqual([
      "2025–Present",
      "2021–2025",
    ]);
  });

  it("uses the approved IFAC status and both demos", () => {
    expect(publications[0].status).toBe("To appear in IFAC 2026");
    expect(projects[0].videos.map((video) => video.label)).toEqual([
      "Unicycle comparison",
      "Quadrotor gate comparison",
    ]);
  });

  it("contains the two approved news items", () => {
    expect(news).toHaveLength(2);
    expect(news.map((item) => item.year)).toEqual([2026, 2025]);
  });
});
