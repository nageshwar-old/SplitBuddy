import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import {
    fetchSettingsSuccess,
    fetchSettingsFailure,
    saveSettingsSuccess,
    saveSettingsFailure,
    fetchSettingsRequest, // Import the fetchSettings action
    saveSettingsRequest, // Import the saveSettings action
} from '@slices/settingsSlice';
import { fetchSettings as fetchSettingsApi, saveSettings as saveSettingsApi } from '@services/settingsService'; // Import your service functions

// Worker Saga: Fetch Settings
function* fetchSettingsSaga(action: ReturnType<typeof fetchSettingsRequest>): Generator<unknown, void, void> {
    try {
        const settings = yield call(fetchSettingsApi, action.payload); // Pass the user ID from action payload
        yield put(fetchSettingsSuccess(settings));
    } catch (error) {
        yield put(fetchSettingsFailure((error as Error).message));
    }
}

// Worker Saga: Save Settings
function* saveSettingsSaga(action: ReturnType<typeof saveSettingsRequest>): Generator<unknown, void, void> {
    try {
        const { userId, settingsData } = action.payload; // Get userId and settings data from action payload
        yield call(saveSettingsApi, userId, settingsData); // Call the saveSettingsApi with userId and settings data
        yield put(saveSettingsSuccess(settingsData)); // Dispatch success action with settings data
        yield put(fetchSettingsRequest(userId)); // Refetch settings after saving
    } catch (error) {
        yield put(saveSettingsFailure((error as Error).message));
    }
}

// Watcher Saga
export default function* settingsSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(fetchSettingsRequest.type, fetchSettingsSaga);
    yield takeLatest(saveSettingsRequest.type, saveSettingsSaga);
}