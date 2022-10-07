import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "ui";
import { useNavigate } from "@www/router";
import { useAtomValue } from "jotai";
import { Web3Storage } from "web3.storage";

import { APIErrorType } from "../types";
import { API_URL, WEB3_STORAGE_SECRET } from "../constants";
import { authAtom } from "../atoms/auth.atom";

import { PropertyFormData } from "../schema";

const createProperty = async (data: PropertyFormData & { token: string }) => {
  let imageCid, legalDocCid;

  try {
    const storage = new Web3Storage({ token: WEB3_STORAGE_SECRET });
    const { image, legalDoc } = data;
    [imageCid, legalDocCid] = await Promise.all([
      storage.put([image]),
      storage.put([legalDoc]),
    ]);
  } catch (error) {
    return Promise.reject(error);
  }

  return axios
    .post(
      `${API_URL}/property/create`,
      {
        ...data,
        price: 0,
        tenantStatus: false,
        image: imageCid,
        legalDoc: legalDocCid,
        rentDueDate: "2021-09-01",
      },
      {
        headers: {
          authorization: `${data.token}`,
        },
      }
    )
    .then((res) => Promise.resolve(res.data.result))
    .catch((err) => Promise.reject(err.response.data));
};

export default function useAddProperty() {
  const toast = useToast();
  const navigate = useNavigate();
  const authState = useAtomValue(authAtom);

  return useMutation<any, APIErrorType, PropertyFormData>(
    (data) => createProperty({ ...data, token: authState?.token! }),
    {
      onSuccess: (data) => {
        navigate("/dashboard");
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
    }
  );
}
