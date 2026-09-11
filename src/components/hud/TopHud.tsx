"use client";

interface TopHudProps {
  onMenuOpen: () => void;
}

export function TopHud({ onMenuOpen }: TopHudProps) {
  return (
    <div className="hud-top">
      <a
        href="#top"
        className="hud-brand"
        aria-label="Obed Owusu portfolio home"
      >
        <span className="hud-brand-mark">OO</span>
      </a>

      <button
        type="button"
        className="hud-menu-trigger"
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}
