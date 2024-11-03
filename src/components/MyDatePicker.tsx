import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import DateTimePickerModal, { DateTimePickerProps } from 'react-native-modal-datetime-picker';
import { TextInput as PaperTextInput } from 'react-native-paper';

interface MyDatePickerProps extends Omit<DateTimePickerProps, 'onChange'> {
    placeholder?: string;
    selectedDate: Date | undefined;
    onDateChange: React.Dispatch<React.SetStateAction<Date | undefined>>;
    style?: object;
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
        onDateChange(date);
        hideDatePicker();
        if (onConfirm) {
            onConfirm(date);
        }
    };

    const displayDate = selectedDate ? selectedDate : new Date();
    const formattedDate = displayDate.toISOString().split('T')[0];

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
                <PaperTextInput
                    mode="outlined"
                    placeholder={placeholder}
                    value={formattedDate}
                    editable={false}
                    style={styles.input}
                    right={<PaperTextInput.Icon icon="calendar" onPress={showDatePicker} />}
                    {...restProps}
                />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                {...restProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    input: {
        height: 50,
        justifyContent: 'center',
        marginBottom: 15,
    },
});

export default MyDatePicker;