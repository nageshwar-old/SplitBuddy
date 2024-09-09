import { getData, setData, removeData } from '@utils/storage'; // Ensure the imports are correct

const USERS_KEY = 'users';

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    country: string;
    username: string; // New username field
    password?: string; // New password field
    token?: string; // Authentication token for the user
    photoUrl?: string; // User profile photo URL
    isAdmin?: boolean; // Flag for admin rights
}

export const UserService = {
    // User-related methods
    async getUsers(): Promise<User[]> {
        try {
            console.log('Fetching users...');
            const users = await getData<User[]>(USERS_KEY);
            console.log('Fetched users:', users);
            return users ?? [];
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    },

    async addUser(user: User): Promise<void> {
        try {
            console.log('Adding user:', user);
            const users = await UserService.getUsers();
            users.push(user);
            await setData(USERS_KEY, users);
            console.log('User added successfully:', user);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    },

    async editUser(updatedUser: User): Promise<void> {
        try {
            console.log('Editing user:', updatedUser);
            const users = await UserService.getUsers();
            const updatedUsers = users.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            );
            await setData(USERS_KEY, updatedUsers);
            console.log('User edited successfully:', updatedUser);
        } catch (error) {
            console.error('Error editing user:', error);
        }
    },

    async deleteUser(userId: string): Promise<void> {
        try {
            console.log('Deleting user:', userId);
            const users = await UserService.getUsers();
            const updatedUsers = users.filter(user => user.id !== userId);
            await setData(USERS_KEY, updatedUsers);
            console.log('User deleted successfully:', userId);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    },

    async clearUsers(): Promise<void> {
        try {
            console.log('Clearing all users...');
            await removeData(USERS_KEY);
            console.log('All users cleared successfully');
        } catch (error) {
            console.error('Error clearing users:', error);
        }
    }
};