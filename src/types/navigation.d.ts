type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
};

type AppStackParamList = {
    Dashboard: undefined;
    Summary: undefined;
    AddExpense: undefined;
    EditExpense: { expenseId: string };
    ExpenseList: undefined;
    Categories: undefined;
    PaymentMethods: undefined;
    GroupList: undefined;
    AddGroup: undefined;
    Profile: undefined;
    ViewProfile: undefined;
    EditProfile: { userId: string };
    Settings: undefined;
};

// Combining both navigators into the main AppStackParamList
type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    App: NavigatorScreenParams<AppStackParamList>;
};