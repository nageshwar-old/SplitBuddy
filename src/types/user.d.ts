// Fetch User Profile Action Types
interface FetchProfileAction {
    type: UserActionTypes.FETCH_PROFILE_REQUEST;
    payload: {
        username: string;
    };
}

// Fetch User Profile by Username Action Types
interface FetchProfileByUsernameAction {
    type: UserActionTypes.FETCH_PROFILE_BY_USERNAME_REQUEST;
    payload: {
        username: string;
    };
}

interface UserName {
    id: string;
    name: string;
}

interface UpdateProfilePayload {
    username: string;
    data: Partial<User>;
}

// Update User Profile Action Types
interface UpdateProfileAction {
    type: UserActionTypes.UPDATE_PROFILE_REQUEST;
    payload: {
        username: string;
        data: Partial<User>; // Assuming User is your user type/interface
    };
}

interface FetchUsersPayload {
    fields?: string[]; // Optional array of fields to specify which fields to return
}

interface FetchUsersAction {
    type: string;
    payload: {
        fields?: string[]; // Optional array of fields to specify which fields to return
    };
}