// Common API Response interface
interface ApiResponse {
    success: boolean; // Indicates if the request was successful
    message?: string; // Optional message, typically for errors
}