import type { ComponentType } from "react";

/**
 * Route chunk loaders, shared by the lazy route elements and the preloader.
 *
 * A lazy route whose chunk is not ready renders its Suspense fallback, and
 * React then holds that fallback for at least ~300ms before revealing the
 * page — which reads as the page flickering. So every chunk is loaded *before*
 * the first render / before navigating, and once loaded, the factory handed to
 * React.lazy returns a thenable that resolves synchronously: React.lazy then
 * renders the page in the same pass instead of suspending.
 */
type PageModule = { default: ComponentType };

function route(load: () => Promise<PageModule>) {
  let mod: PageModule | undefined;
  let pending: Promise<PageModule> | undefined;

  const preload = (): Promise<PageModule> =>
    (pending ??= load().then(
      (m) => (mod = m),
      (err: unknown) => {
        pending = undefined; // allow a retry after a network error
        throw err;
      },
    ));

  const factory = (): Promise<PageModule> =>
    mod
      ? // React.lazy reads the status right after calling `then`; a synchronous
        // resolve means "already loaded" and skips the Suspense fallback.
        ({ then: (resolve: (m: PageModule) => void) => resolve(mod as PageModule) } as unknown as Promise<PageModule>)
      : preload();

  return { preload, factory };
}

export const pages = {
  home: route(() => import("../pages/home/page")),
  about: route(() => import("../pages/about/page")),
  ledra: route(() => import("../pages/ledra/page")),
  mobilewash: route(() => import("../pages/mobilewash/page")),
  holyauto: route(() => import("../pages/holyauto/page")),
  careers: route(() => import("../pages/careers/page")),
  newsIndex: route(() => import("../pages/news/page")),
  newsPost: route(() => import("../pages/news/post")),
  contact: route(() => import("../pages/contact/page")),
  privacy: route(() => import("../pages/privacy/page")),
  terms: route(() => import("../pages/terms/page")),
  notFound: route(() => import("../pages/NotFound")),
};

type PageKey = keyof typeof pages;

const exact: Record<string, PageKey> = {
  "/": "home",
  "/about": "about",
  "/ledra": "ledra",
  "/mobilewash": "mobilewash",
  "/holy-auto": "holyauto",
  "/careers": "careers",
  "/news": "newsIndex",
  "/contact": "contact",
  "/privacy": "privacy",
  "/terms": "terms",
};

function pageFor(pathname: string): PageKey {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (exact[path]) return exact[path];
  if (/^\/news\/[^/]+$/.test(path)) return "newsPost";
  return "notFound";
}

/** Resolve once the chunk for `pathname` is loaded. Never rejects. */
export function preloadRoute(pathname: string): Promise<void> {
  return pages[pageFor(pathname)].preload().then(
    () => undefined,
    () => undefined,
  );
}

/** Warm every route chunk in the background so later navigations are instant. */
export function preloadAllRoutes(): void {
  Object.values(pages).forEach((p) => {
    p.preload().catch(() => undefined);
  });
}
