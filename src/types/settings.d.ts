// types/settings.d.ts

interface SettingsData {
    selectedCategories: string[]; // or UUID type if using UUIDs
    selectedPaymentMethods: string[]; // or UUID type if using UUIDs
    theme: string;
}