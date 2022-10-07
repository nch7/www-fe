import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useToast } from "ui";

import { API_URL } from "../constants";
import { APIErrorType } from "../types";
import { authAtom } from "../atoms/auth.atom";

type PayRentParams = {
  id: string;
};

const payRent = ({ id, token }: PayRentParams & { token: string }) =>
  axios
    .post(`${API_URL}/rent/admin-pay`, { id },
      {
        headers: {
          authorization: `${token}`,
        },
      })
    .then((res) => Promise.resolve(res.data.result))
    .catch((err) => Promise.reject(err.response.data));

export default function useAdminRentPay() {
  const toast = useToast();
  const authState = useAtomValue(authAtom);
  const queryClient = useQueryClient();
  return useMutation<any, APIErrorType, PayRentParams>(
    (data) => payRent({ ...data, token: authState?.token! }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["properties"]);
        toast({
          title: "Rent Paid Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (err) => toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      }),
    }
  );
}
