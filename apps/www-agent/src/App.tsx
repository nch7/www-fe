import { useMemo } from "react";
import { useLocation } from "@www/router";
import { Box, NavBar, type NavLink, Footer } from "ui";
import { FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";
import { useAtomValue } from "jotai";

import Router, { routes } from "./routes";
import { authAtom } from "./atoms/auth.atom";
import LogoutButton from "./components/LogoutButton";

function App() {
  const location = useLocation();
  const authState = useAtomValue(authAtom);

  const NavLinks = useMemo<NavLink[]>(
    () =>
      routes
        .filter(
          (navLink) =>
            !navLink.hideFromNavBar && (navLink.needsAuth ? !!authState : true)
        )
        .map((navLink) => ({
          ...navLink,
          isActive: location.pathname === navLink.href,
        })),
    [location, authState]
  );

  return (
    <Box>
      <NavBar
        logo="/companyLogo.png"
        navLinks={NavLinks}
        NavbarEndElements={authState ? <LogoutButton /> : null}
      />
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
