// --- START OF FILE api.ts ---

// API utility functions for making requests to the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH || '/auth';

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  isFormData?: boolean;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
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
  
  // Retrieve token from localStorage for authenticated requests
  const token = localStorage.getItem("student_token") || localStorage.getItem("admin_token") || localStorage.getItem("teacher_token");
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Construct full URL with base path
  const fullUrl = `${API_BASE_URL}${API_BASE_PATH}${endpoint}`;
  
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials: "omit", // Use tokens for auth, not cookies
  };

  if (body) {
    requestOptions.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    console.log(`Making ${method} request to: ${fullUrl}`);
    const response = await fetch(fullUrl, requestOptions);

    // Clone response to read it multiple times if needed
    const responseClone = response.clone();
    
    let responseData;
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
    } catch (parseError) {
      console.warn("Failed to parse response:", parseError);
      responseData = null;
    }

    if (!response.ok) {
      console.error(`API error ${response.status}:`, responseData);
      
      const error = new Error(responseData?.message || `API error: ${response.status} ${response.statusText}`) as ApiError;
      error.status = response.status;
      error.data = responseData;
      throw error;
    }

    return responseData as T;

  } catch (error) {
    console.error(`API request failed: ${fullUrl}`, error);
    
    // Re-throw ApiError as is
    if ((error as ApiError).status) {
      throw error;
    }
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError = new Error('Network error. Please check if the backend server is running.') as ApiError;
      networkError.status = 0;
      throw networkError;
    }
    
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
    endpoint: string,
    data: any,
    options: Omit<FetchOptions, "method" | "body"> = {}
  ) => fetchApi<T>(endpoint, { ...options, body: data, method: "PUT" }),

  delete: <T>(endpoint: string, options: Omit<FetchOptions, "method"> = {}) =>
    fetchApi<T>(endpoint, { ...options, method: "DELETE" }),
};

// Type definitions for API responses
export interface RegistrationResponse {
  keycloakId: string;
  message: string;
  emailVerificationRequired: boolean;
}

export interface ValidationError {
  [field: string]: string;
}

export interface ErrorResponse {
  status: number;
  title: string;
  detail: string;
  type?: string;
  validationErrors?: ValidationError;
}
// --- END OF FILE api.ts ---