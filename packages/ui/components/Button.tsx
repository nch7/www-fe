import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

export const WWWButton = ({
  colorScheme,
  ...props
}: Omit<ButtonProps, "variant">) => (
  <ChakraButton
    rounded="sm"
    bgColor={`${colorScheme}.500`}
    color={`${colorScheme}.50`}
    textTransform="uppercase"
    borderColor={`${colorScheme}.500`}
    borderWidth="1.5px"
    borderStyle="solid"
    _hover={{
      bgColor: `${colorScheme}.50`,
      color: `${colorScheme}.500`,
      transform: "translateY(2px)",
    }}
    _focus={{ outlineColor: `${colorScheme}.100` }}
    _active={{
      outline: "none",
      transform: "scale(97.5%)",
    }}
    {...props}
  />
);
