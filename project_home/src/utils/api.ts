// --- START OF FILE api.ts ---

// API utility functions for making requests to the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  isFormData?: boolean;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, isFormData = false } = options;

  const requestHeaders: HeadersInit = { ...headers };

  // Don't set Content-Type for FormData, the browser does it best
  if (!isFormData) {
    requestHeaders["Content-Type"] = "application/json";
  }
  
  // Retrieve token from localStorage for student/admin
  const token = localStorage.getItem("student_token") || localStorage.getItem("admin_token");
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials: "omit", // Use tokens for auth, not cookies
  };

  if (body) {
    requestOptions.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `API error: ${response.statusText}` }));
      // Attach status to the error object for better handling
      const error = new Error(errorData.message || `API error: ${response.status}`);
      (error as any).status = response.status;
      (error as any).data = errorData;
      throw error;
    }

    // Handle cases where the response might be empty (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    }
    return {} as T; // Return empty object for non-json responses

  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// Convenience methods for common HTTP verbs
export const api = {
  get: <T>(endpoint: string, options: Omit<FetchOptions, "method"> = {}) =>
    fetchApi<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    data: any,
    options: Omit<FetchOptions, "method" | "body"> = {}
  ) => fetchApi<T>(endpoint, { ...options, body: data, method: "POST" }),

  put: <T>(
    endpoint:string,
    data: any,
    options: Omit<FetchOptions, "method" | "body"> = {}
  ) => fetchApi<T>(endpoint, { ...options, body: data, method: "PUT" }),

  delete: <T>(endpoint: string, options: Omit<FetchOptions, "method"> = {}) =>
    fetchApi<T>(endpoint, { ...options, method: "DELETE" }),
};
// --- END OF FILE api.ts ---