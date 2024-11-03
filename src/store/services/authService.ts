// @services/authService.ts

import { AUTH_API, authApi, profileApi } from '@config/api';

export const authService = {
    // Login
    login: async (username: string, password: string) => {
        const response = await authApi.post(AUTH_API.LOGIN, { username, password });

        // console.log('response', response);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to log in');
        }

        return response.data.data; // Assuming `data` contains login details
    },

    // Register
    register: async (signupData: RegisterRequestPayload) => {
        const response = await authApi.post(AUTH_API.REGISTER, signupData);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to register');
        }

        return response.data.data; // Assuming `data` contains registration details
    },

    // Logout
    logout: async () => {
        const response = await profileApi.post(AUTH_API.LOGOUT);

        // console.log('logout response', response);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to log out');
        }

        return response.data.data; // Assuming `data` contains any additional info on logout
    },

    // Refresh Token
    refreshToken: async (refreshToken: string) => {
        const response = await authApi.post(AUTH_API.REFRESH_TOKEN, { refreshToken });

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to refresh token');
        }

        return response.data.data; // Assuming `data` contains the new token
    },

    // Forgot Password
    forgotPassword: async (email: string) => {
        const response = await authApi.post(AUTH_API.FORGOT_PASSWORD, { email });

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to send password reset email');
        }

        return response.data.data; // Assuming `data` contains any additional info on the reset
    },
};