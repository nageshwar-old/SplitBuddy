import { UserService, User } from './userService';
import { getData, setData, removeData } from '@utils/storage'; // Ensure correct imports

const TOKEN_KEY = 'authToken';

export const AuthService = {
    // Authentication-related methods
    async login(identifier: string, password: string): Promise<User | null> {
        try {
            console.log('Logging in with identifier (email or username):', identifier);
            const users = await UserService.getUsers();

            // Find user by email or username
            const user = users.find(u =>
                (u.email === identifier || u.username === identifier) && u.password === password
            );

            if (user) {
                await setData(TOKEN_KEY, user.token); // Store the token
                console.log('Login successful:', user);
                return user;
            } else {
                console.error('Invalid credentials');
                return null;
            }
        } catch (error) {
            console.error('Error logging in:', error);
            return null;
        }
    },

    async logout(): Promise<void> {
        try {
            console.log('Logging out...');
            await removeData(TOKEN_KEY); // Remove the stored token
            console.log('Logout successful');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    },

    async getCurrentUser(): Promise<User | null> {
        try {
            console.log('Fetching current user...');
            const token = await getData<string>(TOKEN_KEY); // Retrieve the stored token
            if (!token) {
                console.error('No token found, user not logged in');
                return null;
            }

            const users = await UserService.getUsers();
            const currentUser = users.find(user => user.token === token); // Find the user by token
            if (currentUser) {
                console.log('Current user:', currentUser);
                return currentUser;
            } else {
                console.error('No user found with the current token');
                return null;
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
            return null;
        }
    },

    async isAuthenticated(): Promise<boolean> {
        try {
            const token = await getData<string>(TOKEN_KEY); // Check if a token exists
            return !!token; // Return true if token exists, otherwise false
        } catch (error) {
            console.error('Error checking authentication status:', error);
            return false;
        }
    },

    // Placeholder for forgot password functionality
    async forgotPassword(email: string): Promise<boolean> {
        try {
            console.log('Processing forgot password for email:', email);
            // Replace the following line with actual forgot password service call
            // await ApiService.sendForgotPasswordEmail(email);

            // Simulate success response
            console.log('Password reset link sent to:', email);
            return true;
        } catch (error) {
            console.error('Error processing forgot password:', error);
            return false;
        }
    }
};