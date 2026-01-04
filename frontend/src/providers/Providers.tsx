import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import { QueryClientProvider, queryClient } from "./queryClientSingletone";
import MuiLocalizationProvider from "./MuiLocalizationProvider";

interface ProvidersProps {
  children: ReactNode;
}

// @ts-ignore
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiLocalizationProvider>
          {children}
        </MuiLocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
