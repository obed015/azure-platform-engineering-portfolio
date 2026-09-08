import { SectionShell } from "@/components/ui/SectionShell";

export function Experience() {
  return (
    <SectionShell
      id="experience"
      number="04"
      label="EXPERIENCE"
      title={
        <>
          FROM SUPPORT
          <br />
          TO PLATFORM
          <br />
          ENGINEERING.
        </>
      }
    >
      <p className="section-intro">
        Building experience across infrastructure,
        Microsoft Azure, endpoint engineering,
        cloud security and platform operations.
      </p>
    </SectionShell>
  );
}