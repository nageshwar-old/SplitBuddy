import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomHeaderProps {
    title: string;
    showBackButton?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, showBackButton = false }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            {showBackButton && (
                <Icon
                    name="arrow-left"
                    size={24}
                    color="#fff"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 50, // Explicitly set a minimal height
        backgroundColor: '#6200EE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    backButton: {
        position: 'absolute',
        left: 10,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomHeader;