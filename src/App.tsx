import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import AppNavigator from '@navigation/AppNavigator';
import AuthNavigator from '@navigation/AuthNavigator'; // Import AuthNavigator for authentication flow
import theme from './theme';
import CustomToast from '@components/CustomToast'; // Import the CustomToast component
import { hideToast } from '@store/toastSlice'; // Import the hideToast action
import { RootState, store } from '@store/store';

// Toast Container Component
const ToastContainer: React.FC = () => {
  const toast = useSelector((state: RootState) => state.toast); // Access the toast state from Redux
  const dispatch = useDispatch();

  return (
    <CustomToast
      visible={toast.visible}
      message={toast.message}
      onDismiss={() => dispatch(hideToast())}
      type={toast.type}
    />
  );
};

// Main Content Component that handles navigation
const AppContent: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      <ToastContainer />
    </NavigationContainer>
  );
};

// Root App Component
const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <AppContent />
        </SafeAreaView>
      </PaperProvider>
    </ReduxProvider>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;