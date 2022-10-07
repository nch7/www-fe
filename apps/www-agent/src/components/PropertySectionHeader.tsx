import {
  WWWHeading as Heading,
  WWWButton as Button,
  WWWInput as Input,
  WWWSwitch as Switch,
  WWWFormLabel as FormLabel,
  FormControl,
  Flex,
  Box,
  Link,
  Spinner,
} from "ui";
import { FiPlus } from "react-icons/fi";
import { Link as RouterLink } from "@www/router";

type Props = {
  isLoading: boolean;
};

export default function PropertySectionHeader({ isLoading }: Props) {
  return (
    <Flex justify="space-between" wrap="wrap">
      <Flex
        w={{ base: "100%", lg: "max-content" }}
        justify="space-between"
        align="center"
        mb={{ base: 3, lg: 0 }}
      >
        <Heading as="h6" hasUnderline>
          All Properties
        </Heading>
        <Link as={RouterLink} to="/add">
          <Button colorScheme="secondary" ml={3}>
            <FiPlus />
          </Button>
        </Link>

        {isLoading && <Spinner colorScheme="primary" ml={3} />}
      </Flex>

      <Flex
        direction={{ base: "column-reverse", lg: "row" }}
        w={{ base: "100%", lg: "60%", xl: "40%" }}
        justify="space-between"
        align="center"
        wrap="wrap"
      >
        <Box w={{ base: "100%", lg: "45%" }}>
          <FormControl
            display="flex"
            alignItems="center"
            w="100%"
            justifyContent="space-between"
          >
            <FormLabel htmlFor="overdue" mb="0">
              Has Rent Overdue
            </FormLabel>
            <Switch
              size="sm"
              id="overdue"
              name="overdue"
              defaultChecked={false}
            />
          </FormControl>
          <FormControl
            display="flex"
            alignItems="center"
            w="100%"
            justifyContent="space-between"
          >
            <FormLabel htmlFor="tenant" mb="0">
              Has Tenant
            </FormLabel>
            <Switch
              size="sm"
              id="tenant"
              name="tenant"
              defaultChecked={false}
            />
          </FormControl>
        </Box>

        <Box w={{ base: "100%", lg: "50%" }}>
          <FormControl>
            <Input id="search" placeholder="Enter keyword to seach" />
          </FormControl>
        </Box>
      </Flex>
    </Flex>
  );
}
