import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Checkbox, Button, Snackbar, Divider, IconButton, Text } from 'react-native-paper';

interface MultiSelectProps {
    items: { id: string; name: string }[]; // Array of categories or other selectable items
    selectedItems: string[]; // Array of currently selected item IDs
    onSelectionChange: (selectedItems: string[]) => void; // Function to update selected items
    title?: string; // Optional title for the multi-select modal
    fieldLabel: string; // Label for the field
    subLabel?: string; // Optional sub-label for additional context
    maxDisplay?: number; // Maximum number of items to display before showing ellipsis
    isSingleSelect?: boolean; // If true, the component will act as a single select
    placeholder?: string; // Placeholder when no items are selected
    showFeedback?: boolean; // If true, show feedback messages (default is true)
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    items,
    selectedItems,
    onSelectionChange,
    title,
    fieldLabel,
    subLabel,
    maxDisplay = 2,
    isSingleSelect = false, // Default to false for multi-select
    placeholder, // Default placeholder text
    showFeedback = true, // Default to true for showing feedback messages
}) => {
    const [localSelectedItems, setLocalSelectedItems] = useState<string[]>(selectedItems);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    const [modalVisible, setModalVisible] = useState(false); // To toggle modal visibility

    const handleToggleItem = (itemId: string) => {
        let updatedSelection;
        if (isSingleSelect) {
            updatedSelection = [itemId]; // Only one item can be selected
        } else {
            updatedSelection = localSelectedItems.includes(itemId)
                ? localSelectedItems.filter(id => id !== itemId)
                : [...localSelectedItems, itemId];
        }

        setLocalSelectedItems(updatedSelection);
    };

    const handleApplySelection = () => {
        if (localSelectedItems.length > 0) {
            onSelectionChange(localSelectedItems);

            if (showFeedback) {
                showFeedbackMessage('Selection applied successfully!', true);
            }

            setModalVisible(false); // Close modal on success
        } else {
            if (showFeedback) {
                showFeedbackMessage('No items selected. Please select at least one item.', false);
            }
        }
    };

    const showFeedbackMessage = (message: string, success: boolean) => {
        setSnackbarMessage(message);
        setIsSuccess(success);
        setSnackbarVisible(true);
    };

    const handleSnackbarDismiss = () => {
        setSnackbarVisible(false);
    };

    // Filter and show selected items on top
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedItemsOnTop = filteredItems
        .filter(item => localSelectedItems.includes(item.id))
        .concat(filteredItems.filter(item => !localSelectedItems.includes(item.id)));

    // Show selected items in the field with ellipsis if too many are selected
    const selectedNames = items
        .filter(item => localSelectedItems.includes(item.id))
        .map(item => item.name);

    const displayNames = selectedNames.length > maxDisplay
        ? `${selectedNames.slice(0, maxDisplay).join(', ')}...`
        : selectedNames.join(', ');

    return (
        <View>
            <Text style={styles.fieldLabel}>{fieldLabel}</Text>
            {subLabel ? <Text style={styles.subLabel}>{subLabel}</Text> : null}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectionField}>
                <Text style={styles.fieldValue}>{displayNames || placeholder || "Select"}</Text>
                <IconButton icon="chevron-down" size={20} />
            </TouchableOpacity>

            {/* Modal for multi-select */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <IconButton icon="close" onPress={() => setModalVisible(false)} />
                        </View>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />

                        <ScrollView style={styles.scrollView}>
                            {selectedItemsOnTop.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.itemRow}
                                    onPress={() => handleToggleItem(item.id)}
                                >
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Checkbox
                                        status={localSelectedItems.includes(item.id) ? 'checked' : 'unchecked'}
                                        onPress={() => handleToggleItem(item.id)}
                                        color="#6200EE"
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Divider />
                        <Text style={styles.selectedCount}>
                            {localSelectedItems.length} {localSelectedItems.length === 1 ? 'item' : 'items'} selected
                        </Text>
                        <Button mode="contained" onPress={handleApplySelection} style={styles.applyButton}>
                            Apply Selection
                        </Button>
                    </View>
                </View>
            </Modal>

            {/* Snackbar for feedback */}
            {showFeedback && (
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={handleSnackbarDismiss}
                    duration={3000}
                    style={{ backgroundColor: isSuccess ? '#4CAF50' : '#F44336' }}
                >
                    {snackbarMessage}
                </Snackbar>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    selectionField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderColor: '#333',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 18,
        color: '#444',
        marginBottom: 4,
    },
    subLabel: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 8,
    },
    fieldValue: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 8,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    searchInput: {
        padding: 10,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    scrollView: {
        maxHeight: 200,
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemName: {
        fontSize: 16,
    },
    selectedCount: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        marginTop: 8,
    },
    applyButton: {
        marginTop: 16,
        backgroundColor: '#6200EE',
    },
});

export default MultiSelect;