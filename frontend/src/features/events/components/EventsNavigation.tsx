import { NavLink, useRouteLoaderData } from "react-router-dom";

//import classes from "./EventsNavigation.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function EventsNavigation(): JSX.Element {
  const token = useRouteLoaderData("root") as string | null;

  return (
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" gap={2} margin={2}>
      <Button variant="outlined" component={NavLink} to="/events">
        All Events
      </Button>
      {token && (
        <Button variant="outlined" component={NavLink} to="/events/new">
          New Event
        </Button>
      )}
    </Stack>
    // <header className={classes.header}>
    //   <nav>
    //     <ul className={classes.list}>
    //       <li>
    //         <NavLink
    //           to="/events"
    //           className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }
    //           end
    //         >
    //           All Events
    //         </NavLink>
    //       </li>
    //       {token && (
    //         <li>
    //           <NavLink
    //             to="/events/new"
    //             className={({ isActive }) =>
    //               isActive ? classes.active : undefined
    //             }
    //           >
    //             New Event
    //           </NavLink>
    //         </li>
    //       )}
    //     </ul>
    //   </nav>
    // </header>
  );
}

export default EventsNavigation;
