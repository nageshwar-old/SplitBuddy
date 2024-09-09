import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import moment from 'moment';

interface ExpenseCardProps {
    amount: string;
    category: string;
    description: string;
    paymentMethod: string;
    group: string;
    date: string;
    addedBy: string; // New prop for the user who added the expense
    onEdit: () => void;
    onDelete: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
    amount,
    category,
    description,
    paymentMethod,
    group,
    date,
    addedBy, // New prop destructured
    onEdit,
    onDelete,
}) => {
    const formattedDuration = moment(date).fromNow();

    // Convert payment method to uppercase and remove special characters
    const formattedPaymentMethod = paymentMethod.replace(/[^a-zA-Z0-9\s]/g, ' ').toUpperCase();

    return (
        <View style={styles.card}>
            {/* Top-right buttons for edit and delete */}
            <View style={styles.actionButtons}>
                <IconButton
                    icon="pencil-outline"
                    size={22}
                    style={styles.iconButton}
                    onPress={onEdit}
                />
                <IconButton
                    icon="delete-outline"
                    size={22}
                    style={styles.iconButton}
                    onPress={onDelete}
                />
            </View>

            {/* Expense Details */}
            <View style={styles.cardContent}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.duration}>{formattedDuration}</Text>
                <Text style={styles.label}>Category: <Text style={styles.value}>{category}</Text></Text>
                <Text style={styles.label}>Group: <Text style={styles.value}>{group}</Text></Text>
                {/* New "Added by" label */}
                <Text style={styles.label}>Added by: <Text style={styles.value}>{addedBy}</Text></Text>
            </View>

            {/* Footer with payment method and amount */}
            <View style={styles.footer}>
                <Text style={styles.paymentMethod}>{formattedPaymentMethod}</Text>
                <Text style={styles.amount}>${amount}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
        position: 'relative',
    },
    actionButtons: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
    },
    iconButton: {
        marginHorizontal: 4,
    },
    cardContent: {
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    duration: {
        fontSize: 14,
        color: '#777',
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        color: '#888',
        marginBottom: 2,
        fontWeight: '500',
    },
    value: {
        fontSize: 14,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        paddingTop: 10,
        marginTop: 10,
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6200EE',
    },
    paymentMethod: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A4A4A',
    },
});

export default ExpenseCard;