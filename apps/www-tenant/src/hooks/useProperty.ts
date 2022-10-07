import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@www/router";
import { useToast } from "ui";
import { useSetAtom } from "jotai";

import { propertyAtom } from "../atoms/propertyID.atom";
import { API_URL } from "../constants";
import { APIErrorType, Property } from "../types";

const getProperty = (id: string) =>
  axios
    .get(`${API_URL}/property/${id}`)
    .then((res) => Promise.resolve(res.data.result))
    .catch((err) => Promise.reject(err.response.data));

export default function useProperty(id?: string) {
  const navigate = useNavigate();
  const toast = useToast();
  const setProperty = useSetAtom(propertyAtom);

  return useQuery<Property, APIErrorType>(
    ["property", id],
    () => getProperty(id!),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (!!data) {
          setProperty(data);
          navigate(`/dashboard`);
        } else {
          toast({
            title: "Property not found",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      },
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
