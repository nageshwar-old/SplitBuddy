import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

interface ExpenseSummaryProps {
    expenses: { date: string; amount: number }[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
    // Calculate total income and expenses
    const totalIncome = expenses
        .filter((expense) => expense.amount > 0)
        .reduce((acc, expense) => acc + expense.amount, 0);

    const totalExpense = expenses
        .filter((expense) => expense.amount < 0)
        .reduce((acc, expense) => acc + Math.abs(expense.amount), 0);

    const totalBalance = totalIncome - totalExpense;

    return (
        <Card style={styles.summaryCard}>
            <Card.Content>
                <Text style={styles.summaryTitle}>Expense Summary</Text>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Income</Text>
                    <Text style={styles.summaryValue}>₹{totalIncome.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Expenses</Text>
                    <Text style={styles.summaryValue}>₹{totalExpense.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Balance</Text>
                    <Text style={styles.summaryValue}>₹{totalBalance.toFixed(2)}</Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    summaryCard: {
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#F3F4F6',
    },
    summaryTitle: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#333',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6200EE',
    },
});

export default ExpenseSummary;