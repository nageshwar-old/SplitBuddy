// Define supporting types
interface Category {
    id: string;
    name: string;
}

interface PaymentMethod {
    id: string;
    name: string;
}

interface Group {
    id: string;
    groupName: string;
}

interface ApiResponse {
    status: string;
    message: string;
}

// Updated Expense Response Item structure
interface ExpenseResponseItem {
    id: string;
    category: { id: string; name: string };
    amount: number;
    description: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    addedBy: string;
    paymentMethod: { id: string; name: string };
    group: { id: string; groupName: string };
}

// Update for Fetch Expenses Response to include pagination details
interface FetchExpensesResponse extends ApiResponse {
    data: {
        expenses: ExpenseResponseItem[];
        total: number;
        currentPage: number;
        totalPages: number;
        pageSize: number;
    };
}

interface FetchExpensesResponseData {
    expenses: ExpenseResponseItem[];
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
}

interface UpsertExpenseResponse extends ApiResponse {
    data: ExpenseResponseItem;
}

// Define an Expense List Item type if necessary for list components
interface ExpenseListItem {
    id: string;
    category: Category;
    amount: number;
    description?: string;
    date: string;
    addedBy: string;
    paymentMethod: PaymentMethod;
    group: Group;
    createdAt: string;
    updatedAt: string;
}

// Interfaces for creating and updating expenses
interface CreateExpense {
    amount: number;
    categoryId: string;
    paymentMethodId: string;
    groupId: string;
    description?: string;
    date: string;
    authorId: string;
}

interface UpdateExpense {
    id: string;
    amount?: number;
    categoryId?: string;
    paymentMethodId?: string;
    groupId?: string;
    description?: string;
    date: string;
    authorId: string;
}

interface UpdateExpensePayload {
    expenseId: string;
    data: UpdateExpense;
}

// Updated Expense State to support paginated data
interface ExpenseState {
    expenses: ExpenseResponseItem[];
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    categories: Category[];
    paymentMethods: PaymentMethod[];
    groups: Group[];
    loading: boolean;
    error?: string | null;
}