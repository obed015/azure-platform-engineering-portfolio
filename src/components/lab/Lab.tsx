import { SectionShell } from "@/components/ui/SectionShell";

export function Lab() {
  return (
    <SectionShell
      id="lab"
      number="03"
      label="HOMELAB"
      title={
        <>
          MY CLOUD
          <br />
          DOESN&apos;T START
          <br />
          IN THE CLOUD.
        </>
      }
    >
      <p className="section-intro">
        Hybrid infrastructure combining Active Directory,
        Microsoft Entra ID, Microsoft Intune, Windows Server,
        pfSense and Hyper-V.
      </p>
    </SectionShell>
  );
}