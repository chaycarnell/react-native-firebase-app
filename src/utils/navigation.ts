import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import { RootStackParamList, ScreenNames } from '@types';
import { BackHandler } from 'react-native';

export const navigation: NavigationContainerRefWithCurrent<RootStackParamList> =
  createNavigationContainerRef();

// Custom navigate handler allowing stack to be reset in props
export const navigate = (
  screenName: ScreenNames,
  params?: RootStackParamList[ScreenNames],
  resetStack = false,
) => {
  if (resetStack) {
    return navigation.reset({
      index: 0,
      routes: [{ name: screenName, params }],
    });
  }
  return navigation.dispatch(
    CommonActions.navigate({
      name: screenName,
      params,
    }),
  );
};

// Returns a boolean based on if the user can go back further than the current screen
export const canGoBack = () => navigation.canGoBack();

// Prevent hardware back if back options not available
// This prevents the app closing in Android
const handleHardwareBack = () => !canGoBack();

// Handles applying hardware back action event listener
export const applyBackHandleListener = () =>
  BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
