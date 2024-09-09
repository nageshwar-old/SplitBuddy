import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@services/userService';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    passwordResetSuccess: boolean; // New state to track password reset success
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    passwordResetSuccess: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state, action: PayloadAction<{ identifier: string; password: string }>) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },

        // Forgot Password Reducers
        forgotPasswordStart(state) {
            state.loading = true;
            state.error = null;
            state.passwordResetSuccess = false;
        },
        forgotPasswordSuccess(state) {
            state.loading = false;
            state.passwordResetSuccess = true;
        },
        forgotPasswordFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setUser,
    setError,
    clearError,
    forgotPasswordStart,
    forgotPasswordSuccess,
    forgotPasswordFailure, // New actions for forgot password flow
} = authSlice.actions;

export default authSlice.reducer;