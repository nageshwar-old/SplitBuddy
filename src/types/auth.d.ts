// @types/app.d.ts

interface User {
    id: string;                   // User ID
    username: string;             // Username
    email: string;                // User email
    firstName: string;            // First name
    lastName?: string;            // Last name (optional)
    middleName?: string;          // Middle name (optional)
    phone?: string;               // Phone number (optional)
    dateOfBirth?: string;         // Date of birth (optional)
    gender?: string;              // Gender (optional)
    nationality?: string;         // Nationality (optional)
    address?: string;             // Address (optional)
    city?: string;                // City (optional)
    state?: string;               // State (optional)
    country?: string;             // Country (optional)
    zipCode?: string;             // ZIP code (optional)
    securityQuestion?: string;    // Security question (optional)
    securityAnswer?: string;      // Security answer (optional)
    facebookProfileUrl?: string;  // Facebook URL (optional)
    twitterProfileUrl?: string;   // Twitter URL (optional)
    linkedinProfileUrl?: string;  // LinkedIn URL (optional)
    githubProfileUrl?: string;    // GitHub URL (optional)
    websiteUrl?: string;          // Personal website URL (optional)
    clientId?: string;            // Client ID (optional)
    appId?: string;               // App ID (optional)
    profilePicture?: string;      // Profile picture URL (optional)
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    passwordResetSuccess: boolean; // State to track password reset success
}

interface ApiError {
    message: string;
    status: string;
    data?: any; // Optional to allow for flexibility
}

interface LoginAction {
    type: string; // Use the specific action type here, e.g., AuthActionTypes.LOGIN_REQUEST
    payload: {
        email: string;
        password: string;
    };
}

interface RegisterAction {
    type: string; // Use the specific action type here, e.g., AuthActionTypes.REGISTER_REQUEST
    payload: User; // Assuming you send the whole User object for registration
}

interface LogoutAction {
    type: string; // Use the specific action type here, e.g., AuthActionTypes.LOGOUT_REQUEST
}

interface RefreshTokenAction {
    type: string; // Use the specific action type here, e.g., AuthActionTypes.REFRESH_TOKEN_REQUEST
    payload: {
        refreshToken: string; // Assuming the refresh token is passed in the payload
    };
}

interface ForgotPasswordAction {
    type: string; // Use the specific action type here, e.g., AuthActionTypes.FORGOT_PASSWORD_REQUEST
    payload: {
        email: string; // Email for password reset
    };
}

// New AuthResponse interface added here
interface AuthData {
    userProfile: User; // Assuming the user profile structure matches User interface
    token: string; // JWT or token string
}

interface AuthResponse extends ApiResponse {
    data: AuthData;
}

interface LoginRequestPayload {
    username: string;
    password: string;
}

interface RegisterRequestPayload {
    firstName: string;
    lastName?: string;
    email: string;
    username: string;
    password: string;
    country?: string;
}

interface LoginAction {
    type: AuthActionTypes.LOGIN_REQUEST;
    payload: {
        email: string;
        password: string;
    };
}

// Add additional action interfaces as needed