import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Travels",
  description: "Travel stories by Shuo Xu.",
};

export default function TravelsPage() {
  return (
    <PageShell>
      <header className="pageHeader travelHeader">
        <p className="eyebrow">Beyond the lab</p>
        <h1>Travels</h1>
        <p>
          Notes from places, landscapes, and moments encountered along the way.
        </p>
      </header>
      <EmptyState message="Stories coming soon." title="The journal begins here" />
    </PageShell>
  );
}
