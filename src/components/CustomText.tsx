import React from 'react';
import { Text, TextProps, TextStyle, StyleSheet } from 'react-native';

const CustomText: React.FC<TextProps> = (props) => {
  return <Text {...props} style={[styles.text, props.style]} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Raleway-Regular',  // Ensure this font is available in the project
  } as TextStyle,  // Explicitly cast as TextStyle
});

export default CustomText;