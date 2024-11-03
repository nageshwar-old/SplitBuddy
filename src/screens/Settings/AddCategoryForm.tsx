import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

interface AddCategoryFormProps {
    onSubmit: (categoryName: string) => void;
    onClose: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onSubmit, onClose }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = () => {
        if (categoryName.trim()) {
            onSubmit(categoryName);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Category Name</Text>
            <TextInput
                value={categoryName}
                onChangeText={setCategoryName}
                style={styles.input}
                placeholder="Enter category name"
            />
            <Button title="Add Category" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },
});

export default AddCategoryForm;