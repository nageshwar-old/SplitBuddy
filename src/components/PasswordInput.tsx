import React, { useState } from 'react';
import Input from './Input'; // Path to your Input component
import { TextInputProps as PaperTextInputProps } from 'react-native-paper';

interface PasswordInputProps extends PaperTextInputProps {
    label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    label,
    ...props
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleToggleVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <Input
            label={label}
            secureTextEntry={!isPasswordVisible}
            icon={isPasswordVisible ? 'eye-off' : 'eye'}
            iconPosition="right"
            onIconPress={handleToggleVisibility}
            {...props}
        />
    );
};

export default PasswordInput;