import { createTheme } from "@mui/material/styles";
import { useLanguageStore } from "../stores/useLanguageStore";
import { deDE, enUS } from "@mui/material/locale";
import { useEffect } from "react";

export const useTheme = () => {
  const { locale, direction } = useLanguageStore();

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        mobile: 200, // custom breakpoint
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: "#d25419ff",
          },
          secondary: {
            main: "#d3c720ff",
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: "#d25419ff",
          },
          secondary: {
            main: "#d3c720ff",
          },
          background: {
            default: "#f5f5f5", // lekko szare tło
            paper: "#fff"
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#d25419ff",
      },
      secondary: {
        main: "#d3c720ff",
      },
      background: {
        default: "#f5f5f5", // lekko szare tło
        paper: "#fff"
      },
    },
    // components: {
    //   MuiButton: {
    //     styleOverrides: {
    //       root: { variants: [{ props: { variant: "contained" }, style: { backgroundColor: "#d219b9ff" } }] },
    //     },
    //   },
    // },
  }, locale === "en" ? enUS : deDE);
  return { theme };
};
