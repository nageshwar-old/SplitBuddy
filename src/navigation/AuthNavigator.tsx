import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/Auth/LoginScreen';
import SignupScreen from '@screens/Auth/SignupScreen';
import ForgotPasswordScreen from '@screens/Auth/ForgotPasswordScreen';

export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
};

// Create a stack navigator for authentication screens
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => (
    <Stack.Navigator>
        {/* Hide header for LoginScreen */}
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
        />

        {/* Show header for SignupScreen */}
        <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
                title: 'Sign Up',
                headerTintColor: '#000', // Customize header text color
                headerTitleStyle: { fontWeight: 'bold', fontSize: 18 }, // Customize header style
            }}
        />

        {/* Show header for ForgotPasswordScreen */}
        <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
                title: 'Forgot Password',
                headerTintColor: '#000', // Customize header text color
                headerTitleStyle: { fontWeight: 'bold', fontSize: 18 }, // Customize header style
            }}
        />
    </Stack.Navigator>
);

export default AuthNavigator;