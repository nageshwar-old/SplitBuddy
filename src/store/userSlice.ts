import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@services/userService';

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsersStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        addUserSuccess(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
            state.loading = false;
        },
        addUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        editUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        editUserSuccess(state, action: PayloadAction<User>) {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
            state.loading = false;
        },
        editUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess(state, action: PayloadAction<string>) {
            state.users = state.users.filter(user => user.id !== action.payload);
            state.loading = false;
        },
        deleteUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        }
    },
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
    editUserStart,
    editUserSuccess,
    editUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    clearError
} = userSlice.actions;

export default userSlice.reducer;