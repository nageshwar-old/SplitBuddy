import React from 'react';
import { Text, View, Button } from 'react-native';
import { useExpenseContext } from '@context/ExpenseProvider';

const TestComponent: React.FC = () => {
    const { state, dispatch } = useExpenseContext();

    return (
        <View>
            <Text>Total Expenses: {state.expenses.length}</Text>
            <Button
                title="Add Dummy Expense"
                onPress={() =>
                    dispatch({
                        type: 'ADD_EXPENSE',
                        payload: {
                            id: 'dummy',
                            amount: 100,
                            category: 'Test',
                            description: 'Test expense',
                            date: new Date(),
                        },
                    })
                }
            />
        </View>
    );
};

export default TestComponent;