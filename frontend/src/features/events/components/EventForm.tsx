import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent, updateEvent } from "../api/events-api";
import { getAuthToken } from "../../../util/auth";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import type { EventItem } from "../api/events-types";
import styled from "@emotion/styled";

type IFormInput = {
  title: string;
  image: string;
  date: string;
  description: string;
};

type EventFormProps = {
  method: "post" | "patch";
  event?: EventItem;
};

const FORM_VALIDATION = {
  title: {
    required: "Title is required",
    minLength: { value: 5, message: "Title must be at least 5 characters long" },
    maxLength: { value: 100, message: "Title must be at most 100 characters long" },
  },
  image: {
    required: "Image URL is required",
    pattern: {
      value: /^https?:\/\/.+\..+/i,
      message: "Must be a valid URL",
    },
  },
  date: {
    required: "Date is required",
    validate: (value: string) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today || "Date must be today or in the future";
    },
  },
  description: {
    required: "Description is required",
    minLength: { value: 10, message: "Description must be at least 10 characters long" },
    maxLength: { value: 1000, message: "Description must be at most 1000 characters long" },
  },
};

// Wydzielony komponent dla pola formularza
type FormFieldProps = {
  label: string;
  id: keyof IFormInput;
  type?: string;
  register: any;
  error?: { message?: string };
  rows?: number;
};

// type CustomTextFieldProps = {
//   error?: boolean;
// };

// const CustomTextField = styled(TextField, { shouldForwardProp: (prop) => prop !== "error" })<CustomTextFieldProps>(({ theme, error }) => ({
//   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//     borderColor: error ? "#d25419ff" : "#d3c720ff",
//   },
// }));

function FormField({ label, id, type = "text", register, error, rows }: FormFieldProps) {
  return (
    <>
      <TextField
        {...register(id, FORM_VALIDATION[id])}
        id={id}
        label={label}
        slotProps={{
          inputLabel: {
            shrink: type === "date" ? true : undefined,
          },
        }}
        type={rows ? undefined : type}
        multiline={!!rows}
        rows={rows}
        error={!!error}
        helperText={error?.message}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      {/* <CustomTextField error={true} />
      <CustomTextField error={false} />       */}
    </>
  );
}

function EventForm({ method, event }: EventFormProps): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = getAuthToken();

  /* React Hook Form setup */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<IFormInput>({
    defaultValues: {
      title: event?.title ?? "",
      image: event?.image ?? "",
      date: event?.date ?? "",
      description: event?.description ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (eventData: any) => {
      if (method === "post") {
        return await createEvent(eventData, token);
      } else {
        return await updateEvent(event!.id, eventData, token);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
    onError: (error: any) => {
      if (error.status === 422) {
        // Map backend errors to form fields
        Object.entries(error.errors).forEach(([field, message]) => {
          setError(field as keyof IFormInput, {
            type: "server",
            message: message as string,
          });
        });
      } else {
        // General error
        setError("root", {
          type: "server",
          message: error.message || "An error occurred while saving the event",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    mutation.mutate(formData);
  };

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", maxWidth: 400 }}>
        {/* Display root/general errors */}
        {errors?.root && (
          <Stack spacing={1} mb={2}>
            <Alert severity="error">{errors.root?.message}</Alert>
          </Stack>
        )}
        <Stack spacing={3}>
          <FormField label="Title" id="title" register={register} error={errors.title} />
          <FormField label="Image URL" id="image" type="url" register={register} error={errors.image} />
          <FormField label="Date" id="date" type="date" register={register} error={errors.date} />
          <FormField label="Description" id="description" register={register} error={errors.description} rows={5} />
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Button variant="outlined" onClick={cancelHandler} disabled={isSubmitting || mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting || mutation.isPending}>
              {isSubmitting || mutation.isPending ? "Submitting..." : "Save"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default EventForm;
