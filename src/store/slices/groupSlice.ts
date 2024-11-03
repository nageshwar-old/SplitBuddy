// src/store/slices/groupSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GroupState {
    groups: IGroupItemResponse[];
    loading: boolean;
    error: string | null;
}

const initialState: GroupState = {
    groups: [],
    loading: false,
    error: null,
};

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        // Fetch Groups
        fetchGroupsRequest: (state) => {
            state.loading = true;
        },
        fetchGroupsSuccess: (state, action: PayloadAction<IGroupItemResponse[]>) => {
            // console.log('action.payload', action.payload);
            state.loading = false;
            state.groups = action.payload;
        },
        fetchGroupsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Create Group
        createGroupRequest: (state, action: PayloadAction<IAddGroup>) => {
            state.loading = true;
        },
        createGroupSuccess: (state, action: PayloadAction<IGroupItemResponse>) => {
            state.loading = false;
            state.groups.push(action.payload);
        },
        createGroupFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Update Group
        updateGroupRequest: (state, action: PayloadAction<{ groupId: string; data: Partial<IGroupItemResponse> }>) => {
            state.loading = true;
        },
        updateGroupSuccess: (state, action: PayloadAction<IGroupItemResponse>) => {
            state.loading = false;
            const index = state.groups.findIndex(group => group.id === action.payload.id);
            if (index !== -1) {
                state.groups[index] = action.payload;
            }
        },
        updateGroupFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Delete Group
        deleteGroupRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        deleteGroupSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.groups = state.groups.filter(group => group.id !== action.payload);
        },
        deleteGroupFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
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
} = groupSlice.actions;

export default groupSlice.reducer;