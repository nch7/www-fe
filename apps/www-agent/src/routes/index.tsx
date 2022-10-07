import { Suspense } from "react";
import { Routes, Route } from "@www/router";
import { useAtomValue } from "jotai";

import routes from "./config";
import { authAtom } from "../atoms/auth.atom";
import PermissionDenied from "../pages/PermissionDenied";

export default function Router() {
  const authState = useAtomValue(authAtom);

  return (
    <Routes>
      {routes.map(({ href, Element, needsAuth }) => (
        <Route
          key={href}
          path={href}
          element={
            needsAuth && !authState ? (
              <PermissionDenied />
            ) : (
              <Suspense fallback={<></>}>
                <Element />
              </Suspense>
            )
          }
        />
      ))}
    </Routes>
  );
}

export { routes };
