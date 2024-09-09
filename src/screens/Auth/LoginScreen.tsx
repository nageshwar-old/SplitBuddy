import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store'; // Import RootState for type checking
import { loginStart } from '@store/authSlice'; // Import the loginStart action to trigger the saga
import { showToast } from '@store/toastSlice'; // Import for toast notifications
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@navigation/AuthNavigator'; // Assuming this is defined in your Auth Navigator
import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
    const [identifier, setIdentifier] = useState<string>(''); // Can be email or username
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { loading, error } = useSelector((state: RootState) => state.auth); // Get the auth state

    const handleLogin = () => {
        if (!identifier || !password) {
            dispatch(showToast({ message: 'Please fill out all fields', type: 'error' }));
            return;
        }

        // Dispatch the loginStart action, which will be intercepted by the saga
        dispatch(loginStart({ identifier, password }));
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
            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
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
        color: '#6200EE', // Customize the color to match your theme
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