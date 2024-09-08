import React from 'react';
import { Button as PaperButton, ButtonProps as PaperButtonProps } from 'react-native-paper';
import { StyleSheet, TextStyle } from 'react-native';

// Extending ButtonProps from react-native-paper
interface CustomButtonProps extends PaperButtonProps { }

const Button: React.FC<CustomButtonProps> = ({ children, onPress, style, labelStyle, ...props }) => (
  <PaperButton
    mode="contained"
    onPress={onPress}
    style={style}
    labelStyle={[styles.label, labelStyle]} // Apply the custom font style here
    {...props} // Spread the rest of the props to PaperButton
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Raleway-Regular', // Apply fontFamily here
    fontSize: 16,
  } as TextStyle,
});

export default Button;