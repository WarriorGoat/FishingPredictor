/**
 * Fishing Predictor - Main Application
 * Modern ES6+ refactor with modular architecture
 */

// API imports
import { fetchStations, fetchTides } from './api/noaa.js';
import { fetchWeather } from './api/weather.js';
import { fetchAstronomy } from './api/astronomy.js';

// Utility imports
import {
  getTodayDate,
  getDateDaysFromNow,
  formatDateForAPI
} from './utils/dateHelpers.js';

// UI imports
import {
  showLoading,
  showError,
  disableForm,
  enableForm
} from './ui/loading.js';
import {
  populateStates,
  populateStations,
  getSelectedStation,
  validateForm
} from './ui/dropdowns.js';
import {
  renderTideResults,
  renderWeatherResults,
  renderAstronomyResults
} from './ui/results.js';

// Application state
const state = {
  allStations: [],
  currentStation: null,
  startDate: getTodayDate(),
  endDate: getDateDaysFromNow(7)
};

// DOM elements
const elements = {
  form: document.getElementById('shortTerm'),
  stateSelect: document.getElementById('stateList'),
  stationSelect: document.getElementById('stationList'),
  tidesContainer: document.getElementById('tidesParent'),
  weatherContainer: document.getElementById('weatherParent'),
  astronomyContainer: document.getElementById('moonParent')
};

/**
 * Initialize the application
 */
async function init() {
  try {
    // Show loading state
    showLoading(elements.tidesContainer);
    showLoading(elements.weatherContainer);
    showLoading(elements.astronomyContainer);

    // Fetch stations and populate state dropdown
    state.allStations = await fetchStations();
    const states = extractStates(state.allStations);
    populateStates(states, elements.stateSelect);

    // Clear loading states
    elements.tidesContainer.innerHTML = '<p class="text-muted">Select a location to see tide predictions</p>';
    elements.weatherContainer.innerHTML = '<p class="text-muted">Select a location to see weather forecast</p>';
    elements.astronomyContainer.innerHTML = '<p class="text-muted">Select a location to see moon and sun data</p>';

    // Setup event listeners
    setupEventListeners();

    console.log('✅ Fishing Predictor initialized successfully');
  } catch (error) {
    console.error('❌ Initialization error:', error);
    showError(elements.tidesContainer, 'Failed to load application. Please refresh the page.');
  }
}

/**
 * Extract unique states from stations
 */
function extractStates(stations) {
  const stateSet = new Set();

  stations.forEach(station => {
    if (station.state && station.state.trim() !== '') {
      stateSet.add(station.state);
    } else {
      stateSet.add('Other');
    }
  });

  return Array.from(stateSet);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // State selection
  elements.stateSelect.addEventListener('change', handleStateChange);

  // Station selection
  elements.stationSelect.addEventListener('change', handleStationChange);

  // Form submission
  elements.form.addEventListener('submit', handleFormSubmit);
}

/**
 * Handle state selection change
 */
function handleStateChange(event) {
  const selectedState = event.target.value;

  if (!selectedState) {
    elements.stationSelect.innerHTML = '<option value="">Select a station...</option>';
    return;
  }

  // Filter stations by selected state
  const stateFilter = selectedState === 'Other' ? '' : selectedState;
  const stationsInState = state.allStations.filter(
    station => station.state === stateFilter
  );

  // Populate station dropdown
  populateStations(stationsInState, elements.stationSelect);
}

/**
 * Handle station selection change
 */
function handleStationChange(event) {
  state.currentStation = getSelectedStation(event.target);
}

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  // Validate form
  const validation = validateForm(elements.stateSelect, elements.stationSelect);

  if (!validation.isValid) {
    alert(validation.errors.join('\n'));
    return;
  }

  // Disable form during submission
  disableForm(elements.form);

  try {
    // Show loading states
    showLoading(elements.tidesContainer);
    showLoading(elements.weatherContainer);
    showLoading(elements.astronomyContainer);

    // Format dates for API
    const startDateFormatted = formatDateForAPI(state.startDate);
    const endDateFormatted = formatDateForAPI(state.endDate);

    // Fetch all data in parallel
    const [tides, weather, astronomy] = await Promise.all([
      fetchTides(state.currentStation.id, startDateFormatted, endDateFormatted),
      fetchWeather(state.currentStation.lat, state.currentStation.lng),
      fetchAstronomy(state.currentStation.lat, state.currentStation.lng)
    ]);

    // Render results
    renderTideResults(tides, elements.tidesContainer);
    renderWeatherResults(weather, elements.weatherContainer);
    renderAstronomyResults(astronomy, elements.astronomyContainer);

    console.log('✅ Data loaded successfully');

  } catch (error) {
    console.error('❌ Error loading data:', error);

    // Show error messages
    showError(elements.tidesContainer, error.message);
    showError(elements.weatherContainer, error.message);
    showError(elements.astronomyContainer, error.message);

  } finally {
    // Re-enable form
    enableForm(elements.form);
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
