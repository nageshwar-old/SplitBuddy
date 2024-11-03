import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import authReducer, { logoutSuccess } from '@slices/authSlice';
import expenseReducer from '@slices/expenseSlice';
import categoryReducer from '@slices/categorySlice';
import paymentMethodReducer from '@slices/paymentMethodSlice';
import groupReducer from '@slices/groupSlice';
import toastReducer from '@slices/toastSlice';
import userReducer from '@slices/userSlice';
import settingsReducer from '@slices/settingsSlice';
import rootSaga from './sagas/rootSaga';
import { TypedUseSelectorHook, useSelector as rawUseSelector } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();

// Combine reducers
const combinedReducer = combineReducers({
    auth: authReducer,
    expense: expenseReducer,
    category: categoryReducer,
    paymentMethod: paymentMethodReducer,
    group: groupReducer,
    toast: toastReducer,
    user: userReducer,
    settings: settingsReducer,
});

// Root reducer to handle logout and reset state
const rootReducer = (state: any, action: any) => {
    if (action.type === logoutSuccess.type) {
        // Clear all state on logout by setting state to undefined
        state = undefined;
    }
    return combinedReducer(state, action);
};

// Configure store with saga middleware and adjusted middleware for serializability checks
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [logoutSuccess.type], // Ignore logout action for serializability check
            },
        }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

// Run root saga
sagaMiddleware.run(rootSaga);

// Define AppState type for better TypeScript support
export type AppState = ReturnType<typeof store.getState>;

// Custom useTypedSelector hook with AppState type
export const useTypedSelector: TypedUseSelectorHook<AppState> = rawUseSelector;

export default store;