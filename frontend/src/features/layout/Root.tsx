import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "./components/MainNavigation";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

function RootLayout(): JSX.Element {
  const navigation = useNavigation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="header">
        <MainNavigation />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default RootLayout;
