import {
  WWWHeading as Heading,
  WWWTable as Table,
  WWWThead as Thead,
  WWWTbody as Tbody,
  WWWTr as Tr,
  WWWTh as Th,
  WWWTd as Td,
  WWWTableContainer as TableContainer,
  WWWTableCaption as TableCaption,
  WWWSwitch as Switch,
  WWWFormLabel as FormLabel,
  FormControl,
  Center,
  Flex,
  Box,
} from "ui";
import { FiXCircle } from "react-icons/fi";

const TableHeadings: { key: string; value: string; isNumeric?: boolean }[] = [
  { key: "date_bought", value: "Date Bought" },
  { key: "rent", value: "Rent", isNumeric: true },
  { key: "due", value: "Due", isNumeric: true },
  { key: "rent_status", value: "Rent Status" },
];

export default function RentTable() {
  return (
    <>
      {/* TABLE HEADING */}
      <Flex justify="space-between" wrap="wrap">
        <Heading as="h6" hasUnderline>
          Rent Details
        </Heading>

        <Box w={{ base: "50%", lg: "25%", xl: "15%" }}>
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
        </Box>
      </Flex>

      {/* PROPERTY TABLE */}
      <TableContainer p={1} mt={3}>
        <Table>
          <TableCaption>List of rent details</TableCaption>
          <Thead>
            <Tr>
              {TableHeadings.map(({ key, value, isNumeric }) => (
                <Th key={key} isNumeric={isNumeric}>
                  {isNumeric ? value : <Center>{value}</Center>}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody fontSize="sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <Tr key={i} p={0}>
                <Td>
                  <Center>1 Jan, 2022</Center>
                </Td>
                <Td isNumeric>100000</Td>
                <Td isNumeric>100000</Td>
                <Td color="danger.500">
                  <Center>
                    <FiXCircle size={14} />
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
