import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent } from './api/events-api';

import EventForm from './components/EventForm';


import type { QueryObserverResult } from '@tanstack/react-query';

function EditEventPage(): JSX.Element {
  const { eventId } = useParams();
  const {
    data: event,
    isLoading,
    isError,
    error,
  }: QueryObserverResult<any, Error> = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEvent(eventId),
    enabled: !!eventId,
    staleTime: 10000,
  });

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  if (isError) {
    return <p style={{ textAlign: 'center' }}>{error?.message}</p>;
  }

  return <EventForm method="patch" event={event} />;
}

export default EditEventPage;
