import React, { useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, IconButton, Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '@store/slices/authSlice';
import { fetchProfileRequest, selectUserProfile, selectUserLoading, selectUserError } from '@store/slices/userSlice'; // Import the profile-related actions and selectors

// Define the type for the navigation prop
type ViewProfileNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Profile'>;

const ViewProfile = () => {
    const navigation = useNavigation<ViewProfileNavigationProp>();
    const dispatch = useDispatch();

    // Selectors for the user profile, loading, and error states
    const profile = useSelector(selectUserProfile);
    const loading = useSelector(selectUserLoading);
    const error = useSelector(selectUserError);

    // console.log(profile, 'profile');

    // Fetch the user profile on component mount
    useLayoutEffect(() => {
        if (profile?.id) {
            dispatch(fetchProfileRequest({ username: profile.id })); // Trigger profile fetch with user ID
        }
    }, [dispatch, profile?.id]);

    // Logout function to dispatch logout action
    const handleLogout = () => {
        dispatch(logoutRequest());
    };

    return (
        <View style={styles.container}>
            {/* Header with title and edit button */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <IconButton
                    icon="pencil-outline"
                    size={24}
                    onPress={() => {
                        navigation.navigate('EditProfile', { userId: profile?.id ?? '' });
                    }}
                />
            </View>

            {/* Display error if present */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Profile Section with Icon and Details Side by Side */}
                <View style={styles.profileSection}>
                    <Avatar.Icon size={90} icon="account" style={styles.profileIcon} />
                    <View style={styles.profileDetails}>
                        <Text style={styles.profileName}>{profile?.firstName || 'User Name'}</Text>
                        <Text style={styles.contactInfo}>📞 {profile?.phone || 'Phone Number'}</Text>
                        <Text style={styles.contactInfo}>✉️ {profile?.email || 'Email Address'}</Text>
                    </View>
                </View>

                {/* Wallet and Orders */}
                {/* <View style={styles.walletOrdersSection}>
                    <View style={styles.walletOrdersItem}>
                        <Text style={styles.walletOrdersText}>$140.00</Text>
                        <Text>Wallet</Text>
                    </View>
                    <View style={styles.walletOrdersItem}>
                        <Text style={styles.walletOrdersText}>12</Text>
                        <Text>Orders</Text>
                    </View>
                </View> */}

                {/* Settings Options */}
                <View style={styles.menuSection}>
                    {renderMenuItem('Categories', 'tag-outline', () => navigation.navigate('Categories'))}
                    {renderMenuItem('Payment Methods', 'credit-card-outline', () => navigation.navigate('PaymentMethods'))}
                    {renderMenuItem('Groups', 'account-group-outline', () => navigation.navigate('GroupList'))}
                    {renderMenuItem('Settings', 'cog-outline', () => navigation.navigate('Settings'))}
                </View>
            </ScrollView>

            {/* Log Out Button */}
            <Button
                mode="contained"
                onPress={handleLogout}
                loading={loading}
                disabled={loading}
                style={[styles.logoutButton, loading && styles.logoutButtonDisabled]}
                contentStyle={styles.logoutButtonContent}
                labelStyle={styles.logoutButtonText}
            >
                {loading ? 'Logging out...' : 'Log out'}
            </Button>
        </View>
    );
};

// Helper function to render each menu item with navigation
const renderMenuItem = (title: string, iconName: string, onPress: () => void) => {
    return (
        <List.Item
            title={title}
            left={() => <List.Icon icon={iconName} />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={onPress}
            style={styles.menuItem}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
    },
    profileIcon: {
        backgroundColor: '#4F8EF7',
    },
    profileDetails: {
        marginLeft: 20,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    contactInfo: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    walletOrdersSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    walletOrdersItem: {
        alignItems: 'center',
    },
    walletOrdersText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuSection: {
        marginTop: 0,
    },
    menuItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
    logoutButton: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#FF3B30',
    },
    logoutButtonContent: {
        height: 50,
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    logoutButtonDisabled: {
        backgroundColor: '#A9A9A9', // Use a different color for the disabled state
    },
});

export default ViewProfile;