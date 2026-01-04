import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./features/events/EditEvent";
import ErrorPage from "./features/layout/Error";
import EventDetailPage from "./features/events/EventDetail";
import EventsPage from "./features/events/Events";
import EventsRootLayout from "./features/events/EventsRoot";
import HomePage from "./features/home/Home";
import NewEventPage from "./features/events/NewEvent";
import RootLayout from "./features/layout/Root";
import AuthenticationPage, { action as authAction } from "./features/auth/Authentication";
import RWDPlaygroundPage from "./features/rwdplayground/RwdPlaygroundPage";
import BloodRecordsDashboard from "./features/bloodrecords/pages/BloodRecordsDashboards";
import { action as logoutAction } from "./features/auth/Logout";
import { tokenLoader, checkAuthLoader, getLoggedUserData } from "./util/auth";
import Providers from "./providers/Providers";
import EditBloodRecord from "./features/bloodrecords/pages/EditBloodRecord";
import BloodRecordDetail from "./features/bloodrecords/pages/BloodRecordDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "rwd", element: <RWDPlaygroundPage /> },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      { path: "logout", action: logoutAction },
      {
        path: "bloodrecords",
        loader: getLoggedUserData,
        id: "bloodrecords-root",
        children: [
          { index: true, element: <BloodRecordsDashboard /> },
          { path: "new", element: <EditBloodRecord /> },
          { path: ":recordId", element: <BloodRecordDetail /> },
          { path: ":recordId/edit", element: <EditBloodRecord /> }          
        ],
      },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
          },
          {
            path: ":eventId",
            id: "event-detail",
            children: [
              {
                index: true,
                element: <EventDetailPage />,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            loader: checkAuthLoader,
          },
        ],
      },
    ],
  },
]);

function App(): JSX.Element {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
