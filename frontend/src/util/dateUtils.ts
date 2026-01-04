/**
 * Utility functions for handling dates with timezone awareness
 */

/**
 * Converts a local datetime string from input type="datetime-local" to ISO string
 * accounting for the user's timezone offset
 * @param localDatetimeString - String from datetime-local input (format: "2024-01-15T14:30")
 * @returns ISO string with timezone offset applied
 */
export function localDatetimeToISO(localDatetimeString: string): string {
  const date = new Date(localDatetimeString);
  // The datetime-local input gives us local time but Date constructor treats it as UTC
  // We need to add the timezone offset back
  const offset = date.getTimezoneOffset() * 60000;
  const localTime = new Date(date.getTime() + offset);
  return localTime.toISOString();
}

/**
 * Converts an ISO timestamp to local datetime string for input type="datetime-local"
 * @param isoString - ISO format timestamp string
 * @returns Local datetime string (format: "2024-01-15T14:30")
 */
export function isoToLocalDatetime(isoString: string): string {
  const date = new Date(isoString);
  // Get local time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Gets current time as local datetime string for datetime-local input
 * @returns Local datetime string (format: "2024-01-15T14:30")
 */
export function getCurrentLocalDatetime(): string {
  return isoToLocalDatetime(new Date().toISOString());
}
