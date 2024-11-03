import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Alert, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/store';
import ExpenseCard from './ExpenseCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SETTINGS_KEYS } from '@constants/settingsConstants';
import { deleteExpenseRequest, fetchExpensesRequest } from '@app/store/slices/expenseSlice';
import { fetchGroupsRequest } from '@app/store/slices/groupSlice';

type ExpenseListScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'ExpenseList'>;

const ExpenseListScreen: React.FC = () => {
  const navigation = useNavigation<ExpenseListScreenNavigationProp>();
  const dispatch = useDispatch();
  const { expenses: expenseData, loading, error } = useSelector((state: AppState) => state.expense);
  const profile = useSelector((state: AppState) => state.user.profile);
  const { settingsData } = useSelector((state: AppState) => state.settings);
  const groups = useSelector((state: AppState) => state.group.groups);

  const expenses: ExpenseResponseItem[] = expenseData?.expenses || [];

  const selectedCategories: Category[] = (settingsData?.[SETTINGS_KEYS.CATEGORIES] || []).map((name: string) => ({
    id: name,
    name,
  }));

  const selectedPaymentMethods: PaymentMethod[] = (settingsData?.[SETTINGS_KEYS.PAYMENT_METHODS] || []).map((name: string) => ({
    id: name,
    name,
  }));

  useEffect(() => {
    dispatch(fetchExpensesRequest());
    dispatch(fetchGroupsRequest());
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

  const getGroupName = (groupId: string): string => {
    const group = groups.find((g) => g.id === groupId);
    return group ? group.groupName : 'No Group';
  };

  const getCategoryLabel = (categoryId: string): string => {
    const category = selectedCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'N/A';
  };

  const getPaymentMethodLabel = (paymentMethodId: string): string => {
    const paymentMethod = selectedPaymentMethods.find((method) => method.id === paymentMethodId);
    return paymentMethod ? paymentMethod.name : 'N/A';
  };

  const handleDelete = (expenseId: string) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => dispatch(deleteExpenseRequest(expenseId)) },
      ],
      { cancelable: true }
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No expenses available. Add your first expense!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#6200EE" />
          <Text style={styles.loadingText}>Loading expenses...</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading expenses: {error}</Text>
        </View>
      )}
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseCard
            amount={item.amount.toString()}
            category={item.category.name}
            description={item.description || ''}
            paymentMethod={item.paymentMethod.name}
            group={item.group.groupName}
            date={item.date}
            updatedDate={item.updatedAt}
            addedBy={profile?.firstName ?? ''}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: '#6200EE',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  errorText: {
    color: '#B00020',
  },
});

export default ExpenseListScreen;