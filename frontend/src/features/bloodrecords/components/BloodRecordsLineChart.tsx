import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { LinearProgress, Typography, Box } from "@mui/material";
import { BloodRecord } from "../api/bloodrecords-api";

interface BloodRecordsLineChartProps {
  data?: BloodRecord[];
  isLoading?: boolean;
}

const BloodRecordsLineChart: React.FC<BloodRecordsLineChartProps> = ({ data, isLoading }) => {
  // Sort data from oldest to newest by timestamp
  const sortedData = React.useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [data]);

  return (
    <Box sx={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "grey.100" }}>
      {isLoading && <LinearProgress sx={{ width: "100%" }} />}
      {!isLoading && sortedData && sortedData.length > 0 ? (
        <LineChart
          height={300}
          series={[
            {
              data: sortedData.map((r) => r.systolic),
              label: "Systolic",
              color: "#1976d2",
              yAxisId: "leftAxis",
            },
            {
              data: sortedData.map((r) => r.diastolic),
              label: "Diastolic",
              color: "#ef5350",
              yAxisId: "leftAxis",
            },
            {
              data: sortedData.map((r) => r.pulse),
              label: "Pulse",
              color: "#ffb3b3ff",
              yAxisId: "rightAxis",
            },
          ]}
          xAxis={[
            {
              data: sortedData.map((r) => new Date(r.timestamp).toLocaleDateString()),
              scaleType: "point",
              label: "Date",
            },
          ]}
          yAxis={[
            { id: "leftAxis", width: 50, label: "Pressure (mmHg)" },
            { id: "rightAxis", position: "right", label: "Pulse (bpm)" },
          ]}
          margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
          grid={{ vertical: true, horizontal: true }}
          sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 1 }}
        />
      ) : !isLoading ? (
        <Typography color="text.secondary">No data to display</Typography>
      ) : null}
    </Box>
  );
};

export default BloodRecordsLineChart;
