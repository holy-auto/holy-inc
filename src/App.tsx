import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Navbar from "./components/feature/Navbar";
import Footer from "./components/feature/Footer";
import { useLanguageSync } from "./hooks/useLanguageSync";

// Lazy load non-critical components to reduce initial bundle
const PwaUpdater = lazy(() => import("@/components/base/PwaUpdater"));
const OfflineIndicator = lazy(() => import("@/components/base/OfflineIndicator"));

function AnimatedRoutes() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return <AppRoutes />;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <LanguageSync />
        <Navbar />
        <div className="flex-1">
          <AnimatedRoutes />
        </div>
        <Footer />
        <Suspense fallback={null}>
          <OfflineIndicator />
          <PwaUpdater />
        </Suspense>
      </BrowserRouter>
    </I18nextProvider>
  );
}

function LanguageSync() {
  useLanguageSync();
  return null;
}

export default App;