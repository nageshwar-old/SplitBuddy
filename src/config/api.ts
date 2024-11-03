import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getData, removeData } from '@utils/storage';
import { navigate } from '@utils/navigationService';
import { logoutSuccess } from '@store/slices/authSlice';
import store from '@app/store/store';

const DEV_IP = "192.168.1.125";
const PROD_URL = 'https://alnlabs.com/api';

const isDev = process.env.NODE_ENV === 'development';
const AUTH_BASE_URL = isDev ? `http://${DEV_IP}:7501/api` : `${PROD_URL}`;
const USERS_BASE_URL = isDev ? `http://${DEV_IP}:7501/api` : `${PROD_URL}`;
const EXPENSES_BASE_URL = isDev ? `http://${DEV_IP}:7502/api` : `${PROD_URL}`;

// Axios Instances
const authApi = axios.create({ baseURL: AUTH_BASE_URL, timeout: 10000 });
const profileApi = axios.create({ baseURL: AUTH_BASE_URL, timeout: 10000 });
const usersApi = axios.create({ baseURL: USERS_BASE_URL, timeout: 10000 });
const expensesApi = axios.create({ baseURL: EXPENSES_BASE_URL, timeout: 10000 });

const addAuthToken = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await getData<string>('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

// Attach token interceptor
profileApi.interceptors.request.use(addAuthToken);
usersApi.interceptors.request.use(addAuthToken);
expensesApi.interceptors.request.use(addAuthToken);

const handleLogout = async (reason: string = 'Session expired'): Promise<void> => {
    await removeData('authToken');
    store.dispatch(logoutSuccess(reason));
    navigate('Auth', { screen: 'Login' });
};

const handleAuthError = async (error: any): Promise<never> => {
    if (error.response?.status === 401) {
        await handleLogout('Session expired');
    }
    return Promise.reject(error);
};

// Attach response interceptors for error handling
authApi.interceptors.response.use((response: AxiosResponse) => response, handleAuthError);
expensesApi.interceptors.response.use((response: AxiosResponse) => response, handleAuthError);

// Authentication API Endpoints
export const AUTH_API = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
};

// User API Endpoints
export const USER_API = {
    GET_USER_PROFILE: (username: string) => `/profile/${username}`,
    UPDATE_PROFILE: (username: string) => `/profile/${username}`,
    PROFILE_BY_USERNAME: (username: string) => `/username/${username}`,
    GET_USERS: '/users',
};

// Expense API Endpoints
export const EXPENSE_API = {
    CREATE_EXPENSE: '/expenses/create',
    GET_EXPENSES: '/expenses',
    GET_EXPENSE_BY_ID: (expenseId: string) => `/expenses/${expenseId}`,
    DELETE_EXPENSE: (expenseId: string) => `/expenses/${expenseId}/delete`,
    UPDATE_EXPENSE: (expenseId: string) => `/expenses/${expenseId}/update`,
    ADD_GROUP: '/groups/create',
    GET_GROUPS: '/groups',
    GET_GROUP_BY_ID: (groupId: string) => `/groups/${groupId}`,
    DELETE_GROUP: (groupId: string) => `/groups/${groupId}/delete`,
    UPDATE_GROUP: (groupId: string) => `/groups/${groupId}/update`,
};

// Category API Endpoints
export const CATEGORY_API = {
    GET_CATEGORIES: '/categories',
    ADD_CATEGORY: '/categories/create',
    DELETE_CATEGORY: (categoryId: string) => `/categories/${categoryId}/delete`,
    UPDATE_CATEGORY: (categoryId: string) => `/categories/${categoryId}/update`,
};

// Payment API Endpoints
export const PAYMENT_API = {
    GET_PAYMENT_METHODS: '/payment-methods',
    ADD_PAYMENT_METHOD: '/payment-methods/create',
    DELETE_PAYMENT_METHOD: (paymentMethodId: string) => `/payment-methods/${paymentMethodId}/delete`,
    UPDATE_PAYMENT_METHOD: (paymentMethodId: string) => `/payment-methods/${paymentMethodId}/update`,
};

// Settings API Endpoints
export const SETTINGS_API = {
    GET_SETTINGS: (userId: string) => `/settings/${userId}`,
    SAVE_SETTINGS: (userId: string) => `/settings/${userId}`,
};

// Export Axios instances for API use
export { authApi, profileApi, expensesApi, usersApi };