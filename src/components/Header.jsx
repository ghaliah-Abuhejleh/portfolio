import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const pageLinks = [
  ["Home", "/"],
  ["Projects", "/#projects"],
  ["Experience", "/experience"],
  ["Certificates", "/certificates"],
  ["Contact Me", "/#contact"],
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollY = useRef(0);

  const handleLinkClick = (href) => {
    setIsOpen(false);

    const sectionId = href.split("#")[1];
    if (sectionId) {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show near the top or while scrolling upward.
      setIsVisible(
        currentScrollY < 80 || currentScrollY < lastScrollY.current
      );

      setIsOpen(false);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
  <header
    className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl transition-transform duration-300 ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}
  >
    <nav className="mx-auto max-w-7xl px-6 py-3 lg:px-10">
      <div className="flex items-center justify-between">
        <NavLink
          to="/"
          className="text-lg font-bold tracking-tight text-white"
        >
          Ghaliah Abu Hejleh<span className="text-cyan-300">.</span>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {pageLinks.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => handleLinkClick(href)}
              className="text-sm text-white/65 transition hover:text-cyan-300"
            >
              {label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          title={isOpen ? "Close navigation" : "Open navigation"}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition hover:border-cyan-300/50 hover:text-cyan-300 md:hidden"
        >
          <span className="relative block h-5 w-5" aria-hidden="true">
            {isOpen ? (
              <>
                <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
              </>
            ) : (
              <>
                <span className="absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-current" />
                <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute bottom-0.5 left-0 h-0.5 w-5 rounded-full bg-current" />
              </>
            )}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 grid gap-2 border-t border-white/10 pt-4 md:hidden">
          {pageLinks.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => handleLinkClick(href)}
              className="rounded-xl px-3 py-2 text-sm text-white/75 transition hover:bg-white/5 hover:text-cyan-300"
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  </header>
);
}
