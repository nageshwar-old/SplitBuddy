import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Checkbox, Button, Divider, IconButton, Text } from 'react-native-paper';

interface MultiSelectProps {
    items: { id: string; name: string; data?: any; }[];
    selectedItems: { id: string; name: string; data?: any; }[];
    onSelectionChange: (selectedItems: { id: string; name: string; data?: any; }[]) => void;
    title?: string;
    fieldLabel: string;
    subLabel?: string;
    maxDisplay?: number;
    isSingleSelect?: boolean;
    placeholder?: string;
    addButtonLabel?: string;
    onAddPress?: () => void;
    canSearch?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    items,
    selectedItems,
    onSelectionChange,
    title,
    fieldLabel,
    subLabel,
    canSearch = false,
    maxDisplay = 2,
    isSingleSelect = false,
    placeholder,
    addButtonLabel = 'Add',
    onAddPress,
}) => {
    const [localSelectedItems, setLocalSelectedItems] = useState<{ id: string; name: string; data?: any; }[]>(selectedItems);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleToggleItem = (item: { id: string; name: string; data?: any }) => {
        let updatedSelection;

        if (isSingleSelect) {
            updatedSelection = [item];
        } else {
            const isSelected = localSelectedItems.some(selected => selected.id === item.id);
            updatedSelection = isSelected
                ? localSelectedItems.filter(selected => selected.id !== item.id)
                : [...localSelectedItems, item];
        }

        setLocalSelectedItems(updatedSelection);
    };

    const handleApplySelection = () => {
        onSelectionChange(localSelectedItems);
        setModalVisible(false);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedItemsOnTop = filteredItems
        .filter(item => localSelectedItems.some(selected => selected.id === item.id))
        .concat(filteredItems.filter(item => !localSelectedItems.some(selected => selected.id === item.id)));

    const selectedNames = localSelectedItems.map(item => item.name);

    const displayNames = selectedNames.length > maxDisplay
        ? `${selectedNames.slice(0, maxDisplay).join(', ')}...`
        : selectedNames.join(', ');

    return (
        <View>
            <View style={styles.labelContainer}>
                <Text style={styles.fieldLabel}>{fieldLabel}</Text>
                {onAddPress && (
                    <Button
                        mode="text"
                        onPress={onAddPress}
                        labelStyle={styles.addButtonLabel}
                    >
                        {addButtonLabel}
                    </Button>
                )}
            </View>
            {subLabel ? <Text style={styles.subLabel}>{subLabel}</Text> : null}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectionField}>
                <Text style={styles.fieldValue}>{displayNames || placeholder || "Select"}</Text>
                <IconButton icon="chevron-down" size={20} />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <IconButton style={styles.closeButton} icon="close" onPress={() => setModalVisible(false)} />
                        </View>

                        {canSearch && (
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                value={searchTerm}
                                onChangeText={setSearchTerm}
                            />
                        )}

                        <ScrollView style={styles.scrollView}>
                            {selectedItemsOnTop.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.itemRow}
                                    onPress={() => handleToggleItem(item)}
                                >
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Checkbox
                                        status={localSelectedItems.some(selected => selected.id === item.id) ? 'checked' : 'unchecked'}
                                        onPress={() => handleToggleItem(item)}
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
        </View>
    );
};

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    fieldLabel: {
        fontSize: 16,
        color: '#666',
    },
    addButtonLabel: {
        fontSize: 16,
        color: '#6200EE',
    },
    subLabel: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 8,
    },
    selectionField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        padding: 5,
        borderColor: '#666',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
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
        padding: 20,
        position: 'relative'
    },
    closeButton: {
        position: 'absolute',
        top: -15,
        right: -15
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
    addButton: {
        marginTop: 8,
        borderColor: '#6200EE',
    },
});

export default MultiSelect;