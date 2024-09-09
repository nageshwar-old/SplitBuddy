import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure, logout, forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailure } from './authSlice';
import { setData, removeData } from '@utils/storage'; // Ensure correct imports
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '@services/authService';
import { User } from '@services/userService';

const TOKEN_KEY = 'authToken';

// Worker Saga: Login
function* loginSaga(action: PayloadAction<{ identifier: string; password: string }>) {
    try {
        const { identifier, password } = action.payload;

        // Call AuthService to authenticate
        const user: User | null = yield call(AuthService.login, identifier, password);

        if (user) {
            // Ensure token is a string (handle undefined case)
            const token = user.token || '';
            yield call(setData, TOKEN_KEY, token); // Store token in local storage
            yield put(loginSuccess({ user, token })); // Pass token as a string
        } else {
            yield put(loginFailure('Invalid credentials'));
        }
    } catch (error) {
        yield put(loginFailure('Login failed. Please try again.'));
    }
}

// Worker Saga: Logout
function* logoutSaga() {
    try {
        yield call(removeData, TOKEN_KEY); // Remove token from local storage
        yield put(logout());
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

// Worker Saga: Forgot Password
function* forgotPasswordSaga(action: PayloadAction<{ email: string }>) {
    try {
        yield put(forgotPasswordStart());

        // Call AuthService to handle forgot password (replace with actual service call)
        // yield call(AuthService.forgotPassword, action.payload.email);

        // Simulate success response (in actual implementation, call AuthService)
        yield put(forgotPasswordSuccess());
    } catch (error) {
        yield put(forgotPasswordFailure('Failed to send password reset link.'));
    }
}

// Watcher Saga: Watches for login, logout, and forgot password actions
function* authSaga() {
    yield takeLatest('auth/loginStart', loginSaga);
    yield takeLatest('auth/logout', logoutSaga);
    yield takeLatest('auth/forgotPassword', forgotPasswordSaga);
}

export default authSaga;