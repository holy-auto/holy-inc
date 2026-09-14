import { useTranslation } from "react-i18next";
import type { BrandId } from "@/lib/sites";
import { brandDisplayNames, brandPagePaths, officialSites } from "@/lib/sites";

const brandOrder: BrandId[] = ["ledra", "mobilewash", "holyauto"];

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="text-slate-600 shadow-[inset_0_12px_24px_-16px_rgba(163,177,198,0.7)]">
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
                href="https://x.com/detailing_holy"
                target="_blank"
                rel="noopener"
                className="w-10 h-10 flex items-center justify-center rounded-full neu-raised-sm text-slate-500 hover:text-accent-teal transition-colors"
                aria-label="X (Twitter)"
              >
                <i className="ri-twitter-x-line text-lg" aria-hidden="true" />
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

          {/* Brand Links: サイト内の紹介ページ ＋ ブランド公式サイト（相互リンク） */}
          <div>
            <h4 className="text-slate-900 text-sm font-bold mb-4 tracking-wide">{t("footer.brandsTitle")}</h4>
            <ul className="space-y-3">
              {brandOrder.map((id) => (
                <li key={id}>
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <a
                      href={brandPagePaths[id]}
                      className="text-sm text-slate-600 hover:text-accent-teal transition-colors whitespace-nowrap"
                    >
                      {brandDisplayNames[id]}
                    </a>
                    <a
                      href={officialSites[id]}
                      target="_blank"
                      rel="noopener"
                      aria-label={t("footer.officialSiteAria", { brand: brandDisplayNames[id] })}
                      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-accent-teal transition-colors whitespace-nowrap"
                    >
                      {t("ui.officialSite")}
                      <i className="ri-external-link-line" aria-hidden="true" />
                    </a>
                  </span>
                  <span className="block text-slate-500 text-xs mt-0.5">{t(`footer.${id}Desc`)}</span>
                </li>
              ))}
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
              <li className="pt-2 border-t border-[rgba(163,177,198,0.25)]">
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
      <div className="border-t border-[rgba(163,177,198,0.25)]">
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