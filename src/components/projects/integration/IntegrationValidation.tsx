"use client";

import { useState } from "react";

type SimState = "idle" | "backlog" | "alert" | "recovering" | "recovered";

const steps = [
  "APIM request accepted",
  "Producer publishes account events",
  "Consumer unavailable",
  "Service Bus backlog grows",
  "Azure Monitor alert fires",
  "Consumer repaired and re-enabled",
  "Queue drains to zero",
];

export function IntegrationValidation() {
  const [state, setState] = useState<SimState>("idle");

  const activeMessages =
    state === "idle" ? 0 :
    state === "backlog" ? 45 :
    state === "alert" ? 45 :
    state === "recovering" ? 18 : 0;

  const visibleStep =
    state === "idle" ? 0 :
    state === "backlog" ? 4 :
    state === "alert" ? 5 :
    state === "recovering" ? 6 : 7;

  const startSimulation = () => {
    setState("backlog");
    window.setTimeout(() => setState("alert"), 850);
  };

  const recover = () => {
    setState("recovering");
    window.setTimeout(() => setState("recovered"), 900);
  };

  return (
    <div className="int-sim">
      <div className="int-sim-controls">
        <div className="int-sim-title">
          <span>SAFE BROWSER SIMULATION</span>
          <h3>DOWNSTREAM CONSUMER OUTAGE</h3>
          <p>
            Mirrors the validated platform incident: producer stays healthy,
            Service Bus absorbs the outage, monitoring fires, and the queue
            drains after the consumer is repaired.
          </p>
        </div>

        <div className="int-sim-buttons">
          <button
            type="button"
            onClick={startSimulation}
            disabled={state !== "idle" && state !== "recovered"}
          >
            START INCIDENT
          </button>

          <button
            type="button"
            onClick={recover}
            disabled={state !== "alert"}
          >
            RECOVER CONSUMER
          </button>

          <button type="button" onClick={() => setState("idle")}>
            RESET
          </button>
        </div>

        <div className="int-sim-metrics">
          <div>
            <span>APIM</span>
            <strong>{state === "idle" ? "READY" : "202 ACCEPTED"}</strong>
          </div>
          <div>
            <span>ACTIVE MESSAGES</span>
            <strong>{activeMessages}</strong>
          </div>
          <div>
            <span>DEAD-LETTER</span>
            <strong>0</strong>
          </div>
          <div>
            <span>ALERT</span>
            <strong>{state === "alert" ? "FIRED" : state === "recovered" ? "RESOLVED" : "CLEAR"}</strong>
          </div>
          <div>
            <span>CONSUMER</span>
            <strong>
              {state === "idle"
                ? "ENABLED"
                : state === "recovered"
                  ? "HEALTHY"
                  : state === "recovering"
                    ? "RECOVERING"
                    : "UNAVAILABLE"}
            </strong>
          </div>
        </div>
      </div>

      <div className="int-sim-flow">
        {steps.map((step, index) => {
          const active = index < visibleStep;

          return (
            <div
              className={`int-sim-step ${active ? "int-sim-step-active" : ""}`}
              key={step}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{active ? "SIGNAL CONFIRMED" : "WAITING"}</small>
                <strong>{step}</strong>
              </div>
              <i />
            </div>
          );
        })}
      </div>
    </div>
  );
}
