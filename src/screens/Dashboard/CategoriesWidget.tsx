import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CategoriesWidgetProps {
    expenses: ExpenseResponseItem[];
    categories?: { id: string; name: string }[];
}

type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'Categories'>;

const CategoriesWidget: React.FC<CategoriesWidgetProps> = ({ expenses = [], categories = [] }) => {
    const navigation = useNavigation<NavigationProp>();

    const categoryData = expenses.reduce((acc: { name: string; amount: number; icon: string }[], expense: ExpenseResponseItem) => {
        const category = categories.find(cat => cat.id === expense.category.id);
        const categoryName = category ? category.name : 'Unknown';
        const existingCategory = acc.find(cat => cat.name === categoryName);

        if (existingCategory) {
            existingCategory.amount += expense.amount;
        } else {
            acc.push({ name: categoryName, amount: expense.amount, icon: 'tag' });
        }

        return acc;
    }, []);

    const handleSeeAll = () => {
        navigation.navigate('Categories');
    };

    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <TouchableOpacity onPress={handleSeeAll}>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={categoryData}
                renderItem={({ item }) => (
                    <Card style={styles.categoryCard} key={item.name}>
                        <Card.Content style={styles.categoryContent}>
                            <Icon name={item.icon} size={24} color="#6200EE" />
                            <Text style={styles.categoryText}>{item.name}</Text>
                            <Text style={styles.categoryAmount}>₹{item.amount.toFixed(2)}</Text>
                        </Card.Content>
                    </Card>
                )}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
                ListEmptyComponent={
                    <Text style={styles.emptyListText}>No transactions available.</Text>
                }
            />
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
        paddingVertical: 20,
    },
    categoryCard: {
        width: 150,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#E3E1F0',
        marginHorizontal: 8,
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
    emptyListText: {
        textAlign: 'center',
        color: '#757575',
        fontSize: 16,
        marginTop: 20,
    },
});

export default CategoriesWidget;