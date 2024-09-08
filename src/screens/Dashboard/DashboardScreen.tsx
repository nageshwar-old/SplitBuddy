import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '@store/expenseSlice';
import ExpenseSummary from './ExpenseSummary';
import CategoriesWidget from './CategoriesWidget';
import { FlatList } from 'react-native';
import TransactionsWidget from './TransactionsWidget';

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch();

  // Get expenses and categories from the store
  const expenses = useSelector((state: any) => state.expenses.expenses);
  const categories = useSelector((state: any) => state.expenses.categories); // Assuming categories are in the store

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  // Dummy data to satisfy FlatList
  const dummyData = [{}];

  return (
    <FlatList
      data={dummyData}
      keyExtractor={(item, index) => index.toString()} // Dummy key
      renderItem={null} // No items to render, we're only using the header
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.username}>User</Text>

          {/* Balance Summary */}
          <ExpenseSummary expenses={expenses} />

          {/* Categories Widget */}
          <CategoriesWidget expenses={expenses} categories={categories} />

          {/* Transactions Widget */}
          <TransactionsWidget expenses={expenses} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6200EE',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
});

export default DashboardScreen;