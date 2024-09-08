import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state shape for settings
interface SettingsState {
    visibleCategories: { [key: string]: boolean }; // Visible categories based on their IDs
    visiblePaymentMethods: { [key: string]: boolean }; // Visible payment methods based on their IDs
    loading: boolean;
    error: string | null;
    success: string | null;
}

// Initial state for the settings slice
const initialState: SettingsState = {
    visibleCategories: {},
    visiblePaymentMethods: {},
    loading: false,
    error: null,
    success: null,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        // Fetch settings
        fetchSettings(state) {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        fetchSettingsSuccess(state, action: PayloadAction<{ visibleCategories: { [key: string]: boolean }, visiblePaymentMethods: { [key: string]: boolean } }>) {
            state.loading = false;
            state.visibleCategories = action.payload.visibleCategories;
            state.visiblePaymentMethods = action.payload.visiblePaymentMethods;
            state.success = 'Settings fetched successfully';
        },
        fetchSettingsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Update settings
        updateVisibleCategories(state, action: PayloadAction<{ [key: string]: boolean }>) {
            state.visibleCategories = action.payload;
        },
        updateVisiblePaymentMethods(state, action: PayloadAction<{ [key: string]: boolean }>) {
            state.visiblePaymentMethods = action.payload;
        },
        updateSettingsSuccess(state) {
            state.loading = false;
            state.success = 'Settings updated successfully';
        },
        updateSettingsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Clear error or success messages
        clearSettingsMessages(state) {
            state.error = null;
            state.success = null;
        },
    },
});

export const {
    fetchSettings,
    fetchSettingsSuccess,
    fetchSettingsFailure,
    updateVisibleCategories,
    updateVisiblePaymentMethods,
    updateSettingsSuccess,
    updateSettingsFailure,
    clearSettingsMessages,
} = settingsSlice.actions;

export default settingsSlice.reducer;