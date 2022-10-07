import {
  ChakraProvider as Provider,
  ChakraProviderProps,
} from "@chakra-ui/react";
import { theme } from "./theme";

export const WWWThemeProvider = (props: ChakraProviderProps) => {
  return <Provider theme={theme} {...props} />;
};
