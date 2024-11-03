import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

interface SettingsState {
    settingsData: SettingsData | null; // Adjust the type as per your settings structure
    loading: boolean;
    error: string | null;
}

const initialState: SettingsState = {
    settingsData: null,
    loading: false,
    error: null,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        fetchSettingsRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        fetchSettingsSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.settingsData = action.payload;
            state.error = null;
        },
        fetchSettingsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        saveSettingsRequest: (state, action: PayloadAction<{ userId: string; settingsData: any }>) => {
            state.loading = true;
        },
        saveSettingsSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.settingsData = action.payload; // Update settings data with the saved settings
            state.error = null;
        },
        saveSettingsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Export actions
export const {
    fetchSettingsRequest,
    fetchSettingsSuccess,
    fetchSettingsFailure,
    saveSettingsRequest,
    saveSettingsSuccess,
    saveSettingsFailure,
} = settingsSlice.actions;

// Export the reducer
export default settingsSlice.reducer;

export const selectSettingsData = (state: AppState) => state.settings.settingsData;