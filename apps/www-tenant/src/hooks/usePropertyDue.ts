import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "ui";

import { API_URL } from "../constants";
import { APIErrorType } from "../types";

const getDue = (id: string) =>
  axios
    .get(`${API_URL}/rent/due`, {
      params: { id }
    })
    .then((res) => Promise.resolve(res.data.result))
    .catch((err) => Promise.reject(err.response.data));

export default function usePropertyDue(id?: string) {
  const toast = useToast();

  return useQuery<number, APIErrorType>(
    ["due", id],
    () => getDue(id!),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );
}
