const API_BASE_URL: string = import.meta.env.VITE_BACKEND_API_ENDPOINT; // Replace with your API's base URL

/**
 * A wrapper around the native fetch API.
 * @param {string} endpoint The API endpoint (e.g., '/users/1').
 * @param {RequestInit} [customConfig] Custom fetch options (method, headers, body, etc.).
 * @returns {Promise<object>} The parsed JSON data.
 */
export async function apiFetch<T>(endpoint: string, customConfig: RequestInit = {}): Promise<T> {
  const config = {
    method: 'GET', // Default to GET
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...customConfig.headers,
    },
  };

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, config);

    // native fetch only rejects on network errors, not HTTP errors (4xx/5xx)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    // Handle cases where response body might be empty (e.g., a DELETE request)
    const data = await response.json().catch(() => null);
    return data;

  } catch (error) {
    // Log the error and re-throw it so calling functions can catch it
    console.error('API fetch error:', error);
    return Promise.reject(error);
  }
}

// Example usage:
// apiFetch('/users/42')
//   .then(userData => console.log(userData))
//   .catch(error => console.error(error));

// Example usage with POST:
// apiFetch('/users', {
//   method: 'POST',
//   body: JSON.stringify({ name: 'John Doe' }),
// }).then(newUser => console.log(newUser));
