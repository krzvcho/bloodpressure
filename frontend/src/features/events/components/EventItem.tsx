import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "../api/events-api";
import classes from "./EventItem.module.css";
import type { FC } from "react";
import type { EventItem } from "../api/events-types";

interface EventItemProps {
  event: EventItem;
}

const EventItem: FC<EventItemProps> = ({ event }) => {
  const { token } = useRouteLoaderData("root") as { userName: string | null; userId: string | null; token: string | null };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteEvent(event.id, token),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["event", event.id] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
    onError: (error: any) => {
      window.alert(error.message || "Could not delete event.");
    },
  });

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      mutate();
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </menu>
      )}
    </article>
  );
};

export default EventItem;
