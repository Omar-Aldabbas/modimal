const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, method = "GET", data = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Something went wrong");

  return result;
};
