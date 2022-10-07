import {
  WWWContainer as Container,
  WWWHeading as Heading,
  WWWTable as Table,
  WWWTbody as Tbody,
  WWWTr as Tr,
  WWWTd as Td,
  WWWTableContainer as TableContainer,
  Flex,
  Box,
  WWWButton,
  Image,
  SimpleGrid,
  useDisclosure,
} from "ui";

import BuyTokenModal from "../../components/modals/BuyToken";
import SellTokenModal from "../../components/modals/SellToken";
import RentModal from "../../components/modals/RentModal";
import { API_URL, PROTOCOL_ADDRESS, TOKEN_ADDRESS, STRIPE_PK, ORACLE_ADDRESS } from "../../constants";

export default function RentAndTokens() {

  const buyModal = useDisclosure();
  const sellModal = useDisclosure();
  const rentModal = useDisclosure();

  return (
    <Container w="100vw">
      <Flex wrap="wrap" align="center" p={6}>
        <Box w={{ base: "100%", lg: "35%" }} p={6}>
          <Heading as="h3" hasUnderline>
            Landing Token
          </Heading>

          <TableContainer mt={6}>
            <Table size="sm">
              <Tbody>
                <Tr>
                  <Td>RENT RECEIVED</Td>
                  <Td isNumeric>2000</Td>
                </Tr>
                <Tr>
                  <Td>TOTAL SUPPLY</Td>
                  <Td isNumeric>500</Td>
                </Tr>
                <Tr>
                  <Td>AVAILABLE TO BUY</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr>
                  <Td>YOUR BALANCE</Td>
                  <Td isNumeric>50</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <SimpleGrid columns={2} spacing={2} mt={3}>
            <WWWButton w="full" colorScheme="primary" onClick={buyModal.onOpen}>
              Buy Token
            </WWWButton>
            <WWWButton
              w="full"
              colorScheme="primary"
              onClick={sellModal.onOpen}
            >
              Sell Token
            </WWWButton>
          </SimpleGrid>

          <WWWButton
            w="full"
            colorScheme="secondary"
            mt={2}
            onClick={rentModal.onOpen}
          >
            Claim Rent
          </WWWButton>
        </Box>

        <Box w={{ base: "100%", lg: "65%" }} p={6}>
          <Image src="/bg-art.svg" w="100%" height="auto" />
        </Box>
      </Flex>

      <BuyTokenModal isOpen={buyModal.isOpen} onClose={buyModal.onClose} />
      <SellTokenModal isOpen={sellModal.isOpen} onClose={sellModal.onClose} />
      <RentModal isOpen={rentModal.isOpen} onClose={rentModal.onClose} />
    </Container>
  );
}
