import type { ReactNode } from "react";

interface HudFrameProps {
  children: ReactNode;
}

export function HudFrame({ children }: HudFrameProps) {
  return (
    <div className="hud-frame">
      <div className="hud-corner hud-corner-top-left" />
      <div className="hud-corner hud-corner-top-right" />
      <div className="hud-corner hud-corner-bottom-left" />
      <div className="hud-corner hud-corner-bottom-right" />

      {children}
    </div>
  );
}