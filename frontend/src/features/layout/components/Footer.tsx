import {
  Radio,
  FormControlLabel,
  Box,
  Typography,
  RadioGroup,
  useColorScheme,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
  TextField,
  Stack,
} from "@mui/material";
import { useLanguageStore } from "../../../stores/useLanguageStore";

export default function Footer() {
  const { mode, setMode } = useColorScheme();

  // Language store (zustand)
  const locale = useLanguageStore((state) => state.locale);
  const changeLocale = useLanguageStore((state) => state.changeLocale);
  const direction = useLanguageStore((state) => state.direction);
  const setDirection = useLanguageStore((state) => state.setDirection);

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
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} krzvcho. All rights reserved.
        </Typography>
        {mode && (
          <RadioGroup
            onChange={(e) => setMode(e.target.value as "system" | "dark" | "light")}
            row
            defaultValue={mode}
            sx={{ justifyContent: "center", marginTop: 1 }}
            value={mode}
          >
            <FormControlLabel value="light" control={<Radio size="small" />} label="Light" />
            <FormControlLabel value="dark" control={<Radio size="small" />} label="Dark" />
            <FormControlLabel value="system" control={<Radio size="small" />} label="System" />
          </RadioGroup>
        )}
        <ToggleButtonGroup
          value={locale}
          exclusive
          size="small"
          sx={{ marginTop: 1 }}
          onChange={(e, newLocale) => {
            if (newLocale !== null) changeLocale(newLocale);
          }}
        >
          <ToggleButton value="en" size="small" >EN</ToggleButton>
          <ToggleButton value="de" size="small" >DE</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={direction}
          exclusive
          size="small"
          sx={{ marginTop: 1, marginLeft: 2 }}
          onChange={(e, newDir) => {
            if (newDir !== null) setDirection(newDir);
          }}
        >
          <ToggleButton value="ltr" size="small">LTR</ToggleButton>
          <ToggleButton value="rtl" size="small">RTL</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  );
}
