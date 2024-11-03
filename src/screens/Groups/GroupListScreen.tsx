import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/store';
import { deleteGroupRequest, fetchGroupsRequest } from '@app/store/slices/groupSlice';

type GroupListScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'GroupList'>;

const GroupListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<GroupListScreenNavigationProp>();
    const { groups, loading, error } = useSelector((state: AppState) => state.group);

    useEffect(() => {
        dispatch(fetchGroupsRequest());
    }, [dispatch]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon="plus"
                    iconColor="#6200EE"
                    size={24}
                    onPress={() => navigation.navigate('AddGroup')}
                />
            ),
        });
    }, [navigation]);

    const handleDeleteGroup = (groupId: string) => {
        Alert.alert(
            "Delete Group",
            "Are you sure you want to delete this group?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => dispatch(deleteGroupRequest(groupId)) },
            ],
            { cancelable: true }
        );
    };

    const renderGroup = ({ item }: { item: IGroupItemResponse }) => (
        <Card style={styles.groupCard}>
            <Card.Content>
                <View style={styles.groupHeader}>
                    <Text style={styles.groupName}>{item.groupName}</Text>
                    <IconButton
                        icon="delete"
                        iconColor="#333"
                        size={24}
                        onPress={() => handleDeleteGroup(item.id)}
                    />
                </View>
                <Text style={styles.groupDetail}>Currency: {item.currency}</Text>
                <Text style={styles.groupDetail}>Users: {item.userIds?.length || 0}</Text>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#6200EE" />
                    <Text style={styles.loadingText}>Loading groups...</Text>
                </View>
            )}
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error loading groups: {error}</Text>
                </View>
            )}
            <FlatList
                data={groups}
                renderItem={renderGroup}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>No groups available. Add your first group!</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F9FA',
    },
    groupCard: {
        marginBottom: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
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
    groupDetail: {
        fontSize: 14,
        color: 'gray',
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
    emptyText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
});

export default GroupListScreen;