import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preloadAllRoutes, preloadRoute } from "../router/loaders";

/**
 * Turn every same-origin page link into an in-app navigation that waits for
 * the target route's chunk first.
 *
 * Many internal links are plain `<a href="/contact">`, which reload the whole
 * document: the browser blanks the page and the pre-React placeholder shows
 * again for a moment. Router `<Link>`s avoid the reload but can still flash
 * the Suspense fallback while a lazy chunk downloads. Handling both here, in
 * the capture phase (before React's own Link handler), removes both flickers.
 */
export function useSmoothNavigation(): void {
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor || !anchor.href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download") || anchor.getAttribute("rel")?.includes("external")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Static files (feed.xml, /og/*.png, llms.txt …) are not app routes.
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return;
      // Same page, only the hash differs: let the browser scroll natively.
      if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;

      e.preventDefault();
      const to = url.pathname + url.search + url.hash;
      if (to === window.location.pathname + window.location.search + window.location.hash) return;
      void preloadRoute(url.pathname).then(() => navigate(to));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  useEffect(() => {
    const warm = () => preloadAllRoutes();
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 1500);
    return () => clearTimeout(id);
  }, []);
}
