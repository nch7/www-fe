import {
  Flex,
  Box,
  SimpleGrid,
  WWWCard as Card,
  WWWHeading as Heading,
  Text,
  useBreakpointValue,
  WWWButton as Button,
  useDisclosure,
  useToast,
} from "ui";
import { FiHome, FiSlash } from "react-icons/fi";
import { useAtomValue } from "jotai";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

import ProtocolABI from "../abis/protocol.json";
import { propertyAtom } from "../atoms/propertyID.atom";
import usePropertyDue from "../hooks/usePropertyDue";
import StripePaymentModal from "./StripePayment";
import { STRIPE_PK, PROTOCOL_ADDRESS } from "../constants";

const stripePromise = loadStripe(STRIPE_PK);

export default function RentSummary() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const property = useAtomValue(propertyAtom);
  const { address } = useAccount();
  const stripeModalStates = useDisclosure();
  const { data, isLoading } = usePropertyDue(property?.id);
  const SEPT_TIMESTAMP = 1661990400;

  const { config } = usePrepareContractWrite({
    addressOrName: PROTOCOL_ADDRESS,
    contractInterface: ProtocolABI,
    functionName: "payRentLandc",
    args: [data ?? 0, SEPT_TIMESTAMP, property?.id],
    overrides: {
      gasLimit: 1_000_000,
    },
  });
  const { write, isLoading: isPayingRent } = useContractWrite({
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries(["due"]);
      toast({
        title: "Success",
        description: "You have successfully claimed your LANDC",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const iconSize = useBreakpointValue({
    base: 24,
    lg: 36,
  });

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      py={{ base: 2, lg: 4 }}
      wrap="wrap"
      minH="60vh"
    >
      <SimpleGrid
        w={{ base: "100%", lg: "60%", xl: "40%" }}
        columns={2}
        spacing={4}
        mb={12}
      >
        {[
          {
            title: "Property ID",
            Icon: FiHome,
            value: `${property?.id.slice(0, 4)}...${property?.id.slice(-4)}`,
          },
          { title: "Total Due", Icon: FiSlash, value: data ?? "-" },
        ].map(({ title, Icon, value }) => (
          <Card
            key={title}
            px={{ base: 2, md: 4, lg: 6 }}
            py={{ base: 2, lg: 4 }}
            h="max-content"
            _notFirst={{
              ml: { base: 0, lg: 4 },
            }}
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
      <Flex
        direction="column"
        align="center"
        w={{ base: "100%", lg: "35%", xl: "25%" }}
        mt={{ base: 3, lg: 0 }}
      >
        <Button
          w="full"
          colorScheme="primary"
          onClick={() => stripeModalStates.onOpen()}
          isDisabled={isLoading || !data}
        >
          Bank Payment
        </Button>
        <Box
          w="full"
          mt={3}
          sx={{
            "& div": { w: "full !important" },
            "& div button": {
              w: "full  !important",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "heading !important",
              fontWeight: "400 !important",
              textTransform: "uppercase",
              bgColor: `secondary.500 !important`,
              color: `secondary.50  !important`,
              borderColor: `secondary.500  !important`,
              borderWidth: "1.5px !important",
              borderStyle: "solid !important",
              _hover: {
                bgColor: `secondary.50  !important`,
                color: `secondary.500  !important`,
                transform: "translateY(2px)",
              },
              _focus: { outlineColor: `secondary.100` },
              _active: {
                outline: "none",
                transform: "scale(97.5%)",
              },
            },
          }}
        >
          {!isLoading && !!data && (
            <ConnectButton
              label="Connect to Pay with LANDC"
              showBalance={false}
              chainStatus="none"
            />
          )}
        </Box>
        {address && (
          <Button
            w="full"
            colorScheme="secondary"
            mt={3}
            onClick={() => write?.()}
            isLoading={isPayingRent}
            isDisabled={isLoading || !data}
          >
            LNDC Payment
          </Button>
        )}
      </Flex>
      <Elements stripe={stripePromise}>
        <StripePaymentModal
          isOpen={stripeModalStates.isOpen}
          onClose={stripeModalStates.onClose}
          amount={data ?? 0}
          propertyId={property?.id!}
        />
      </Elements>
    </Flex>
  );
}
