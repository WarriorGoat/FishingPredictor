/**
 * Dropdown/form UI functions
 */

/**
 * Populate state dropdown
 */
export function populateStates(states, selectElement) {
  // Clear existing options
  selectElement.innerHTML = '<option value="">Select a state...</option>';

  // Sort states alphabetically
  const sortedStates = [...states].sort();

  // Add options
  sortedStates.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    selectElement.appendChild(option);
  });
}

/**
 * Populate station dropdown
 */
export function populateStations(stations, selectElement) {
  // Clear existing options
  selectElement.innerHTML = '<option value="">Select a station...</option>';

  // Sort stations by name
  const sortedStations = [...stations].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Add options
  sortedStations.forEach(station => {
    const option = document.createElement('option');
    option.value = station.id;
    option.textContent = station.name;
    option.dataset.lat = station.lat;
    option.dataset.lng = station.lng;
    selectElement.appendChild(option);
  });
}

/**
 * Get selected station data
 */
export function getSelectedStation(selectElement) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];

  if (!selectedOption || !selectedOption.value) {
    return null;
  }

  return {
    id: selectedOption.value,
    name: selectedOption.textContent,
    lat: selectedOption.dataset.lat,
    lng: selectedOption.dataset.lng
  };
}

/**
 * Validate form inputs
 */
export function validateForm(stateSelect, stationSelect) {
  const errors = [];

  if (!stateSelect.value) {
    errors.push('Please select a state');
  }

  if (!stationSelect.value) {
    errors.push('Please select a tide station');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
