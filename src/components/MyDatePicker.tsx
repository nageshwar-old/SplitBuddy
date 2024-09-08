import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import DateTimePickerModal, { DateTimePickerProps } from 'react-native-modal-datetime-picker';
import Input from '@components/Input';  // Using the Input component from your project
import { TextInput as PaperTextInput } from 'react-native-paper'; // Import TextInput from react-native-paper

interface MyDatePickerProps extends Omit<DateTimePickerProps, 'onChange'> {
    placeholder?: string;  // Placeholder text for the input
    selectedDate: Date | undefined;  // External selected date control
    onDateChange: React.Dispatch<React.SetStateAction<Date | undefined>>;  // Function to handle date changes
    style?: object;  // Additional styling for the wrapper view
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
    placeholder = "Select Date",
    mode = "date",
    selectedDate,
    onDateChange,
    onConfirm,
    onCancel,
    style,
    ...restProps
}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        if (onCancel) {
            onCancel();
        }
    };

    const handleConfirm = (date: Date) => {
        onDateChange(date);  // Update the external date state
        hideDatePicker();
        if (onConfirm) {
            onConfirm(date);
        }
    };

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
                <Input
                    placeholder={placeholder}
                    value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                    onChangeText={() => { }}  // Provide a no-op function for onChangeText
                    editable={false}  // Make the input non-editable, only selectable
                    style={styles.input}  // Apply consistent styling to the input
                    right={<PaperTextInput.Icon icon="calendar" onPress={showDatePicker} />}  // Add calendar icon with press handler
                />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                {...restProps}  // Spread the rest of the props to DateTimePickerModal
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    input: {
        height: 50,  // Adjust height if necessary to match other inputs
        justifyContent: 'center',
        marginBottom: 15,
    },
});

export default MyDatePicker;