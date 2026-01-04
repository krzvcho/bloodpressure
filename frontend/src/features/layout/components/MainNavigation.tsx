import { NavLink, useRouteLoaderData, useSubmit } from "react-router-dom";
// import { useState } from "react";
import { useLayoutStore } from '../../../stores/useLayoutStore';
import { AppBar, Toolbar, Button, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { queryClient } from "../../../providers/queryClientSingletone";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CustomMenuIcon from "./CustomMenuIcon";
import { stringAvatar } from "../../../util/avatarUtils";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/rwd", label: "RWD Playground", end: true },
  { to: "/bloodrecords", label: "Blood Records", end: true },
  { to: "/events", label: "Events" },
];

function MainNavigation(): JSX.Element {
  const drawerOpen = useLayoutStore((s) => s.drawerOpen);
  const setDrawerOpen = useLayoutStore((s) => s.setDrawerOpen);
  const { userName, token } = useRouteLoaderData("root") as { userName: string | null; userId: string | null; token: string | null };
  const submit = useSubmit();

  const navLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const activeStyle = {
    borderBottom: "2px solid white",
    borderRadius: 0,
  };

  const handleLogout = () => {
    queryClient.clear();
    queryClient.removeQueries();
    submit(null, { method: "post", action: "/logout" });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <IconButton color="inherit" edge="start" sx={{ mr: 2, display: { xs: "block", md: "none" } }} onClick={() => setDrawerOpen(true)} aria-label="menu">
              <CustomMenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {NAV_LINKS.map(({ to, label, end }) => (
                <NavLink key={to} to={to} style={navLinkStyle} {...(end ? { end: true } : {})}>
                  {({ isActive }) => (
                    <Button color="inherit" sx={isActive ? activeStyle : {}}>
                      {label}
                    </Button>
                  )}
                </NavLink>
              ))}
            </Box>
          </Box>

          {!token && (
            <Box>
              <NavLink to="/auth?mode=login" style={navLinkStyle}>
                {({ isActive }) => (
                  <Button color="inherit" sx={isActive ? activeStyle : {}}>
                    Login
                  </Button>
                )}
              </NavLink>
            </Box>
          )}
          {token && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar {...stringAvatar(userName || "")} />
              <Typography variant="body1" sx={{ color: "white" }}>
                {userName}
              </Typography>
              <Button onClick={handleLogout} color="inherit" variant="outlined" sx={{ borderColor: "white" }}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {NAV_LINKS.map(({ to, label, end }) => (
              <ListItem key={to} disablePadding>
                <NavLink to={to} style={{ textDecoration: "none", color: "inherit", width: "100%" }} {...(end ? { end: true } : {})}>
                  {({ isActive }) => (
                    <ListItemButton selected={isActive} sx={isActive ? { bgcolor: "primary.main" } : {}}>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  )}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default MainNavigation;
