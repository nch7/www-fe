import React from "react";
import ReactDOM from "react-dom/client";
import { WWWThemeProvider } from "ui";
import { BrowserRouter } from "@www/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WWWThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WWWThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
