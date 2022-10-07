import { useState } from "react";
import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  WWWButton as Button,
  WWWInput as Input,
  useToast,
} from "ui";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import isNaN from "lodash/isNaN";

// @ts-ignore
import TOKEN_ABI from "../../abis/token.json";
import { TOKEN_ADDRESS } from "../../constants";
import { BigNumber } from "ethers";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SellToken({ isOpen, onClose }: ModalProps) {
  const toast = useToast();
  const [amount, setAmount] = useState(0);
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    enabled: !!address && amount > 0,
    addressOrName: TOKEN_ADDRESS,
    contractInterface: TOKEN_ABI,
    functionName: "sellLANDC",
    args: [BigNumber.from(amount).mul(BigNumber.from(10).pow(18))],
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
        description: "You have successfully sold your token",
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
    <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent rounded={0}>
        <ModalHeader color="primary.500" fontSize="sm">
          Sell Token
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="space-between" color="primary.900">
            <Text>Current Balance</Text>
            <Text fontWeight={600}>$500</Text>
          </Flex>

          <Input
            placeholder="USD Amount"
            mt={4}
            value={amount}
            onChange={(e) =>
              setAmount(() => {
                const parsedValue = parseInt(e?.target?.value ?? "0");
                return isNaN(parsedValue) ? 0 : parsedValue;
              })
            }
          />

          <Flex
            justify="space-between"
            fontSize="sm"
            mt={1}
            color="primary.500"
          >
            <Text>Equivalent LNDC</Text>
            <Text fontWeight={800}>100</Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            w="full"
            colorScheme="primary"
            onClick={() => write?.()}
            isDisabled={amount <= 0}
            isLoading={isLoading}
          >
            Sell
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
