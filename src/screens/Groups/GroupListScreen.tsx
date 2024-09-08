import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, Card, IconButton } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux'; // Use Redux hooks
import { RootState } from '@store/store'; // Import RootState
import { fetchGroups, deleteGroup } from '@store/expenseSlice'; // Import Redux actions
import { RootStackParamList } from '@navigation/AppNavigator';

type GroupListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GroupList'>;

interface Group {
    id: string;
    name: string;
    currency: string;
    description?: string;
}

const GroupListScreen: React.FC = () => {
    const navigation = useNavigation<GroupListScreenNavigationProp>();
    const dispatch = useDispatch();

    // Get the groups, loading, and error states from Redux
    const { groups, loading, error } = useSelector((state: RootState) => state.expenses);

    // Fetch groups when the screen is focused
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchGroups()); // Dispatch the Redux action to fetch groups
        }, [dispatch])
    );

    // Handle deleting a group
    const handleDeleteGroup = (groupId: string) => {
        Alert.alert(
            "Delete Group",
            "Are you sure you want to delete this group?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        dispatch(deleteGroup(groupId)); // Dispatch the Redux action to delete a group
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderGroup = ({ item }: { item: Group }) => (
        <Card style={styles.groupCard}>
            <Card.Content>
                <View style={styles.groupHeader}>
                    <Text style={styles.groupName}>{item.name}</Text>
                    <IconButton
                        icon="delete"
                        iconColor="red"
                        size={24}
                        onPress={() => handleDeleteGroup(item.id)} // Call the delete function when pressed
                    />
                </View>
                <Text style={styles.groupCurrency}>Currency: {item.currency}</Text>
                {item.description && <Text style={styles.groupDescription}>Description: {item.description}</Text>}
            </Card.Content>
        </Card>
    );

    const handleAddGroup = () => {
        navigation.navigate('AddGroup');
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>Error: {error}</Text>
            ) : (
                <FlatList
                    data={groups}
                    renderItem={renderGroup}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text>No groups found.</Text>}
                />
            )}
            <Button mode="contained" onPress={handleAddGroup} style={styles.addButton}>
                Add Group
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    groupCard: {
        marginBottom: 16,
    },
    groupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    groupName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    groupCurrency: {
        fontSize: 14,
        color: 'gray',
    },
    groupDescription: {
        fontSize: 14,
        color: 'gray',
    },
    addButton: {
        marginTop: 16,
    },
});

export default GroupListScreen;