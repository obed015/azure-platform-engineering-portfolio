"use client";

import { ChangeEvent, useRef, useState } from "react";

type DemoFile = {
  name: string;
  status: string;
  link: string;
};

const workflowLabels = [
  "User authenticated with Microsoft Entra ID",
  "Frontend requests short-lived upload SAS",
  "Browser uploads directly to incoming-raw",
  "Event Grid triggers malware scan function",
  "Clean file promoted to safe-files",
  "Download function issues read-only SAS link",
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function SecureCloudDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("READY FOR SIMULATION");
  const [activeStep, setActiveStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<DemoFile[]>([]);
  const [sas, setSas] = useState("");

  async function runSimulation(file: File) {
    if (busy) return;
    setBusy(true);
    setProgress(10);
    setStage("REQUESTING WRITE SAS...");
    setActiveStep(2);
    setSas("");
    await wait(650);

    setProgress(30);
    setStage("WRITE SAS ISSUED / 10 MINUTES");
    setSas(`https://storage.example/incoming-raw/recruiter/${encodeURIComponent(file.name)}?sp=w&se=+10m&sig=SIMULATED`);
    await wait(650);

    setProgress(52);
    setStage("DIRECT-TO-BLOB UPLOAD...");
    setActiveStep(3);
    await wait(800);

    setProgress(70);
    setStage("BLOBCREATED → EVENT GRID");
    setActiveStep(4);
    await wait(750);

    setProgress(84);
    setStage("SCAN_FUNCTION / ANALYSING");
    await wait(900);

    setProgress(94);
    setStage("SCANSTATUS=CLEAN → SAFE-FILES");
    setActiveStep(5);
    await wait(650);

    setProgress(100);
    setStage("READ SAS ISSUED / 15 MINUTES");
    setActiveStep(6);
    setFiles((current) => [
      { name: file.name, status: "CLEAN", link: "READ SAS / 15m" },
      ...current,
    ]);
    setBusy(false);
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void runSimulation(file);
    event.target.value = "";
  }

  return (
    <section id="demo" className="securecloud-story-section">
      <div className="securecloud-story-heading">
        <span>07 / INTERACTIVE DEMO</span>
        <h2>HOW SECURECLOUD HUB WORKS.</h2>
        <p>
          Select any local file to simulate SAS generation, direct-to-Blob upload, Event Grid malware scanning,
          clean-file promotion, and secure download-link creation. No real upload occurs.
        </p>
      </div>

      <div className="securecloud-demo-shell">
        <div className="securecloud-demo-bar">
          <div>
            <span>SECURECLOUD HUB / PORTAL</span>
            <strong>ZERO-TRUST FILE SHARING SIMULATION</strong>
          </div>
          <em>SAFE SIMULATION / NO REAL UPLOADS</em>
        </div>

        <div className="securecloud-demo-grid">
          <div className="securecloud-demo-panel">
            <div className="securecloud-demo-identity">
              <div>
                <span>SIGNED IN</span>
                <strong>recruiter@contoso.com</strong>
              </div>
              <em>✓ ENTRA ID</em>
            </div>

            <button
              type="button"
              className="securecloud-upload-zone"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
            >
              <span>☁</span>
              <strong>{busy ? "SIMULATION RUNNING" : "SELECT A FILE TO UPLOAD"}</strong>
              <small>SAS → BLOB → EVENT GRID → SCAN → SAFE-FILES</small>
            </button>

            <input ref={inputRef} type="file" hidden onChange={onFileChange} />

            <div className="securecloud-progress">
              <div className="securecloud-progress-head">
                <span>{stage}</span>
                <strong>{progress}%</strong>
              </div>
              <div><i style={{ width: `${progress}%` }} /></div>
            </div>

            {sas && (
              <div className="securecloud-sas-output">
                <span>SIMULATED SAS OUTPUT</span>
                <code>{sas}</code>
              </div>
            )}

            <div className="securecloud-demo-files">
              <div className="securecloud-demo-files-head">
                <span>FILE</span><span>STATUS</span><span>LINK</span>
              </div>
              {files.length === 0 ? (
                <p>NO FILES YET — RUN A SIMULATION ABOVE</p>
              ) : files.map((file, index) => (
                <div key={`${file.name}-${index}`} className="securecloud-demo-file-row">
                  <span>{file.name}</span>
                  <strong>{file.status}</strong>
                  <span>{file.link}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="securecloud-demo-panel">
            <div className="securecloud-panel-label">WORKFLOW STATUS</div>
            <div className="securecloud-demo-workflow">
              {workflowLabels.map((label, index) => {
                const step = index + 1;
                const done = step <= activeStep;
                return (
                  <div key={label} className={done ? "securecloud-demo-wf securecloud-demo-wf-done" : "securecloud-demo-wf"}>
                    <span>{String(step).padStart(2, "0")}</span>
                    <p>{label}</p>
                    <i>{done ? "VERIFIED" : "WAITING"}</i>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
