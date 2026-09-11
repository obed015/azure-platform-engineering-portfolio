"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "top", label: "HOME", href: "#top" },
  { id: "about", label: "ABOUT", href: "#about" },
  { id: "skills", label: "SKILLS", href: "#skills" },
  {
    id: "certifications",
    label: "CERTIFICATIONS",
    href: "#certifications",
  },
  { id: "projects", label: "PROJECTS", href: "#projects" },
  {
    id: "experience",
    label: "EXPERIENCE",
    href: "#experience",
  },
  { id: "contact", label: "CONTACT", href: "#contact" },
];

export function BottomNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(
        (section): section is HTMLElement =>
          Boolean(section)
      );

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (current) {
          setActive(current.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0, 0.12, 0.3, 0.5],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="hud-bottom-nav"
      aria-label="Primary navigation"
    >
      {items.map((item) => {
        const isActive = active === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            className={
              isActive
                ? "hud-bottom-link hud-bottom-link-active"
                : "hud-bottom-link"
            }
            aria-current={
              isActive ? "page" : undefined
            }
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
