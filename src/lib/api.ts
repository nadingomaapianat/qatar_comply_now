/**
 * API base URL. In development, when the API is on localhost, we use the Vite proxy
 * path "/api" so requests go same-origin and avoid CORS.
 * Never use the frontend origin (qatar.comply.now) as API base — use qatarapi.comply.now.
 */
const envApiUrl = import.meta.env.VITE_API_URL || "";
const isLocalhost = import.meta.env.DEV && envApiUrl.includes("localhost");
const isWrongFrontendUrl =
  envApiUrl.includes("qatar.comply.now") && !envApiUrl.includes("qatarapi.comply.now");

export const API_BASE_URL = isLocalhost
  ? "/api"
  : isWrongFrontendUrl
    ? "https://qatarapi.comply.now"
    : envApiUrl || "https://qatarapi.comply.now";
