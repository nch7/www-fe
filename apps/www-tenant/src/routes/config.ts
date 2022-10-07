import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const FAQ = lazy(() => import("../pages/FAQ"));
const Contact = lazy(() => import("../pages/Contact"));
const Dashboard = lazy(() => import("../pages/dashboard"));

const routes = [
  { title: "Home", href: "/", Element: Home },
  { title: "Dashboard", href: "/dashboard", Element: Dashboard, needsAuth: true },
  { title: "About Us", href: "/about", Element: About },
  { title: "FAQ", href: "/faq", Element: FAQ },
  { title: "Contact", href: "/contact", Element: Contact },
];

export default routes;
