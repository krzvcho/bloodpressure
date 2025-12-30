import { Radio, FormControlLabel, Box, Typography, RadioGroup, useColorScheme } from "@mui/material";

export default function Footer() {
  const { mode, setMode } = useColorScheme();

  console.log("Current mode in Footer:", mode);
  return (
    <Box
      component="footer"
      sx={{
        position: "sticky",
        bottom: 0,
        width: "100%",
        py: 2,
        px: 3,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} krzvcho. All rights reserved.
      </Typography>
      {mode && (
        <RadioGroup
          onChange={(e) => setMode(e.target.value as "system" | "dark" | "light")}
          row
          defaultValue={mode}
          sx={{ justifyContent: "flex-end", marginTop: 1 }}
          value={mode}
        >
          <FormControlLabel value="light" control={<Radio size="small" />} label="Light" />
          <FormControlLabel value="dark" control={<Radio size="small" />} label="Dark" />
          <FormControlLabel value="system" control={<Radio size="small" />} label="System" />
        </RadioGroup>
      )}
    </Box>
  );
}
