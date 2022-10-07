import {
  Flex,
  Box,
  SimpleGrid,
  WWWCard as Card,
  WWWHeading as Heading,
  Text,
  useBreakpointValue,
} from "ui";
import {
  FiUserCheck,
  FiUserX,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";

export default function PropertySummary() {
  const iconSize = useBreakpointValue({
    base: 24,
    lg: 36,
  });

  return (
    <SimpleGrid
      columns={{ base: 2, lg: 4 }}
      spacing={{ base: 3, lg: 12, xl: 24 }}
      py={{ base: 3, lg: 6 }}
    >
      {[
        { title: "Tenant Onboarded", Icon: FiUserCheck, value: 500 },
        { title: "No Tenant", Icon: FiUserX, value: 100 },
        { title: "Rent Up-to-date", Icon: FiCheckCircle, value: 10000 },
        { title: "Rent Overdue", Icon: FiAlertTriangle, value: 500 },
      ].map(({ title, Icon, value }) => (
        <Card
          key={title}
          px={{ base: 2, md: 4, lg: 6 }}
          py={{ base: 2, lg: 4 }}
        >
          <Flex align="center" color="primary.600">
            <Icon size={iconSize} />
            <Box ml={3}>
              <Heading as="h6" fontSize="xs" color="primary.400">
                {title}
              </Heading>
              <Text fontFamily="mono" fontSize="xl" fontWeight={800}>
                {value}
              </Text>
            </Box>
          </Flex>
        </Card>
      ))}
    </SimpleGrid>
  );
}
