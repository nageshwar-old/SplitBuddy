import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MultiSelect from '@components/MultiSelect';
import { SettingsService } from '@services/settingsService';
import { categories, paymentMethods } from '@utils/common';

const SettingsScreen: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);

    // Load visible categories and payment methods
    useEffect(() => {
        const loadSettings = async () => {
            const visibleCategories = await SettingsService.getVisibleCategories();
            const visiblePaymentMethods = await SettingsService.getVisiblePaymentMethods();

            const selectedCategories = Object.keys(visibleCategories).filter(key => visibleCategories[key]);
            const selectedPaymentMethods = Object.keys(visiblePaymentMethods).filter(key => visiblePaymentMethods[key]);

            setSelectedCategories(selectedCategories);
            setSelectedPaymentMethods(selectedPaymentMethods);
        };

        loadSettings();
    }, []);

    // Handle category selection change
    const handleCategorySelectionChange = async (newSelection: string[]) => {
        setSelectedCategories(newSelection);

        const updatedCategories = categories.reduce((acc, category) => {
            acc[category.id] = newSelection.includes(category.id);
            return acc;
        }, {} as { [key: string]: boolean });

        await SettingsService.setVisibleCategories(updatedCategories);
    };

    // Handle payment method selection change
    const handlePaymentMethodSelectionChange = async (newSelection: string[]) => {
        setSelectedPaymentMethods(newSelection);

        const updatedPaymentMethods = paymentMethods.reduce((acc, method) => {
            acc[method.id] = newSelection.includes(method.id);
            return acc;
        }, {} as { [key: string]: boolean });

        await SettingsService.setVisiblePaymentMethods(updatedPaymentMethods);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <MultiSelect
                items={categories}
                selectedItems={selectedCategories}
                onSelectionChange={handleCategorySelectionChange}
                title="Select Categories"
                placeholder="Select Categories"
                fieldLabel="Categories"
                subLabel="Select the categories you want to see in the app"
            />

            <MultiSelect
                items={paymentMethods}
                selectedItems={selectedPaymentMethods}
                onSelectionChange={handlePaymentMethodSelectionChange}
                title="Select Payment Methods"
                placeholder="Select Payment Methods"
                fieldLabel="Payment Methods"
                subLabel="Select the payment methods you want to see in the app"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default SettingsScreen;