import React, { useState } from "react";
import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  ModalBody,
  ModalCloseButton,
  WWWButton as Button,
  WWWInput as Input,
  useToast,
  WWWSelect,
} from "ui";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import isNaN from "lodash/isNaN";
import axios from "axios";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import {
  API_URL,
  STRIPE_PK,
  ORACLE_ADDRESS,
  TOKEN_ADDRESS,
  SUPPORTED_TOKENS,
} from "../../constants";

import OracleABI from "../../abis/oracle.json";
import TokenABI from "../../abis/token.json";
import { AbiCoder } from "ethers/lib/utils";
import { BigNumber } from "ethers";

const stripePromise = loadStripe(STRIPE_PK);

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CheckoutProps = {
  amount: number;
  onClose: () => void;
  setTrxID: (trxID: string) => void;
};

// const CheckoutForm = ({ amount, onClose, setTrxID }: CheckoutProps) => {
//   const toast = useToast();
//   const [loading, setLoading] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();
//   const { address } = useAccount();

//   const handleSubmit = async (event: React.SyntheticEvent) => {
//     event.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await axios
//         .post(`${API_URL}/stripe/intent`, {
//           amount: amount * 100,
//           description: "Buy LANDC",
//           publicAddress: address,
//         })
//         .then((res) => Promise.resolve(res.data.result))
//         .catch((err) => Promise.reject(err.response.data));

//       const paymentResult = await stripe.confirmCardPayment(
//         result?.client_secret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement)!,
//           },
//         }
//       );

//       console.log({ result, paymentResult });

//       setTrxID(result.id);

//       toast({
//         title: "Success",
//         description: "Payment Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });

//       setLoading(false);
//       onClose();
//     } catch (error: any) {
//       setLoading(false);
//       toast({
//         title: "Error",
//         description: error?.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Box
//         as={CardElement}
//         id="card-element"
//         px={2}
//         py={3}
//         border="1.5px solid var(--chakra-colors-primary-500)"
//       />
//       <Button
//         w="full"
//         colorScheme="primary"
//         my={6}
//         type="submit"
//         className="btn btn-primary btn-block mt-4"
//         isLoading={loading}
//         isDisabled={!stripe || loading}
//         loadingText="Processing..."
//       >
//         Pay with Card
//       </Button>
//     </form>
//   );
// };

export default function BuyToken({ isOpen, onClose }: ModalProps) {
  const toast = useToast();
  const [amount, setAmount] = useState<number>(100);
  const [step, setStep] = useState<number>(1)
  const [trxID, setTrxID] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<string>("")

  // const { config } = usePrepareContractWrite({
  //   addressOrName: TOKEN_ADDRESS,
  //   contractInterface: TokenABI,
  //   functionName: "buyLANDC",
  //   enabled: !!trxID,
  //   args: [amount, trxID],
  //   overrides: {
  //     gasLimit: 1_000_000,
  //   },
  // });
  // const { writeAsync: buyLANDC } = useContractWrite(config);

  // useContractEvent({
  //   addressOrName: ORACLE_ADDRESS,
  //   contractInterface: OracleABI,
  //   eventName: "AddBuyTx",
  //   listener: (event) => {
  //     console.log({ event, trxID });
  //     buyLANDC?.();
  //   },
  // });

  const Approve = usePrepareContractWrite({
    addressOrName: selectedToken,
    contractInterface: TokenABI,
    functionName: 'approve',
    args: [TOKEN_ADDRESS, BigNumber.from(amount).mul(BigNumber.from(10).pow(18))],
  })
  const Approve_TX = useContractWrite({
    ...Approve.config,
    onError(data) {
      setStep(1)
      toast({
        title: "Error",
        description: "Something went wrong. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
    onSuccess(data) {
      useWaitForTransaction
      setStep(2)
      toast({
        title: "Success",
        description: "You've approved the ERC20 token transaction, click BUY to purchase tokens",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  })

  const buyLANDC = usePrepareContractWrite({
    addressOrName: TOKEN_ADDRESS,
    contractInterface: TokenABI,
    functionName: 'buyLANDCWithOtherToken',
    args: [selectedToken, BigNumber.from(amount).mul(BigNumber.from(10).pow(18))],
  })
  const buyLANDC_TX = useContractWrite({
    ...buyLANDC.config,
    onError(data) {
      setStep(1)
      toast({
        title: "Error",
        description: "Something went wrong. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
    onSuccess(data) {
      setStep(1)
      toast({
        title: "Success",
        description: "You've successfully purchased LANDC tokens",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  })

  console.log({ buyLANDC_TX })


  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent rounded={0}>
        <ModalHeader color="primary.500" fontSize="sm">
          Buy Token
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
                const parsedValue = parseInt(e?.target?.value ?? "0.0", 10);
                return isNaN(parsedValue) ? 0 : parsedValue;
              })
            }
          />

          <Flex
            justify="space-between"
            fontSize="sm"
            mb={3}
            color="primary.500"
          >
            <Text>Equivalent LNDC</Text>
            <Text fontWeight={700}>{amount}</Text>
          </Flex>

          <Elements stripe={stripePromise}>
            <WWWSelect
              options={SUPPORTED_TOKENS}
              w="full"
              colorScheme="primary"
              onChange={(e: any) => setSelectedToken(e.target.value)}
            ></WWWSelect>
            <Button
              hidden={step != 1}
              w="full"
              colorScheme="primary"
              my={6}
              type="submit"
              className="btn btn-primary btn-block mt-4"
              isLoading={loading}
              isDisabled={loading}
              loadingText="Processing..."
              onClick={async () => await Approve_TX.writeAsync!()}
            >
              APPROVE BUY
            </Button>
            <Button
              hidden={step != 2}
              w="full"
              colorScheme="primary"
              my={6}
              type="submit"
              className="btn btn-primary btn-block mt-4"
              isLoading={loading}
              isDisabled={loading}
              loadingText="Processing..."
              onClick={async () => { await buyLANDC_TX.writeAsync!() }}
            >
              BUY
            </Button>
          </Elements>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
