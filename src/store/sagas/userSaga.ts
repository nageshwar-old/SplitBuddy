import { call, put, takeLatest } from 'redux-saga/effects';
import { userService } from '@store/services/userService';
import {
    fetchProfileSuccess,
    fetchProfileFailure,
    updateProfileSuccess,
    updateProfileFailure,
    fetchProfileByUsernameSuccess,
    fetchProfileByUsernameFailure,
    fetchProfileRequest,
    fetchProfileByUsernameRequest,
    updateProfileRequest,
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
} from '@store/slices/userSlice';

// Fetch User Profile Saga
function* fetchProfile(action: FetchProfileAction): Generator<any, void, any> {
    try {
        const profileData: User = yield call(userService.getProfile, action.payload.username);
        yield put(fetchProfileSuccess(profileData));
    } catch (error: any) {
        yield put(fetchProfileFailure(error.response?.data?.message || 'Failed to fetch user profile.'));
    }
}

// Fetch User Profile by Username Saga
function* fetchProfileByUsername(action: FetchProfileByUsernameAction): Generator<any, void, any> {
    try {
        const profileData: User = yield call(userService.getProfileByUsername, action.payload.username);
        yield put(fetchProfileByUsernameSuccess(profileData));
    } catch (error: any) {
        yield put(fetchProfileByUsernameFailure(error.response?.data?.message || 'Failed to fetch user profile by username.'));
    }
}

// Update User Profile Saga
function* updateProfile(action: UpdateProfileAction): Generator<any, void, any> {
    try {
        const updatedProfileData: User = yield call(userService.updateProfile, action.payload.username, action.payload.data);
        yield put(updateProfileSuccess(updatedProfileData));
    } catch (error: any) {
        yield put(updateProfileFailure(error.response?.data?.message || 'Failed to update user profile.'));
    }
}

// Fetch Users Saga (with optional parameters)
function* fetchUsers(action: FetchUsersAction): Generator<any, void, any> {
    try {
        const { fields } = action.payload;
        const usersData = yield call(userService.getUsers, { fields });
        yield put(fetchUsersSuccess(usersData));
    } catch (error: any) {
        yield put(fetchUsersFailure(error.response?.data?.message || 'Failed to fetch users.'));
    }
}

// Watcher Saga
export default function* userSaga() {
    yield takeLatest(fetchProfileRequest.type, fetchProfile);
    yield takeLatest(fetchProfileByUsernameRequest.type, fetchProfileByUsername);
    yield takeLatest(updateProfileRequest.type, updateProfile);
    yield takeLatest(fetchUsersRequest.type, fetchUsers);
}