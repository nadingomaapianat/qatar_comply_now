/// <reference types="vite/client" />
export const API_BASE_URL = import.meta.env.VITE_API_URL;


export const getInformationUserRegister = async (
  formData: any
) => {
  try {
    const response = await fetch(
      "https://n8nio.pianat.ai/webhook/scout_agent_qa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_data: formData }), // Changed to send as user_data object
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to fetch company information");
    }

    const result = await response.json();
    if (!result[0]) {
      throw new Error("Invalid response structure");
    }

    return {
      success: true,
      companyData: result[0],
    };
  } catch (error: any) {
    return {
      success: false,
      message: error instanceof Error 
        ? error.message 
        : "Unexpected error during company info fetch",
    };
  }
};


export const getObjectiveInfoRegister = async (
  formData: any
) => {
  try {
    const response = await fetch(
      "https://n8nio.pianat.ai/webhook/2d55a552-14f1-4058-930d-3e7d08e840f8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }), // Changed to send as user_data object
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to fetch company information");
    }

    const result = await response.json();

    if (!result[0]?.output) {
      throw new Error("Invalid response structure");
    }

    return {
      success: true,
      companyData: result[0].output,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error instanceof Error 
        ? error.message 
        : "Unexpected error during company info fetch",
    };
  }
};



    export async function getMappedObjectives(data: any) {
  try {
    const response = await fetch(
      "https://n8nio.pianat.ai/webhook/60f7bc39-248f-4b01-a3ab-bb28d2e1308f",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );

    if (!response.ok) {
      throw new Error(`Mapper Agent failed with status: ${response.status}`);
    }

    const result = await response.json();
    return result; // Expecting output[], data_sources[]
  } catch (error) {
    console.error("Error calling Mapper Agent:", error);
    throw error;
  }
}

async function getCsrfToken(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/csrf/token`, { method: "GET", credentials: "include" });
    const data = await response.json();
    return data.csrfToken;
}
function getToken() {
  // Prefer authToken, fallback to token
  return  localStorage.getItem("token");
}


export async function fetchEntitiesByName(name: string): Promise<any[]> {
  if (!name || name.trim() === "") {
    // Don't call API with empty name, return empty array
    return [];
  }
  const token = getToken();
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "X-CSRF-Token": await getCsrfToken(),
    };
    const response = await fetch(`${API_BASE_URL}/entities/search?name=${encodeURIComponent(name)}`, {
      credentials: "include",
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch entities. Status: ${response.status}`);
    }

    const result = await response.json();
    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      console.warn('Unexpected data format:', result);
      return [];
    }
  } catch (error) {
    console.error('Error fetching entities:', error);
    throw new Error('Error fetching entities');
  }
}
