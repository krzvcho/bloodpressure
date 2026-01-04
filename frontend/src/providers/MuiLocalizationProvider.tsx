import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface MuiLocalizationProviderProps {
  children: React.ReactNode;
}

const MuiLocalizationProvider: React.FC<MuiLocalizationProviderProps> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
};

export default MuiLocalizationProvider;
