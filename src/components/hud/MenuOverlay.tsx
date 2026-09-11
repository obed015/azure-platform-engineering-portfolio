"use client";

import { useEffect } from "react";
import { HiX } from "react-icons/hi";

const menuItems = [
  { number: "01", label: "HOME", href: "#top" },
  { number: "02", label: "ABOUT", href: "#about" },
  { number: "03", label: "SKILLS", href: "#skills" },
  { number: "04", label: "PROJECTS", href: "#projects" },
  {
    number: "05",
    label: "EXPERIENCE",
    href: "#experience",
  },
];

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function MenuOverlay({
  open,
  onClose,
}: MenuOverlayProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="cyber-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio navigation"
    >
      <div className="cyber-menu-frame">
        <div className="cyber-menu-brand">
          <span className="cyber-menu-brand-mark">
            OO
          </span>

          <span className="cyber-menu-brand-slash">
            /
          </span>

          <span>PLATFORM</span>
        </div>

        <button
          type="button"
          className="cyber-menu-close"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <HiX aria-hidden="true" />
        </button>

        <nav
          className="cyber-menu-navigation"
          aria-label="Overlay navigation"
        >
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={
                index === 0
                  ? "cyber-menu-link cyber-menu-link-active"
                  : "cyber-menu-link"
              }
              onClick={onClose}
            >
              <span className="cyber-menu-index">
                {item.number}
              </span>

              <span className="cyber-menu-label">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="cyber-menu-visual">
          <div className="cyber-visual-grid" />

          <div className="cyber-orbit cyber-orbit-one" />
          <div className="cyber-orbit cyber-orbit-two" />
          <div className="cyber-orbit cyber-orbit-three" />

          <div className="cyber-cloud-object">
            <div className="cyber-cloud-core">
              <span>AZURE</span>
            </div>

            <div className="cyber-cloud-node cyber-node-1">
              ID
            </div>

            <div className="cyber-cloud-node cyber-node-2">
              API
            </div>

            <div className="cyber-cloud-node cyber-node-3">
              SEC
            </div>

            <div className="cyber-cloud-node cyber-node-4">
              IaC
            </div>

            <svg
              className="cyber-cloud-lines"
              viewBox="0 0 500 500"
              aria-hidden="true"
            >
              <line x1="250" y1="250" x2="125" y2="115" />
              <line x1="250" y1="250" x2="380" y2="130" />
              <line x1="250" y1="250" x2="390" y2="360" />
              <line x1="250" y1="250" x2="110" y2="365" />
            </svg>
          </div>

          <span className="cyber-visual-label">
            AZURE_PLATFORM_TOPOLOGY
          </span>

          <span className="cyber-visual-status">
            SYSTEM // ONLINE
          </span>
        </div>

        <span className="cyber-menu-corner cyber-menu-corner-tl" />
        <span className="cyber-menu-corner cyber-menu-corner-tr" />
        <span className="cyber-menu-corner cyber-menu-corner-bl" />
        <span className="cyber-menu-corner cyber-menu-corner-br" />

        <span className="cyber-menu-arrow cyber-menu-arrow-left" />
        <span className="cyber-menu-arrow cyber-menu-arrow-right" />
      </div>
    </div>
  );
}
