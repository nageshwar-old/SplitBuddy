import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects'; // Import `all` from redux-saga
import expenseReducer from '@store/expenseSlice';
import settingsReducer from '@store/settingsSlice';
import toastReducer from '@store/toastSlice'; // Import toast reducer
import expenseSagas from '@store/expenseSagas';
import settingsSagas from '@store/settingsSagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        expenses: expenseReducer,
        settings: settingsReducer,
        toast: toastReducer, // Add toast reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

// Combine all sagas into a single rootSaga
function* rootSaga() {
    yield all([
        expenseSagas(), // Run the expense-related sagas
        settingsSagas(), // Run the settings-related sagas
    ]);
}

// Run the rootSaga
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;