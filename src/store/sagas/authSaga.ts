import { call, put, takeLatest } from 'redux-saga/effects';
import { authService } from '@store/services/authService';
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
} from '@store/slices/authSlice';

// Import additional actions for fetching required data
import { fetchCategoriesRequest } from '@store/slices/categorySlice';
import { fetchGroupsRequest } from '@store/slices/groupSlice';
import { fetchPaymentMethodsRequest } from '@store/slices/paymentMethodSlice';
import { fetchSettingsRequest } from '@store/slices/settingsSlice';
import { fetchExpensesRequest } from '@store/slices/expenseSlice';
import { fetchProfileRequest } from '@store/slices/userSlice';
import { navigate } from '@app/utils/navigationService';

// Login Saga
function* login(action: ReturnType<typeof loginRequest>): Generator<any, void, any> {
    // console.log('Login saga triggered with action:', action);
    try {
        const data: AuthData = yield call(authService.login, action.payload.username, action.payload.password);
        // console.log('Login successful, received data:', data);
        yield put(loginSuccess(data));

        // Trigger additional data fetching after successful login
        yield put(fetchCategoriesRequest());
        yield put(fetchGroupsRequest());
        yield put(fetchPaymentMethodsRequest());
        yield put(fetchSettingsRequest(data.userProfile.id)); // Assuming userId is available in login response
        yield put(fetchExpensesRequest());
        yield put(fetchProfileRequest({ username: data.userProfile.id }));
        navigate('App', { screen: 'Dashboard' });
    } catch (error: any) {
        // console.error('Login failed with error:', JSON.stringify(error));
        yield put(loginFailure(error.response?.data?.message || 'Login failed. Please try again.'));
    }
}

// Register Saga
function* register(action: ReturnType<typeof registerRequest>): Generator<any, void, any> {
    // console.log('Register saga triggered with action:', action);
    try {
        const data: AuthData = yield call(authService.register, action.payload);
        // console.log('Registration successful, received data:', data);
        yield put(registerSuccess(data));
    } catch (error: any) {
        // console.error('Registration failed with error:', error);
        yield put(registerFailure(error.response?.data?.message || 'Registration failed. Please try again.'));
    }
}

// Logout Saga
function* logout(action: ReturnType<typeof logoutRequest>): Generator<any, void, any> {
    // console.log('Logout saga triggered');
    try {
        yield call(authService.logout);
        // console.log('Logout successful');
        yield put(logoutSuccess('Logout successful'));
        navigate('Auth', { screen: 'Login' });
    } catch (error: any) {
        // console.error('Logout failed with error:', error);
        yield put(logoutFailure(error.response?.data?.message || 'Logout failed. Please try again.'));
    }
}

// Forgot Password Saga
function* forgotPassword(action: ReturnType<typeof forgotPasswordRequest>): Generator<any, void, any> {
    // console.log('Forgot Password saga triggered with action:', action);
    try {
        yield call(authService.forgotPassword, action.payload.email);
        // console.log('Forgot password request successful');
        yield put(forgotPasswordSuccess());
    } catch (error: any) {
        // console.error('Forgot password request failed with error:', error);
        yield put(forgotPasswordFailure(error.response?.data?.message || 'Failed to reset password.'));
    }
}

// Watcher Saga
export default function* authSaga() {
    // console.log('Starting auth saga watchers');
    yield takeLatest(loginRequest.type, login);
    yield takeLatest(registerRequest.type, register);
    yield takeLatest(logoutRequest.type, logout);
    yield takeLatest(forgotPasswordRequest.type, forgotPassword);
}