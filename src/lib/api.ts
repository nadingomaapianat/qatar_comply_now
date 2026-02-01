/**
 * API base URL. In development, when the API is on localhost, we use the Vite proxy
 * path "/api" so requests go same-origin and avoid CORS.
 */
export const API_BASE_URL =
  import.meta.env.DEV && String(import.meta.env.VITE_API_URL || "").includes("localhost")
    ? "/api"
    : (import.meta.env.VITE_API_URL || "");
