import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from './userSlice';
import { User, UserService } from '@services/userService';
import { PayloadAction } from '@reduxjs/toolkit';

// Worker Saga: Fetch Users
function* fetchUsersSaga() {
    try {
        yield put(fetchUsersStart());
        const users: User[] = yield call(UserService.getUsers);
        yield put(fetchUsersSuccess(users));
    } catch (error) {
        yield put(fetchUsersFailure('Failed to fetch users.'));
    }
}

// Worker Saga: Add User
function* addUserSaga(action: PayloadAction<User>) {
    try {
        yield put(addUserStart());
        yield call(UserService.addUser, action.payload);
        yield put(addUserSuccess(action.payload));
    } catch (error) {
        yield put(addUserFailure('Failed to add user.'));
    }
}

// Worker Saga: Edit User
function* editUserSaga(action: PayloadAction<User>) {
    try {
        yield put(editUserStart());
        yield call(UserService.editUser, action.payload);
        yield put(editUserSuccess(action.payload));
    } catch (error) {
        yield put(editUserFailure('Failed to edit user.'));
    }
}

// Worker Saga: Delete User
function* deleteUserSaga(action: PayloadAction<string>) {
    try {
        yield put(deleteUserStart());
        yield call(UserService.deleteUser, action.payload);
        yield put(deleteUserSuccess(action.payload));
    } catch (error) {
        yield put(deleteUserFailure('Failed to delete user.'));
    }
}

// Watcher Saga: Watches for actions
function* userSaga() {
    yield takeLatest('user/fetchUsers', fetchUsersSaga);
    yield takeLatest('user/addUser', addUserSaga);
    yield takeLatest('user/editUser', editUserSaga);
    yield takeLatest('user/deleteUser', deleteUserSaga);
}

export default userSaga;