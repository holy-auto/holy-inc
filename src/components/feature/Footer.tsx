import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-slate-50 text-slate-600">
      {/* Main Footer */}
      <div className="w-full px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-slate-900 font-bold text-xl tracking-wider">HOLY</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-2 max-w-xs">
              {t("footer.tagline")}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                rel="nofollow noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-accent-teal/10 text-slate-500 hover:text-accent-teal transition-colors"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-lg" />
              </a>
              <a
                href="#"
                rel="nofollow noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-accent-teal/10 text-slate-500 hover:text-accent-teal transition-colors"
                aria-label="X (Twitter)"
              >
                <i className="ri-twitter-x-line text-lg" />
              </a>
              <a
                href="#"
                rel="nofollow noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-accent-teal/10 text-slate-500 hover:text-accent-teal transition-colors"
                aria-label="YouTube"
              >
                <i className="ri-youtube-line text-lg" />
              </a>
              <a
                href="#"
                rel="nofollow noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-accent-teal/10 text-slate-500 hover:text-accent-teal transition-colors"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-line text-lg" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-slate-900 text-sm font-bold mb-4 tracking-wide">{t("footer.companyTitle")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a href="/about#history" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  {t("footer.history")}
                </a>
              </li>
              <li>
                <a href="/about#message" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  {t("footer.message")}
                </a>
              </li>
              <li>
                <a href="/about#access" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  {t("footer.access")}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Brand Links */}
          <div>
            <h4 className="text-slate-900 text-sm font-bold mb-4 tracking-wide">{t("footer.brandsTitle")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/ledra" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  Ledra
                </a>
                <span className="text-slate-500 text-xs ml-2">{t("footer.ledraDesc")}</span>
              </li>
              <li>
                <a href="/mobilewash" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  MobileWash
                </a>
                <span className="text-slate-500 text-xs ml-2">{t("footer.mobilewashDesc")}</span>
              </li>
              <li>
                <a href="/holy-auto" className="text-sm text-slate-600 hover:text-white/90 transition-colors whitespace-nowrap">
                  HOLY AUTO
                </a>
                <span className="text-slate-500 text-xs ml-2">{t("footer.holyautoDesc")}</span>
              </li>
            </ul>
          </div>

          {/* Careers & Contact */}
          <div>
            <h4 className="text-slate-900 text-sm font-bold mb-4 tracking-wide">{t("footer.careersTitle")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/careers" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  {t("nav.careers")}
                </a>
              </li>
              <li>
                <a href="/careers#jobs" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  {t("footer.positions")}
                </a>
              </li>
              <li>
                <a href="/careers#apply" className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap">
                  {t("footer.entry")}
                </a>
              </li>
              <li className="pt-2 border-t border-slate-200">
                <p className="text-slate-400 text-xs mb-1">{t("footer.phoneLabel")}</p>
                <a href="tel:03-4363-3234" className="text-slate-900 text-sm font-medium hover:text-accent-teal transition-colors whitespace-nowrap">
                  03-4363-3234
                </a>
                <p className="text-slate-500 text-xs mt-1">{t("footer.phoneHours")}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="w-full px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="/privacy" className="hover:text-slate-600 transition-colors whitespace-nowrap">
              {t("footer.privacy")}
            </a>
            <a href="/terms" className="hover:text-slate-600 transition-colors whitespace-nowrap">
              {t("footer.terms")}
            </a>
            <a href="/sitemap.xml" rel="nofollow" className="hover:text-slate-600 transition-colors whitespace-nowrap">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}