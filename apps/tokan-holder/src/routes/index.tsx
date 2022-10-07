import { Routes, Route } from "@www/router";
import { useAccount } from "wagmi";

import routes from "./config";
import PermissionDenied from "../pages/PermissionDenied";

export default function Router() {
  const { address } = useAccount();

  return (
    <Routes>
      {routes.map(({ href, Element, needsAuth }) => (
        <Route
          key={href}
          path={href}
          element={needsAuth && !address ? <PermissionDenied /> : <Element />}
        />
      ))}
    </Routes>
  );
}

export { routes };
