/**
 * Results display UI functions
 */

import {
  formatDateTime,
  formatTime,
  formatDate
} from '../utils/dateHelpers.js';
import {
  getMoonPhaseName,
  getMoonEmoji,
  formatTideHeight,
  getTideTypeClass,
  getTideTypeLabel
} from '../utils/formatters.js';

/**
 * Render tide results
 */
export function renderTideResults(tides, container) {
  if (!tides || tides.length === 0) {
    container.innerHTML = '<p class="text-muted">No tide data available</p>';
    return;
  }

  const html = tides.map(tide => `
    <li class="list-group-item tide-item ${getTideTypeClass(tide.type)}">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <div class="tide-time">${formatDateTime(tide.t)}</div>
          <div class="tide-type">
            <span class="badge ${tide.type.toLowerCase() === 'h' ? 'bg-primary' : 'bg-secondary'}">
              ${getTideTypeLabel(tide.type)} Tide
            </span>
          </div>
        </div>
        <div class="tide-height">
          ${formatTideHeight(tide.v)}
        </div>
      </div>
    </li>
  `).join('');

  container.innerHTML = html;
}

/**
 * Render weather results
 */
export function renderWeatherResults(periods, container) {
  if (!periods || periods.length === 0) {
    container.innerHTML = '<p class="text-muted">No weather data available</p>';
    return;
  }

  const html = periods.map(period => `
    <li class="list-group-item weather-item">
      <div class="weather-header">
        <strong>${period.name}</strong>
        <span class="temperature">${period.temperature}°${period.temperatureUnit}</span>
      </div>
      <div class="weather-summary">
        <span class="badge bg-info">${period.shortForecast}</span>
      </div>
      <div class="weather-details mt-2">
        <small>${period.detailedForecast}</small>
      </div>
      ${period.windSpeed ? `
        <div class="weather-wind mt-2">
          <small>
            <i class="bi bi-wind"></i>
            Wind: ${period.windSpeed} ${period.windDirection}
          </small>
        </div>
      ` : ''}
    </li>
  `).join('');

  container.innerHTML = html;
}

/**
 * Render astronomy results (moon & sun)
 */
export function renderAstronomyResults(astronomyData, container) {
  if (!astronomyData || astronomyData.length === 0) {
    container.innerHTML = '<p class="text-muted">No astronomy data available</p>';
    return;
  }

  const html = astronomyData.map(day => {
    const sunrise = new Date(day.sunrise);
    const sunset = new Date(day.sunset);
    const moonPhase = day.moonphase * 100;

    return `
      <li class="list-group-item astronomy-item">
        <div class="astronomy-date">
          <strong>${formatDate(day.datetimeStr)}</strong>
        </div>
        <div class="astronomy-details mt-2">
          <div class="sun-times">
            <div>
              <i class="bi bi-sunrise"></i>
              <small>Sunrise: ${formatTime(sunrise)}</small>
            </div>
            <div>
              <i class="bi bi-sunset"></i>
              <small>Sunset: ${formatTime(sunset)}</small>
            </div>
          </div>
          <div class="moon-phase mt-2">
            <span class="moon-emoji">${getMoonEmoji(day.moonphase)}</span>
            <span class="moon-name">${getMoonPhaseName(day.moonphase)}</span>
            <small class="text-muted">(${moonPhase.toFixed(0)}% illuminated)</small>
          </div>
        </div>
      </li>
    `;
  }).join('');

  container.innerHTML = html;
}
