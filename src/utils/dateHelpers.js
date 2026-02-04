/**
 * Date utility functions
 */

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Get date N days from now in YYYY-MM-DD format
 */
export function getDateDaysFromNow(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * Convert YYYY-MM-DD to YYYYMMDD format (for NOAA API)
 */
export function formatDateForAPI(dateStr) {
  return dateStr.replace(/-/g, '');
}

/**
 * Format ISO date string to human-readable format
 * Example: "2024-02-04 14:23" -> "Sun, Feb 4 at 2:23 PM"
 */
export function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleString('en-US', options);
}

/**
 * Format time only from ISO string
 * Example: "2024-02-04T14:23:00" -> "2:23 PM"
 */
export function formatTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Format date only from ISO string
 * Example: "2024-02-04T14:23:00" -> "Sunday, Feb 4"
 */
export function formatDate(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Get day name from ISO date string
 */
export function getDayName(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}
