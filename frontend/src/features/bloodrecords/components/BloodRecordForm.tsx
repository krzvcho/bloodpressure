import { Box, Stack, Alert, TextField, Select, CardHeader, Button, InputLabel, MenuItem } from "@mui/material";
import React from "react";
import { BloodRecord, createBloodRecord, MEASUREMENT_LOCATIONS, MeasurementLocation, updateBloodRecord } from "../api/bloodrecords-api";
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { isoToLocalDatetime, getCurrentLocalDatetime } from "../../../util/dateUtils";
import { UserProfileData } from "../../../types/user";
import { useMutation } from "@tanstack/react-query";
import { useGlobalErrorsStore } from "../../../stores/useGlobalErrorsStore";

type IBloodRecordForm = {
  timestamp: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  notes: string;
  measurementLocation: MeasurementLocation;
};

interface BloodRecordFormProps {
  record?: BloodRecord;
  mode?: "edit" | "create";
}

const FORM_VALIDATION = {
  timestamp: {
    required: "Timestamp is required",
    validate: (value: string) => {
      if (!value) return "Timestamp is required";
      const date = new Date(value);
      return !isNaN(date.getTime()) || "Invalid date/time format";
    },
  },
  systolic: {
    required: "Systolic value is required",
    min: { value: 50, message: "Systolic must be at least 50" },
    max: { value: 250, message: "Systolic must be at most 250" },
    valueAsNumber: true,
  },
  diastolic: {
    required: "Diastolic value is required",
    min: { value: 30, message: "Diastolic must be at least 30" },
    max: { value: 150, message: "Diastolic must be at most 150" },
    valueAsNumber: true,
  },
  pulse: {
    required: "Pulse is required",
    min: { value: 20, message: "Pulse must be at least 20" },
    max: { value: 250, message: "Pulse must be at most 250" },
    valueAsNumber: true,
  },
  notes: {
    maxLength: { value: 300, message: "Notes must be at most 300 characters long" },
  },
  measurementLocation: {
    required: "Measurement location is required (which arm?)",
  },
};

const BloodRecordForm: React.FC<BloodRecordFormProps> = ({ record, mode }) => {
  const navigate = useNavigate();
  const userData = useRouteLoaderData("bloodrecords-root") as UserProfileData;
  const { addAuthError } = useGlobalErrorsStore();

  /* React Hook Form setup */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = useForm<IBloodRecordForm>({
    defaultValues: {
      timestamp: record?.timestamp ? isoToLocalDatetime(record.timestamp) : getCurrentLocalDatetime(),
      systolic: record?.systolic ?? 0,
      diastolic: record?.diastolic ?? 0,
      pulse: record?.pulse ?? 0,
      notes: record?.notes ?? "",
      measurementLocation: record?.measurementLocation ?? MEASUREMENT_LOCATIONS[0],
    },
  });

  const { mutate: setBloodRecord } = useMutation({
    mutationFn: async (formData: IBloodRecordForm) => {
      if (mode === "edit" && record) {
        await updateBloodRecord(record.id, formData, userData.token, userData.userId);
        return;
      } else {
        await createBloodRecord(formData, userData.token, userData.userId);
      }
    },
    onSuccess: () => {
      navigate("..");
    },
    onError: (error: any) => {      
      if (error.status === 422) {
        // Map backend errors to form fields
        Object.entries(error.errors).forEach(([field, message]) => {
          setError(field as keyof IBloodRecordForm, {
            type: "server",
            message: message as string,
          });
        });
      } else if (error.status === 401) { 
        // Authentication error, handled by global error store zustand store
        // displayed in AuthErrorModal
        addAuthError(error.message || "Authentication error occurred");
      } else {
        // General error
        setError("root", {
          type: "server",
          message: error.message || "An error occurred while saving the blood record",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<IBloodRecordForm> = (formData: IBloodRecordForm) => {
    setBloodRecord(formData);
    //future mutation logic here
  };

  function cancelHandler() {
    navigate("..");
  }

  return (
    <>
      <CardHeader title={record ? "Edit Blood Record" : "Add Blood Record"} />
      <Box display="flex" justifyContent="center" alignItems="center" marginTop={3}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", maxWidth: 400 }}>
          {/* Display root/general errors */}
          {errors?.root && (
            <Stack spacing={1} mb={2}>
              <Alert severity="error">{errors.root?.message}</Alert>
            </Stack>
          )}
          <Stack spacing={3}>
            <TextField
              {...register("timestamp", FORM_VALIDATION.timestamp)}
              label="Date and Time"
              type="datetime-local"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={!!errors.timestamp}
              helperText={errors.timestamp?.message}
              fullWidth
            />
            <TextField
              {...register("systolic", FORM_VALIDATION.systolic)}
              label="Systolic"
              type="number"
              error={!!errors.systolic}
              helperText={errors.systolic?.message}
              fullWidth
            />
            <TextField
              {...register("diastolic", FORM_VALIDATION.diastolic)}
              label="Diastolic"
              type="number"
              error={!!errors.diastolic}
              helperText={errors.diastolic?.message}
              fullWidth
            />
            <TextField
              {...register("pulse", FORM_VALIDATION.pulse)}
              label="Pulse"
              type="number"
              error={!!errors.pulse}
              helperText={errors.pulse?.message}
              fullWidth
            />
            <TextField
              {...register("notes", FORM_VALIDATION.notes)}
              label="Notes"
              type="text"
              error={!!errors.notes}
              helperText={errors.notes?.message}
              fullWidth
              rows={5}
              multiline
            />
            <Controller
              name="measurementLocation"
              control={control}
              rules={FORM_VALIDATION.measurementLocation}
              render={({ field }) => (
                <>
                  <InputLabel id="measurement-location-label">Measurement Location</InputLabel>
                  <Select
                    {...field}
                    labelId="measurement-location-label"
                    label="Measurement Location"
                    error={!!errors.measurementLocation}
                    fullWidth
                  >
                    {MEASUREMENT_LOCATIONS.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location.charAt(0).toUpperCase() + location.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {errors.measurementLocation && <span style={{ color: "red" }}>{errors.measurementLocation.message}</span>}
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" margin={3}>
            <Button variant="outlined" onClick={cancelHandler} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} variant="contained">
              {record ? "Update Record" : "Add Record"}
            </Button>
          </Stack>
        </form>
        <br />
      </Box>
    </>
  );
};

export default BloodRecordForm;
