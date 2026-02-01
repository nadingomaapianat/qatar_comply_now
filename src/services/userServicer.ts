/// <reference types="vite/client" />
const API_BASE_URL  = import.meta.env.VITE_API_URL || "";
function getToken() {
    return localStorage.getItem("token");
}


async function getCsrfToken() {
  const response = await fetch(`${API_BASE_URL}/csrf/token`, { method: "GET", credentials: "include" });
  const data = await response.json();
  return data.csrfToken;
}

export async function validateToken(token: string) {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_BASE_URL}/auth/validate-token`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken,

    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error('Failed to validate token');
  }

const data = await response.json();
  if(data.isSuccess){
    localStorage.setItem('token', data.data.token.accessToken);
  }
  return data;
}


export async function getUserInfo(): Promise<any> {
  const csrfToken = await getCsrfToken();

  const token = getToken();
  if (!token) return null;

  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'GET',
    credentials: "include",
    headers: {
      "Authorization": `Bearer ${token}`,
      'X-CSRF-TOKEN': csrfToken,
    },
  });

  if (!response.ok) {
    console.error("Failed to get user");
    return null;
  }

  const data = await response.json();
  return data?.data;
}

export async function getInfouserById(id: string) {
  try {
    const token = getToken();
    if (!token) {
      console.error("No token found");
      return null;
    }

    const csrfToken = await getCsrfToken();
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-CSRF-TOKEN': csrfToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error("Error in getInfouserById", response.status, await response.text());
      return null;
    }

    const result = await response.json();
    console.log("API Response:", result); // Debug log

    // Handle different response structures
    if (result.data) {
      return result.data;
    } else if (result.user) {
      return result.user;
    } else if (result.id) { // If the response is the user object directly
      return result;
    }

    console.error("Unexpected response structure", result);
    return null;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return null;
  }
}


// services/resetPasswordService.ts
interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export async function resetPassword({
  token,
  newPassword,
  confirmPassword,
}: ResetPasswordPayload): Promise<void> {
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }


  const response =  await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Password reset failed.");
  }
}

interface ResetRegistrationPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export async function resetRegistrationPassword({
  token,
  password,
  confirmPassword,
}: ResetRegistrationPasswordPayload): Promise<any> {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_BASE_URL}/registration-steps/reset-password?token=${token}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ password, confirmPassword }),
  });

  const data = await response.json();
  if (!response.ok || !data.isSuccess) {
    throw new Error(data.message || "Password reset failed.");
  }
  return data;
}

export async function getRegistrationPasswordResetStatus(token: string): Promise<any> {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_BASE_URL}/registration-steps/password-reset-status?token=${token}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  });
  const data = await response.json();
  if (!response.ok || !data.isSuccess) {
    throw new Error(data.message || "Failed to check password reset status.");
  }
  return data;
}

export async function requestRegistrationPasswordReset(email: string): Promise<any> {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_BASE_URL}/registration-steps/forgot-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok || !data.isSuccess) {
    throw new Error(data.message || "Failed to request password reset.");
  }
  return data;
}