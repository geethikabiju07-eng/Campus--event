
const API_URL = (
  import.meta.env.VITE_API_URL || "https://campus-event-pkwi.onrender.com/api"
).replace(/\/$/, "");

export async function api(path, options = {}) {
  const token = localStorage.getItem("campusconnect_token");

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      "Cannot reach the server. Check your connection and API URL."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed. Please try again.");
  }

  return data;
}
