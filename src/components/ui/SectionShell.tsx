import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface SectionShellProps {
  id: string;
  number: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}

export function SectionShell({
  id,
  number,
  label,
  title,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="section-shell">
      <Container>
        <SectionLabel number={number}>{label}</SectionLabel>

        <div className="section-shell-content">
          <h2 className="section-shell-title">{title}</h2>

          {children && (
            <div className="section-shell-body">
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}