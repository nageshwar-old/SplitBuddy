// @slices/toastSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastOptions } from '@constants/toastTypes';

interface ToastState {
    toast: ToastOptions | null; // Updated to reflect the toast options structure
}

const initialState: ToastState = {
    toast: null,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<ToastOptions>) => {
            state.toast = {
                ...action.payload,
                position: action.payload.position || 'bottom', // Set default position to bottom
            };
        },
        hideToast: (state) => {
            state.toast = null; // Clear toast options
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;