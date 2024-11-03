import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGroupsRequest,
    fetchGroupsSuccess,
    fetchGroupsFailure,
    createGroupRequest,
    createGroupSuccess,
    createGroupFailure,
    updateGroupRequest,
    updateGroupSuccess,
    updateGroupFailure,
    deleteGroupRequest,
    deleteGroupSuccess,
    deleteGroupFailure,
} from '@slices/groupSlice'; // Correct action imports
import { groupService } from '@services/groupService';

// Worker Saga: Fetch Groups
function* fetchGroupsSaga(): Generator<unknown, void, IGroupItemResponse[]> {
    try {
        const groups: IGroupItemResponse[] = yield call(groupService.fetchGroups);
        yield put(fetchGroupsSuccess(groups));
    } catch (error: any) {
        yield put(fetchGroupsFailure(error.message));
    }
}

// Worker Saga: Create Group
function* createGroupSaga(action: ReturnType<typeof createGroupRequest>): Generator<unknown, void, IGroupItemResponse> {
    try {
        // Make sure `groupService.createGroup` is passed correctly as a function and then the payload
        // console.log('action.payload', action.payload);
        const newGroup: IGroupItemResponse = yield call(groupService.createGroup, action.payload);
        yield put(createGroupSuccess(newGroup));
        yield put(fetchGroupsRequest()); // Refetch groups after creating
    } catch (error: any) {
        yield put(createGroupFailure(error.message));
    }
}

// Worker Saga: Delete Group
function* deleteGroupSaga(action: ReturnType<typeof deleteGroupRequest>): Generator<unknown, void, void> {
    try {
        yield call(groupService.deleteGroup, action.payload); // action.payload contains groupId
        yield put(deleteGroupSuccess(action.payload)); // Pass the deleted group ID
        yield put(fetchGroupsRequest()); // Refetch groups after deleting
    } catch (error: any) {
        yield put(deleteGroupFailure(error.message));
    }
}

// Watcher Saga: Watch for actions
export default function* groupSaga(): Generator<unknown, void, unknown> {
    yield takeLatest(fetchGroupsRequest, fetchGroupsSaga);
    yield takeLatest(createGroupRequest, createGroupSaga);
    yield takeLatest(deleteGroupRequest, deleteGroupSaga);
}