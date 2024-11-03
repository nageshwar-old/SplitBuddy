import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from '@navigation/AppNavigator';
import { ExpenseProvider } from '@context/ExpenseProvider';
import theme from '@app/theme';

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </ExpenseProvider>
  );
};

export default App;