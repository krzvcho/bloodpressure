import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();
// @ts-ignore
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <QueryClientProvider client={queryClient}>
        
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
