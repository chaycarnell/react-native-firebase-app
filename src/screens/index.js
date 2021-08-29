import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@utils/auth';
import AuthScreen from './auth';
import DashboardScreen from './dashboard';
import PlaceholderScreen from './placeholder';

// Screen stack model, makes nested screens easier to visualise
const Screens = {
  Auth: AuthScreen,
  Dashboard: DashboardScreen,
  Placeholder: PlaceholderScreen,
};

// Create a stack navigator
const Stack = createStackNavigator();

// Default screen header options
const defaultHeaderOpts = {
  headerTitleAlign: 'center',
  headerShown: false,
  headerLeft: false,
};

export default () => {
  // Observe the authenticated state to set stack accordingly
  const { initialized, authenticated, currentUser } = useAuth();

  // Block initial render until initiliazed
  // This will otherwise be masked by boot splash
  if (!initialized) return null;

  // If not authenticated restrict to auth screen only
  if (!authenticated || !currentUser || !currentUser.emailVerified)
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Screens.Auth}
          options={defaultHeaderOpts}
        />
      </Stack.Navigator>
    );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Screens.Dashboard}
        options={defaultHeaderOpts}
      />
      <Stack.Screen
        name="Placeholder"
        component={Screens.Placeholder}
        options={defaultHeaderOpts}
      />
    </Stack.Navigator>
  );
};
