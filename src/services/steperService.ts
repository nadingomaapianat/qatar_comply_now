/// <reference types="vite/client" />
import { API_BASE_URL } from "@/lib/api";

function getToken(): string | null {
  return localStorage.getItem("token") || localStorage.getItem("accessToken");
}

async function getCsrfToken(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/csrf/token`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data.csrfToken;
}

// Step 1 - Start registration
// Requires CSRF token
export async function initiateRegistration(email: string): Promise<any> {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}/registration-steps/initiate`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return data;
}

// Step 2 - Check status (GET with token in query; backend only supports GET for this route)
export async function getRegistrationStatus(token: string): Promise<any> {
  try {
    const csrfToken = await getCsrfToken();
    const response = await fetch(
      `${API_BASE_URL}/registration-steps/status?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      let data: any;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: "Invalid response from server" };
      }
      throw new Error(data?.message || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to the server. Please check that the backend is running and try again."
      );
    }
    throw err;
  }
}

// Step 3 - Verify email
// Requires CSRF token
export async function verifyEmail(token: string): Promise<any> {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}/registration-steps/verify/${token}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  });

  const data = await response.json();
  return data;
}

// Step 4 - Submit personal info
// Requires CSRF token
export async function submitPersonalInfo(
  token: string,
  payload: {
    username: string;
    password: string;
    confirmPassword: string;
  }
): Promise<any> {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}/registration-steps/personal-info?token=${token}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
}

// Step 5 - Submit organization info
// Requires CSRF token
export async function submitOrganizationInfo(token: string, payload: {
  tenantName: string;
  industry?: string;
  country: string;
  website: string;
  objectiveId?: string;
  companyData?: any[];
  businessObjectives?: any[];
  complianceFrameworks?: any[];
}): Promise<any> {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}/registration-steps/organization-info?token=${token}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  return result;
}

// Step 6 - Submit objective info and complete registration
// Requires CSRF token
export async function submitObjectiveInfo(token: string, data: any[]): Promise<any> {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}/registration-steps/objective-info?token=${token}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ data }),
  });

  const result = await response.json();

  if (result.isSuccess && result.data?.token) {
    localStorage.setItem("token", result.data.token);
  }

  return result;
}



// Optional - Resend email if token expired
// Requires CSRF token
export async function resendRegistrationEmail(token: string): Promise<any> {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}/registration-steps/resend-email?token=${token}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  });

  const data = await response.json();
  return data;
}
// start assessment

export async function startAssessment(token: string): Promise<any> {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}/registration-steps/start-assessment?token=${token}`, {
     method: "POST",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  });

  const data = await response.json();
  return data;
}



export async function endAssessment(token: string): Promise<any> {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}/registration-steps/end-assessment?token=${token}`, {
     method: "POST",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  });

  const data = await response.json();
  return data;
}

