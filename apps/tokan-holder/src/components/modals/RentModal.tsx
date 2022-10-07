import { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  WWWButton as Button,
  useToast,
  ModalBody,
  Flex,
  Text,
  SimpleGrid,
  Center,
} from "ui";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import ProtocolABI from "../../abis/protocol.json";
import { PROTOCOL_ADDRESS } from "../../constants";
import useClaims from "../../hooks/useClaims";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ClaimButtonProps = {
  claimFunctionArgs: [number];
  onClose: () => void;
  isClaimable: boolean;
};

const ClaimButton = ({
  claimFunctionArgs,
  isClaimable,
  onClose,
}: ClaimButtonProps) => {
  const toast = useToast();
  const { config } = usePrepareContractWrite({
    addressOrName: PROTOCOL_ADDRESS,
    contractInterface: ProtocolABI,
    functionName: "claimLANDC",
    args: claimFunctionArgs,
    overrides: {
      gasLimit: 1_000_000,
    },
  });
  const { write, isLoading } = useContractWrite({
    ...config,
    onSuccess: () => {
      onClose();
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
  return (
    <Button
      w="full"
      colorScheme="secondary"
      onClick={() => write?.()}
      isLoading={isLoading}
      isDisabled={!isClaimable}
      loadingText="Claiming..."
    >
      Claim
    </Button>
  );
};

export default function RentModal({ isOpen, onClose }: ModalProps) {
  const { claims } = useClaims();

  useEffect(() => console.log({ claims }), [claims]);

  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent rounded={0}>
        <ModalHeader color="primary.500" fontSize="sm">
          Claim Rent
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={3}>
          {claims.map(({ month, value, claimFunctionArg }) => (
            <SimpleGrid key={month} columns={3} spacing={2}>
              <Center bgColor="primary.50">
                <Text color="primary.500" fontWeight={600}>
                  {month.toUpperCase()}
                </Text>
              </Center>
              <Center bgColor="primary.50">
                <Text color="primary.500">{value}</Text>
              </Center>
              <Center>
                <ClaimButton
                  isClaimable={value > 0}
                  claimFunctionArgs={[claimFunctionArg]}
                  onClose={onClose}
                />
              </Center>
            </SimpleGrid>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
