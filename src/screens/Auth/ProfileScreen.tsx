import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@store/toastSlice'; // Snackbar for notifications
import { setUser } from '@store/authSlice'; // Redux action to update the user in the state
import { UserService } from '@services/userService'; // Import the UserService
import { RootState } from '@store/store'; // Redux state type
import { User } from '@services/userService'; // Import the User type

const ProfileScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth); // Get the current user from the Redux store

    // Required fields
    const [name, setName] = useState<string>(user?.name || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [username, setUsername] = useState<string>(user?.username || '');
    const [country, setCountry] = useState<string>(user?.country || '');

    // Optional fields
    const [phone, setPhone] = useState<string>(user?.phone || '');
    const [address, setAddress] = useState<string>(user?.address || '');
    const [city, setCity] = useState<string>(user?.city || '');

    const handleUpdate = async () => {
        if (!name || !email || !username || !country) {
            dispatch(showToast({ message: 'Please fill out all required fields', type: 'error' }));
            return;
        }

        // Ensure id and other required fields are present by spreading the existing user
        const updatedUser: User = {
            ...user, // Spread the existing user object to retain fields like id, token, etc.
            id: user?.id || '', // Ensure id is explicitly set as a string
            name,
            email,
            username,
            country,
            phone, // Optional
            address, // Optional
            city, // Optional
        };

        // Check if id is still undefined or an empty string, which would indicate an issue
        if (!updatedUser.id) {
            dispatch(showToast({ message: 'User ID is missing.', type: 'error' }));
            return;
        }

        try {
            await UserService.editUser(updatedUser); // Update the user using UserService
            dispatch(setUser(updatedUser)); // Update the user in the Redux store
            dispatch(showToast({ message: 'Profile updated successfully!', type: 'success' }));
        } catch (error) {
            dispatch(showToast({ message: 'Profile update failed', type: 'error' }));
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Required Fields */}
            <Input placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
            <Input placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <Input placeholder="Country" value={country} onChangeText={setCountry} style={styles.input} />

            {/* Optional Fields */}
            <Input placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />
            <Input placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
            <Input placeholder="City" value={city} onChangeText={setCity} style={styles.input} />

            <Button onPress={handleUpdate}>Update Profile</Button>
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

export default ProfileScreen;