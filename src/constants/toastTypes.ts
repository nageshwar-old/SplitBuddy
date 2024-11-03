// @constants/toastTypes.ts
export interface ToastOptions {
    message: string;
    type: 'success' | 'error' | 'info'; // Adjust types as needed
    position?: 'top' | 'bottom'; // Add position property
}