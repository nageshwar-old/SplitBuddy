import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentMethodState {
    paymentMethods: PaymentMethodItem[];
    loading: boolean;
    error: string | null;
}

const initialState: PaymentMethodState = {
    paymentMethods: [],
    loading: false,
    error: null,
};

const paymentMethodSlice = createSlice({
    name: 'paymentMethod',
    initialState,
    reducers: {
        // Fetch Payment Methods
        fetchPaymentMethodsRequest: (state) => {
            state.loading = true;
        },
        fetchPaymentMethodsSuccess: (state, action: PayloadAction<PaymentMethodItem[]>) => {
            state.loading = false;
            state.paymentMethods = action.payload;
        },
        fetchPaymentMethodsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Create Payment Method
        createPaymentMethodRequest: (state, action: PayloadAction<CreatePaymentMethod>) => {
            state.loading = true;
        },
        createPaymentMethodSuccess: (state, action: PayloadAction<PaymentMethodItem>) => {
            state.loading = false;
            state.paymentMethods.push(action.payload);
        },
        createPaymentMethodFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Update Payment Method
        updatePaymentMethodRequest: (state, action: PayloadAction<{ paymentMethodId: string; data: Partial<PaymentMethodItem> }>) => {
            state.loading = true;
        },
        updatePaymentMethodSuccess: (state, action: PayloadAction<UpdatePaymentMethod>) => {
            state.loading = false;
            const updatedPaymentMethods = state.paymentMethods.map(pm => {
                if (pm.id === action.payload.id) {
                    return { ...pm, ...action.payload };
                }
                return pm
            });
            state.paymentMethods = updatedPaymentMethods;
        },
        updatePaymentMethodFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Delete Payment Method
        deletePaymentMethodRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        deletePaymentMethodSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.paymentMethods = state.paymentMethods.filter(pm => pm.id !== action.payload);
        },
        deletePaymentMethodFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchPaymentMethodsRequest,
    fetchPaymentMethodsSuccess,
    fetchPaymentMethodsFailure,
    createPaymentMethodRequest,
    createPaymentMethodSuccess,
    createPaymentMethodFailure,
    updatePaymentMethodRequest,
    updatePaymentMethodSuccess,
    updatePaymentMethodFailure,
    deletePaymentMethodRequest,
    deletePaymentMethodSuccess,
    deletePaymentMethodFailure,
} = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;