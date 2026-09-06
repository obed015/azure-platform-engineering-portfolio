const navigationItems = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "LAB", href: "#lab" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation() {
  return (
    <header className="site-navigation">
      <div className="site-navigation-inner">
        <a
          href="#top"
          className="site-brand"
          aria-label="Obed Owusu Cloud Platform home"
        >
          OO / PLATFORM
        </a>

        <nav aria-label="Primary navigation">
          <ul className="navigation-list">
            {navigationItems.map((item, index) => (
              <li key={item.href}>
                <a href={item.href}>
                  <span className="navigation-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}