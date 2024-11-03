import React from 'react';
import { TextInput as PaperTextInput, TextInputProps as PaperTextInputProps } from 'react-native-paper';

interface InputProps extends PaperTextInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  onIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText = () => { },
  placeholder,
  placeholderTextColor = '#888',
  icon,
  iconPosition = 'right',
  autoCapitalize = 'none',
  onIconPress,
  ...rest
}) => {
  const handleTextChange = (text: string) => {
    onChangeText(text);
  };

  return (
    <PaperTextInput
      mode="outlined"
      label={placeholder}
      value={value}
      onChangeText={handleTextChange}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      autoCapitalize={autoCapitalize}
      {...(icon && iconPosition === 'left' && {
        left: <PaperTextInput.Icon icon={icon} onPress={onIconPress} />
      })}
      {...(icon && iconPosition === 'right' && {
        right: <PaperTextInput.Icon icon={icon} onPress={onIconPress} />
      })}
      {...rest}
    />
  );
};

export default Input;