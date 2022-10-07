import { atomWithStorage } from "jotai/utils";

import { Property } from "../types";

export const propertyAtom = atomWithStorage<Property | null>(
  "property",
  null
);
