import { SectionShell } from "@/components/ui/SectionShell";

export function Contact() {
  return (
    <SectionShell
      id="contact"
      number="05"
      label="ESTABLISH CONNECTION"
      title={
        <>
          LET&apos;S BUILD
          <br />
          SOMETHING
          <br />
          RELIABLE.
        </>
      }
    >
      <div className="contact-placeholder">
        <span>EMAIL</span>
        <span>LINKEDIN</span>
        <span>GITHUB</span>
        <span>CV</span>
      </div>
    </SectionShell>
  );
}