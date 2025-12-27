export type EventData = {
  id?: string;
  title: string;
  image: string;
  date: string;
  description: string;
};

export async function fetchEvents(): Promise<EventData[]> {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    throw new Error('Could not fetch events.');
  }
  const resData = await response.json();
  return resData.events;
}

export async function fetchEvent(id?: string): Promise<EventData> {
  if (!id) {
    throw new Error('Event ID is required to fetch event details.');
  }
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if (!response.ok) {
    throw new Error('Could not fetch details for selected event.');
  }
  const resData = await response.json();
  return resData.event;
}

export async function deleteEvent(id: string, token: string | null): Promise<boolean> {
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  });
  if (!response.ok) {
    throw new Error('Could not delete event.');
  }
  return true;
}

export async function createEvent(eventData: EventData, token: string | null): Promise<EventData> {
  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(eventData),
  });
  if (response.status === 422) {
    const errorData = await response.json();
    throw { status: 422, errors: errorData.errors };
  }
  if (!response.ok) {
    throw new Error('Could not create event.');
  }
  return await response.json();
}

export async function updateEvent(eventId: string, eventData: EventData, token: string | null): Promise<EventData> {
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(eventData),
  });
  if (response.status === 422) {
    const errorData = await response.json();
    throw { status: 422, errors: errorData.errors };
  }
  if (!response.ok) {
    throw new Error('Could not update event.');
  }
  return await response.json();
}