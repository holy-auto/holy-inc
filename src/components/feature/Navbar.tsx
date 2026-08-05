import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langClosing, setLangClosing] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(y / total, 1) : 0;
      if (progressRef.current) {
        progressRef.current.style.width = `${p * 100}%`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile body lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close language on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".lang-dropdown")) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [langOpen]);

  const getProgressColor = () => {
    const p = location.pathname;
    if (p === "/mobilewash") return "from-emerald-600 to-emerald-400";
    if (p === "/holyauto") return "from-slate-500 to-slate-300";
    return "from-teal-700 to-teal-400";
  };

  const navItems = useMemo(
    () => [
      { label: t("nav.mvv"), href: "/#mvv" },
      { label: t("nav.brands"), href: "/#brands" },
      { label: t("nav.about"), href: "/about" },
      { label: t("nav.careers"), href: "/careers" },
      { label: t("nav.contact"), href: "/contact" },
    ],
    [t]
  );

  const brandLinks = [
    { label: t("brandNav.ledra"), href: "/ledra", color: "hover:text-teal-600" },
    { label: t("brandNav.mobilewash"), href: "/mobilewash", color: "hover:text-emerald-600" },
    { label: t("brandNav.holyauto"), href: "/holyauto", color: "hover:text-slate-600" },
  ];

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  const toggleLang = useCallback(() => {
    if (langOpen) {
      setLangClosing(true);
      setTimeout(() => {
        setLangOpen(false);
        setLangClosing(false);
      }, 200);
    } else {
      setLangOpen(true);
    }
  }, [langOpen]);

  const changeLang = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
      setLangOpen(false);
      closeMenu();
    },
    [i18n, closeMenu]
  );

  const currentLang = i18n.language.startsWith("ja") ? "ja" : "en";

  // Active link detection
  const isActiveLink = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        return location.pathname === "/";
      }
      return location.pathname === href;
    },
    [location.pathname]
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      closeMenu();
      const hashMatch = href.match(/^\/#(.+)$/);
      if (hashMatch && location.pathname === "/") {
        e.preventDefault();
        const target = document.querySelector(`#${hashMatch[1]}`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [location.pathname, closeMenu]
  );

  const isBrandPage = ["/holyauto", "/mobilewash", "/ledra"].includes(location.pathname);

  // Soft UI: the bar is always the matte material; text is always ink.
  const scrolledOrMobile = true;
  void isBrandPage;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out backdrop-blur-md ${
          scrolled ? "shadow-[0_7px_20px_rgba(163,177,198,0.45)]" : "shadow-[0_5px_16px_rgba(163,177,198,0.32)]"
        }`}
        style={{ background: "var(--neu-bg)" }}
      >
        {/* Scroll Progress Indicator */}
        <div
          ref={progressRef}
          className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r ${getProgressColor()} transition-[width] duration-100 ease-linear z-[60] ${scrolled ? "opacity-100" : "opacity-70"}`}
          style={{ width: "0%" }}
          aria-hidden="true"
        />

        <div className="w-full px-6 md:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={closeMenu}
            className="flex items-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <span
              className={`text-xl md:text-2xl font-bold tracking-[0.2em] transition-colors duration-300 ${
                scrolledOrMobile ? "text-slate-900" : "text-white"
              }`}
            >
              HOLY
            </span>
          </a>

          {/* Desktop Nav + Language */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-sm tracking-wide whitespace-nowrap transition-colors duration-200 group ${
                    scrolledOrMobile
                      ? active
                        ? "text-accent-teal font-medium"
                        : "text-slate-700 hover:text-accent-teal"
                      : active
                        ? "text-white font-medium"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                  {/* Hover underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 ease-out ${
                      scrolledOrMobile ? "bg-accent-teal" : "bg-white"
                    } ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </a>
              );
            })}

            {/* Language Switcher */}
            <div className="relative lang-dropdown">
              <button
                onClick={toggleLang}
                className={`flex items-center gap-1 text-xs font-medium tracking-wider transition-colors whitespace-nowrap ${
                  scrolledOrMobile
                    ? "text-slate-500 hover:text-slate-900"
                    : "text-white/60 hover:text-white"
                }`}
                aria-label={t("lang.switch")}
              >
                <i className="ri-global-line w-4 h-4 flex items-center justify-center" />
                <span>{currentLang === "ja" ? "JP" : "EN"}</span>
                <i
                  className={`ri-arrow-down-s-line text-xs transition-transform duration-300 ${
                    langOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {langOpen && (
                <div
                  className={`absolute right-0 mt-2 bg-white/98 backdrop-blur-md rounded-lg shadow-lg border border-slate-100 py-1.5 min-w-[120px] z-50 ${
                    langClosing ? "opacity-0 translate-y-[-4px]" : "opacity-100 translate-y-0"
                  } transition-all duration-200 ease-out`}
                >
                  <button
                    onClick={() => changeLang("ja")}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      currentLang === "ja"
                        ? "text-accent-teal font-medium"
                        : "text-slate-600"
                    }`}
                  >
                    {t("lang.ja")}
                  </button>
                  <button
                    onClick={() => changeLang("en")}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      currentLang === "en"
                        ? "text-accent-teal font-medium"
                        : "text-slate-600"
                    }`}
                  >
                    {t("lang.en")}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 ${
              scrolledOrMobile
                ? "text-slate-700 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={mobileOpen ? t("mobile.closeMenu") : t("mobile.openMenu")}
          >
            {mobileOpen ? (
              <i className="ri-close-line text-2xl" />
            ) : (
              <i className="ri-menu-line text-xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-white/70 backdrop-blur-md transition-opacity duration-300"
          onClick={closeMenu}
        />

        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full shadow-[-12px_0_30px_rgba(163,177,198,0.4)] transform transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "var(--neu-bg)" }}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-8">
            {/* Language Switcher - Mobile */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <button
                onClick={() => changeLang("ja")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentLang === "ja"
                    ? "bg-accent-teal text-slate-900"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t("lang.ja")}
              </button>
              <button
                onClick={() => changeLang("en")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentLang === "en"
                    ? "bg-accent-teal text-slate-900"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t("lang.en")}
              </button>
            </div>

            {/* Main Nav */}
            <div className="flex-1 overflow-y-auto">
              <p className="text-slate-400 text-xs tracking-[0.2em] uppercase mb-4">
                {t("mobile.menuLabel")}
              </p>
              <ul className="space-y-1 mb-8">
                {navItems.map((item) => {
                  const active = isActiveLink(item.href);
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`block py-3 text-base font-medium transition-colors border-b border-slate-100 ${
                          active
                            ? "text-accent-teal"
                            : "text-slate-700 hover:text-accent-teal"
                        }`}
                      >
                        {item.label}
                        {active && (
                          <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-accent-teal align-middle" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Brand Submenu */}
              <p className="text-slate-400 text-xs tracking-[0.2em] uppercase mb-4">
                {t("mobile.brandsLabel")}
              </p>
              <ul className="space-y-1 mb-8">
                {brandLinks.map((item) => {
                  const active = location.pathname === item.href;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className={`block py-3 text-sm transition-colors border-b border-slate-100 ${
                          active
                            ? "text-accent-teal font-medium"
                            : `text-slate-500 ${item.color}`
                        }`}
                      >
                        {item.label}
                        {active && (
                          <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-accent-teal align-middle" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-slate-100">
              <a
                href="/careers#apply"
                onClick={closeMenu}
                className="block w-full text-center px-6 py-3 bg-accent-teal hover:bg-accent-teal/90 text-slate-900 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
              >
                {t("mobile.careersCta")}
              </a>
              <a
                href="/contact"
                onClick={closeMenu}
                className="block w-full text-center mt-3 px-6 py-3 border border-slate-200 hover:border-accent-teal/50 text-slate-700 hover:text-accent-teal text-sm font-medium rounded-md transition-colors whitespace-nowrap"
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}