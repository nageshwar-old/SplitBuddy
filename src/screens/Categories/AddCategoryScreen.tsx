import { createCategoryRequest, updateCategoryRequest } from '@app/store/slices/categorySlice';
import { AppState } from '@app/store/store';
import React, { useState, useEffect } from 'react';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

interface AddCategoryScreenProps {
    selectedCategory: Category | null;
    onClose: () => void;
}

const AddCategoryScreen: React.FC<AddCategoryScreenProps> = ({ selectedCategory, onClose }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: AppState) => state.auth);
    const existingCategories = useSelector((state: AppState) => state.category.categories);

    const [categoryName, setCategoryName] = useState<string>('');
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    useEffect(() => {
        if (selectedCategory) {
            setCategoryName(selectedCategory.name);
        } else {
            setCategoryName('');
        }
    }, [selectedCategory]);

    const handleSaveCategory = () => {
        const trimmedCategoryName = categoryName.trim();

        if (!trimmedCategoryName) {
            setSnackbarMessage("Category name can't be empty.");
            setIsSnackbarVisible(true);
            return;
        }

        if (existingCategories.some(category => category.name.toLowerCase() === trimmedCategoryName.toLowerCase())) {
            setSnackbarMessage("Category name already exists.");
            setIsSnackbarVisible(true);
            return;
        }

        if (selectedCategory) {
            dispatch(updateCategoryRequest({
                categoryId: selectedCategory.id,
                data: { name: trimmedCategoryName, authorId: user?.id ?? '' }
            }));
            setSnackbarMessage("Category updated successfully.");
        } else {
            dispatch(createCategoryRequest({
                name: trimmedCategoryName,
                authorId: user?.id ?? ''
            }));
            setSnackbarMessage("Category added successfully.");
        }

        setIsSnackbarVisible(true);
        setTimeout(onClose, 500); // Close after a short delay
    };

    return (
        <>
            <TextInput
                label="Category Name"
                value={categoryName}
                onChangeText={setCategoryName}
                style={{ marginBottom: 20 }}
            />
            <Button mode="contained" onPress={handleSaveCategory}>
                {selectedCategory ? 'Update Category' : 'Add Category'}
            </Button>
            <Snackbar
                visible={isSnackbarVisible}
                onDismiss={() => setIsSnackbarVisible(false)}
                duration={3000}
            >
                {snackbarMessage}
            </Snackbar>
        </>
    );
};

export default AddCategoryScreen;