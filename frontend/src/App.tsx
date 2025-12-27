import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import EditEventPage from "./features/events/EditEvent";
import ErrorPage from "./features/layout/Error";
import EventDetailPage from "./features/events/EventDetail";
import EventsPage from "./features/events/Events";
import EventsRootLayout from "./features/events/EventsRoot";
import HomePage from "./features/home/Home";
import NewEventPage from "./features/events/NewEvent";
import RootLayout from "./features/layout/Root";
import AuthenticationPage, {
  action as authAction,
} from "./features/auth/Authentication";
import { action as logoutAction } from "./features/auth/Logout";
import { tokenLoader, checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      { path: "logout", action: logoutAction },
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

const queryClient = new QueryClient();
// @ts-ignore
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;