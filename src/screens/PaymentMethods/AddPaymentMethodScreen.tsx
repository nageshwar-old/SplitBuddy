import React, { useState, useEffect } from 'react';
import { Button, TextInput, Snackbar, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@app/store/store';
import { createPaymentMethodRequest, updatePaymentMethodRequest } from '@app/store/slices/paymentMethodSlice';

interface AddPaymentMethodScreenProps {
    selectedPaymentMethod: CreatePaymentMethod | UpdatePaymentMethod | null;
    onClose: () => void;
}

const AddPaymentMethodScreen: React.FC<AddPaymentMethodScreenProps> = ({ selectedPaymentMethod, onClose }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: AppState) => state.auth);
    const existingPaymentMethods = useSelector((state: AppState) => state.paymentMethod.paymentMethods);

    const [paymentMethodName, setPaymentMethodName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (selectedPaymentMethod) {
            setPaymentMethodName(selectedPaymentMethod.name ?? '');
        } else {
            setPaymentMethodName('');
        }
    }, [selectedPaymentMethod]);

    const handleSavePaymentMethod = () => {
        const trimmedPaymentMethodName = paymentMethodName.trim();

        // Validate input
        if (!trimmedPaymentMethodName) {
            setErrorMessage('Please enter a payment method name.');
            return;
        }

        if (existingPaymentMethods.some(method => method.name.toLowerCase() === trimmedPaymentMethodName.toLowerCase())) {
            setErrorMessage('Payment method name already exists.');
            return;
        }

        setErrorMessage(null); // Clear error message if validation passes

        if (selectedPaymentMethod) {
            // Uncomment and add ID for updating the payment method
            // dispatch(updatePaymentMethodRequest({
            //     paymentMethodId: selectedPaymentMethod.id,
            //     data: { name: trimmedPaymentMethodName, authorId: user?.id ?? '' }
            // }));
        } else {
            dispatch(createPaymentMethodRequest({
                name: trimmedPaymentMethodName,
                authorId: user?.id ?? ''
            }));
        }

        setTimeout(onClose, 500); // Close after showing feedback
    };

    return (
        <>
            <TextInput
                label="Payment Method Name"
                value={paymentMethodName}
                onChangeText={setPaymentMethodName}
                style={{ marginBottom: 20 }}
                error={!!errorMessage} // Add red underline if there's an error
            />
            {errorMessage && <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>}
            <Button mode="contained" onPress={handleSavePaymentMethod}>
                {selectedPaymentMethod ? 'Update Payment Method' : 'Add Payment Method'}
            </Button>
        </>
    );
};

export default AddPaymentMethodScreen;