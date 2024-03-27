import { AuthProvider, useAuth } from '@auth';
import { NavigationContainer } from '@react-navigation/native';
import Screens from '@screens';
import { applyBackHandleListener, navigation } from '@utils/navigation';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import { AppSafeAreaWrapper } from './app.styles';

// Optimize memory usage and performance by using the native navigation component (UIViewController for iOS, and FragmentActivity for Android)
enableScreens();

const App = () => {
  const { initialized } = useAuth();

  const [navigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    const backHandler = applyBackHandleListener();
    if (initialized && navigationReady) {
      RNBootSplash.hide({ fade: true });
    }
    return () => {
      backHandler.remove();
    };
  }, [initialized, navigationReady]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <SafeAreaView style={AppSafeAreaWrapper}>
        <NavigationContainer
          onReady={() => setNavigationReady(true)}
          ref={navigation}>
          <Screens navigationReady={navigationReady} />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const ProviderWrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default ProviderWrappedApp;
