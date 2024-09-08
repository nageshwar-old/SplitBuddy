import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsService } from '@services/settingsService'; // Import the service for fetching/updating settings
import {
    fetchSettings,
    fetchSettingsSuccess,
    fetchSettingsFailure,
    updateVisibleCategories,
    updateVisiblePaymentMethods,
    updateSettingsSuccess,
    updateSettingsFailure,
} from '@store/settingsSlice';

// Fetch settings saga
function* fetchSettingsSaga() {
    try {
        const visibleCategories: { [key: string]: boolean } = yield call(SettingsService.getVisibleCategories);
        const visiblePaymentMethods: { [key: string]: boolean } = yield call(SettingsService.getVisiblePaymentMethods);

        yield put(fetchSettingsSuccess({ visibleCategories, visiblePaymentMethods }));
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchSettingsFailure(error.message));
        } else {
            yield put(fetchSettingsFailure('An unknown error occurred while fetching settings.'));
        }
    }
}

// Update visible categories saga
function* updateVisibleCategoriesSaga(action: PayloadAction<{ [key: string]: boolean }>) {
    try {
        yield call(SettingsService.setVisibleCategories, action.payload);
        yield put(updateSettingsSuccess());
    } catch (error) {
        if (error instanceof Error) {
            yield put(updateSettingsFailure(error.message));
        } else {
            yield put(updateSettingsFailure('An unknown error occurred while updating visible categories.'));
        }
    }
}

// Update visible payment methods saga
function* updateVisiblePaymentMethodsSaga(action: PayloadAction<{ [key: string]: boolean }>) {
    try {
        yield call(SettingsService.setVisiblePaymentMethods, action.payload);
        yield put(updateSettingsSuccess());
    } catch (error) {
        if (error instanceof Error) {
            yield put(updateSettingsFailure(error.message));
        } else {
            yield put(updateSettingsFailure('An unknown error occurred while updating visible payment methods.'));
        }
    }
}

// Watch for settings-related actions
export default function* settingsSagas() {
    yield takeEvery(fetchSettings.type, fetchSettingsSaga);
    yield takeEvery(updateVisibleCategories.type, updateVisibleCategoriesSaga);
    yield takeEvery(updateVisiblePaymentMethods.type, updateVisiblePaymentMethodsSaga);
}