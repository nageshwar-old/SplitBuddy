import { SETTINGS_API, expensesApi } from '@config/api'; // Adjust the path based on your project structure

// Function to fetch settings by user ID
export const fetchSettings = async (userId: string): Promise<SettingsData> => {
    const response = await expensesApi.get(SETTINGS_API.GET_SETTINGS(userId));

    if (response.data.status !== 'success') {
        throw new Error(response.data.message || 'Failed to fetch settings');
    }

    return response.data.data; // Assuming `data` contains the settings data
};

// Function to save or update settings for a specific user
export const saveSettings = async (userId: string, settingsData: SettingsData): Promise<void> => {
    const response = await expensesApi.post(SETTINGS_API.SAVE_SETTINGS(userId), settingsData);

    if (response.data.status !== 'success') {
        throw new Error(response.data.message || 'Failed to save settings');
    }
    // No return needed, operation confirmed if no error is thrown
};