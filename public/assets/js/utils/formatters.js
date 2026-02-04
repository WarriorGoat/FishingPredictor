/**
 * Data formatting utilities
 */

/**
 * Format moon phase percentage to descriptive name
 */
export function getMoonPhaseName(phaseDecimal) {
  const phase = phaseDecimal * 100;

  if (phase < 5) return 'New Moon';
  if (phase < 25) return 'Waxing Crescent';
  if (phase < 35) return 'First Quarter';
  if (phase < 55) return 'Waxing Gibbous';
  if (phase < 65) return 'Full Moon';
  if (phase < 85) return 'Waning Gibbous';
  if (phase < 95) return 'Last Quarter';
  return 'Waning Crescent';
}

/**
 * Get moon phase emoji
 */
export function getMoonEmoji(phaseDecimal) {
  const phase = phaseDecimal * 100;

  if (phase < 5) return '🌑';
  if (phase < 25) return '🌒';
  if (phase < 35) return '🌓';
  if (phase < 55) return '🌔';
  if (phase < 65) return '🌕';
  if (phase < 85) return '🌖';
  if (phase < 95) return '🌗';
  return '🌘';
}

/**
 * Format tide height with unit
 */
export function formatTideHeight(height) {
  return `${parseFloat(height).toFixed(2)} ft`;
}

/**
 * Get tide type class for styling
 */
export function getTideTypeClass(type) {
  return type.toLowerCase() === 'h' ? 'high-tide' : 'low-tide';
}

/**
 * Get tide type label
 */
export function getTideTypeLabel(type) {
  return type.toLowerCase() === 'h' ? 'High' : 'Low';
}

/**
 * Format temperature with degree symbol
 */
export function formatTemperature(temp) {
  return `${Math.round(temp)}°F`;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
