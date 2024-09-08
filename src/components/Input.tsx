import React from 'react';
import { TextInput as PaperTextInput, TextInputProps as PaperTextInputProps } from 'react-native-paper';

interface InputProps extends PaperTextInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  icon?: string;  // Optional prop for an icon
  iconPosition?: 'left' | 'right';  // Optional prop to specify the icon position
  onIconPress?: () => void;  // Optional callback when the icon is pressed
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText = () => { },
  placeholder,
  placeholderTextColor = '#888',
  icon,
  iconPosition = 'right',  // Default to 'right' position for the icon
  onIconPress,
  ...rest
}) => (
  <PaperTextInput
    mode="outlined"
    label={placeholder}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor}
    {...(icon && iconPosition === 'left' && {
      left: <PaperTextInput.Icon icon={icon} onPress={onIconPress} />
    })}
    {...(icon && iconPosition === 'right' && {
      right: <PaperTextInput.Icon icon={icon} onPress={onIconPress} />
    })}
    {...rest}
  />
);

export default Input;