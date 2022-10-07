import { WWWButton as Button } from "ui";
import { useSetAtom } from "jotai";
import { useNavigate } from "@www/router";

import { authAtom } from "../atoms/auth.atom";

export default function LogoutButton() {
  const setAuthState = useSetAtom(authAtom);
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        setAuthState(null);
        navigate("/");
      }}
      colorScheme="primary"
    >
      Logout
    </Button>
  );
}
