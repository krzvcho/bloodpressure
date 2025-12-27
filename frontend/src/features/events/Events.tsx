import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from './api/events-api';

import EventsList from './components/EventsList';


import type { QueryObserverResult } from '@tanstack/react-query';

function EventsPage(): JSX.Element {
  const { data: events, isLoading, isError, error }: QueryObserverResult<any, Error> = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 10000,
  });

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  if (isError) {
    return <p style={{ textAlign: 'center' }}>{error?.message}</p>;
  }

  return <EventsList events={events} />;
}

export default EventsPage;
