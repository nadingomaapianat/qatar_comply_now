/// <reference types="vite/client" />
export const API_BASE_URL = import.meta.env.VITE_API_URL;


async function getCsrfToken(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/csrf/token`, { method: "GET", credentials: "include" });
    const data = await response.json();
    return data.csrfToken;
}
function getToken() {
    return localStorage.getItem("token");
}

export async function getFunctions(): Promise<any> {
    try {
       const token = getToken();
       const csrfToken = await getCsrfToken();

        const headers = {
            "Content-Type": "application/json",
           ...(token ? { Authorization: `Bearer ${token}` } : {}),
           "X-CSRF-TOKEN": csrfToken,
        };
        const response = await fetch(`${API_BASE_URL}/functions/getAll`, {
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


export async function createFunctionApi(body: any): Promise<void> {
    try {
        const token = getToken();
        console.log(token);
        if (!token) {
            throw new Error("Forbidden: You do not have permission to access this resource.");
        }
        const csrfToken = await getCsrfToken();
        const response = await fetch(`${API_BASE_URL}/functions`, {
            credentials: "include" ,method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
            if (response.status === 401 || response.status === 403 || data.message === "Forbidden access") {
                throw new Error("Forbidden: You do not have permission to access this resource.");
            }
            throw new Error("Failed to create");
        }
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateFunctionApi(id: string, body:any): Promise<void> {
    try {
        const token = getToken();
        if (!token) {
            throw new Error("Forbidden: You do not have permission to access this resource.");
        }
        const csrfToken = await getCsrfToken();
        const response = await fetch(`${API_BASE_URL}/functions/${id}`, {
            credentials: "include" ,method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            if (response.status === 401 || response.status === 403 || data.message === "Forbidden access") {
                throw new Error("Forbidden: You do not have permission to access this resource.");
            }
            throw new Error("Failed to create");
        }
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteFunctionApi(id: string): Promise<void> {
    try {
        const token = getToken();
        if (!token) {
            throw new Error("Forbidden: You do not have permission to access this resource.");
        }
        const csrfToken = await getCsrfToken();
        const response = await fetch(`${API_BASE_URL}/functions/${id}`, {
            credentials: "include" ,method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                "X-CSRF-TOKEN": csrfToken,
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            if (response.status === 401 || response.status === 403 || data.message === "Forbidden access") {
                throw new Error("Forbidden: You do not have permission to access this resource.");
            }
            throw new Error("Failed to create");
        }
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function fetchDataApi(url: string, options: RequestInit = {}): Promise<any> {
    const token = getToken();
    console.log(token);
    const csrfToken = await getCsrfToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "X-CSRF-TOKEN": csrfToken,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/${url}`, {
            ...options,
            headers,
            credentials: "include"
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


export async function fetchAllGroupApi(): Promise<any> {
    try {
        const token = getToken();
        const csrfToken = await getCsrfToken();

        const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "X-CSRF-TOKEN": csrfToken,
        };
        const response = await fetch(`${API_BASE_URL}/groups/getAll`, {
            credentials: "include" ,method: "GET",
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