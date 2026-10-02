import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { pages } from "./loaders";

const NotFound = lazy(pages.notFound.factory);
const Home = lazy(pages.home.factory);
const About = lazy(pages.about.factory);
const Ledra = lazy(pages.ledra.factory);
const MobileWash = lazy(pages.mobilewash.factory);
const HolyAuto = lazy(pages.holyauto.factory);
const Careers = lazy(pages.careers.factory);
const NewsIndex = lazy(pages.newsIndex.factory);
const NewsPost = lazy(pages.newsPost.factory);
const Contact = lazy(pages.contact.factory);
const Privacy = lazy(pages.privacy.factory);
const Terms = lazy(pages.terms.factory);

// Chunks are preloaded before the first render and before every navigation
// (see main.tsx / useSmoothNavigation), so this is only a last resort. Keep it
// an empty matte block rather than a spinner, so a slow network never flashes.
const fallback = <div className="min-h-[100svh]" aria-busy="true" />;

const routes: RouteObject[] = [
  { path: "/", element: <Suspense fallback={fallback}><Home /></Suspense> },
  { path: "/about", element: <Suspense fallback={fallback}><About /></Suspense> },
  { path: "/ledra", element: <Suspense fallback={fallback}><Ledra /></Suspense> },
  { path: "/mobilewash", element: <Suspense fallback={fallback}><MobileWash /></Suspense> },
  { path: "/holy-auto", element: <Suspense fallback={fallback}><HolyAuto /></Suspense> },
  { path: "/careers", element: <Suspense fallback={fallback}><Careers /></Suspense> },
  { path: "/news", element: <Suspense fallback={fallback}><NewsIndex /></Suspense> },
  { path: "/news/:slug", element: <Suspense fallback={fallback}><NewsPost /></Suspense> },
  { path: "/contact", element: <Suspense fallback={fallback}><Contact /></Suspense> },
  { path: "/privacy", element: <Suspense fallback={fallback}><Privacy /></Suspense> },
  { path: "/terms", element: <Suspense fallback={fallback}><Terms /></Suspense> },
  { path: "*", element: <Suspense fallback={fallback}><NotFound /></Suspense> },
];

export default routes;
