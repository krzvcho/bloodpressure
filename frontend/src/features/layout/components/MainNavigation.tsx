import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

function MainNavigation(): JSX.Element {
  const token = useRouteLoaderData('root') as string | null;

  const navLinkStyle = {
    textDecoration: "none",
    color: "inherit"
  };

  const activeStyle = {
    borderBottom: "2px solid white"
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
          <NavLink
            to="/"
            style={navLinkStyle}
            end
          >
            {({ isActive }) => (
              <Button 
                color="inherit"
                sx={isActive ? activeStyle : {}}
              >
                Home
              </Button>
            )}
          </NavLink>

          <NavLink
            to="/events"
            style={navLinkStyle}
          >
            {({ isActive }) => (
              <Button 
                color="inherit"
                sx={isActive ? activeStyle : {}}
              >
                Events
              </Button>
            )}
          </NavLink>

          {!token && (
            <NavLink
              to="/auth?mode=login"
              style={navLinkStyle}
            >
              {({ isActive }) => (
                <Button 
                  color="inherit"
                  sx={isActive ? activeStyle : {}}
                >
                  Authentication
                </Button>
              )}
            </NavLink>
          )}
        </Box>

        {token && (
          <Form method="post" action="/logout">
            <Button 
              type="submit"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: "white" }}
            >
              Logout
            </Button>
          </Form>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;