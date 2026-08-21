import type { ReactNode } from "react";
import { ProfileSidebar } from "@/components/profile-sidebar";

type PageShellProps = {
  children: ReactNode;
  withProfile?: boolean;
};

export function PageShell({ children, withProfile = false }: PageShellProps) {
  return (
    <main className={withProfile ? "pageShell pageShellWithProfile" : "pageShell"}>
      {withProfile ? <ProfileSidebar /> : null}
      <div className="pageContent">{children}</div>
    </main>
  );
}
