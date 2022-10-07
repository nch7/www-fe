import Home from "../pages/Home";
import About from "../pages/About";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import Dashboard from "../pages/dashboard";
import RentAndTokens from "../pages/dashboard/tokens";

const routes = [
  { title: "Home", href: "/", Element: Home },
  {
    title: "Dashboard",
    href: "/dashboard",
    Element: Dashboard,
    needsAuth: true,
  },
  {
    title: "Tokens/Claims",
    href: "/tokens",
    Element: RentAndTokens,
    needsAuth: true,
  },
  { title: "About Us", href: "/about", Element: About },
  { title: "FAQ", href: "/faq", Element: FAQ },
  { title: "Contact", href: "/contact", Element: Contact },
];

export default routes;
