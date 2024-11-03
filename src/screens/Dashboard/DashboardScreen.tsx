import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseSummary from './ExpenseSummary';
import CategoriesWidget from './CategoriesWidget';
import { FlatList } from 'react-native';
import TransactionsWidget from './TransactionsWidget';
import { AppState } from '@app/store/store';
import { fetchExpensesRequest } from '@app/store/slices/expenseSlice';

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch();

  // Get expenses and user info from the store
  const expenseState = useSelector((state: AppState) => state.expense.expenses);
  const categories = useSelector((state: AppState) => state.category.categories);
  const paymentMethods = useSelector((state: AppState) => state.paymentMethod.paymentMethods);
  const expenses = expenseState?.expenses || [];
  const user = useSelector((state: AppState) => state.user.profile); // Get user details from auth state

  useEffect(() => {
    dispatch(fetchExpensesRequest()); // Fetch expenses when component mounts
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
  const displayName = user?.firstName;

  // Dummy data to satisfy FlatList
  const dummyData = [{}];

  return (
    <FlatList
      data={dummyData}
      keyExtractor={(item, index) => index.toString()} // Dummy key
      renderItem={null} // No items to render, we're only using the header
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <View style={styles.welcomeMessage}>
            <Text style={styles.greeting}>Welcome, <Text style={styles.username}>{displayName || 'User'}!</Text></Text>
          </View>

          <ExpenseSummary expenses={expenses} />

          {/* <CategoriesWidget expenses={expenses} categories={categories} /> */}

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
  welcomeMessage: {
    marginBottom: 20,
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