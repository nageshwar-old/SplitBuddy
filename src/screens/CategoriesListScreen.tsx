import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator'; // Assuming this is your param list
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CategoriesListScreenProps = {
    route: RouteProp<RootStackParamList, 'Categories'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'Categories'>;
};

const CategoriesListScreen: React.FC<CategoriesListScreenProps> = ({ route }) => {
    const { categories } = route.params; // Get categories from route params

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Categories</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <Card style={styles.categoryCard}>
                        <Card.Content style={styles.categoryContent}>
                            <Icon name={item.icon} size={24} color="#6200EE" />
                            <Text style={styles.categoryText}>{item.name}</Text>
                            <Text style={styles.categoryAmount}>₹{item.amount.toFixed(2)}</Text>
                        </Card.Content>
                    </Card>
                )}
            />
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
    categoryAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CategoriesListScreen;