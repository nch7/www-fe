import { useState } from "react";
import { Flex, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "@www/router";
import { FiMenu, FiX } from "react-icons/fi";

import { WWWButton as Button } from "./Button";

export type NavLink = {
  title: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
};

export type NavBarProps = {
  logo: string;
  navLinks: NavLink[];
  NavbarEndElements?: React.ReactNode;
};

const NavItem = ({ title, href, isActive, onClick }: NavLink) => (
  <Link
    as={RouterLink}
    to={href}
    color={isActive ? "secondary.500" : "primary.500"}
    minW={{ base: "100%", lg: "auto" }}
    px={6}
    py={4}
    fontSize="lg"
    fontWeight={500}
    _hover={{ bgColor: "primary.50", textDecoration: "none" }}
    transition="all 0.2s"
    onClick={onClick}
  >
    {title}
  </Link>
);

export function NavBar({ logo, navLinks, NavbarEndElements }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      boxShadow="0 1px 1px var(--chakra-colors-primary-50), 
              0 2px 2px var(--chakra-colors-primary-50), 
              0 4px 4px var(--chakra-colors-primary-50);"
      wrap="wrap"
    >
      <Flex
        w={{ base: "100%", lg: "max-content" }}
        justify="space-between"
        align="center"
        mx={{ base: 2, lg: 4 }}
      >
        <Link as={RouterLink} to="/">
          <Image boxSize="3rem" fit="contain" src={logo} alt="Company Logo" />
        </Link>

        <Button
          display={{ base: "flex", lg: "none" }}
          colorScheme="primary"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </Button>
      </Flex>
      <Flex
        display={{
          base: isOpen ? "flex" : "none",
          lg: "flex",
        }}
        direction={{ base: "column", lg: "row" }}
        w={{ base: "100%", lg: "max-content" }}
      >
        <Flex direction={{ base: "column", lg: "row" }}>
          {navLinks.map((navLink) => (
            <NavItem
              key={navLink.href}
              onClick={() => setIsOpen(false)}
              {...navLink}
            />
          ))}
        </Flex>
        {!!NavbarEndElements && (
          <Flex
            justify="center"
            align="center"
            w={{ base: "100%", lg: "max-content" }}
            mr={{ base: 0, lg: 6 }}
            mb={{ base: 4, lg: 0 }}
          >
            {NavbarEndElements}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
