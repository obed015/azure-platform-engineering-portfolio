import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import { HiOutlineMail } from "react-icons/hi";

const socialItems = [
  {
    label: "GitHub",
    href: "https://github.com/obed015",
    icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/obed-owusu15/",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:owusuobed15@yahoo.com",
    icon: HiOutlineMail,
    external: false,
  },
];

export function LeftRail() {
  return (
    <aside
      className="hud-left-rail"
      aria-label="Social links"
    >
      <div className="hud-rail-line" />

      <div className="hud-social-icons">
        {socialItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              target={item.external ? "_blank" : undefined}
              rel={
                item.external
                  ? "noreferrer noopener"
                  : undefined
              }
            >
              <Icon aria-hidden="true" />
            </a>
          );
        })}
      </div>

      <div className="hud-rail-line" />
    </aside>
  );
}
