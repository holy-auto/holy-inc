import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/home/page"));
const About = lazy(() => import("../pages/about/page"));
const Ledra = lazy(() => import("../pages/ledra/page"));
const MobileWash = lazy(() => import("../pages/mobilewash/page"));
const HolyAuto = lazy(() => import("../pages/holyauto/page"));
const Careers = lazy(() => import("../pages/careers/page"));
const Contact = lazy(() => import("../pages/contact/page"));
const Privacy = lazy(() => import("../pages/privacy/page"));
const Terms = lazy(() => import("../pages/terms/page"));

const fallback = (
  <div className="min-h-[60vh] bg-slate-50 flex flex-col items-center justify-center animate-pulse">
    <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

const routes: RouteObject[] = [
  { path: "/", element: <Suspense fallback={fallback}><Home /></Suspense> },
  { path: "/about", element: <Suspense fallback={fallback}><About /></Suspense> },
  { path: "/ledra", element: <Suspense fallback={fallback}><Ledra /></Suspense> },
  { path: "/mobilewash", element: <Suspense fallback={fallback}><MobileWash /></Suspense> },
  { path: "/holy-auto", element: <Suspense fallback={fallback}><HolyAuto /></Suspense> },
  { path: "/careers", element: <Suspense fallback={fallback}><Careers /></Suspense> },
  { path: "/contact", element: <Suspense fallback={fallback}><Contact /></Suspense> },
  { path: "/privacy", element: <Suspense fallback={fallback}><Privacy /></Suspense> },
  { path: "/terms", element: <Suspense fallback={fallback}><Terms /></Suspense> },
  { path: "*", element: <Suspense fallback={fallback}><NotFound /></Suspense> },
];

export default routes;