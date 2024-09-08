import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define Group and Expense interfaces
interface Group {
    id: string;
    name: string;
    currency: string;
    description?: string;
}

interface Expense {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    paymentMethod: string;
    group: string;  // Add group field to expense
}

// Define the state shape for expenses and groups
interface ExpensesState {
    expenses: Expense[];
    groups: Group[];
    loading: boolean;
    error: string | null;
    success: string | null;
}

// Initial state for the expenses slice
const initialState: ExpensesState = {
    expenses: [],
    groups: [],
    loading: false,
    error: null,
    success: null,
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        // Fetch expenses
        fetchExpenses(state) {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        fetchExpensesSuccess(state, action: PayloadAction<Expense[]>) {
            state.loading = false;
            state.expenses = action.payload;
            state.success = 'Expenses fetched successfully';
        },
        fetchExpensesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Add expense
        addExpense(state, action: PayloadAction<Expense>) {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        addExpenseSuccess(state, action: PayloadAction<Expense>) {
            state.loading = false;
            state.expenses.push(action.payload);
            state.success = 'Expense added successfully';
        },
        addExpenseFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Edit expense
        editExpense(state, action: PayloadAction<Expense>) {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        editExpenseSuccess(state, action: PayloadAction<Expense>) {
            state.loading = false;
            const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
            if (index !== -1) {
                state.expenses[index] = action.payload;
                state.success = 'Expense edited successfully';
            }
        },
        editExpenseFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Delete expense
        deleteExpense(state, action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        deleteExpenseSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
            state.success = 'Expense deleted successfully';
        },
        deleteExpenseFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Fetch groups
        fetchGroups(state) {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        fetchGroupsSuccess(state, action: PayloadAction<Group[]>) {
            state.loading = false;
            state.groups = action.payload;
            state.success = 'Groups fetched successfully';
        },
        fetchGroupsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Add group
        addGroup(state, action: PayloadAction<Group>) {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        addGroupSuccess(state, action: PayloadAction<Group>) {
            state.loading = false;
            state.groups.push(action.payload);
            state.success = 'Group added successfully';
        },
        addGroupFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Edit group
        editGroup(state, action: PayloadAction<Group>) {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        editGroupSuccess(state, action: PayloadAction<Group>) {
            state.loading = false;
            const index = state.groups.findIndex(group => group.id === action.payload.id);
            if (index !== -1) {
                state.groups[index] = action.payload;
                state.success = 'Group edited successfully';
            }
        },
        editGroupFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Delete group
        deleteGroup(state, action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        deleteGroupSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.groups = state.groups.filter(group => group.id !== action.payload);
            state.success = 'Group deleted successfully';
        },
        deleteGroupFailure(state, action: PayloadAction<string>) {
            console.log('Error deleting group:', action.payload);
            state.loading = false;
            state.error = action.payload;
            state.success = null;
        },

        // Clear error or success messages
        clearMessages(state) {
            state.error = null;
            state.success = null;
        }
    },
});

export const {
    fetchExpenses,
    fetchExpensesSuccess,
    fetchExpensesFailure,
    addExpense,
    addExpenseSuccess,
    addExpenseFailure,
    editExpense,
    editExpenseSuccess,
    editExpenseFailure,
    deleteExpense,
    deleteExpenseSuccess,
    deleteExpenseFailure,
    fetchGroups,
    fetchGroupsSuccess,
    fetchGroupsFailure,
    addGroup,
    addGroupSuccess,
    addGroupFailure,
    editGroup,
    editGroupSuccess,
    editGroupFailure,
    deleteGroup,
    deleteGroupSuccess,
    deleteGroupFailure,
    clearMessages, // Action to clear error and success messages
} = expenseSlice.actions;

export default expenseSlice.reducer;