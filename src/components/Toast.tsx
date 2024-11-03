// @components/Toast.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { hideToast } from '@slices/toastSlice';
import { ToastOptions } from '@constants/toastTypes';

interface ToastProps {
    visible: boolean;
    message: string;
    onDismiss: () => void;
    type: 'success' | 'error' | 'info' | 'warning';
    position?: 'top' | 'bottom'; // Adjusted to match the string literals
    duration?: number; // Optional duration prop
    size?: 'small' | 'medium' | 'large'; // New size prop
}

const Toast: React.FC<ToastProps> = ({
    visible,
    message,
    onDismiss,
    type,
    position = 'bottom',
    duration = 3000,
    size = 'small', // Default size is small
}) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible, onDismiss, duration]);

    if (!visible) return null; // Do not render if not visible

    return (
        <View style={[styles.toast, { backgroundColor: getToastColor(type), [position]: 20 }, getSizeStyle(size)]}>
            <Text style={styles.toastText}>{message}</Text>
        </View>
    );
};

const getToastColor = (type: string) => {
    switch (type) {
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        case 'info':
            return 'blue';
        case 'warning':
            return 'orange';
        default:
            return 'gray';
    }
};

// Function to determine toast size styles
const getSizeStyle = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
        case 'medium':
            return { padding: 20, borderRadius: 10 };
        case 'large':
            return { padding: 24, borderRadius: 12 };
        case 'small':
        default:
            return { padding: 16, borderRadius: 8 };
    }
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -50 }],
        zIndex: 1000, // Ensure it shows on top
    },
    toastText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Toast;