import { WWWButton as Button } from "ui";
import { useSetAtom } from "jotai";

import { propertyAtom } from "../atoms/propertyID.atom";

export default function LogoutButton() {
  const setProperty = useSetAtom(propertyAtom);

  return (
    <Button
      colorScheme="primary"
      onClick={() => {
        setProperty(null);
      }}
    >
      Logout
    </Button>
  );
}
