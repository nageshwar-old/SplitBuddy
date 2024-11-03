import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput as PaperTextInput, TextInputProps as PaperTextInputProps, Text } from 'react-native-paper';

interface InputProps extends Omit<PaperTextInputProps, 'label'> {
  label?: React.ReactNode; // Accepts both string and React node
  icon?: string;
  iconPosition?: 'left' | 'right';
  onIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  icon,
  iconPosition = 'right',
  onIconPress,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {/* Render label if it's a React node; otherwise, pass it directly to PaperTextInput */}
      {typeof label !== 'string' && label ? (
        <Text style={styles.label}>{label}</Text>
      ) : null}
      <PaperTextInput
        mode="outlined"
        {...props}
        label={typeof label === 'string' ? label : undefined} // Pass only if label is a string
        style={[styles.input, props.style]}
        left={icon && iconPosition === 'left' ? <PaperTextInput.Icon icon={icon} onPress={onIconPress} /> : undefined}
        right={icon && iconPosition === 'right' ? <PaperTextInput.Icon icon={icon} onPress={onIconPress} /> : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    height: 50,
  },
});

export default Input;