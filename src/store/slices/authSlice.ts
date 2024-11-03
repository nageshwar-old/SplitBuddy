// @store/slices/authSlice.ts

import { removeData, setData } from '@app/utils/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the AuthState interface directly without importing User from .d.ts
interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    passwordResetSuccess: boolean;
    logoutReason: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    passwordResetSuccess: false,
    logoutReason: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthStatus(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        // Login actions
        loginRequest(state, action: PayloadAction<LoginRequestPayload>) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<AuthData>) {
            state.loading = false;
            state.user = action.payload.userProfile;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
            state.logoutReason = null;
            // console.log('Login success:', action.payload);

            // Store the token in AsyncStorage after login success
            setData('authToken', action.payload.token);
            setData('userId', action.payload.userProfile.id);
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.logoutReason = null;
        },

        // Register actions
        registerRequest(state, action: PayloadAction<RegisterRequestPayload>) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action: PayloadAction<AuthData>) {
            state.loading = false;
            state.user = action.payload.userProfile;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        // Logout actions
        logoutRequest(state) {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.logoutReason = action.payload;

            // Remove the token from AsyncStorage after logout
            removeData('authToken');
        },
        logoutFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Refresh token actions
        refreshTokenRequest(state) {
            state.loading = true;
            state.error = null;
        },
        refreshTokenSuccess(state, action: PayloadAction<AuthData>) {
            state.loading = false;
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                state.token = action.payload.token;
            }
            state.error = null;
        },
        refreshTokenFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Forgot password actions
        forgotPasswordRequest(state, action: PayloadAction<{ email: string }>) {
            state.loading = true;
            state.error = null;
        },
        forgotPasswordSuccess(state) {
            state.loading = false;
            state.passwordResetSuccess = true;
            state.error = null;
        },
        forgotPasswordFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.passwordResetSuccess = false;
        },
        clearError(state) { // New action to clear error
            state.error = null;
        },
    },
});

// Export actions
export const {
    setAuthStatus,
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    refreshTokenRequest,
    refreshTokenSuccess,
    refreshTokenFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    clearError,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors (optional)
export const selectAuth = (state: { auth: AuthState }) => state.auth;