// @services/paymentMethodService.ts

import { PAYMENT_API, expensesApi } from '@config/api';

export const paymentMethodService = {
    // Fetch all payment methods
    fetchPaymentMethods: async (): Promise<PaymentMethodItem[]> => {
        const response = await expensesApi.get(PAYMENT_API.GET_PAYMENT_METHODS);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to fetch payment methods');
        }

        return response.data.data; // Assuming `data` contains the array of payment methods
    },

    // Create a new payment method
    createPaymentMethod: async (paymentMethodData: CreatePaymentMethod): Promise<PaymentMethodItem> => {
        const response = await expensesApi.post(PAYMENT_API.ADD_PAYMENT_METHOD, paymentMethodData);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to create payment method');
        }

        return response.data.data; // Assuming `data` contains the created payment method
    },

    // Update a payment method
    updatePaymentMethod: async (paymentMethodId: string, paymentMethodData: UpdatePaymentMethod): Promise<PaymentMethodItem> => {
        const response = await expensesApi.put(PAYMENT_API.UPDATE_PAYMENT_METHOD(paymentMethodId), paymentMethodData);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || `Failed to update payment method with ID: ${paymentMethodId}`);
        }

        return response.data.data; // Assuming `data` contains the updated payment method
    },

    // Delete a payment method
    deletePaymentMethod: async (paymentMethodId: string): Promise<void> => {
        const response = await expensesApi.delete(PAYMENT_API.DELETE_PAYMENT_METHOD(paymentMethodId));

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || `Failed to delete payment method with ID: ${paymentMethodId}`);
        }
        // No return needed, deletion confirmed if no error is thrown
    },
};