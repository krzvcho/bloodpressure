import { createTheme } from "@mui/material/styles";

export const useTheme = () => {
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
    },
    // components: {
    //   MuiButton: {
    //     styleOverrides: {
    //       root: { variants: [{ props: { variant: "contained" }, style: { backgroundColor: "#d219b9ff" } }] },
    //     },
    //   },
    // },
  });
  return { theme };
};
