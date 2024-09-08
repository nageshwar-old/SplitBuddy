import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ExpenseService, Group } from '@services/expenseService';
import {
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
} from '@store/expenseSlice';

// Expense Sagas
function* fetchExpensesSaga() {
    try {
        const expenses: Expense[] = yield call(ExpenseService.getExpenses);
        yield put(fetchExpensesSuccess(expenses));
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchExpensesFailure(error.message));
        } else {
            yield put(fetchExpensesFailure('An unknown error occurred while fetching expenses.'));
        }
    }
}

function* addExpenseSaga(action: PayloadAction<Expense>) {
    try {
        yield call(ExpenseService.addExpense, action.payload);
        yield put(addExpenseSuccess(action.payload));
    } catch (error) {
        if (error instanceof Error) {
            yield put(addExpenseFailure(error.message));
        } else {
            yield put(addExpenseFailure('An unknown error occurred while adding the expense.'));
        }
    }
}

function* editExpenseSaga(action: PayloadAction<Expense>) {
    try {
        yield call(ExpenseService.editExpense, action.payload);
        yield put(editExpenseSuccess(action.payload));
    } catch (error) {
        if (error instanceof Error) {
            yield put(editExpenseFailure(error.message));
        } else {
            yield put(editExpenseFailure('An unknown error occurred while editing the expense.'));
        }
    }
}

function* deleteExpenseSaga(action: PayloadAction<string>) {
    try {
        yield call(ExpenseService.deleteExpense, action.payload);
        yield put(deleteExpenseSuccess(action.payload));
    } catch (error) {
        if (error instanceof Error) {
            yield put(deleteExpenseFailure(error.message));
        } else {
            yield put(deleteExpenseFailure('An unknown error occurred while deleting the expense.'));
        }
    }
}

// Group Sagas
function* fetchGroupsSaga() {
    try {
        const groups: Group[] = yield call(ExpenseService.getGroups);
        yield put(fetchGroupsSuccess(groups));
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchGroupsFailure(error.message));
        } else {
            yield put(fetchGroupsFailure('An unknown error occurred while fetching groups.'));
        }
    }
}

function* addGroupSaga(action: PayloadAction<Group>) {
    try {
        yield call(ExpenseService.addGroup, action.payload);
        yield put(addGroupSuccess(action.payload));
    } catch (error) {
        if (error instanceof Error) {
            yield put(addGroupFailure(error.message));
        } else {
            yield put(addGroupFailure('An unknown error occurred while adding the group.'));
        }
    }
}

function* editGroupSaga(action: PayloadAction<Group>) {
    try {
        yield call(ExpenseService.editGroup, action.payload);
        yield put(editGroupSuccess(action.payload));
    } catch (error) {
        if (error instanceof Error) {
            yield put(editGroupFailure(error.message));
        } else {
            yield put(editGroupFailure('An unknown error occurred while editing the group.'));
        }
    }
}

function* deleteGroupSaga(action: PayloadAction<string>) {
    try {
        yield call(ExpenseService.deleteGroup, action.payload);
        yield put(deleteGroupSuccess(action.payload));
    } catch (error) {
        console.log('Error deleting group:', error);
        if (error instanceof Error) {
            yield put(deleteGroupFailure(error.message));
        } else {
            yield put(deleteGroupFailure('An unknown error occurred while deleting the group.'));
        }
    }
}

// Root saga
export default function* expenseSagas() {
    // Expense sagas
    yield takeEvery(fetchExpenses.type, fetchExpensesSaga);
    yield takeEvery(addExpense.type, addExpenseSaga);
    yield takeEvery(editExpense.type, editExpenseSaga);
    yield takeEvery(deleteExpense.type, deleteExpenseSaga);

    // Group sagas
    yield takeEvery(fetchGroups.type, fetchGroupsSaga);
    yield takeEvery(addGroup.type, addGroupSaga);
    yield takeEvery(editGroup.type, editGroupSaga);
    yield takeEvery(deleteGroup.type, deleteGroupSaga);
}