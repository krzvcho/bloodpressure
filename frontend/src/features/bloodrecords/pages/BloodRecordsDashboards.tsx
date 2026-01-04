import React from "react";
import { Box, Button, Grid, Typography, Paper, Container, LinearProgress } from "@mui/material";
import BloodRecordsLineChart from "../components/BloodRecordsLineChart";
import { useQuery } from "@tanstack/react-query";
import { BloodRecord, fetchBloodRecords } from "../api/bloodrecords-api";
import { useBloodRecordsFilters } from "../store/useBloodRecordsFilters";
import BloodRecordsTable from "../components/BloodRecordsTable";
import BloodRecordsList from "../components/BloodRecordsList";
import TableViewIcon from "../components/TableViewIcon";
import ListViewIcon from "../components/ListViewIcon";
import BloodRecordsFilter from "../components/BloodRecordsFilter";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { UserProfileData } from "../../../types/user";

const BloodRecordsDashboard: React.FC = () => {
  const userData = useRouteLoaderData("bloodrecords-root") as UserProfileData;

  // Filter state now handled by zustand store
  const { dateFrom, dateTo } = useBloodRecordsFilters();
  // Query depends on filter values
  const { data, isLoading, error } = useQuery<BloodRecord[], Error>({
    queryKey: ["bloodrecords", dateFrom?.toISOString?.() ?? null, dateTo?.toISOString?.() ?? null],
    queryFn: () => fetchBloodRecords(userData.token, userData.userId),
  });

  // Filter data in-memory (API does not support date filtering)
  const filteredData = React.useMemo(() => {
    if (!data) return [];
    return data.filter((record) => {
      const ts = new Date(record.timestamp).getTime();
      const from = dateFrom ? dateFrom.toDate().getTime() : null;
      const to = dateTo ? dateTo.toDate().getTime() : null;
      if (from && ts < from) return false;
      if (to && ts > to) return false;
      return true;
    });
  }, [data, dateFrom, dateTo]);

  const [bigChart, setBigChart] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'table' | 'list'>('table');

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={2}>
        {/* Header row */}
        <Grid size={{ xs: 12 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box>
              <Typography variant="h4" component="h1">
                Blood Pressure Dashboard
              </Typography>
              <Box mt={1}>
                <BloodRecordsFilter />
              </Box>
            </Box>
            <NavLink to="/bloodrecords/new">
              <Button variant="contained" color="primary">
                Add Record
              </Button>
            </NavLink>
          </Box>
        </Grid>
        {/* Table and List */}
        {!bigChart && (
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h6" gutterBottom>
                  Records {viewMode === 'table' ? 'Table' : 'List'}
                </Typography>
                <Box>
                  <Button
                    onClick={() => setViewMode('table')}
                    variant={viewMode === 'table' ? 'contained' : 'outlined'}
                    color={viewMode === 'table' ? 'primary' : 'inherit'}
                    sx={{ minWidth: 0, p: 1, mr: 1, boxShadow: viewMode === 'table' ? 2 : 0 }}
                  >
                    <TableViewIcon/>
                  </Button>
                  <Button
                    onClick={() => setViewMode('list')}
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    color={viewMode === 'list' ? 'primary' : 'inherit'}
                    sx={{ minWidth: 0, p: 1, boxShadow: viewMode === 'list' ? 2 : 0 }}
                  >
                    <ListViewIcon />
                  </Button>
                </Box>
              </Box>
              {isLoading && <LinearProgress />}
              {!isLoading && error && <Typography color="error">Error loading blood records: {(error as Error).message}</Typography>}
              {!isLoading && filteredData && (
                viewMode === 'table' ? (
                  <BloodRecordsTable records={filteredData} />
                ) : (
                  <BloodRecordsList records={filteredData} />
                )
              )}
            </Paper>
          </Grid>
        )}
        {/* Charts placeholder */}
        <Grid size={{ xs: 12, md: bigChart ? 12 : 5 }}>
          <Paper
            sx={{
              p: 2,
              height: "100%",
              width: "100%",
              transition: "all 0.3s",
              ...(bigChart && {
                minHeight: 400,
                maxWidth: '100%',
                boxShadow: 6,
                position: 'relative',
                zIndex: 10,
              }),
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                Charts
              </Typography>
              <Button
                variant={bigChart ? "contained" : "outlined"}
                color={bigChart ? "primary" : "inherit"}
                startIcon={
                  <span role="img" aria-label="chart">
                    📈
                  </span>
                }
                size="small"
                onClick={() => setBigChart((prev) => !prev)}
              >
                {bigChart ? "Normal View" : "Big Chart"}
              </Button>
            </Box>
            <BloodRecordsLineChart data={filteredData} isLoading={isLoading} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BloodRecordsDashboard;
