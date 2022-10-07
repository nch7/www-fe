import { useMemo } from "react";
import { useLocation } from "@www/router";
import { Box, NavBar, type NavLink, Footer } from "ui";
import { FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";
import { useAccount } from "wagmi";

import Router, { routes } from "./routes";

function App() {
  const location = useLocation();
  const { address } = useAccount();
  const NavLinks = useMemo<NavLink[]>(
    () =>
      routes
        .filter((route) => (route.needsAuth ? !!address : true))
        .map((navLink) => ({
          ...navLink,
          isActive: location.pathname === navLink.href,
        })),
    [location, address]
  );

  return (
    <Box>
      <NavBar logo="/companyLogo.png" navLinks={NavLinks} />
      <Box pb={6}>
        <Router />
      </Box>
      <Footer
        baseUrl={window.location.origin}
        logo="/companyLogo.png"
        socialLinks={[
          { Icon: <FiFacebook size={14} />, href: "https://facebook.com" },
          { Icon: <FiTwitter size={14} />, href: "https://twitter.com" },
          { Icon: <FiYoutube size={14} />, href: "https://youtube.com" },
        ]}
      />
    </Box>
  );
}

export default App;
