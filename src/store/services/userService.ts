// @services/userService.ts

import { USER_API, profileApi, usersApi } from '@config/api';

export const userService = {
    getProfile: async (username: string) => {
        const response = await profileApi.get(USER_API.GET_USER_PROFILE(username));
        if (response.data.status !== 'success') {
            throw new Error(response.data.message || `Failed to fetch profile for user ID: ${username}`);
        }
        return response.data.data;
    },

    updateProfile: async (username: string, data: any) => {
        const response = await profileApi.put(USER_API.UPDATE_PROFILE(username), data);
        if (response.data.status !== 'success') {
            throw new Error(response.data.message || `Failed to update profile for user ID: ${username}`);
        }
        return response.data.data;
    },

    getProfileByUsername: async (username: string) => {
        const response = await profileApi.get(USER_API.PROFILE_BY_USERNAME(username));
        if (response.data.status !== 'success') {
            throw new Error(response.data.message || `Failed to fetch profile for username: ${username}`);
        }
        return response.data.data;
    },

    getUsers: async (options: { fields?: string[], appId?: string, clientId?: string } = {}) => {
        // Filter out undefined or empty values from params
        const params = Object.fromEntries(
            Object.entries({
                fields: options.fields ? options.fields.join(',') : undefined,
                appId: options.appId || undefined,
                clientId: options.clientId || undefined,
            }).filter(([_, value]) => value !== undefined)
        );

        const response = await usersApi.get(USER_API.GET_USERS, { params });

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to fetch users.');
        }

        return response.data.data;
    },
};