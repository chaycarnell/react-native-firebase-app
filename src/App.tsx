import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  navigator,
  applyBackHandleListener,
  removeBackHandleListener,
} from '@utils/navigation';
import RNBootSplash from 'react-native-bootsplash';
import { AuthProvider, useAuth } from '@auth';
import Screens from '@screens';

const Content = () => {
  const { initialized } = useAuth();

  // Handle on app launch handlers here
  useEffect(() => {
    applyBackHandleListener();
    if (initialized) RNBootSplash.hide({ fade: true });
    // Clean up
    return () => {
      removeBackHandleListener();
    };
  }, [initialized]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer ref={navigator}>
          <Screens />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Content />
  </AuthProvider>
);

export default App;

// See: https://github.com/software-mansion/react-native-gesture-handler/issues/1831
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
