import { Outlet } from 'react-router-dom';

import EventsNavigation from './components/EventsNavigation';


function EventsRootLayout(): JSX.Element {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
