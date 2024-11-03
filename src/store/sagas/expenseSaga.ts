import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from '@slices/expenseSlice';
import { expenseService } from '@services/expenseService';

// Worker Saga: Fetch Expenses
function* fetchExpensesSaga(): Generator<unknown, void, FetchExpensesResponseData> {
    // console.log('Fetching expenses...');
    try {
        const expenses: FetchExpensesResponseData = yield call(expenseService.fetchExpenses);
        yield put(fetchExpensesSuccess(expenses));
    } catch (error: any) {
        // console.error('Failed to fetch expenses:', error);
        yield put(fetchExpensesFailure(error.message));
    }
}

// Worker Saga: Create Expense
function* createExpenseSaga(action: ReturnType<typeof createExpenseRequest>): Generator<unknown, void, ExpenseResponseItem> {
    try {
        const expense: ExpenseResponseItem = yield call(expenseService.createExpense, action.payload);
        yield put(createExpenseSuccess(expense));
        yield put(fetchExpensesRequest()); // Refetch expenses after creating
    } catch (error: any) {
        yield put(createExpenseFailure(error.message));
    }
}

// Worker Saga: Update Expense
function* updateExpenseSaga(action: ReturnType<typeof updateExpenseRequest>): Generator<unknown, void, ExpenseResponseItem> {
    try {
        const expense: ExpenseResponseItem = yield call(expenseService.updateExpense, action.payload.expenseId, action.payload.data);
        yield put(updateExpenseSuccess(expense));
        yield put(fetchExpensesRequest()); // Refetch expenses after updating
    } catch (error: any) {
        yield put(updateExpenseFailure(error.message));
    }
}

// Worker Saga: Delete Expense
function* deleteExpenseSaga(action: ReturnType<typeof deleteExpenseRequest>): Generator<unknown, void, void> {
    try {
        yield call(expenseService.deleteExpense, action.payload);
        yield put(deleteExpenseSuccess(action.payload));
        yield put(fetchExpensesRequest()); // Refetch expenses after deleting
    } catch (error: any) {
        yield put(deleteExpenseFailure(error.message));
    }
}

// Watcher Saga: Watch for actions
export default function* expenseSaga(): Generator<unknown, void, unknown> {
    yield takeLatest(fetchExpensesRequest, fetchExpensesSaga);
    yield takeLatest(createExpenseRequest, createExpenseSaga);
    yield takeLatest(updateExpenseRequest, updateExpenseSaga);
    yield takeLatest(deleteExpenseRequest, deleteExpenseSaga);
}