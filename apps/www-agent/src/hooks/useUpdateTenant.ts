import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "ui";
import { useAtomValue } from "jotai";

import { APIErrorType } from "../types";
import { API_URL } from "../constants";
import { authAtom } from "../atoms/auth.atom";

const updateTenantStatus = (data: {
  tenantStatus: boolean;
  id: string;
  token: string;
}) =>
  axios
    .patch(`${API_URL}/property/${data.id}`, data, {
      headers: {
        authorization: `${data.token}`,
      },
    })
    .then((res) => Promise.resolve(res.data.result))
    .catch((err) => Promise.reject(err.response.data));

export default function useUpdateTenantStatus() {
  const toast = useToast();
  const authState = useAtomValue(authAtom);
  const queryClient = useQueryClient();

  return useMutation<
    any,
    APIErrorType,
    Omit<Parameters<typeof updateTenantStatus>[0], "token">
  >((data) => updateTenantStatus({ ...data, token: authState?.token! }), {
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
      toast({
        status: "success",
        title: "Tenant updated successfully",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
}
