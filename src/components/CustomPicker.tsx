import React, { useState } from 'react';
import { View, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import Input from '@components/Input';
import CustomText from './CustomText';

interface CustomPickerProps {
    placeholder: string;
    placeholderTextColor?: string;
    icon?: string;
    selectedValue: string;
    onValueChange: (value: string) => void;
    items: { label: string; value: string; }[];
    style?: object;
    title?: string;
}

const CustomPicker: React.FC<CustomPickerProps> = ({
    placeholder,
    placeholderTextColor = '#888',
    icon = 'menu-down',
    selectedValue,
    onValueChange,
    items,
    style,
    title
}) => {
    const [visible, setVisible] = useState(false);

    const handleSelect = (value: string) => {
        onValueChange(value);
        setVisible(false);
    };

    const toggleModal = () => {
        setVisible(!visible);
    };

    return (
        <View style={[styles.container, style]}>
            <Pressable onPress={toggleModal} style={styles.picker}>
                <Input
                    value={selectedValue}
                    onChangeText={() => { }}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    editable={false}
                    mode="outlined"
                    right={
                        <PaperTextInput.Icon
                            icon={icon}
                            onPress={toggleModal}  // Ensure icon press toggles modal
                        />
                    }
                    style={styles.input}
                />
            </Pressable>
            <Modal visible={visible} transparent animationType="fade">
                <Pressable style={styles.modalBackground} onPress={toggleModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <CustomText style={styles.modalTitle}>{title || 'Select an Option'}</CustomText>
                            <Pressable onPress={toggleModal} style={styles.closeButton}>
                                <PaperTextInput.Icon icon="close" onPress={toggleModal} />
                            </Pressable>
                        </View>

                        {/* Scrollable content for items */}
                        <ScrollView style={styles.scrollContainer}>
                            {items.map(item => (
                                <Pressable key={item.value} style={styles.item} onPress={() => handleSelect(item.value)}>
                                    <CustomText style={styles.itemText}>{item.label}</CustomText>
                                </Pressable>
                            ))}
                        </ScrollView>

                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    picker: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: 'white',  // Ensure matching background color
    },
    icon: {
        color: '#000',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        maxHeight: '60%',  // Limit the modal height to make the content scrollable
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f5f5f5',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
        position: 'absolute',
        right: 20,
        top: 10,
        bottom: 0,
    },
    scrollContainer: {
        maxHeight: '80%', // Set a max height for the scrollable content
    },
    item: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

export default CustomPicker;