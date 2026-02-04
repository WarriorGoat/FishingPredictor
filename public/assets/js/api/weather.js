/**
 * Weather API functions
 */

const API_BASE = '/api';

/**
 * Fetch weather forecast for coordinates
 */
export async function fetchWeather(lat, lng) {
  try {
    const params = new URLSearchParams({ lat, lng });
    const response = await fetch(`${API_BASE}/weather?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather: ${response.status}`);
    }

    const data = await response.json();
    return data.properties?.periods || [];
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Unable to load weather forecast. Please try again later.');
  }
}
