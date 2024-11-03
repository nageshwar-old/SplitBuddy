import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/Auth/LoginScreen';
import SignupScreen from '@screens/Auth/SignupScreen';
import ForgotPasswordScreen from '@screens/Auth/ForgotPasswordScreen';
import CustomHeader from '@components/CustomHeader';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} // Hide header for login
        />

        <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
                header: () => <CustomHeader title="Sign Up" showBackButton={true} />,
            }}
        />

        <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
                header: () => <CustomHeader title="Forgot Password" showBackButton={true} />,
            }}
        />
    </Stack.Navigator>
);

export default AuthNavigator;