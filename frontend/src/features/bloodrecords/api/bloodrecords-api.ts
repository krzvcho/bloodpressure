export async function updateBloodRecord(
  id: string,
  recordData: Omit<BloodRecord, "id">,
  token: string | null,
  userId: string | null
): Promise<BloodRecord> {
  if (!token || !userId || !id) {
    throw new Error("Authentication token, user ID, or record ID is missing.");
  }
  const response = await fetch(`http://localhost:8080/bloodrecords/${encodeURIComponent(id)}?userId=${encodeURIComponent(userId)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recordData),
  });
  if (response.status === 422) {
    const errorData = await response.json();
    throw { status: 422, errors: errorData.errors };
  }
  if (!response.ok) {
    throw new Error("Could not update blood pressure record.");
  }
  const resData = await response.json();
  return resData.bloodPressureRecord;
}
export async function getBloodRecordById(id: string, token: string | null, userId: string | null): Promise<BloodRecord> {
  if (!token || !userId || !id) {
    throw new Error("Authentication token, user ID, or record ID is missing.");
  }
  const response = await fetch(`http://localhost:8080/bloodrecords/${encodeURIComponent(id)}?userId=${encodeURIComponent(userId)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Could not fetch blood pressure record.");
  }
  const resData = await response.json();
  return resData.bloodPressureRecord;
}
export const MEASUREMENT_LOCATIONS = ["left arm", "right arm"] as const;
export type MeasurementLocation = (typeof MEASUREMENT_LOCATIONS)[number];

export interface BloodRecord {
  id: string;
  timestamp: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  notes: string;
  measurementLocation: MeasurementLocation;
}

export async function fetchBloodRecords(token: string | null, userId: string | null): Promise<BloodRecord[]> {
  if (!token || !userId) {
    throw new Error("Authentication token or user ID is missing.");
  }

  const response = await fetch("http://localhost:8080/bloodrecords/?userId=" + userId, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch blood pressure records.");
  }
  const resData = await response.json();
  return resData.bloodPressureRecords;
}

export async function createBloodRecord(recordData: Omit<BloodRecord, "id">, token: string | null, userId: string | null): Promise<BloodRecord> {
  if (!token || !userId) {
    throw new Error("Authentication token is missing.");
  }
  const response = await fetch(`http://localhost:8080/bloodrecords?userId=${encodeURIComponent(userId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recordData),
  });
  if (response.status === 422) {
    const errorData = await response.json();
    throw { status: 422, errors: errorData.errors };
  }
  if( response.status === 401) {
    const errorData = await response.json();
    throw { status: 401, message: errorData.message };
  }
  if (!response.ok) {
    throw new Error("Could not create bloodrecord.");
  }
  return await response.json();
}
