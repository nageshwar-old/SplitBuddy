import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { loginRequest, loginFailure } from '@slices/authSlice'; // Import slice methods
import { AppState } from '@store/store'; // Adjust the import path if necessary
import PasswordInput from '@app/components/PasswordInput';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
    const [identifier, setIdentifier] = useState<string>(''); // Can be email or username
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { loading, error } = useSelector((state: AppState) => state.auth); // Get the auth state

    const handleLogin = () => {
        const trimmedIdentifier = identifier.trim();
        const trimmedPassword = password.trim();

        if (!trimmedIdentifier || !trimmedPassword) {
            dispatch(loginFailure('Please fill out all fields'));
            return;
        }

        dispatch(loginRequest({ username: trimmedIdentifier, password: trimmedPassword }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Login</Text>

            {/* Input Fields */}
            <Input
                placeholder="Email or Username"
                value={identifier}
                onChangeText={setIdentifier}
                style={styles.input}
                editable={!loading} // Disable input while loading
            />
            <PasswordInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                editable={!loading} // Disable input while loading
            />

            {/* Login Button */}
            <Button onPress={handleLogin} disabled={loading} style={styles.button}>
                {loading ? 'Logging in...' : 'Login'}
            </Button>

            {/* Error Message */}
            {error && (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            )}

            {/* Links to Signup and Forgot Password */}
            <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.linkText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.linkText}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#6200EE',
    },
    input: {
        width: '100%',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    linksContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        fontSize: 14,
        color: '#6200EE',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;