import {
  Heading as ChakraHeading,
  type HeadingProps,
  Box,
} from "@chakra-ui/react";

type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const sizeMap: {
  [key in HeadingType]: HeadingProps["size"];
} = {
  h1: "3xl",
  h2: "2xl",
  h3: "xl",
  h4: "lg",
  h5: "md",
  h6: "sm",
};

type CustomHeadingProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  hasUnderline?: boolean;
} & Omit<HeadingProps, "as">;

export const WWWHeading = ({
  as,
  hasUnderline,
  ...props
}: CustomHeadingProps) =>
  hasUnderline ? (
    <Box
      w="max-content"
      py={2}
      position="relative"
      _after={{
        content: `""`,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "2px",
        bgColor: "primary.500",
      }}
    >
      <ChakraHeading
        textTransform="uppercase"
        fontWeight={700}
        fontSize={sizeMap[as]}
        color="primary.700"
        {...props}
      />
    </Box>
  ) : (
    <ChakraHeading
      textTransform="uppercase"
      fontWeight={700}
      fontSize={sizeMap[as]}
      color="primary.700"
      {...props}
    />
  );
