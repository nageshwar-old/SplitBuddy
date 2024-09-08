// src/services/SettingsService.ts
import { getData, setData, removeData } from '@utils/storage';

const SETTINGS_KEY = 'app_settings';

interface Settings {
    theme: 'light' | 'dark';
    categories: { [key: string]: boolean }; // User-customized visible categories
    paymentMethods: { [key: string]: boolean }; // User-customized visible payment methods
    notificationsEnabled: boolean;  // Notification preferences
}

export const SettingsService = {
    // Get all settings
    async getSettings(): Promise<Settings | null> {
        try {
            return await getData<Settings>(SETTINGS_KEY);
        } catch (error) {
            console.error('Error fetching settings:', error);
            return null;
        }
    },

    // Save the complete settings object
    async saveSettings(settings: Settings): Promise<void> {
        try {
            await setData(SETTINGS_KEY, settings);
            console.log('Settings saved successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    },

    // Update a specific setting (like categories, payment methods, theme, notificationsEnabled)
    async updateSetting<T extends keyof Settings>(key: T, value: Settings[T]): Promise<void> {
        try {
            const settings = await this.getSettings() ?? { theme: 'light', categories: {}, paymentMethods: {}, notificationsEnabled: true };
            const updatedSettings = { ...settings, [key]: value };
            await this.saveSettings(updatedSettings);
        } catch (error) {
            console.error(`Error updating setting ${key}:`, error);
        }
    },

    // Get only the visible categories
    async getVisibleCategories(): Promise<{ [key: string]: boolean }> {
        const settings = await this.getSettings();
        return settings?.categories ?? {};
    },

    // Set the visible categories
    async setVisibleCategories(visibleCategories: { [key: string]: boolean }): Promise<void> {
        try {
            await this.updateSetting('categories', visibleCategories);
            console.log('Visible categories updated successfully');
        } catch (error) {
            console.error('Error updating visible categories', error);
        }
    },

    // Get visible payment methods
    async getVisiblePaymentMethods(): Promise<{ [key: string]: boolean }> {
        const settings = await this.getSettings();
        return settings?.paymentMethods ?? {};
    },

    // Set visible payment methods
    async setVisiblePaymentMethods(visiblePaymentMethods: { [key: string]: boolean }): Promise<void> {
        try {
            await this.updateSetting('paymentMethods', visiblePaymentMethods);
            console.log('Visible payment methods updated successfully');
        } catch (error) {
            console.error('Error updating visible payment methods', error);
        }
    },

    // Clear all settings
    async clearSettings(): Promise<void> {
        try {
            await removeData(SETTINGS_KEY);
            console.log('Settings cleared successfully');
        } catch (error) {
            console.error('Error clearing settings:', error);
        }
    }
};