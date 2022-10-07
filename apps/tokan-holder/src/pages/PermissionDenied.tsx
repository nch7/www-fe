import { Center, WWWButton as Button, WWWHeading as Heading } from "ui";
import { useNavigate } from "@www/router";

export default function PermissionDenied() {
  const navigate = useNavigate();

  return (
    <Center display="flex" flexDirection="column" minH="70vh">
      <Heading as="h2" colorScheme="danger.600">
        Permission Denied
      </Heading>
      <Button colorScheme="primary" onClick={() => navigate("/")} mt={3}>
        Login
      </Button>
    </Center>
  );
}
