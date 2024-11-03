interface IGroupItem {
    id: string;
    name?: string;
    currency?: string;
    description?: string;
    authorId: string; // ID of the user updating the expense
}

interface IUpdateGroup {
    id: string;
    name?: string;
    currency?: string;
    description?: string;
    authorId: string; // ID of the user updating the expense
}

interface ICreateGroupResponse extends ApiResponse {
    data: IGroupItemResponse;
}

// Interface for a group
interface IGroupItemResponse {
    id: string; // ID of the group
    groupName: string; // Name of the group
    currency: string; // Currency for the group
    userIds?: string[]; // Optional list of user IDs in the group
    authorId: string; // ID of the author of the group
}

interface IFetchGroupsResponse extends ApiResponse {
    data: IGroupItemResponse[];
}

interface IAddGroup {
    groupName: string; // Name of the group
    currency: string; // Currency for the group
    userIds?: string[]; // Optional list of user IDs in the group
    authorId?: string; // ID of the author of the group
}