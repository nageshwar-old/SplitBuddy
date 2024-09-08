// Define the structure of an Expense object
interface Expense {
    id: string;                // Unique identifier for the expense
    amount: number;            // Amount of the expense
    category: string;          // Category under which the expense falls (e.g., Food, Transport)
    description: string;       // Description or note about the expense
    date: string;              // Date when the expense was made, stored as an ISO string
    paymentMethod: string;     // Method of payment (e.g., Cash, Credit Card)
    group: string;             // Group ID or name to which the expense belongs
}

// Define the state shape for expenses in your application
interface ExpensesState {
    expenses: Expense[];       // Array of expense objects
}

// Define possible actions for managing expenses
type ExpensesAction =
    | { type: 'ADD_EXPENSE'; payload: Expense }             // Action to add a new expense
    | { type: 'EDIT_EXPENSE'; payload: Expense }            // Action to edit an existing expense
    | { type: 'DELETE_EXPENSE'; payload: string };          // Action to delete an expense by its ID

// Example interface for additional types like categories
interface ExpenseCategory {
    id: string;                // Unique identifier for the category
    name: string;              // Name of the category (e.g., Food, Utilities)
}

// Optionally, define types for context or other state management tools
interface ExpenseContextType {
    state: ExpensesState;                          // Current state of expenses
    dispatch: React.Dispatch<ExpensesAction>;      // Dispatch function to trigger actions
}

interface Category {
    name: string;
    amount: number;
    icon: string;
}