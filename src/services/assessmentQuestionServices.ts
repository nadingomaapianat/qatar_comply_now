/// <reference types="vite/client" />
export const API_BASE_URL = import.meta.env.VITE_API_URL;


async function getCsrfToken(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/csrf/token`, { method: "GET", credentials: "include" });
    const data = await response.json();
    return data.csrfToken;
}
function getToken() {
  // Prefer authToken, fallback to token
  return  localStorage.getItem("token");
}

// Function to fetch all data
export async function fetchAllDataApi(): Promise<any> {
  const token = getToken();
  try {
// Example token retrieval

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "X-CSRF-Token": await getCsrfToken(), 
    };

    const response = await fetch(`${API_BASE_URL}/questions/`, {
      credentials: "include",
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 || response.status === 403 || data.message === "Forbidden access") {
        throw new Error("Forbidden: You do not have permission to access this resource.");
      }
      throw new Error(`Fetch failed: ${data.message || "Unknown error occurred"}`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch data.");
  }
}


// userDataService - GET with Bearer token (if backend supports POST /questions/user-data with body { token }, use that to avoid 431 with large JWTs)

export async function fetchAllQuestionUserData(): Promise<any> {
  const token = getToken();
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      "X-CSRF-Token": await getCsrfToken(),
    };

    const response = await fetch(`${API_BASE_URL}/questions/user-data`, {
      credentials: "include",
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 || response.status === 403 || data.message === "Forbidden access") {
        throw new Error("Forbidden: You do not have permission to access this resource.");
      }
      throw new Error(`Fetch failed: ${data.message || "Unknown error occurred"}`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch data.");
  }
}



export async function submitAnswersApi(data: any) {
  const token = getToken();
  try {
    const response = await fetch(`${API_BASE_URL}/answers/submit`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRF-Token': await getCsrfToken(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit answers. Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error;
  }
}


