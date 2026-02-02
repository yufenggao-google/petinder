/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { auth } from "./lib/auth";
import { queryClient } from "./lib/query";
import { routeTree } from "./lib/routeTree.gen";
import { api, trpcClient } from "./lib/trpc";
import "./styles/globals.css";

const router = createRouter({
  routeTree,
  context: {
    auth,
    queryClient,
  },
});

// Redirect to HTTPS in production
if (
  window.location.protocol === "http:" &&
  !window.location.host.includes("localhost") &&
  !window.location.host.includes("127.0.0.1")
) {
  window.location.replace(
    "https://" + window.location.host + window.location.pathname,
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.DEV && (
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
          />
        )}
      </api.Provider>
    </QueryClientProvider>
  </StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
