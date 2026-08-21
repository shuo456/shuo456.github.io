import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EducationTimeline } from "@/components/education-timeline";
import { EmptyState } from "@/components/empty-state";
import { NewsList } from "@/components/news-list";
import { ProfileSidebar } from "@/components/profile-sidebar";
import { PublicationCard } from "@/components/publication-card";
import { SiteHeader } from "@/components/site-header";
import { VideoDemo } from "@/components/video-demo";
import { news } from "@/content/news";
import { education } from "@/content/education";
import { publications } from "@/content/publications";
import { projects } from "@/content/projects";

describe("global academic shell", () => {
  it("renders core navigation and the More menu", () => {
    render(<SiteHeader />);

    for (const label of [
      "About",
      "Publications",
      "Projects",
      "Travels",
      "CV",
      "More",
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("renders verified identity, research interests, and contact links", () => {
    render(<ProfileSidebar />);

    expect(screen.getByRole("img", { name: "Shuo Xu" })).toHaveAttribute(
      "src",
      expect.stringContaining("shuo-xu-portrait.jpg"),
    );
    expect(
      screen.queryByRole("img", { name: "Blank profile portrait" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Shuo Xu" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Safety-Critical Control")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:sxu25@stu.pku.edu.cn",
    );
  });
});

describe("secondary academic content", () => {
  it("renders education in reverse chronological order", () => {
    render(<EducationTimeline entries={[...education].reverse()} />);

    const periods = screen.getAllByTestId("education-period");
    expect(periods.map((period) => period.textContent)).toEqual([
      "2025–Present",
      "2021–2025",
    ]);
    expect(screen.getByText("Ph.D. Student")).toBeInTheDocument();
    expect(
      screen.getByText(
        /College of Intelligence Science and Technology, National University of Defense Technology/,
      ),
    ).toBeInTheDocument();
  });

  it("renders an honest empty state without fabricated list items", () => {
    render(
      <EmptyState
        message="Updates will be added here."
        title="No entries yet"
      />,
    );

    expect(screen.getByText("Updates will be added here.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});

describe("project media", () => {
  it("renders a controlled MP4 with a poster and direct fallback link", () => {
    const { container } = render(<VideoDemo video={projects[0].videos[0]} />);
    const video = container.querySelector("video");
    const source = container.querySelector("source");

    expect(
      screen.getByRole("heading", { name: "Unicycle comparison" }),
    ).toBeInTheDocument();
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveAttribute("poster", "/media/unicycle-poster.png");
    expect(source).toHaveAttribute(
      "src",
      "/media/ifac-case2-comparison.mp4",
    );
    expect(screen.getByRole("link", { name: "Open the MP4 file." })).toHaveAttribute(
      "href",
      "/media/ifac-case2-comparison.mp4",
    );
  });
});

describe("home research content", () => {
  it("renders the publication with owner emphasis and research links", () => {
    render(<PublicationCard publication={publications[0]} />);

    expect(
      screen.getByRole("heading", { name: publications[0].title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Shuo Xu").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "Paper" })).toHaveAttribute(
      "href",
      "/papers/fma-cbf-paper.pdf",
    );
    expect(
      screen.getByRole("link", { name: "Project" }).getAttribute("href"),
    ).toMatch(/^\/projects\/fma-cbf\/?$/);
  });

  it("renders news in descending year order", () => {
    render(<NewsList items={[...news].reverse()} />);

    const years = screen.getAllByTestId("news-year");
    expect(years.map((year) => year.textContent)).toEqual(["2026", "2025"]);
  });
});
