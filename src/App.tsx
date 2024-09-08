import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from '@navigation/AppNavigator';
import theme from './theme';
import CustomToast from '@components/CustomToast'; // Import the CustomToast component
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '@store/toastSlice'; // Import the hideToast action
import { store } from '@store/store';

const ToastContainer: React.FC = () => {
  const toast = useSelector((state: any) => state.toast); // Access the toast state from Redux
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

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <AppNavigator />
          <ToastContainer />
        </SafeAreaView>
      </PaperProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;