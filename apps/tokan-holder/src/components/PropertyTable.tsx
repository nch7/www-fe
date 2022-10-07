import {
  WWWTable as Table,
  WWWThead as Thead,
  WWWTbody as Tbody,
  WWWTr as Tr,
  WWWTh as Th,
  WWWTd as Td,
  WWWTableContainer as TableContainer,
  WWWTableCaption as TableCaption,
  Center,
} from "ui";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import format from "date-fns/format";
import isBefore from "date-fns/esm/fp/isBefore/index.js";

import PropertySectionHeader from "./PropertySectionHeader";
import { propertyTableHeadings } from "./propertyTableHeadings";
import useProperties from "../hooks/useProperties";

export default function PropertyTable() {
  const { data: properties, isFetching } = useProperties();

  return (
    <>
      <PropertySectionHeader isLoading={isFetching} />

      {/* PROPERTY TABLE */}
      <TableContainer p={1} mt={3}>
        <Table>
          <TableCaption>List of all properties</TableCaption>
          <Thead>
            <Tr>
              {propertyTableHeadings.map(({ key, value, isNumeric }) => (
                <Th key={key} isNumeric={isNumeric}>
                  {isNumeric ? value : <Center>{value}</Center>}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody fontSize="sm">
            {properties?.map(
              ({
                id,
                name,
                location,
                boughtFrom,
                createdAt,
                rentCollected,
                tenantStatus,
                rentDueDate,
              }) => (
                <Tr key={id} p={0}>
                  <Td>
                    <Center>{name}</Center>
                  </Td>
                  <Td>
                    <Center>{location}</Center>
                  </Td>
                  <Td>
                    <Center>{boughtFrom}</Center>
                  </Td>
                  <Td>
                    <Center>
                      {format(new Date(createdAt), "MMM dd, yyyy")}
                    </Center>
                  </Td>
                  <Td>
                    <Center>
                      <Center>
                        {tenantStatus ? (
                          <FiCheckCircle
                            size={14}
                            color="var(--chakra-colors-success-600)"
                          />
                        ) : (
                          <FiXCircle
                            size={14}
                            color="var(--chakra-colors-danger-500)"
                          />
                        )}
                      </Center>
                    </Center>
                  </Td>
                  <Td>
                    <Center>
                      {rentDueDate?.length > 0 ? (
                        <>
                          {isBefore(new Date(rentDueDate), new Date()) ? (
                            <FiCheckCircle color="var(--chakra-colors-success-500)" />
                          ) : (
                            <FiXCircle color="var(--chakra-colors-danger-500)" />
                          )}
                        </>
                      ) : (
                        <b>{"-"}</b>
                      )}
                    </Center>
                  </Td>
                  <Td isNumeric>{rentCollected}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
