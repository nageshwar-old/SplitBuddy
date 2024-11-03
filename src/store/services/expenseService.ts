// @services/expenseService.ts

import { EXPENSE_API, expensesApi } from '@config/api';

export const expenseService = {
    // Fetch all expenses
    fetchExpenses: async (): Promise<FetchExpensesResponse> => {
        const response = await expensesApi.get(EXPENSE_API.GET_EXPENSES);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to fetch expenses');
        }

        return response.data.data; // Assuming `data` contains the array of expenses
    },

    // Create a new expense
    createExpense: async (expenseData: CreateExpense): Promise<UpsertExpenseResponse> => {
        const response = await expensesApi.post(EXPENSE_API.CREATE_EXPENSE, expenseData);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to create expense');
        }

        return response.data.data; // Assuming `data` contains the created expense
    },

    // Fetch a single expense by ID
    fetchExpenseById: async (expenseId: string): Promise<FetchExpensesResponse> => {
        const response = await expensesApi.get(EXPENSE_API.GET_EXPENSE_BY_ID(expenseId));

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || `Failed to fetch expense with ID: ${expenseId}`);
        }

        return response.data.data; // Assuming `data` contains the expense details
    },

    // Update an existing expense
    updateExpense: async (expenseId: string, expenseData: UpdateExpense): Promise<UpsertExpenseResponse> => {
        const response = await expensesApi.put(EXPENSE_API.UPDATE_EXPENSE(expenseId), expenseData);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || `Failed to update expense with ID: ${expenseId}`);
        }

        return response.data.data; // Assuming `data` contains the updated expense
    },

    // Delete an expense
    deleteExpense: async (expenseId: string): Promise<void> => {
        const response = await expensesApi.delete(EXPENSE_API.DELETE_EXPENSE(expenseId));

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || `Failed to delete expense with ID: ${expenseId}`);
        }
        // No return needed, deletion confirmed if no error is thrown
    },
};