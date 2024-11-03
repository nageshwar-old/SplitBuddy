import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the UserState interface
interface UserState {
    profile: User | null; // The user profile object
    users: User[]; // The list of users
    usersLoading: boolean; // Loading state for users list
    loading: boolean; // Loading state for individual user profile
    error: string | null; // Error message for profile actions
    usersError: string | null; // Error message for users list actions
}

// Initial state
const initialState: UserState = {
    profile: null,
    users: [],
    usersLoading: false,
    loading: false,
    error: null,
    usersError: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Fetch user profile actions
        fetchProfileRequest(state, action: PayloadAction<{ username: string }>) {
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.profile = action.payload; // Set the fetched user profile
            state.error = null;
        },
        fetchProfileFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload; // Set the error message
        },

        // Fetch user profile by username actions
        fetchProfileByUsernameRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProfileByUsernameSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.profile = action.payload; // Set the fetched user profile by username
            state.error = null;
        },
        fetchProfileByUsernameFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload; // Set the error message
        },

        // Update user profile actions
        updateProfileRequest(state, action: PayloadAction<UpdateProfilePayload>) {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.profile = { ...state.profile, ...action.payload }; // Update the user profile
            state.error = null;
        },
        updateProfileFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload; // Set the error message
        },

        // Fetch all users actions
        fetchUsersRequest(state, action: PayloadAction<FetchUsersPayload>) {
            state.usersLoading = true;
            state.usersError = null;
        },
        fetchUsersSuccess(state, action: PayloadAction<User[]>) {
            state.usersLoading = false;

            console.log(action.payload, 'getUsers action.payload');
            state.users = action.payload; // Set the fetched users list
            state.usersError = null;
        },
        fetchUsersFailure(state, action: PayloadAction<string>) {
            state.usersLoading = false;
            state.usersError = action.payload; // Set the error message for users
        },

        // Fetch users with specific fields actions
        fetchUsersWithFieldsRequest(state, action: PayloadAction<string>) {
            state.usersLoading = true;
            state.usersError = null;
        },
        fetchUsersWithFieldsSuccess(state, action: PayloadAction<User[]>) {
            state.usersLoading = false;
            state.users = action.payload; // Set the fetched users with specific fields
            state.usersError = null;
        },
        fetchUsersWithFieldsFailure(state, action: PayloadAction<string>) {
            state.usersLoading = false;
            state.usersError = action.payload; // Set the error message for users with specific fields
        },

        // Clear error message
        clearUserError(state) {
            state.error = null;
            state.usersError = null;
        },

        // Reset user profile state
        resetUserProfile(state) {
            state.profile = null;
            state.loading = false;
            state.error = null;
        },
    },
});

// Export actions
export const {
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
    fetchProfileByUsernameRequest,
    fetchProfileByUsernameSuccess,
    fetchProfileByUsernameFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    fetchUsersWithFieldsRequest,
    fetchUsersWithFieldsSuccess,
    fetchUsersWithFieldsFailure,
    clearUserError,
    resetUserProfile,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;

// Selectors for accessing specific parts of the user state
export const selectUserProfile = (state: { user: UserState }) => state.user.profile;
export const selectUserLoading = (state: { user: UserState }) => state.user.loading;
export const selectUserError = (state: { user: UserState }) => state.user.error;
export const selectUsers = (state: { user: UserState }) => state.user.users;
export const selectUsersLoading = (state: { user: UserState }) => state.user.usersLoading;
export const selectUsersError = (state: { user: UserState }) => state.user.usersError;