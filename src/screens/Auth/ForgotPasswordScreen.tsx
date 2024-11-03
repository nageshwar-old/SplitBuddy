import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch } from 'react-redux';
import { showToast } from '@slices/toastSlice'; // Import for toast notifications
import { forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailure } from '@slices/authSlice';
import { useTypedSelector } from '@app/store/store';

const ForgotPasswordScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const { loading, error, passwordResetSuccess } = useTypedSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleForgotPassword = async () => {
        if (!email) {
            dispatch(showToast({ message: 'Please enter your email', type: 'error' }));
            return;
        }

        try {
            dispatch(forgotPasswordRequest({ email }));

            // Simulate password reset process (replace with real service call)
            // e.g., await AuthService.forgotPassword(email);

            // Simulating success for demonstration purposes
            dispatch(forgotPasswordSuccess());
            dispatch(showToast({ message: 'Password reset link sent to your email.', type: 'success' }));
            setEmail(''); // Clear the input field after successful request
        } catch (err) {
            const errorMessage = typeof err === 'string' ? err : 'Failed to send reset link.';
            dispatch(forgotPasswordFailure(errorMessage));
            dispatch(showToast({ message: errorMessage, type: 'error' }));
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                editable={!loading && !passwordResetSuccess} // Disable input after submission
            />
            <Button onPress={handleForgotPassword} disabled={loading || passwordResetSuccess}>
                {loading ? 'Sending...' : passwordResetSuccess ? 'Request Sent' : 'Send Reset Link'}
            </Button>

            {error && <Text style={styles.errorText}>{error}</Text>}
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
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default ForgotPasswordScreen;