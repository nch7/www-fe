import { Suspense } from "react";
import { Routes, Route } from "@www/router";
import { useAtomValue } from "jotai";

import { propertyAtom } from "../atoms/propertyID.atom";
import PermissionDenied from "../pages/PermissionDenied";
import routes from "./config";

export default function Router() {
  const property = useAtomValue(propertyAtom);

  return (
    <Routes>
      {routes.map(({ href, Element, needsAuth }) => (
        <Route
          key={href}
          path={href}
          element={
            needsAuth && !property ? (
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
