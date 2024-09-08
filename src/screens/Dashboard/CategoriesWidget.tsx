import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CategoriesWidgetProps {
    expenses: Expense[];
    categories: { id: string; name: string }[]; // Array of categories with id and name
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Categories'>;

const CategoriesWidget: React.FC<CategoriesWidgetProps> = ({ expenses, categories }) => {
    const navigation = useNavigation<NavigationProp>();

    // Reduce expenses into categories array
    const categoryData = expenses.reduce((acc: { name: string; amount: number; icon: string }[], expense: Expense) => {
        const category = categories.find(cat => cat.id === expense.category); // Match category ID with name
        const categoryName = category ? category.name : 'Unknown'; // Use category name or 'Unknown' if not found
        const existingCategory = acc.find(cat => cat.name === categoryName);

        if (existingCategory) {
            existingCategory.amount += expense.amount;
        } else {
            acc.push({ name: categoryName, amount: expense.amount, icon: 'tag' });
        }

        return acc;
    }, []);

    const handleSeeAll = () => {
        navigation.navigate('Categories', { categories: categoryData });
    };

    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <TouchableOpacity onPress={handleSeeAll}>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
                {categoryData.map(category => (
                    <Card style={styles.categoryCard} key={category.name}>
                        <Card.Content style={styles.categoryContent}>
                            <Icon name={category.icon} size={24} color="#6200EE" />
                            <Text style={styles.categoryText}>{category.name}</Text>
                            <Text style={styles.categoryAmount}>₹{category.amount.toFixed(2)}</Text>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAll: {
        fontSize: 16,
        color: '#6200EE',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    categoryCard: {
        width: '45%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#E3E1F0',
    },
    categoryContent: {
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 16,
        marginVertical: 10,
    },
    categoryAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CategoriesWidget;