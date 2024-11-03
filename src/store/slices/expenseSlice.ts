import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpenseState {
    expenses: FetchExpensesResponseData | null;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: ExpenseState = {
    expenses: null,
    loading: false,
    error: null,
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        // Fetch Expenses
        fetchExpensesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchExpensesSuccess: (state, action: PayloadAction<FetchExpensesResponseData>) => {
            state.loading = false;
            state.expenses = action.payload;
        },
        fetchExpensesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Create Expense
        createExpenseRequest: (state, action: PayloadAction<CreateExpense>) => {
            state.loading = true;
            state.error = null;
        },
        createExpenseSuccess: (state, action: PayloadAction<ExpenseResponseItem>) => {
            state.loading = false;
            state.expenses?.expenses?.push(action.payload);
        },
        createExpenseFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Update Expense
        updateExpenseRequest: (state, action: PayloadAction<UpdateExpensePayload>) => {
            state.loading = true;
            state.error = null;
        },
        updateExpenseSuccess: (state, action: PayloadAction<ExpenseResponseItem>) => {
            state.loading = false;
            const index = state.expenses?.expenses?.findIndex(
                (expense) => expense.id === action.payload.id
            );
            if (index !== undefined && index !== -1 && state.expenses) {
                state.expenses.expenses[index] = {
                    ...state.expenses.expenses[index],
                    ...action.payload,
                };
            }
        },
        updateExpenseFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Delete Expense
        deleteExpenseRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        deleteExpenseSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            if (state.expenses?.expenses) {
                state.expenses.expenses = state.expenses.expenses.filter(
                    (expense) => expense.id !== action.payload
                );
            }
        },
        deleteExpenseFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchExpensesRequest,
    fetchExpensesSuccess,
    fetchExpensesFailure,
    createExpenseRequest,
    createExpenseSuccess,
    createExpenseFailure,
    updateExpenseRequest,
    updateExpenseSuccess,
    updateExpenseFailure,
    deleteExpenseRequest,
    deleteExpenseSuccess,
    deleteExpenseFailure,
} = expenseSlice.actions;

export default expenseSlice.reducer;