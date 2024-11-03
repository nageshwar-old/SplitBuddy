import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ExpenseSummaryProps {
    expenses: ExpenseListItem[] | undefined;
}

type SummaryScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Summary'>;

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses = [] }) => {
    const navigation = useNavigation<SummaryScreenNavigationProp>();

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const parseDate = (dateString: string) => new Date(dateString);

    const isCurrentMonth = (date: Date) =>
        date.getMonth() === currentMonth && date.getFullYear() === currentYear;

    const isLastMonth = (date: Date) => {
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        return date.getMonth() === lastMonth && date.getFullYear() === lastYear;
    };

    const isCurrentYear = (date: Date) => date.getFullYear() === currentYear;

    const currentMonthExpenses = expenses
        .filter((expense) => isCurrentMonth(parseDate(expense.date)))
        .reduce((acc, expense) => acc + expense.amount, 0);

    const lastMonthExpenses = expenses
        .filter((expense) => isLastMonth(parseDate(expense.date)))
        .reduce((acc, expense) => acc + expense.amount, 0);

    const currentYearExpenses = expenses
        .filter((expense) => isCurrentYear(parseDate(expense.date)))
        .reduce((acc, expense) => acc + expense.amount, 0);

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    const handleKnowMore = () => {
        navigation.navigate('Summary'); // Ensure 'Summary' matches the screen name in your navigator
    };

    return (
        <Card style={styles.summaryCard}>
            <Card.Content>
                <Text style={styles.summaryTitle}>Expense Summary</Text>

                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Current Month:</Text>
                    <Text style={styles.summaryValue}>₹{currentMonthExpenses.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Last Month:</Text>
                    <Text style={styles.summaryValue}>₹{lastMonthExpenses.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>This Year:</Text>
                    <Text style={styles.summaryValue}>₹{currentYearExpenses.toFixed(2)}</Text>
                </View>

                {/* Highlighted Total Expenses Section */}
                <View style={[styles.summaryItem, styles.totalItem]}>
                    <Text style={[styles.summaryLabel, styles.totalLabel]}>Total:</Text>
                    <Text style={[styles.summaryValue, styles.totalValue]}>₹{totalExpenses.toFixed(2)}</Text>
                </View>

                <Button
                    mode="contained"
                    onPress={handleKnowMore}
                    style={styles.knowMoreButton}
                    labelStyle={styles.buttonLabel}
                >
                    Know More
                </Button>
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
        marginBottom: 20,
        textAlign: 'center',
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#555',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6200EE',
    },
    // Styles for Total Expenses section
    totalItem: {
        backgroundColor: '#F0EFFF',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6200EE',
    },
    knowMoreButton: {
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 20,
        paddingHorizontal: 16,
    },
    buttonLabel: {
        fontSize: 14,
    },
});

export default ExpenseSummary;