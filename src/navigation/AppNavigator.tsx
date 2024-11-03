import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Screens
import EditExpenseScreen from '@screens/Expenses/EditExpenseScreen';
import ExpenseListScreen from '@screens/Expenses/ExpenseListScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import CategoriesListScreen from '@screens/Categories/CategoriesListScreen';
import PaymentMethodListScreen from '@screens/PaymentMethods/PaymentMethodListScreen';
import GroupListScreen from '@screens/Groups/GroupListScreen';
import { DashboardScreen } from '@screens/Dashboard';
import AddExpenseScreen from '@app/screens/Expenses/AddExpenseScreen';
import ProfileScreen from '@app/screens/Profile/ViewProfile';
import EditProfile from '@app/screens/Profile/EditProfile';

// Redux actions
import { fetchCategoriesRequest } from '@store/slices/categorySlice';
import { fetchExpensesRequest } from '@store/slices/expenseSlice';
import { fetchGroupsRequest } from '@store/slices/groupSlice';
import { fetchPaymentMethodsRequest } from '@store/slices/paymentMethodSlice';
import { fetchSettingsRequest } from '@store/slices/settingsSlice';
import { fetchProfileRequest } from '@store/slices/userSlice';
import { getData } from '@utils/storage';
import AddGroupScreen from '@app/screens/Groups/AddGroupScreen';
import SummaryScreen from '@app/screens/Dashboard/SummaryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Summary"
      component={SummaryScreen}
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

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ViewProfile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: 'Edit Profile',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: 'Settings',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
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
    <Stack.Screen
      name="PaymentMethods"
      component={PaymentMethodListScreen}
      options={{
        title: 'Payment Methods',
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    />
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

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const userId = await getData<string>('userId'); // Assuming userId is stored separately
      // console.log('userId', userId);

      // Dispatch data fetching actions
      dispatch(fetchCategoriesRequest());
      dispatch(fetchExpensesRequest());
      dispatch(fetchGroupsRequest());
      dispatch(fetchPaymentMethodsRequest());
      if (userId) dispatch(fetchSettingsRequest(userId));
      if (userId) dispatch(fetchProfileRequest({ username: userId }));

      setIsAppReady(true);
    };

    loadData();
  }, [dispatch]);

  if (!isAppReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Expenses') iconName = 'file-document';
          else if (route.name === 'Profile') iconName = 'account';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
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
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Expenses" component={ExpenseStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;