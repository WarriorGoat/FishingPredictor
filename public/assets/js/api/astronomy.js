/**
 * Astronomy API functions (moon phase, sunrise/sunset)
 */

const API_BASE = '/api';

/**
 * Fetch astronomy data (moon phase, sunrise, sunset)
 */
export async function fetchAstronomy(lat, lng) {
  try {
    const params = new URLSearchParams({ lat, lng });
    const response = await fetch(`${API_BASE}/astronomy?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch astronomy data: ${response.status}`);
    }

    const data = await response.json();
    return data.locations?.[0]?.values || [];
  } catch (error) {
    console.error('Error fetching astronomy data:', error);
    throw new Error('Unable to load astronomy data. Please try again later.');
  }
}
