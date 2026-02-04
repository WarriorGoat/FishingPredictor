/**
 * Loading state UI functions
 */

/**
 * Show loading spinner in a container
 */
export function showLoading(container) {
  container.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted">Loading data...</p>
    </div>
  `;
}

/**
 * Show error message in a container
 */
export function showError(container, message) {
  container.innerHTML = `
    <div class="alert alert-danger" role="alert">
      <i class="bi bi-exclamation-triangle-fill"></i>
      <strong>Error:</strong> ${message}
    </div>
  `;
}

/**
 * Show empty state message
 */
export function showEmptyState(container, message) {
  container.innerHTML = `
    <div class="empty-state text-muted">
      <i class="bi bi-inbox"></i>
      <p>${message}</p>
    </div>
  `;
}

/**
 * Clear container content
 */
export function clearContainer(container) {
  container.innerHTML = '';
}

/**
 * Disable form during submission
 */
export function disableForm(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const inputs = form.querySelectorAll('select, input');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    `;
  }

  inputs.forEach(input => input.disabled = true);
}

/**
 * Enable form after submission
 */
export function enableForm(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const inputs = form.querySelectorAll('select, input');

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
  }

  inputs.forEach(input => input.disabled = false);
}
