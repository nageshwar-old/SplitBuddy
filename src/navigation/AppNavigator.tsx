import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EditExpenseScreen from '@screens/Expenses/EditExpenseScreen';
import ExpenseListScreen from '@screens/Expenses/ExpenseListScreen';
import SettingsScreen from '@screens/SettingsScreen'; // Import Settings screen
import CategoriesListScreen from '@screens/CategoriesListScreen'; // Import Categories screen
import { DashboardScreen } from '@screens/Dashboard';
import AddExpenseScreen from '@screens/Expenses/AddExpenseScreen';
import AddGroupScreen from '@screens/Groups/AddGroupScreen';
import GroupListScreen from '@screens/Groups/GroupListScreen';

// Define the type for all possible routes in the app
export type RootStackParamList = {
  Dashboard: undefined;
  AddExpense: undefined;
  EditExpense: { expenseId: string };
  ExpenseList: undefined;
  Categories: { categories: Category[] };
  GroupList: undefined; // For Group listing
  AddGroup: undefined; // For Adding new groups
};

// Create the stack and tab navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Categories"
      component={CategoriesListScreen}
      options={{
        title: 'Categories',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    />
  </Stack.Navigator>
);

const ExpenseStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ExpenseList"
      component={ExpenseListScreen}
      options={{
        title: 'Expense List',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    />
    <Stack.Screen
      name="AddExpense"
      component={AddExpenseScreen}
      options={{
        title: 'Add Expense',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    />
    <Stack.Screen
      name="EditExpense"
      component={EditExpenseScreen}
      options={{
        title: 'Edit Expense',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    />
  </Stack.Navigator>
);

const GroupStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="GroupList"
      component={GroupListScreen}
      options={{
        title: 'Groups',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    />
    <Stack.Screen
      name="AddGroup"
      component={AddGroupScreen}
      options={{
        title: 'Add Group',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Expenses') iconName = 'file-document';
        else if (route.name === 'Groups') iconName = 'account-group'; // Use 'account-group' for groups
        else if (route.name === 'Settings') iconName = 'cog';

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6200EE',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 5,
      },
      tabBarStyle: {
        height: 60,
        paddingTop: 5,
        paddingBottom: 5,
        borderTopWidth: 0,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        backgroundColor: '#fff',
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Expenses"
      component={ExpenseStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Groups"
      component={GroupStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default AppNavigator;