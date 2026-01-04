
import React from "react";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useBloodRecordsFilters } from "../store/useBloodRecordsFilters";

import { Button } from "@mui/material";

const BloodRecordsFilter: React.FC = () => {
  const { dateFrom, dateTo, setDateFrom, setDateTo } = useBloodRecordsFilters();
  const handleClear = () => {
    setDateFrom(null);
    setDateTo(null);
  };
  return (
    <Box display="flex" gap={2} alignItems="center">
      <DatePicker
        label="Data od"
        value={dateFrom}
        onChange={setDateFrom}
        maxDate={dateTo || undefined}
        slotProps={{ textField: { size: "small" } }}
      />
      <DatePicker
        label="Data do"
        value={dateTo}
        onChange={setDateTo}
        minDate={dateFrom || undefined}
        slotProps={{ textField: { size: "small" } }}
      />
      <Button onClick={handleClear} variant="outlined" size="small" sx={{ minWidth: 0, px: 1 }}>
        Clear
      </Button>
    </Box>
  );
};

export default BloodRecordsFilter;
