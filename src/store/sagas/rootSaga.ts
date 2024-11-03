// @store/sagas/rootSaga.ts

import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import expenseSaga from './expenseSaga';
import categorySaga from './categorySaga';
import paymentMethodSaga from './paymentMethodSaga';
import groupSaga from './groupSaga';
import userSaga from './userSaga';
import settingsSaga from './settingsSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        expenseSaga(),
        categorySaga(),
        paymentMethodSaga(),
        groupSaga(),
        userSaga(),
        settingsSaga(),
    ]);
}