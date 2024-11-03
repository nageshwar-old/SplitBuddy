import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '@navigation/AppNavigator';
import AuthNavigator from '@navigation/AuthNavigator';
import theme from './theme';
import Toast from '@components/Toast';
import { hideToast } from '@slices/toastSlice';
import { setAuthStatus } from '@slices/authSlice';
import store, { AppState } from '@store/store';
import { getData } from '@utils/storage';

const ToastContainer: React.FC = () => {
  const toast = useSelector((state: AppState) => state.toast.toast);
  const dispatch = useDispatch();

  return (
    <>
      {toast && (
        <Toast
          visible={!!toast}
          message={toast.message}
          onDismiss={() => dispatch(hideToast())}
          type={toast.type}
          position={toast.position}
        />
      )}
    </>
  );
};

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);

  useEffect(() => {
    const initializeApp = async () => {
      const token = await getData<string>('authToken');
      dispatch(setAuthStatus(!!token));
      setIsAppReady(true);
    };

    initializeApp();
  }, [dispatch]);

  if (!isAppReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      <ToastContainer />
    </NavigationContainer>
  );
};

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <AppContent />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  </ReduxProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;