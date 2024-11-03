import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import Input from '@components/Input';
import Button from '@components/Button';
import MyDatePicker from '@components/MyDatePicker';
import MultiSelect from '@components/MultiSelect';
import { AppState } from '@store/store';
import { Snackbar } from 'react-native-paper';
import { updateExpenseRequest } from '@app/store/slices/expenseSlice';

type EditExpenseScreenRouteProp = RouteProp<AppStackParamList, 'EditExpense'>;

const EditExpenseScreen: React.FC = () => {
  const route = useRoute<EditExpenseScreenRouteProp>();
  const { expenseId } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const expenses = useSelector((state: AppState) => state.expense.expenses?.expenses || []);
  const profile = useSelector((state: AppState) => state.user.profile);

  const expense = expenses.find(exp => exp.id === expenseId);

  const [amount, setAmount] = useState(expense ? expense.amount.toString() : '');
  const [category, setCategory] = useState<{ id: string; name: string }[]>(expense ? [{ id: expense.category.id, name: expense.category.name }] : []);
  const [description, setDescription] = useState(expense ? expense.description : '');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(expense ? new Date(expense.date) : undefined);
  const [paymentMethod, setPaymentMethod] = useState<{ id: string; name: string }[]>(expense ? [{ id: expense.paymentMethod.id, name: expense.paymentMethod.name }] : []);
  const [group, setGroup] = useState<{ id: string; name: string }[]>(expense ? [{ id: expense.group.id, name: expense.group.groupName }] : []);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState<boolean>(true);

  const availableCategoriesList = useSelector((state: AppState) => state.category.categories);
  const availablePaymentMethodsList = useSelector((state: AppState) => state.paymentMethod.paymentMethods);
  const availableGroups = useSelector((state: AppState) => state.group.groups);

  const [availableCategories, setAvailableCategories] = useState<{ id: string; name: string }[]>([]);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<{ id: string; name: string }[]>([]);
  const [availableGroupsList, setAvailableGroupsList] = useState<{ id: string; name: string }[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadSettings = () => {
        const categoriesList = availableCategoriesList.map(category => ({ id: category.id, name: category.name }));
        const paymentMethodsList = availablePaymentMethodsList.map(method => ({ id: method.id, name: method.name }));
        const groupNamesList = availableGroups.map(group => ({ id: group.id, name: group.groupName }));

        setAvailableCategories(categoriesList);
        setAvailablePaymentMethods(paymentMethodsList);
        setAvailableGroupsList(groupNamesList);
      };

      loadSettings();
    }, [availableCategoriesList, availablePaymentMethodsList, availableGroups])
  );

  const handleUpdateExpense = async () => {
    const trimmedAmount = amount.trim();
    const trimmedDescription = description.trim();

    if (!trimmedAmount || category.length === 0 || !trimmedDescription || paymentMethod.length === 0 || group.length === 0) {
      showFeedback('Please fill out all fields', false);
      return;
    }

    const updatedExpense = {
      id: expenseId,
      amount: parseFloat(trimmedAmount),
      categoryId: category[0]?.id,
      description: trimmedDescription,
      date: (selectedDate || new Date()).toISOString(),
      paymentMethodId: paymentMethod[0]?.id,
      groupId: group[0]?.id,
      addedBy: profile?.id || '',
      authorId: profile?.id || '',
    };

    try {
      await dispatch(updateExpenseRequest({ expenseId, data: updatedExpense }));
      showFeedback('Expense updated successfully', true);
      setTimeout(() => navigation.goBack(), 300); // Delay navigation for user to see feedback
    } catch (error) {
      showFeedback('Failed to update expense', false);
    }
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
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
        items={availableGroupsList}
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
        onCancel={() => { }}
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