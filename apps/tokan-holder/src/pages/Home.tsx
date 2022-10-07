import { Flex, Box, WWWHeading, Text, Image } from "ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <Flex wrap="wrap" align="center" p={6}>
      <Box w={{ base: "100%", lg: "35%" }} p={6}>
        <WWWHeading as="h1">Landing Token</WWWHeading>
        <Text mt={3} color="primary.500">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </Text>

        <Box mt={6}>
          <ConnectButton chainStatus="icon" showBalance={false} />
        </Box>
      </Box>

      <Box w={{ base: "100%", lg: "65%" }} p={6}>
        <Image src="/bg-art.svg" w="100%" height="auto" />
      </Box>
    </Flex>
  );
}
