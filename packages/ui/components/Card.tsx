import { Box, type BoxProps } from "@chakra-ui/react";

export const WWWCard = (props: BoxProps) => (
  <Box
    bgColor="primary.100"
    boxShadow="0 1px 1px var(--chakra-colors-primary-100), 
              0 2px 2px var(--chakra-colors-primary-100), 
              0 4px 4px var(--chakra-colors-primary-50), 
              0 8px 8px var(--chakra-colors-primary-50),
              0 16px 16px var(--chakra-colors-primary-50);"
    px={3}
    py={2}
    rounded="sm"
    {...props}
  />
);
