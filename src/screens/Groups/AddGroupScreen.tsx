import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from '@components/MultiSelect';
import Input from '@components/Input';
import { currencies } from '@app/constants';
import { createGroupRequest, fetchGroupsRequest } from '@app/store/slices/groupSlice';
import { fetchUsersRequest, fetchUsersWithFieldsRequest } from '@app/store/slices/userSlice';
import { AppState } from '@store/store';
import { useNavigation } from '@react-navigation/native';

const AddGroupScreen: React.FC = () => {
    const navigation = useNavigation();
    const [groupName, setGroupName] = useState('');
    const [currency, setCurrency] = useState<{ id: string; name: string; data?: any }[]>([]);
    const [addUser, setAddUser] = useState(false);
    const [userIds, setUserIds] = useState<{ id: string; name: string; data?: any }[]>([]);

    const dispatch = useDispatch();
    const { groups, loading: groupsLoading } = useSelector((state: AppState) => state.group);
    const { users, usersLoading } = useSelector((state: AppState) => state.user);
    const profile = useSelector((state: AppState) => state.user.profile);

    // Fetch groups and users when component mounts
    useEffect(() => {
        dispatch(fetchGroupsRequest());
        dispatch(fetchUsersRequest({ fields: ['id', 'firstName'] }));
    }, [dispatch]);

    const handleAddGroup = () => {
        const trimmedGroupName = groupName.trim();

        if (groups.some(group => group.groupName.toLowerCase() === trimmedGroupName.toLowerCase())) {
            console.warn('Group name already exists');
            return;
        }

        if (!trimmedGroupName || currency.length === 0) {
            console.warn('Please fill out all required fields');
            return;
        }

        if (addUser && userIds.length === 0) {
            console.warn('Please provide user IDs or uncheck the Add User option');
            return;
        }

        const newGroup = {
            groupName: trimmedGroupName,
            currency: currency[0]?.id || '',
            userIds: userIds.map(user => user.id),
            authorId: profile?.id,
        };

        dispatch(createGroupRequest(newGroup));

        setGroupName('');
        setCurrency([]);
        setUserIds([]);
        setAddUser(false);
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Input
                    label="Group Name"
                    placeholder="Group Name"
                    value={groupName}
                    onChangeText={setGroupName}
                    style={styles.input}
                />

                <MultiSelect
                    items={currencies.map(currency => ({
                        id: currency.code,
                        name: `${currency.name} (${currency.code})`,
                        data: currency
                    }))}
                    selectedItems={currency}
                    onSelectionChange={setCurrency}
                    title="Select a Currency"
                    placeholder="Choose Currency"
                    fieldLabel="Currency"
                    isSingleSelect={true}
                />

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        status={addUser ? 'checked' : 'unchecked'}
                        onPress={() => setAddUser(!addUser)}
                        color="#6200EE"
                    />
                    <Text style={styles.checkboxLabel}>Add Users</Text>
                </View>

                {addUser && (
                    usersLoading ? (
                        <ActivityIndicator size="small" color="#6200EE" />
                    ) : (
                        <MultiSelect
                            items={users.map(user => ({
                                id: user.id,
                                name: user.firstName,
                                data: user
                            }))}
                            selectedItems={userIds}
                            onSelectionChange={setUserIds}
                            title="Select Users"
                            placeholder="Choose Users"
                            fieldLabel="Users"
                            isSingleSelect={false}
                        />
                    )
                )}
            </View>

            {groupsLoading ? (
                <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
            ) : (
                <Button mode="contained" onPress={handleAddGroup} style={styles.button}>
                    Add Group
                </Button>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    formContainer: {
        flexGrow: 1,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#6200EE',
    },
    loader: {
        marginTop: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#333',
        marginLeft: 8,
    },
});

export default AddGroupScreen;