import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import EventItem from "./components/EventItem";
import EventsList from "./components/EventsList";
import { fetchEvents, fetchEvent } from "./api/events-api";


import type { QueryObserverResult } from '@tanstack/react-query';

function EventDetailPage(): JSX.Element {
  const { eventId } = useParams();

  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
    error: eventError,
  }: QueryObserverResult<any, Error> = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEvent(eventId),
    enabled: !!eventId,
    staleTime: 10000,
  });

  const {
    data: events,
    isLoading: isEventsLoading,
    isError: isEventsError,
    error: eventsError,
  }: QueryObserverResult<any, Error> = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 10000,
  });

  if (isEventLoading || isEventsLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  if (isEventError) {
    return <p style={{ textAlign: 'center' }}>{eventError?.message}</p>;
  }

  if (isEventsError) {
    return <p style={{ textAlign: 'center' }}>{eventsError?.message}</p>;
  }

  return (
    <>
      <EventItem event={event} />
      <EventsList events={events} />
    </>
  );
}

export default EventDetailPage;
