import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Input from '@components/Input';
import Button from '@components/Button';
import MyDatePicker from '@components/MyDatePicker';
import MultiSelect from '@components/MultiSelect';
import { editExpense, fetchExpenses } from '@store/expenseSlice';
import { showToast } from '@store/toastSlice';
import { RootStackParamList } from '@navigation/AppNavigator'; // Your navigation file
import { RootState } from '@store/store';
import { Snackbar } from 'react-native-paper';
import { SettingsService } from '@services/settingsService';
import { generateUUID, categories as availableCategoriesList, paymentMethods as availablePaymentMethodsList } from '@utils/common';

// Define type for route params (expenseId of the expense to edit)
type EditExpenseScreenRouteProp = RouteProp<RootStackParamList, 'EditExpense'>;

const EditExpenseScreen: React.FC = () => {
  const route = useRoute<EditExpenseScreenRouteProp>();
  const { expenseId } = route.params; // Get the expenseId from route params
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { expenses, groups } = useSelector((state: RootState) => state.expenses);

  // Fetch the expense to be edited based on expenseId
  const expense = expenses.find(exp => exp.id === expenseId);

  // State initialization based on the existing expense
  const [amount, setAmount] = useState(expense ? expense.amount.toString() : '');
  const [category, setCategory] = useState<string[]>(expense ? [expense.category] : []);
  const [description, setDescription] = useState(expense ? expense.description : '');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(expense ? new Date(expense.date) : undefined);
  const [paymentMethod, setPaymentMethod] = useState<string[]>(expense ? [expense.paymentMethod] : []);
  const [group, setGroup] = useState<string[]>(expense ? [expense.group] : []);
  const [availableCategories, setAvailableCategories] = useState<{ id: string; name: string }[]>([]);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<{ id: string; name: string }[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState<boolean>(true);

  useEffect(() => {
    // If expenses are not loaded, fetch them
    if (expenses.length === 0) {
      dispatch(fetchExpenses());
    }

    // Load available categories and payment methods (replace with actual settings fetching logic)
    const loadSettings = async () => {
      try {
        const visibleCategories = await SettingsService.getVisibleCategories();
        const categoriesList = availableCategoriesList
          .filter(category => visibleCategories[category.id])
          .map(category => ({ id: category.id, name: category.name }));

        setAvailableCategories(categoriesList);

        const visiblePaymentMethods = await SettingsService.getVisiblePaymentMethods();
        const paymentMethodsList = availablePaymentMethodsList
          .filter(method => visiblePaymentMethods[method.id])
          .map(method => ({ id: method.id, name: method.name }));

        setAvailablePaymentMethods(paymentMethodsList);
      } catch (error) {
        dispatch(showToast({ message: 'Failed to load settings', type: 'error' }));
      }
    };

    loadSettings();
  }, [dispatch, expenses]);

  const handleUpdateExpense = () => {
    if (!amount || category.length === 0 || !description || paymentMethod.length === 0 || group.length === 0) {
      showFeedback('Please fill out all fields', false);
      return;
    }

    const updatedExpense = {
      id: expenseId, // Use expenseId from route params
      amount: parseFloat(amount),
      category: category[0],
      description,
      date: (selectedDate || new Date()).toISOString(),
      paymentMethod: paymentMethod[0],
      group: group[0],
    };

    try {
      dispatch(editExpense(updatedExpense)); // Dispatch edit action to update the expense
      showFeedback('Expense updated successfully', true);
      navigation.goBack(); // Navigate back after updating
    } catch (error) {
      showFeedback('Failed to update expense', false);
    }
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDateCancel = () => {
    console.log('Date selection canceled');
  };

  const showFeedback = (message: string, success: boolean) => {
    setFeedbackMessage(message);
    setSnackbarSuccess(success);
    setIsSnackbarVisible(true);
  };

  const handleSnackbarDismiss = () => {
    setIsSnackbarVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <MultiSelect
        items={availableCategories}
        selectedItems={category}
        onSelectionChange={setCategory}
        title="Select a Category"
        placeholder="Choose Category"
        fieldLabel="Category"
        isSingleSelect={true}
      />
      <MultiSelect
        items={availablePaymentMethods}
        selectedItems={paymentMethod}
        onSelectionChange={setPaymentMethod}
        title="Select a Payment Method"
        placeholder="Choose Payment Method"
        fieldLabel="Payment Method"
        isSingleSelect={true}
      />
      <MultiSelect
        items={groups.map(group => ({ id: group.id, name: group.name }))}
        selectedItems={group}
        onSelectionChange={setGroup}
        title="Select a Group"
        placeholder="Choose Group"
        fieldLabel="Group"
        isSingleSelect={true}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <MyDatePicker
        placeholder="Select Date"
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
        style={styles.input}
      />
      <Button onPress={handleUpdateExpense}>
        Update Expense
      </Button>

      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
        style={{ backgroundColor: snackbarSuccess ? '#4CAF50' : '#F44336' }}
      >
        {feedbackMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    marginVertical: 10,
  },
});

export default EditExpenseScreen;