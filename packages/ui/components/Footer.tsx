import { Flex, Box, Text, Link, type FlexProps, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "@www/router";

import { WWWHeading as Heading } from "./Typography";
import { WWWContainer as Container } from "./Container";

type FooterType = {
  baseUrl: string;
  logo: string;
  socialLinks?: {
    Icon: React.ReactNode;
    href: string;
  }[];
} & FlexProps;

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <Link display="block" as={RouterLink} to={href} fontSize="sm" mt={3}>
    {label}
  </Link>
);

export const Footer = ({
  baseUrl,
  logo,
  socialLinks,
  ...props
}: FooterType) => {
  return (
    <Container
      as="footer"
      bgColor="primary.50"
      w="100vw"
      py={8}
      color="primary.500"
    >
      <Flex w="100%" justify="space-between" {...props} wrap="wrap">
        <Box w={{ base: "100%", lg: "30%" }}>
          <Flex align="center">
            <Image
              src={logo}
              boxSize="3.5rem"
              fit="contain"
              alt="logo"
              mr={2}
            />
            <Heading as="h2">Landing Token</Heading>
          </Flex>
          <Text fontSize="sm">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without.
          </Text>
        </Box>

        <Flex w={{ base: "100%", lg: "40%", xl: "30%" }} wrap="wrap">
          <Box w="50%">
            <Heading as="h4">About</Heading>
            {[
              { label: "Our Team", href: "/team" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "FAQ", href: "/faq" },
            ].map(({ label, href }) => (
              <FooterLink key={href} label={label} href={`${baseUrl}${href}`} />
            ))}
          </Box>

          <Box w="50%">
            <Heading as="h4">Contact</Heading>
            <FooterLink label="+xx xxx xxx xx" href="#" />
            <Flex mt={3}>
              {socialLinks?.map(({ Icon, href }) => (
                <Link
                  as={RouterLink}
                  key={href}
                  to={href}
                  _notFirst={{ ml: 3 }}
                >
                  {Icon}
                </Link>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};
