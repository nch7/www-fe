import { useMemo } from "react";
import { useContractReads } from "wagmi";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import format from "date-fns/format";

import { PROTOCOL_ADDRESS } from "../constants";
import ProtocolABI from "../abis/protocol.json";

export default function useClaims() {
  const START_TIME = 1661990400000; // September 1st, 2022
  const END_TIME = Date.now();
  const MONTHS = eachMonthOfInterval({
    start: START_TIME,
    end: END_TIME,
  }).map((date) => new Date(date).getTime() / 1000);

  const { data } = useContractReads({
    contracts: MONTHS.map((MONTH) => ({
      addressOrName: PROTOCOL_ADDRESS,
      contractInterface: ProtocolABI,
      functionName: "getClaimable",
      args: [MONTH],
    })),
  });

  const claims = useMemo(
    () =>
      MONTHS.map((month, i) => ({
        month: format(month * 1000, "MMM"),
        value: !!data ? data[i] ?? 0 : 0,
        claimFunctionArg: month,
      })),
    [data, MONTHS]
  );

  return { claims };
}
