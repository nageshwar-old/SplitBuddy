#!/bin/bash

# Create src directory structure
mkdir -p src/assets/fonts
mkdir -p src/assets/images
mkdir -p src/components
mkdir -p src/screens
mkdir -p src/navigation
mkdir -p src/context
mkdir -p src/types
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/services

# Create placeholder files

# Components
touch src/components/Button.tsx
touch src/components/Input.tsx
touch src/components/ExpenseCard.tsx

# Screens
touch src/screens/DashboardScreen.tsx
touch src/screens/AddExpenseScreen.tsx
touch src/screens/EditExpenseScreen.tsx
touch src/screens/ExpenseListScreen.tsx

# Navigation
touch src/navigation/AppNavigator.tsx

# Context
touch src/context/ExpenseContext.tsx
touch src/context/ExpenseProvider.tsx

# Types
touch src/types/expense.ts
touch src/types/index.ts

# Hooks
touch src/hooks/useExpenses.ts

# Utils
touch src/utils/formatCurrency.ts

# Services
touch src/services/expenseService.ts

# Create main app entry points
touch src/App.tsx
touch src/index.tsx

# Generate tsconfig.json with absolute path configurations
cat <<EOL > tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react-native",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": "./",
    "paths": {
      "@assets/*": ["src/assets/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@navigation/*": ["src/navigation/*"],
      "@context/*": ["src/context/*"],
      "@types/*": ["src/types/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@services/*": ["src/services/*"]
    }
  },
  "include": ["src"]
}
EOL

echo "Project structure created and tsconfig.json generated successfully."