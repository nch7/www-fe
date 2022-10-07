import React from "react";
import ReactDOM from "react-dom/client";
import { WWWThemeProvider } from "ui";
import { BrowserRouter } from "@www/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "@rainbow-me/rainbowkit/styles.css";

import App from "./App";
import "./polyfills";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: "https://rpc.ankr.com/polygon_mumbai",
        };
      },
    }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "WWW",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "var(--chakra-colors-primary-500)",
            accentColorForeground: "var(--chakra-colors-primary-50)",
            borderRadius: "none",
            overlayBlur: "small",
          })}
        >
          <WWWThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WWWThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
