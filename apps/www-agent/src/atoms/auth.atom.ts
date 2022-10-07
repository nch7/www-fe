import { atomWithStorage } from "jotai/utils";
import { AuthAtom } from "../types";

export const authAtom = atomWithStorage<AuthAtom | null>("auth", null);
