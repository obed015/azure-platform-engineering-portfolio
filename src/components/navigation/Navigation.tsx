"use client";

import { useEffect, useState } from "react";

const navigationItems = [
  { label: "ABOUT", href: "#about", id: "about" },
  { label: "PROJECTS", href: "#projects", id: "projects" },
  { label: "LAB", href: "#lab", id: "lab" },
  { label: "EXPERIENCE", href: "#experience", id: "experience" },
  { label: "CONTACT", href: "#contact", id: "contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(
    null
  );

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter(
        (section): section is HTMLElement =>
          Boolean(section)
      );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.5],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  function handleBrandClick() {
    setActiveSection(null);
  }

  function handleNavigationClick(sectionId: string) {
    setActiveSection(sectionId);
  }

  return (
    <header
      className={
        scrolled
          ? "site-navigation site-navigation-scrolled"
          : "site-navigation"
      }
    >
      <div className="site-navigation-inner">
        <a
          href="#top"
          className="site-brand"
          aria-label="Obed Owusu Cloud Platform home"
          onClick={handleBrandClick}
        >
          <span className="site-brand-mark">OO</span>

          <span className="site-brand-divider">/</span>

          <span>PLATFORM</span>
        </a>

        <nav aria-label="Primary navigation">
          <ul className="navigation-list">
            {navigationItems.map((item, index) => {
              const active = activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() =>
                      handleNavigationClick(item.id)
                    }
                    className={
                      active
                        ? "navigation-link navigation-link-active"
                        : "navigation-link"
                    }
                    aria-current={
                      active ? "page" : undefined
                    }
                  >
                    <span className="navigation-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="navigation-label">
                      {item.label}
                    </span>

                    <span
                      className="navigation-active-dot"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="navigation-system-status"
          aria-label="Portfolio platform operational"
        >
          <span className="navigation-status-dot" />

          <span>ONLINE</span>
        </div>
      </div>
    </header>
  );
}