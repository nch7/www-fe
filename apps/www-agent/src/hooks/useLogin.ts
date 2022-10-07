import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "ui";
import { useSetAtom } from "jotai";
import { useNavigate } from "@www/router";

import { APIErrorType, AuthAtom } from "../types";
import { API_URL } from "../constants";
import { authAtom } from "../atoms/auth.atom";
import { LoginFormData } from "../schema";

const login = (data: LoginFormData) =>
  axios
    .post(`${API_URL}/auth/login`, data)
    .then((res) => Promise.resolve(res.data.result))
    .catch((err) => Promise.reject(err.response.data));

export default function useLogin() {
  const toast = useToast();
  const setAuthAtom = useSetAtom(authAtom);
  const navigate = useNavigate();

  return useMutation<AuthAtom, APIErrorType, LoginFormData>(login, {
    onSuccess: (data) => {
      setAuthAtom(data);
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
  });
}
