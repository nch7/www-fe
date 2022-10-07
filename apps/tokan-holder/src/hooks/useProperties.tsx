import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { API_URL } from "../constants";
import { APIErrorType, Property } from "../types";

const getProperties = () =>
  axios
    .get(`${API_URL}/property`)
    .then((res) => Promise.resolve(res.data.result))
    .catch((err) => Promise.reject(err.response.data));

export default function useProperties() {
  return useQuery<Property[], APIErrorType>(["properties"], getProperties, {
    refetchOnWindowFocus: false,
  });
}
