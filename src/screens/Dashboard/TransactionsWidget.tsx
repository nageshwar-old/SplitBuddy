import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import moment from 'moment';

interface ExpenseListItem {
    id: string;
    category: { id: string; name: string };
    amount: number;
    description: string;
    date: string;
    paymentMethod: { id: string; name: string };
}

interface TransactionsWidgetProps {
    expenses: ExpenseListItem[];
    getCategoryName: (categoryId: string) => string;
    getPaymentMethodName: (paymentMethodId: string) => string;
}

const TransactionsWidget: React.FC<TransactionsWidgetProps> = ({ expenses, getCategoryName, getPaymentMethodName }) => {
    // Show only the last 5 transactions
    const recentExpenses = expenses.slice(-5);

    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Expenses</Text>
                <Text style={styles.seeAll}>See all</Text>
            </View>

            <FlatList
                data={recentExpenses}
                renderItem={({ item }) => {
                    const duration = moment(item.date).fromNow();
                    const categoryName = getCategoryName(item.category.id);
                    const paymentMethodName = getPaymentMethodName(item.paymentMethod.id);

                    return (
                        <View style={styles.transactionItem}>
                            <Avatar.Icon icon="receipt" size={48} style={styles.transactionIcon} />
                            <View style={styles.transactionDetails}>
                                <Text style={styles.transactionDescription}>
                                    {item.description || 'No Description'}
                                </Text>
                                <Text style={styles.transactionCategory}>{categoryName}</Text>
                            </View>
                            <View style={styles.transactionAmountContainer}>
                                <Text style={styles.transactionTime}>{duration}</Text>
                                <Text
                                    style={[
                                        styles.transactionAmount,
                                        { color: item.amount > 0 ? '#388E3C' : '#D32F2F' },
                                    ]}
                                >
                                    ₹{item.amount.toFixed(2)}
                                </Text>
                                <Text style={styles.transactionPaymentMethod}>{paymentMethodName}</Text>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                    <Text style={styles.emptyListText}>No transactions available.</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAll: {
        fontSize: 16,
        color: '#6200EE',
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        elevation: 2,
    },
    transactionIcon: {
        backgroundColor: '#E3E1F0',
    },
    transactionDetails: {
        flex: 1,
        marginLeft: 10,
    },
    transactionDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    transactionCategory: {
        fontSize: 14,
        color: '#757575',
    },
    transactionAmountContainer: {
        alignItems: 'flex-end',
    },
    transactionTime: {
        fontSize: 12,
        color: '#757575',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionPaymentMethod: {
        fontSize: 14,
        color: '#757575',
    },
    emptyListText: {
        textAlign: 'center',
        color: '#757575',
        fontSize: 16,
        marginTop: 20,
    },
});

export default TransactionsWidget;