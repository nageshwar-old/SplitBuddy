import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Modal, Portal, Card, IconButton, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/store';
import AddCategoryScreen from './AddCategoryScreen';
import { deleteCategoryRequest, fetchCategoriesRequest } from '@app/store/slices/categorySlice';
import { useNavigation } from '@react-navigation/native';

const CategoryListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const categories = useSelector((state: AppState) => state.category.categories);
    // console.log(categories, 'categories');
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // Fetch categories when the component mounts
    useEffect(() => {
        dispatch(fetchCategoriesRequest());
    }, [dispatch]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon="plus"
                    iconColor="#6200EE"
                    size={24}
                    onPress={() => setAddModalVisible(true)}
                />
            ),
        });
    }, [navigation]);

    // Close the modal and reset the selected category
    const handleCloseModal = () => {
        setSelectedCategory(null);
        setAddModalVisible(false);
    };

    // Handle deleting a category
    const handleDelete = (categoryId: string) => {
        Alert.alert(
            'Delete Category',
            'Are you sure you want to delete this category?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => dispatch(deleteCategoryRequest(categoryId)) },
            ],
            { cancelable: false }
        );
    };

    // Render each category item
    const renderCategoryItem = ({ item }: { item: Category }) => (
        <Card style={styles.categoryCard}>
            <Card.Content style={styles.categoryContent}>
                <Text style={styles.categoryText}>{item.name}</Text>
                <View style={styles.actions}>
                    <IconButton icon="pencil" onPress={() => { setSelectedCategory(item); setAddModalVisible(true); }} />
                    <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
            />

            {/* Add/Edit Category Modal */}
            <Portal>
                <Modal visible={isAddModalVisible} onDismiss={handleCloseModal} contentContainerStyle={styles.modalContainer}>
                    <AddCategoryScreen
                        selectedCategory={selectedCategory}
                        onClose={handleCloseModal}
                    />
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    categoryCard: {
        marginVertical: 8,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#E3E1F0',
    },
    categoryContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 18,
    },
    actions: {
        flexDirection: 'row',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200EE',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
});

export default CategoryListScreen;