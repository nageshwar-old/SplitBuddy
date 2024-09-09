import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

// Reducers
import expenseReducer from '@store/expenseSlice';
import settingsReducer from '@store/settingsSlice';
import toastReducer from '@store/toastSlice';
import userReducer from '@store/userSlice'; // User reducer
import authReducer from '@store/authSlice'; // Auth reducer (if applicable)

// Sagas
import expenseSagas from '@store/expenseSagas';
import settingsSagas from '@store/settingsSagas';
import userSagas from '@store/userSagas'; // User sagas
import authSagas from '@store/authSagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
export const store = configureStore({
    reducer: {
        expenses: expenseReducer,
        settings: settingsReducer,
        toast: toastReducer,  // Toast reducer
        users: userReducer,   // User reducer
        auth: authReducer,    // Auth reducer (if applicable)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // Disabling serializable check for non-serializable data
        }).concat(sagaMiddleware),
});

// Combine all sagas into a single rootSaga
function* rootSaga() {
    yield all([
        expenseSagas(),   // Run expense-related sagas
        settingsSagas(),  // Run settings-related sagas
        userSagas(),      // Run user-related sagas
        authSagas(),      // Run auth-related sagas (if applicable)
    ]);
}

// Run the rootSaga
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;