import { EXPENSE_API, expensesApi } from '@config/api'; // Ensure the correct import path for your API configuration

export const groupService = {
    // Fetch all groups
    fetchGroups: async (): Promise<IGroupItemResponse[]> => {
        const response = await expensesApi.get(EXPENSE_API.GET_GROUPS);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to fetch groups');
        }

        return response.data.data; // Assuming `data` contains the array of groups
    },

    // Create a new group
    createGroup: async (groupData: IAddGroup): Promise<IGroupItemResponse> => {
        const response = await expensesApi.post(EXPENSE_API.ADD_GROUP, groupData);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to create group');
        }

        return response.data.data; // Assuming `data` contains the created group item
    },

    // Update an existing group
    updateGroup: async (groupId: string, groupData: IUpdateGroup): Promise<IGroupItemResponse> => {
        const response = await expensesApi.put(EXPENSE_API.UPDATE_GROUP(groupId), groupData);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to update group');
        }

        return response.data.data; // Assuming `data` contains the updated group item
    },

    // Delete a group
    deleteGroup: async (groupId: string): Promise<void> => {
        const response = await expensesApi.delete(EXPENSE_API.DELETE_GROUP(groupId));

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to delete group');
        }

        // No return value needed, just confirms deletion if no error is thrown
    },
};