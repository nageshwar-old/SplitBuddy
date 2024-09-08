import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { generateUUID, currencies } from '@utils/common'; // Import currency list
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { RootState } from '@store/store'; // Import RootState
import { fetchGroups, addGroup } from '@store/expenseSlice'; // Import Redux actions
import MultiSelect from '@components/MultiSelect'; // Import MultiSelect
import Input from '@components/Input'; // Import the new Input component
import { RootStackParamList } from '@navigation/AppNavigator';

type AddGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddGroup'>;

const AddGroupScreen: React.FC = () => {
    const [groupName, setGroupName] = useState('');
    const [currency, setCurrency] = useState<string[]>([]); // Single selection in array
    const [description, setDescription] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
    const dispatch = useDispatch();
    const navigation = useNavigation<AddGroupScreenNavigationProp>();

    // Get Redux state for groups and loading/error state
    const { groups, loading, error, success } = useSelector((state: RootState) => state.expenses);

    // Fetch groups when the component mounts
    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    // Handle Snackbar for showing feedback based on success/error state
    useEffect(() => {
        if (error) {
            setSnackbarMessage(error);
            setSnackbarVisible(true);
        }
        if (success) {
            setSnackbarMessage(success);
            setSnackbarVisible(true);
        }
    }, [error, success]);

    const handleAddGroup = () => {
        // Check for duplicate group names
        if (groups.some(group => group.name.toLowerCase() === groupName.toLowerCase())) {
            setSnackbarMessage('Group name already exists');
            setSnackbarVisible(true);
            return;
        }

        if (!groupName || currency.length === 0) {
            setSnackbarMessage('Please fill out the required fields');
            setSnackbarVisible(true);
            return;
        }

        const newGroup = {
            id: generateUUID(),
            name: groupName,
            currency: currency[0], // Since it's a single select, we take the first item
            description,
        };

        // Dispatch addGroup action to Redux
        dispatch(addGroup(newGroup));

        // Clear the form fields after adding
        setGroupName('');
        setCurrency([]);
        setDescription('');
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Group Name"
                value={groupName}
                onChangeText={setGroupName}
                style={styles.input}
            />

            {/* Use MultiSelect for Single Currency Selection */}
            <MultiSelect
                items={currencies.map(currency => ({ id: currency.code, name: `${currency.name} (${currency.code})` }))}
                selectedItems={currency}
                onSelectionChange={setCurrency}
                title="Select a Currency"
                placeholder="Choose Currency"
                fieldLabel="Currency"
                isSingleSelect={true} // Enable single selection
            />

            <Input
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                style={styles.input}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
            ) : (
                <Button mode="contained" onPress={handleAddGroup} style={styles.button}>
                    Add Group
                </Button>
            )}

            {/* Snackbar for form validation feedback */}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 20,
    },
    loader: {
        marginTop: 20,
    },
});

export default AddGroupScreen;