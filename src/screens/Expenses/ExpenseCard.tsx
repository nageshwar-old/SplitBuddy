import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import moment from 'moment';

interface ExpenseCardProps {
    amount: string;
    category: string;
    description: string;
    paymentMethod: string;
    group: string; // Group name
    date: string; // Date of the expense
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
    onEdit,
    onDelete,
}) => {
    const formattedDuration = moment(date).fromNow(); // Use Moment.js to get duration

    // Convert payment method to uppercase and remove special characters
    const formattedPaymentMethod = paymentMethod.replace(/[^a-zA-Z0-9\s]/g, ' ').toUpperCase();

    return (
        <View style={styles.card}>
            {/* Top-right buttons for edit and delete */}
            <View style={styles.actionButtons}>
                <IconButton icon="pencil-outline" size={20} onPress={onEdit} />
                <IconButton icon="delete-outline" size={20} onPress={onDelete} />
            </View>

            {/* Expense Details */}
            <View style={styles.cardContent}>
                <View style={styles.leftDetails}>
                    <Text style={styles.category}>{category}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.group}>{group}</Text>
                    <Text style={styles.duration}>Added {formattedDuration}</Text>
                </View>
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
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
        position: 'relative',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButtons: {
        position: 'absolute',
        top: 5,
        right: 5,
        flexDirection: 'row',
    },
    leftDetails: {
        flex: 1,
    },
    footer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        paddingTop: 10,
    },
    amount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6200EE',
    },
    paymentMethod: {
        fontSize: 16, // Increased font size for better readability
        fontWeight: '600', // Bold for emphasis
        color: '#4A4A4A',
    },
    category: {
        fontSize: 16,
        fontWeight: '600',
        color: '#264653',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#6A6A6A',
        marginBottom: 5,
    },
    group: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6A6A6A',
        marginBottom: 5,
    },
    duration: {
        fontSize: 12,
        color: '#8D99AE',
    },
});

export default ExpenseCard;