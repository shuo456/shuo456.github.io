import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Academic Service",
  description: "Academic service updates from Shuo Xu.",
};

export default function ServicePage() {
  return (
    <PageShell>
      <header className="pageHeader">
        <p className="eyebrow">Academic</p>
        <h1>Academic Service</h1>
      </header>
      <EmptyState message="Updates will be added here." title="No entries yet" />
    </PageShell>
  );
}
