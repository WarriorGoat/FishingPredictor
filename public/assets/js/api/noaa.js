/**
 * NOAA API functions
 */

const API_BASE = '/api';

/**
 * Fetch all tide stations from NOAA
 */
export async function fetchStations() {
  try {
    const response = await fetch(`${API_BASE}/stations`);

    if (!response.ok) {
      throw new Error(`Failed to fetch stations: ${response.status}`);
    }

    const data = await response.json();
    return data.stations || [];
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw new Error('Unable to load tide stations. Please try again later.');
  }
}

/**
 * Fetch tide predictions for a station
 */
export async function fetchTides(stationId, startDate, endDate) {
  try {
    const params = new URLSearchParams({
      station: stationId,
      begin_date: startDate,
      end_date: endDate
    });

    const response = await fetch(`${API_BASE}/tides?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch tide data: ${response.status}`);
    }

    const data = await response.json();
    return data.predictions || [];
  } catch (error) {
    console.error('Error fetching tides:', error);
    throw new Error('Unable to load tide predictions. Please try again later.');
  }
}
