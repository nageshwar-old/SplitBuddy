import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '@store/expenseSlice';
import { categories, paymentMethods } from '@utils/common'; // Import categories and payment methods
import ExpenseSummary from './ExpenseSummary';
import CategoriesWidget from './CategoriesWidget';
import { FlatList } from 'react-native';
import TransactionsWidget from './TransactionsWidget';

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch();

  // Get expenses and user info from the store
  const expenses = useSelector((state: any) => state.expenses.expenses);
  const user = useSelector((state: any) => state.auth.user); // Get user details from auth state

  useEffect(() => {
    dispatch(fetchExpenses()); // Fetch expenses when component mounts
  }, [dispatch]);

  // Handle category mapping (for display purposes)
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'N/A'; // Simplified label for unknown category
  };

  // Handle payment method mapping (for display purposes)
  const getPaymentMethodName = (paymentMethodId: string) => {
    const paymentMethod = paymentMethods.find((method) => method.id === paymentMethodId);
    return paymentMethod ? paymentMethod.name : 'N/A'; // Simplified label for unknown payment method
  };

  // Determine what to show as the username or name
  const displayName = user?.name ? user.name : user?.username;

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
          <Text style={styles.username}>{displayName || 'User'}</Text>

          <ExpenseSummary expenses={expenses} />

          <CategoriesWidget expenses={expenses} categories={categories} />

          <TransactionsWidget
            expenses={expenses}
            getCategoryName={getCategoryName}
            getPaymentMethodName={getPaymentMethodName}
          />
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