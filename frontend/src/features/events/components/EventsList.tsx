// import { useLoaderData } from 'react-router-dom';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { EventItem } from '../api/events-types';
import classes from './EventsList.module.css';


interface EventsListProps {
  events: EventItem[];
}

const EventsList: FC<EventsListProps> = ({ events }) => {
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
