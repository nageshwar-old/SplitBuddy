import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/store';
import { fetchCategoriesRequest } from '@store/slices/categorySlice';
import { fetchGroupsRequest } from '@store/slices/groupSlice';
import { fetchPaymentMethodsRequest } from '@store/slices/paymentMethodSlice';

const SummaryScreen: React.FC = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state: AppState) => state.expense.expenses?.expenses || []); // Default to empty array if null
    const categories = useSelector((state: AppState) => state.category.categories || []);
    const groups = useSelector((state: AppState) => state.group.groups || []);
    const paymentMethods = useSelector((state: AppState) => state.paymentMethod.paymentMethods || []);
    const loading = useSelector((state: AppState) => state.expense.loading || state.category.loading || state.group.loading || state.paymentMethod.loading);

    useEffect(() => {
        dispatch(fetchCategoriesRequest());
        dispatch(fetchGroupsRequest());
        dispatch(fetchPaymentMethodsRequest());
    }, [dispatch]);

    // Calculate expenses summary
    const totalExpenses = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0); // Handle possible null or undefined amount
    const expensesByCategory = categories.map(category => ({
        name: category.name,
        total: expenses.filter(exp => exp.category.id === category.id).reduce((acc, exp) => acc + (exp.amount || 0), 0),
    }));
    const expensesByGroup = groups.map(group => ({
        name: group.groupName,
        total: expenses.filter(exp => exp.group.id === group.id).reduce((acc, exp) => acc + (exp.amount || 0), 0),
    }));
    const expensesByPaymentMethod = paymentMethods.map(method => ({
        name: method.name,
        total: expenses.filter(exp => exp.paymentMethod.id === method.id).reduce((acc, exp) => acc + (exp.amount || 0), 0),
    }));

    // Dynamic Suggestions Logic
    const generateSuggestions = () => {
        const suggestions = [];

        // Suggestion based on high expenses in a single category
        const highestCategory = expensesByCategory.reduce((prev, current) => (prev.total > current.total ? prev : current), { name: '', total: 0 });
        if (highestCategory.total > totalExpenses * 0.3) {
            suggestions.push(`Consider reducing spending on "${highestCategory.name}", as it accounts for a large portion of your expenses.`);
        }

        // Suggestion based on high number of small transactions
        const smallTransactionsCount = expenses.filter(expense => Math.abs(expense.amount || 0) < 100).length;
        if (smallTransactionsCount > expenses.length * 0.5) {
            suggestions.push("You have a high number of small transactions. Consider combining purchases or reducing small expenses to save more.");
        }

        // Suggestion based on month-over-month spending increase
        const currentMonthExpenses = expenses.filter(exp => new Date(exp.date).getMonth() === new Date().getMonth());
        const lastMonthExpenses = expenses.filter(exp => new Date(exp.date).getMonth() === new Date().getMonth() - 1);
        const currentMonthTotal = currentMonthExpenses.reduce((acc, exp) => acc + (exp.amount || 0), 0);
        const lastMonthTotal = lastMonthExpenses.reduce((acc, exp) => acc + (exp.amount || 0), 0);
        if (currentMonthTotal > lastMonthTotal * 1.2) {
            suggestions.push("Your spending has increased by over 20% compared to last month. Consider reviewing your recent purchases.");
        }

        // Suggestion based on a large single transaction
        const largeTransactions = expenses.filter(expense => Math.abs(expense.amount || 0) > 1000);
        if (largeTransactions.length > 0) {
            suggestions.push("You've made some large purchases recently. Evaluate if these were necessary and adjust future spending.");
        }

        return suggestions.length > 0 ? suggestions : ["Great job on keeping your spending balanced!"];
    };

    const savingSuggestions = generateSuggestions();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200EE" />
                <Text>Loading summary...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Total Expenses */}
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Total Expenses</Text>
                    <Text style={styles.cardValue}>₹{totalExpenses.toFixed(2)}</Text>
                </Card.Content>
            </Card>

            {/* Expenses by Category */}
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Expenses by Category</Text>
                    {expensesByCategory.map((item) => (
                        <View key={item.name} style={styles.item}>
                            <Text style={styles.itemLabel}>{item.name}</Text>
                            <Text style={styles.itemValue}>₹{item.total.toFixed(2)}</Text>
                        </View>
                    ))}
                </Card.Content>
            </Card>

            {/* Expenses by Group */}
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Expenses by Group</Text>
                    {expensesByGroup.map((item) => (
                        <View key={item.name} style={styles.item}>
                            <Text style={styles.itemLabel}>{item.name}</Text>
                            <Text style={styles.itemValue}>₹{item.total.toFixed(2)}</Text>
                        </View>
                    ))}
                </Card.Content>
            </Card>

            {/* Expenses by Payment Method */}
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Expenses by Payment Method</Text>
                    {expensesByPaymentMethod.map((item) => (
                        <View key={item.name} style={styles.item}>
                            <Text style={styles.itemLabel}>{item.name}</Text>
                            <Text style={styles.itemValue}>₹{item.total.toFixed(2)}</Text>
                        </View>
                    ))}
                </Card.Content>
            </Card>

            {/* Saving Suggestions */}
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Saving Suggestions</Text>
                    {savingSuggestions.map((suggestion, index) => (
                        <Text key={index} style={styles.suggestionText}>• {suggestion}</Text>
                    ))}
                    <Button mode="contained" style={styles.suggestionButton}>
                        Learn More
                    </Button>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F9F9F9',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6200EE',
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    itemLabel: {
        fontSize: 16,
        color: '#555',
    },
    itemValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6200EE',
    },
    suggestionText: {
        fontSize: 15,
        color: '#555',
        marginBottom: 5,
    },
    suggestionButton: {
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 20,
    },
});

export default SummaryScreen;