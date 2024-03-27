import { useAuth } from '@auth';
import { createStackNavigator } from '@react-navigation/stack';
import { AppScreensProps, ScreenNames } from '@types';
import React from 'react';

import AuthScreen from './auth';
import DashboardScreen from './dashboard';

// Create a stack navigator
const Stack = createStackNavigator();

// Default screen header options
const defaultHeaderOpts = {
  headerTitleAlign: 'center' as 'center',
  headerShown: false,
  headerLeft: undefined,
};

export default ({ navigationReady }: AppScreensProps) => {
  // Observe the authenticated state to set stack accordingly
  const { initialized, authenticated, currentUser } = useAuth();

  // Block initial render until initiliased
  // This will otherwise be masked by boot splash
  if (!initialized || !navigationReady) {
    return null;
  }

  // If not authenticated restrict to unauthenticated screen stack only
  if (!authenticated || !currentUser?.emailVerified) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenNames.AUTH}
          component={AuthScreen}
          options={defaultHeaderOpts}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.DASHBOARD}
        component={DashboardScreen}
        options={defaultHeaderOpts}
      />
    </Stack.Navigator>
  );
};
