import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Teaching",
  description: "Teaching updates from Shuo Xu.",
};

export default function TeachingPage() {
  return (
    <PageShell>
      <header className="pageHeader">
        <p className="eyebrow">Academic</p>
        <h1>Teaching</h1>
      </header>
      <EmptyState message="Updates will be added here." title="No entries yet" />
    </PageShell>
  );
}
