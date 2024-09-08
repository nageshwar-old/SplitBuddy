// src/components/CustomTextInput.tsx
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  style?: object;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        style={[styles.input, multiline ? styles.multilineInput : null]} // Add multiline styles if needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff', // Add background color
    borderWidth: 1, // Add border width
    borderColor: '#ccc', // Add border color
    borderRadius: 8, // Rounded corners
    paddingVertical: 10, // Add vertical padding
    paddingHorizontal: 15, // Add horizontal padding
    fontSize: 16, // Font size for the text
    color: '#333', // Text color
  },
  multilineInput: {
    minHeight: 80, // Minimum height for multiline inputs
    textAlignVertical: 'top', // Align text to the top for multiline inputs
  },
});

export default CustomTextInput;