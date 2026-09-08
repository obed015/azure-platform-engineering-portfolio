import { SectionShell } from "@/components/ui/SectionShell";

export function About() {
  return (
    <SectionShell
      id="about"
      number="01"
      label="ABOUT / ENGINEER"
      title={
        <>
          CLOUD INFRASTRUCTURE
          <br />
          SHOULD BE SECURE,
          <br />
          REPEATABLE AND
          <br />
          OPERABLE.
        </>
      }
    >
      <div className="about-copy">
        <p>
          I work across Azure platform operations, cloud
          security, hybrid identity, endpoint management
          and automation.
        </p>

        <p>
          My engineering approach is to understand the
          architecture first, automate repeatable work,
          apply least privilege and make systems
          observable by default.
        </p>
      </div>
    </SectionShell>
  );
}