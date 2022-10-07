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
import isBefore from "date-fns/isBefore";

import { Property } from "../types";
import { useMemo } from "react";

type Props = {
  properties: Property[] | undefined;
  isFetching: boolean;
};

export default function PropertySummary({ properties, isFetching }: Props) {
  const iconSize = useBreakpointValue({
    base: 24,
    lg: 36,
  });

  const summary = useMemo(
    () => [
      {
        title: "Tenant Onboarded",
        Icon: FiUserCheck,
        value: isFetching
          ? "-"
          : properties?.reduce((acc, p) => acc + (p.tenantStatus ? 1 : 0), 0),
      },
      {
        title: "No Tenant",
        Icon: FiUserX,
        value: isFetching
          ? "-"
          : properties?.reduce((acc, p) => acc + (!p.tenantStatus ? 1 : 0), 0),
      },
      {
        title: "Rent Up-to-date",
        Icon: FiCheckCircle,
        value: isFetching
          ? "-"
          : properties?.reduce((acc, p) => {
              if (!p.tenantStatus) return acc;
              if (!isBefore(new Date(p.rentDueDate), new Date()))
                return acc + 1;
              return acc;
            }, 0),
      },
      {
        title: "Rent Overdue",
        Icon: FiAlertTriangle,
        value: isFetching
          ? "-"
          : properties?.reduce((acc, p) => {
              if (!p.tenantStatus) return acc;
              if (isBefore(new Date(p.rentDueDate), new Date())) return acc + 1;
              return acc;
            }, 0),
      },
    ],
    [properties, isFetching]
  );

  return (
    <SimpleGrid
      columns={{ base: 2, lg: 4 }}
      spacing={{ base: 3, lg: 12, xl: 24 }}
      py={{ base: 3, lg: 6 }}
    >
      {summary.map(({ title, Icon, value }) => (
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
