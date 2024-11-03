import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import {
    fetchPaymentMethodsSuccess,
    fetchPaymentMethodsFailure,
    createPaymentMethodSuccess,
    createPaymentMethodFailure,
    updatePaymentMethodSuccess,
    updatePaymentMethodFailure,
    deletePaymentMethodSuccess,
    deletePaymentMethodFailure,
    fetchPaymentMethodsRequest,
    createPaymentMethodRequest,
    updatePaymentMethodRequest,
    deletePaymentMethodRequest,
} from '@slices/paymentMethodSlice';
import { paymentMethodService } from '@services/paymentMethodService';

// Worker Saga: Fetch Payment Methods
function* fetchPaymentMethodsSaga(): Generator<any, void, PaymentMethodItem[]> {
    try {
        const paymentMethods = yield call(paymentMethodService.fetchPaymentMethods);
        yield put(fetchPaymentMethodsSuccess(paymentMethods));
    } catch (error: any) {
        yield put(fetchPaymentMethodsFailure(error.message));
    }
}

// Worker Saga: Create Payment Method
function* createPaymentMethodSaga(action: ReturnType<typeof createPaymentMethodRequest>): Generator<any, void, PaymentMethodItem> {
    try {
        const paymentMethod: PaymentMethodItem = yield call(paymentMethodService.createPaymentMethod, action.payload);
        yield put(createPaymentMethodSuccess(paymentMethod));
        yield put(fetchPaymentMethodsRequest()); // Refetch payment methods after creating
    } catch (error: any) {
        yield put(createPaymentMethodFailure(error.message));
    }
}

// Worker Saga: Delete Payment Method
function* deletePaymentMethodSaga(action: ReturnType<typeof deletePaymentMethodRequest>): Generator<any, void, void> {
    try {
        yield call(paymentMethodService.deletePaymentMethod, action.payload);
        yield put(deletePaymentMethodSuccess(action.payload));
        yield put(fetchPaymentMethodsRequest()); // Refetch payment methods after deleting
    } catch (error: any) {
        yield put(deletePaymentMethodFailure(error.message));
    }
}

// Watcher Saga: Watch for actions
export default function* paymentMethodSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(fetchPaymentMethodsRequest, fetchPaymentMethodsSaga);
    yield takeLatest(createPaymentMethodRequest, createPaymentMethodSaga);
    yield takeLatest(deletePaymentMethodRequest, deletePaymentMethodSaga);
}