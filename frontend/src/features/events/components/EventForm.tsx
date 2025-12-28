import {
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createEvent, updateEvent } from '../api/events-api';
import { getAuthToken } from '../../../util/auth';
import type { EventItem } from '../api/events-types';
import classes from './EventForm.module.css';
// import { useForm, SubmitHandler } from "react-hook-form"

// type Inputs = {
//   title: string;
//   image: string;
//   date: string;
//   description: string;
// };

type EventFormProps = {
  method: 'post' | 'patch';
  event?: EventItem;
};

type FormErrors = Record<string, string> | null;

function EventForm({ method, event }: EventFormProps): JSX.Element {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const token = getAuthToken();

  //const {register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const [formErrors, setFormErrors] = useState<FormErrors>(null);

  const mutation = useMutation({
    mutationFn: async (eventData: any) => {
      if (method === 'post') {
        return await createEvent(eventData, token);
      } else {
        return await updateEvent(event!.id, eventData, token);
      }
    },
    onSuccess: () => {
      navigate('/events');
    },
    onError: (error: any) => {
      if (error.status === 422) {
        setFormErrors(error.errors);
      } else {
        setFormErrors({ general: error.message });
      }
    },
  });

  const isSubmitting = mutation.isPending || navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventData = {
      title: formData.get('title') as string,
      image: formData.get('image') as string,
      date: formData.get('date') as string,
      description: formData.get('description') as string,
    };
    mutation.mutate(eventData);
  }

  return (
    <form method="post" className={classes.form} onSubmit={submitHandler}>
      {formErrors && (
        <ul>
          {Object.values(formErrors).map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </form>
  );
}

export default EventForm;

