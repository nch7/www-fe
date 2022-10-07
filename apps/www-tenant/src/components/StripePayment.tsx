import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  WWWButton as Button,
  useToast,
} from "ui";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { API_URL } from "../constants";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  propertyId: string;
};

export default function StripePaymentModal({
  isOpen,
  onClose,
  amount,
  propertyId,
}: ModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);

      const result = await axios
        .post(`${API_URL}/stripe/rent-intent`, {
          amount: amount * 100,
          description: "Rent Collection",
          publicAddress: "none",
          propertyId,
        })
        .then((res) => Promise.resolve(res.data.result))
        .catch((err) => Promise.reject(err.response.data));

      await stripe.confirmCardPayment(result?.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      toast({
        title: "Success",
        description: "Payment Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      queryClient.invalidateQueries(["due"]);
      setLoading(false);
      onClose();
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pay Rent</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex fontSize="sm" justify="space-between" mb={1}>
            <Text>Amount Due</Text>
            <Text fontWeight={700}>${amount}</Text>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Box
              as={CardElement}
              id="card-element"
              px={2}
              py={3}
              border="1.5px solid var(--chakra-colors-primary-500)"
            />
            <Button
              w="full"
              colorScheme="primary"
              my={6}
              type="submit"
              className="btn btn-primary btn-block mt-4"
              isLoading={loading}
              isDisabled={!stripe || loading}
              loadingText="Processing..."
            >
              Pay with Card
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
