import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Modal } from 'react-native';
import MultiSelect from '@components/MultiSelect';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesRequest, createCategoryRequest } from '@store/slices/categorySlice';
import { fetchPaymentMethodsRequest, createPaymentMethodRequest } from '@store/slices/paymentMethodSlice';
import { AppState } from '@app/store/store';
import AddCategoryForm from './AddCategoryForm';
import AddPaymentMethodForm from './AddPaymentMethodForm';

const SettingsScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: AppState) => state.auth);
    const categories = useSelector((state: AppState) => state.category.categories);
    const paymentMethods = useSelector((state: AppState) => state.paymentMethod.paymentMethods);

    const [selectedCategories, setSelectedCategories] = useState<{ id: string; name: string }[]>([]);
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<{ id: string; name: string }[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [isPaymentMethodModalVisible, setPaymentMethodModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchCategoriesRequest());
            dispatch(fetchPaymentMethodsRequest());
            setIsLoading(false);
        };

        fetchData();
    }, [dispatch]);

    const handleCategorySelectionChange = (newSelection: { id: string; name: string }[]) => {
        setSelectedCategories(newSelection);
    };

    const handlePaymentMethodSelectionChange = (newSelection: { id: string; name: string }[]) => {
        setSelectedPaymentMethods(newSelection);
    };

    const handleAddCategory = (categoryName: string) => {
        dispatch(createCategoryRequest({ name: categoryName, authorId: user?.id ?? "" }));
        setCategoryModalVisible(false);
    };

    const handleAddPaymentMethod = (paymentMethodName: string) => {
        dispatch(createPaymentMethodRequest({ name: paymentMethodName, authorId: user?.id ?? "" }));
        setPaymentMethodModalVisible(false);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading settings...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MultiSelect
                items={categories.map(cat => ({ id: cat.id, name: cat.name }))}
                selectedItems={selectedCategories}
                onSelectionChange={handleCategorySelectionChange}
                title="Select Categories"
                placeholder="Select Categories"
                fieldLabel="Categories"
                subLabel="Select the categories you want to see in the app"
                addButtonLabel="Add Category"
                onAddPress={() => setCategoryModalVisible(true)}
            />

            <Modal
                visible={isCategoryModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setCategoryModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <AddCategoryForm onSubmit={handleAddCategory} onClose={() => setCategoryModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            <MultiSelect
                items={paymentMethods.map(method => ({ id: method.id, name: method.name }))}
                selectedItems={selectedPaymentMethods}
                onSelectionChange={handlePaymentMethodSelectionChange}
                title="Select Payment Methods"
                placeholder="Select Payment Methods"
                fieldLabel="Payment Methods"
                subLabel="Select the payment methods you want to see in the app"
                addButtonLabel="Add Payment Method"
                onAddPress={() => setPaymentMethodModalVisible(true)}
            />

            <Modal
                visible={isPaymentMethodModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setPaymentMethodModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <AddPaymentMethodForm onSubmit={handleAddPaymentMethod} onClose={() => setPaymentMethodModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
});

export default SettingsScreen;