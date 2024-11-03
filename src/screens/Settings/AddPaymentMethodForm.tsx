import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

interface AddPaymentMethodFormProps {
    onSubmit: (paymentMethodName: string) => void;
    onClose: () => void;
}

const AddPaymentMethodForm: React.FC<AddPaymentMethodFormProps> = ({ onSubmit, onClose }) => {
    const [paymentMethodName, setPaymentMethodName] = useState('');

    const handleSubmit = () => {
        if (paymentMethodName.trim()) {
            onSubmit(paymentMethodName);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Payment Method Name</Text>
            <TextInput
                value={paymentMethodName}
                onChangeText={setPaymentMethodName}
                style={styles.input}
                placeholder="Enter payment method name"
            />
            <Button title="Add Payment Method" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },
});

export default AddPaymentMethodForm;