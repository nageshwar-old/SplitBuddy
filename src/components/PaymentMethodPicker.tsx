import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button } from 'react-native-paper';

const PaymentMethodPicker: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Cash');

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={<Button onPress={() => setVisible(true)}>{selectedValue}</Button>}
            >
                <Menu.Item onPress={() => handleSelect('Cash')} title="Cash" />
                <Menu.Item onPress={() => handleSelect('Credit Card')} title="Credit Card" />
                <Menu.Item onPress={() => handleSelect('Debit Card')} title="Debit Card" />
                <Menu.Item onPress={() => handleSelect('Bank Transfer')} title="Bank Transfer" />
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
});

export default PaymentMethodPicker;