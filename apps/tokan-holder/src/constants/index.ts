export const API_URL = import.meta.env.VITE_API_URL;
export const PROTOCOL_ADDRESS = import.meta.env.VITE_PROTOCOL_CONTRACT_ADDRESS;
export const TOKEN_ADDRESS = import.meta.env.VITE_LANDC_TOKEN_ADDRESS;
export const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
export const ORACLE_ADDRESS = import.meta.env.VITE_ORACLE_CONTRACT_ADDRESS;

export const SUPPORTED_TOKENS = [
    {
        name: "DAI",
        value: "0x231065C56A9b0e915a7388da32FC1aD362ED5f24"
    },
    {
        name: "UNI",
        value: "0x3E27Eabad523C33b4e48376965075cd6550B940e"
    },
    {
        name: "WETH",
        value: "0x81d0773DA2057F7b4cEb9F74D58c06ae8aFE0C3a"
    }
]