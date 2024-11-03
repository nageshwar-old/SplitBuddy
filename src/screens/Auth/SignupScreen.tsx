import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@slices/toastSlice';
import { registerRequest, clearError } from '@store/slices/authSlice';
import { AppState } from '@store/store';
import PasswordInput from '@components/PasswordInput';

interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    country: string;
}

const SignupScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state: AppState) => state.auth);
    const { control, handleSubmit, reset, formState: { errors } } = useForm<SignupFormData>();

    // Clear error on mount and show toast on error or success
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        if (error) dispatch(showToast({ message: `Signup failed: ${error}`, type: 'error' }));
        if (isAuthenticated) {
            dispatch(showToast({ message: 'Signup successful!', type: 'success' }));
            reset(); // Clear the form
        }
    }, [error, isAuthenticated, dispatch, reset]);

    const onSubmit = (data: SignupFormData) => {
        // Trim all input fields
        const trimmedData = {
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: data.email.trim(),
            username: data.username.trim(),
            password: data.password.trim(),
            confirmPassword: data.confirmPassword.trim(),
            country: data.country.trim(),
        };

        if (trimmedData.password !== trimmedData.confirmPassword) {
            dispatch(showToast({ message: 'Passwords do not match', type: 'error' }));
            return;
        }
        dispatch(registerRequest(trimmedData));
    };

    // Get the first error message
    const firstError = errors && Object.values(errors)[0]?.message;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Display the first error message at the top */}
            {firstError && <Text style={styles.errorText}>{firstError}</Text>}

            {/* Form fields */}
            {['firstName', 'lastName', 'email', 'username', 'country'].map((field) => (
                <Controller
                    key={field}
                    control={control}
                    name={field as keyof SignupFormData}
                    rules={{ required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={value}
                            onChangeText={onChange}
                            style={styles.input}
                            editable={!loading}
                        />
                    )}
                />
            ))}

            {/* Password fields */}
            {['password', 'confirmPassword'].map((field) => (
                <Controller
                    key={field}
                    control={control}
                    name={field as keyof SignupFormData}
                    rules={{
                        required: `${field === 'password' ? 'Password' : 'Confirm Password'} is required`,
                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <PasswordInput
                            placeholder={field === 'password' ? 'Password' : 'Confirm Password'}
                            value={value}
                            onChangeText={onChange}
                            style={styles.input}
                            editable={!loading}
                        />
                    )}
                />
            ))}

            {/* Submit Button */}
            <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
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
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default SignupScreen;