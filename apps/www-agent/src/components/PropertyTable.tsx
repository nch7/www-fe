import {
  WWWTable as Table,
  WWWThead as Thead,
  WWWTbody as Tbody,
  WWWTr as Tr,
  WWWTh as Th,
  WWWTd as Td,
  WWWTableContainer as TableContainer,
  WWWTableCaption as TableCaption,
  WWWSwitch as Switch,
  Center,
  Flex,
  Text,
  IconButton,
  useToast,
} from "ui";
import { FiCheckCircle, FiCopy, FiXCircle } from "react-icons/fi";
import format from "date-fns/format";
import isBefore from "date-fns/esm/fp/isBefore/index.js";

import PropertySectionHeader from "./PropertySectionHeader";
import { propertyTableHeadings } from "./propertyTableHeadings";
import useUpdateTenantStatus from "../hooks/useUpdateTenant";
import useAdminRentPay from "../hooks/useAdminRentPay";
import copyToClipboard from "../utils/copyToClipboard";
import { Property } from "../types";

type Props = {
  properties: Property[] | undefined;
  isFetching: boolean;
};

export default function PropertyTable({ properties, isFetching }: Props) {
  const toast = useToast();
  const { mutateAsync: updateTenantStatus, isLoading: isUpdatingTenant } =
    useUpdateTenantStatus();
  const { mutateAsync: adminRentPay, isLoading: isPayingRent } =
    useAdminRentPay();

  return (
    <>
      <PropertySectionHeader isLoading={isFetching} />

      {/* PROPERTY TABLE */}
      <TableContainer p={1} mt={3} minH="50vh">
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
                    <Center>
                      <Flex align="center">
                        <Text>{`${id.slice(0, 4)}...${id.slice(-4)}`}</Text>
                        <IconButton
                          size="xs"
                          colorScheme="primary"
                          icon={<FiCopy />}
                          rounded="sm"
                          aria-label="Copy Property ID"
                          ml={1}
                          onClick={() =>
                            copyToClipboard(id).then(() =>
                              toast({
                                title: "Copied to clipboard",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                              })
                            )
                          }
                        />
                      </Flex>
                    </Center>
                  </Td>
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
                  <Td color="success.600">
                    <Center>
                      <Switch
                        size="sm"
                        onChange={(e) =>
                          updateTenantStatus({
                            tenantStatus: e.target.checked,
                            id: id,
                          })
                        }
                        isDisabled={isUpdatingTenant}
                        defaultChecked={tenantStatus}
                      />
                    </Center>
                  </Td>
                  <Td>
                    <Center>
                      {rentDueDate?.length > 0 ? (
                        <>
                          {isBefore(new Date(rentDueDate), new Date()) ? (
                            <FiCheckCircle color="var(--chakra-colors-success-500)" />
                          ) : (
                            <Flex align="center">
                              <FiXCircle color="var(--chakra-colors-danger-500)" />
                              <IconButton
                                size="xs"
                                colorScheme="primary"
                                icon={<FiCheckCircle />}
                                rounded="sm"
                                aria-label="Pay Rent"
                                ml={2}
                                onClick={() => adminRentPay({ id })}
                                isLoading={isPayingRent}
                              />
                            </Flex>
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
