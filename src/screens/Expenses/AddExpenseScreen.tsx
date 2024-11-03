import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import MyDatePicker from '@components/MyDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/store';
import { createExpenseRequest } from '@slices/expenseSlice';
import { showToast } from '@slices/toastSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MultiSelect from '@components/MultiSelect';
import { generateUUID } from '@utils/common';

const AddExpenseScreen: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<{ id: string; name: string; data?: any }[]>([]);
  const [description, setDescription] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<{ id: string; name: string; data?: any }[]>([]);
  const [group, setGroup] = useState<{ id: string; name: string; data?: any }[]>([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state: AppState) => state.user.profile);
  const availableCategoriesList = useSelector((state: AppState) => state.category.categories);
  const availablePaymentMethodsList = useSelector((state: AppState) => state.paymentMethod.paymentMethods);
  const availableGroups = useSelector((state: AppState) => state.group.groups);

  const [availableCategories, setAvailableCategories] = useState<{ id: string; name: string; data?: any }[]>([]);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<{ id: string; name: string; data?: any }[]>([]);
  const [availableGroupsList, setAvailableGroupsList] = useState<{ id: string; name: string; data?: any }[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadSettings = () => {
        const categoriesList = availableCategoriesList.map(category => ({
          id: category.id,
          name: category.name,
          data: category,
        }));
        const paymentMethodsList = availablePaymentMethodsList.map(method => ({
          id: method.id,
          name: method.name,
          data: method,
        }));
        const groupNamesList = availableGroups.map(group => ({
          id: group.id,
          name: group.groupName,
          data: group,
        }));

        setAvailableCategories(categoriesList);
        setAvailablePaymentMethods(paymentMethodsList);
        setAvailableGroupsList(groupNamesList);
      };

      loadSettings();
    }, [availableCategoriesList, availablePaymentMethodsList, availableGroups])
  );

  const handleAddExpense = async () => {
    const trimmedAmount = amount.trim();
    const trimmedDescription = description.trim();

    if (!trimmedAmount || category.length === 0 || !trimmedDescription || paymentMethod.length === 0 || group.length === 0) {
      dispatch(showToast({ message: 'Please fill out all fields', type: 'error' }));
      return;
    }

    const newExpense = {
      amount: parseFloat(trimmedAmount),
      categoryId: category[0]?.id,
      description: trimmedDescription,
      date: (selectedDate || new Date()).toISOString(),
      paymentMethodId: paymentMethod[0]?.id,
      groupId: group[0]?.id,
      addedBy: user ? user.id : 'Unknown',
      authorId: user ? user.id : 'Unknown',
    };

    try {
      await dispatch(createExpenseRequest(newExpense));
      dispatch(showToast({ message: 'Expense added successfully', type: 'success' }));

      setAmount('');
      setCategory([]);
      setDescription('');
      setSelectedDate(undefined);
      setPaymentMethod([]);
      setGroup(availableGroups.length > 0 ? [{ id: availableGroups[0].id, name: availableGroups[0].groupName }] : []);
      navigation.goBack();
    } catch (error) {
      dispatch(showToast({ message: 'Failed to add expense', type: 'error' }));
    }
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDateCancel = () => { };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        label="Amount"
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
      <Input
        label="Description"
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
      <Button onPress={handleAddExpense}>
        Add Expense
      </Button>
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

export default AddExpenseScreen;