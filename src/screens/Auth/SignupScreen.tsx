import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice'; // Snackbar for notifications
import { generateUUID } from '@utils/common';
import { UserService } from '@services/userService'; // Import the UserService

const SignupScreen: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [country, setCountry] = useState<string>('');

    const dispatch = useDispatch();

    const handleSignup = async () => {
        if (!name || !email || !username || !password || !confirmPassword || !country) {
            dispatch(showToast({ message: 'Please fill out all required fields', type: 'error' }));
            return;
        }

        if (password !== confirmPassword) {
            dispatch(showToast({ message: 'Passwords do not match', type: 'error' }));
            return;
        }

        const id = generateUUID();
        const newUser = {
            id,
            name,
            email,
            phone: '',  // Optional phone field (not part of required fields)
            address: '', // Optional address field (not part of required fields)
            city: '', // Optional city field (not part of required fields)
            country,
            username,
            password,  // In production, you may hash the password before saving
            token: '',  // Token can be handled by your AuthService
            photoUrl: '', // You can add logic for handling user profile photos
            isAdmin: false,  // Defaulting to non-admin
        };

        try {
            await UserService.addUser(newUser);  // Add the user using UserService
            dispatch(showToast({ message: 'Signup successful!', type: 'success' }));

            // Clear form after successful signup
            setName('');
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setCountry('');
        } catch (error) {
            dispatch(showToast({ message: 'Signup failed', type: 'error' }));
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Input placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
            <Input placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <Input placeholder="Country" value={country} onChangeText={setCountry} style={styles.input} />
            <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} />
            <Input placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} style={styles.input} />
            <Button onPress={handleSignup}>Sign Up</Button>
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

export default SignupScreen;