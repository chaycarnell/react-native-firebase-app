import { BackHandler } from 'react-native';
import { createNavigationContainerRef } from '@react-navigation/native';

// Create a navigator for reference
export const navigator = createNavigationContainerRef();

// Custom navigate handler allowing stack to be reset in props
export const navigate = (screenName, params, resetStack = false) => {
  // Clears the navigation stack, removing all back history
  if (resetStack)
    return navigator.reset({
      index: 0,
      routes: [{ name: screenName, params }],
    });
  return navigator.navigate(screenName, params);
};

// Returns a boolean based on if the user can go back further than the current screen
export const canGoBack = () => navigator.canGoBack();

// Prevent hardware back if back options not available
// This prevents the app closing in Android
const handleHardwareBack = () => !canGoBack();

// Handles applying hardware back action event listener
export const applyBackHandleListener = () =>
  BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);

// Handles removing hardware back action event listener
export const removeBackHandleListener = () =>
  BackHandler.removeEventListener('hardwareBackPress', handleHardwareBack);
