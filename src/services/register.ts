const API_BASE_URL  = import.meta.env.VITE_API_URL || "";

async function getCsrfToken(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/csrf/token`, { method: "GET", credentials: "include" });
    const data = await response.json();
    return data.csrfToken;
  }

export async function sendMagicLinkEmail(email: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send-magic-link`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRF-Token": await getCsrfToken(),
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send magic link');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending magic link:', error);
    throw new Error('Error sending magic link');
  }
}

export async function submitProfileCompletion(data: {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/save-profile-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRF-Token": await getCsrfToken(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit profile data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting profile:', error);
    throw new Error('Error submitting profile');
  }
}


export async function verifyMagicToken(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-magic-token?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": await getCsrfToken(),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid or expired token");
    }

    return await response.json();
  } catch (error) {
    console.error("Token verification error:", error);
    throw new Error("Token verification failed");
  }
}

export async function registerUser(registerData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': await getCsrfToken(),
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Error registering user');
  }
}

export async function linkedinLogin(code: string) {
 
 
  const response = await fetch(`${API_BASE_URL}/auth/linkedin/callback?code=${code}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    
    },
    
  });

  

  const data = await response.json();
 
  return data;
}

export async function getReferences() {
    try {      
        //const token = getToken();
     
        const headers = {
            "Content-Type": "application/json",
         //  ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "X-CSRF-TOKEN": await getCsrfToken(),
           
        };
        const response = await fetch(`${API_BASE_URL}/control-references/control-reference-register`, {
            method: "GET", 
            credentials: "include",
            headers,
        });
  
        const data = await response.json();
        if (!response.ok || !data.success) {
            if (response.status === 401 || response.status === 403 || data.message === "Forbidden access") {
                throw new Error("Forbidden: You do not have permission to access this resource.");
            }
            throw new Error("Failed to fetch");
        }
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
  }