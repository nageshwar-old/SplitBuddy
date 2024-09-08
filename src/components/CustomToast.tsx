import React from 'react';
import { Snackbar } from 'react-native-paper';
import { Text, StyleSheet } from 'react-native';

interface CustomToastProps {
    visible: boolean;
    message: string;
    onDismiss: () => void;
    type?: 'success' | 'error';
    duration?: number;
}

const CustomToast: React.FC<CustomToastProps> = ({
    visible,
    message,
    onDismiss,
    type = 'success',
    duration,
}) => {
    const isError = type === 'error';

    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={isError ? Snackbar.DURATION_LONG : (duration || Snackbar.DURATION_SHORT)}
            style={[styles.toast, isError ? styles.error : styles.success]}
            action={isError ? { label: 'Close', onPress: onDismiss } : undefined}
        >
            {message}
        </Snackbar>
    );
};

const styles = StyleSheet.create({
    toast: {
        marginBottom: 20,
    },
    success: {
        backgroundColor: '#4CAF50',
    },
    error: {
        backgroundColor: '#F44336',
    },
    message: {
        color: 'white',
    },
});

export default CustomToast;