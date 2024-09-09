import { getData, setData, removeData } from '@utils/storage'; // Ensure the imports are correct

const EXPENSES_KEY = 'expenses';
const GROUPS_KEY = 'groups'; // New key for groups

export interface Group {
    id: string;
    name: string;
    currency: string;
    description?: string;
}

// Define the structure of an Expense object with addedBy field
export interface Expense {
    id: string;                // Unique identifier for the expense
    amount: number;            // Amount of the expense
    category: string;          // Category under which the expense falls (e.g., Food, Transport)
    description: string;       // Description or note about the expense
    date: string;              // Date when the expense was made, stored as an ISO string
    paymentMethod: string;     // Method of payment (e.g., Cash, Credit Card)
    group: string;             // Group ID or name to which the expense belongs
    addedBy: string;           // Name or ID of the person who added the expense
}

// Define the state shape for expenses in your application
export interface ExpensesState {
    expenses: Expense[];       // Array of expense objects
}

// Define possible actions for managing expenses
export type ExpensesAction =
    | { type: 'ADD_EXPENSE'; payload: Expense }             // Action to add a new expense
    | { type: 'EDIT_EXPENSE'; payload: Expense }            // Action to edit an existing expense
    | { type: 'DELETE_EXPENSE'; payload: string };          // Action to delete an expense by its ID

// Example interface for additional types like categories
export interface ExpenseCategory {
    id: string;                // Unique identifier for the category
    name: string;              // Name of the category (e.g., Food, Utilities)
}

// Optionally, define types for context or other state management tools
export interface ExpenseContextType {
    state: ExpensesState;                          // Current state of expenses
    dispatch: React.Dispatch<ExpensesAction>;      // Dispatch function to trigger actions
}

export interface Category {
    name: string;
    amount: number;
    icon: string;
}

export const ExpenseService = {
    // Expense-related methods
    async getExpenses(): Promise<Expense[]> {
        try {
            console.log('Fetching expenses...');
            const expenses = await getData<Expense[]>(EXPENSES_KEY);
            console.log('Fetched expenses:', expenses);
            return expenses ?? [];
        } catch (error) {
            console.error('Error fetching expenses:', error);
            return [];
        }
    },

    async addExpense(expense: Expense): Promise<void> {
        try {
            console.log('Adding expense:', expense);
            const expenses = await ExpenseService.getExpenses(); // Use the function directly
            expenses.push(expense);
            await setData(EXPENSES_KEY, expenses);
            console.log('Expense added successfully:', expense);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    },

    async editExpense(updatedExpense: Expense): Promise<void> {
        try {
            console.log('Editing expense:', updatedExpense);
            const expenses = await ExpenseService.getExpenses();
            const updatedExpenses = expenses.map(expense =>
                expense.id === updatedExpense.id ? updatedExpense : expense
            );
            await setData(EXPENSES_KEY, updatedExpenses);
            console.log('Expense edited successfully:', updatedExpense);
        } catch (error) {
            console.error('Error editing expense:', error);
        }
    },

    async deleteExpense(expenseId: string): Promise<void> {
        try {
            console.log('Deleting expense:', expenseId);
            const expenses = await ExpenseService.getExpenses();
            const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
            await setData(EXPENSES_KEY, updatedExpenses);
            console.log('Expense deleted successfully:', expenseId);
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    },

    async clearExpenses(): Promise<void> {
        try {
            console.log('Clearing all expenses...');
            await removeData(EXPENSES_KEY);
            console.log('All expenses cleared successfully');
        } catch (error) {
            console.error('Error clearing expenses:', error);
        }
    },

    // Group-related methods
    async getGroups(): Promise<Group[]> {
        try {
            console.log('Fetching groups...');
            const groups = await getData<Group[]>(GROUPS_KEY);
            console.log('Fetched groups:', groups);
            return groups ?? [];
        } catch (error) {
            console.error('Error fetching groups:', error);
            return [];
        }
    },

    async addGroup(group: Group): Promise<void> {
        try {
            console.log('Adding group:', group);
            const groups = await ExpenseService.getGroups(); // Use the function directly
            groups.push(group);
            await setData(GROUPS_KEY, groups);
            console.log('Group added successfully:', group);
        } catch (error) {
            console.error('Error adding group:', error);
        }
    },

    async editGroup(updatedGroup: Group): Promise<void> {
        try {
            console.log('Editing group:', updatedGroup);
            const groups = await ExpenseService.getGroups();
            const updatedGroups = groups.map(group =>
                group.id === updatedGroup.id ? updatedGroup : group
            );
            await setData(GROUPS_KEY, updatedGroups);
            console.log('Group edited successfully:', updatedGroup);
        } catch (error) {
            console.error('Error editing group:', error);
        }
    },

    async deleteGroup(groupId: string): Promise<void> {
        try {
            console.log('Deleting group:', groupId);
            const groups = await ExpenseService.getGroups();
            const updatedGroups = groups.filter(group => group.id !== groupId);
            await setData(GROUPS_KEY, updatedGroups);
            console.log('Group deleted successfully:', groupId);
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    },

    async clearGroups(): Promise<void> {
        try {
            console.log('Clearing all groups...');
            await removeData(GROUPS_KEY);
            console.log('All groups cleared successfully');
        } catch (error) {
            console.error('Error clearing groups:', error);
        }
    }
};