import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, Modal, Portal, FAB, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/store';
import AddPaymentMethodScreen from './AddPaymentMethodScreen';
import { deletePaymentMethodRequest, fetchPaymentMethodsRequest } from '@app/store/slices/paymentMethodSlice';
import { useNavigation } from '@react-navigation/native';

const PaymentMethodListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const paymentMethods = useSelector((state: AppState) => state.paymentMethod.paymentMethods);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<UpdatePaymentMethod | null>(null);

    // Fetch payment methods when the component mounts
    useEffect(() => {
        dispatch(fetchPaymentMethodsRequest());
    }, [dispatch]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon="plus"
                    iconColor="#6200EE"
                    size={24}
                    onPress={() => setAddModalVisible(true)}
                />
            ),
        });
    }, [navigation]);

    // Close the modal and reset the selected payment method
    const handleCloseModal = () => {
        setSelectedPaymentMethod(null);
        setAddModalVisible(false);
    };

    // Handle deleting a payment method
    const handleDelete = (paymentMethodId: string) => {
        Alert.alert(
            'Delete Payment Method',
            'Are you sure you want to delete this payment method?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => dispatch(deletePaymentMethodRequest(paymentMethodId)) },
            ],
            { cancelable: false }
        );
    };

    // Render each payment method item
    const renderPaymentMethodItem = ({ item }: { item: UpdatePaymentMethod }) => (
        <View style={styles.paymentMethodCard}>
            <Text style={styles.paymentMethodText}>{item.name}</Text>
            <View style={styles.actions}>
                <Button mode="text" onPress={() => { setSelectedPaymentMethod(item); setAddModalVisible(true); }}>Edit</Button>
                <Button mode="text" onPress={() => handleDelete(item.id)}>Delete</Button>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={paymentMethods}
                keyExtractor={(item) => item.id}
                renderItem={renderPaymentMethodItem}
            />

            {/* Add/Edit Payment Method Modal */}
            <Portal>
                <Modal visible={isAddModalVisible} onDismiss={handleCloseModal} contentContainerStyle={styles.modalContainer}>
                    <AddPaymentMethodScreen
                        selectedPaymentMethod={selectedPaymentMethod}
                        onClose={handleCloseModal}
                    />
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    paymentMethodCard: {
        marginVertical: 8,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#E3E1F0',
    },
    paymentMethodText: {
        fontSize: 18,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200EE',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
});

export default PaymentMethodListScreen;