import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { fetchExpenses, deleteExpense } from '@store/expenseSlice';
import ExpenseCard from './ExpenseCard';
import { RootStackParamList } from '@navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { categories as availableCategoriesList, paymentMethods as availablePaymentMethodsList } from '@utils/common'; // Import available categories and payment methods

type ExpenseListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExpenseList'>;

const ExpenseListScreen: React.FC = () => {
  const navigation = useNavigation<ExpenseListScreenNavigationProp>();
  const dispatch = useDispatch();
  const { expenses, groups, loading, error } = useSelector((state: RootState) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonContainer}>
          <IconButton
            icon="plus"
            iconColor="#6200EE"
            size={24}
            onPress={() => navigation.navigate('AddExpense')}
            style={styles.headerButton}
          />
        </View>
      ),
    });
  }, [navigation]);

  // Function to get the group name
  const getGroupName = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    return group ? group.name : 'No Group';
  };

  // Function to get the category label by ID, default to "N/A"
  const getCategoryLabel = (categoryId: string) => {
    const category = availableCategoriesList.find((cat) => cat.id === categoryId);
    return category ? category.name : 'N/A'; // Shortened fallback
  };

  // Function to get the payment method label by ID, default to "N/A"
  const getPaymentMethodLabel = (paymentMethodId: string) => {
    const paymentMethod = availablePaymentMethodsList.find((method) => method.id === paymentMethodId);
    return paymentMethod ? paymentMethod.name : 'N/A'; // Shortened fallback
  };

  const handleDelete = (expenseId: string) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => dispatch(deleteExpense(expenseId)) },
      ],
      { cancelable: true }
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No expenses available. Add your first expense!</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading expenses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading expenses: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseCard
            amount={item.amount.toString()}
            category={getCategoryLabel(item.category)} // Get the category label
            description={item.description}
            paymentMethod={getPaymentMethodLabel(item.paymentMethod)} // Get the payment method label
            group={getGroupName(item.group)}
            date={item.date}
            addedBy={item.addedBy} // Assuming addedBy is a part of item
            onEdit={() => navigation.navigate('EditExpense', { expenseId: item.id })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  headerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    marginRight: 15,
    fontWeight: 'bold',
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default ExpenseListScreen;