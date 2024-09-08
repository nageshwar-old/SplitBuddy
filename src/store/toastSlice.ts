import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the toast state
interface ToastState {
    message: string;
    type: 'success' | 'error';
    visible: boolean;
}

// Initial state for the toast
const initialState: ToastState = {
    message: '',
    type: 'success',
    visible: false,
};

// Create the slice
const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (
            state,
            action: PayloadAction<{ message: string; type: 'success' | 'error' }>
        ) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.visible = true;
        },
        hideToast: (state) => {
            state.visible = false;
        },
    },
});

// Export actions for use in components
export const { showToast, hideToast } = toastSlice.actions;

// Export the reducer to be combined in the store
export default toastSlice.reducer;