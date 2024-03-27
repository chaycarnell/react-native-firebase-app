import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthProviderContext } from '@types';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, AppStateStatus, Linking } from 'react-native';

import { refreshUser } from './functions';

const initialContext = {
  authenticated: false,
  currentUser: null,
  initialized: false,
};

export const AuthContext =
  React.createContext<AuthProviderContext>(initialContext);
export const useAuth = (): AuthProviderContext => useContext(AuthContext);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | FirebaseAuthTypes.User>(
    null,
  );
  const [initialized, setInitialized] = useState(false);
  const lastAppState = useRef<AppStateStatus | undefined>(undefined);

  // Listen and set state values when the auth state changes
  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setAuthenticated(true);
      }
      if (!user) {
        setAuthenticated(false);
      }
      setInitialized(true);
    });
    return () => {
      authSubscriber();
    };
  }, []);

  // Listen and set state values when the user object changes
  useEffect(() => {
    const userSubscriber = auth().onUserChanged(user => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => {
      userSubscriber();
    };
  }, []);

  useEffect(() => {
    // Handle universal deep linking where app was closed
    Linking.getInitialURL()
      .then(url => console.info(url))
      .catch(() => {});
    // Handles deep linking or universal links where app is in background state
    const linkingListener = Linking.addEventListener('url', console.info);
    // AppState listener
    const appStateListener = AppState.addEventListener('change', state => {
      if (state !== lastAppState.current && state === 'active') {
        refreshUser();
      }
      lastAppState.current = state;
    });
    return () => {
      linkingListener.remove();
      appStateListener.remove();
    };
  }, []);

  // Memoize context values
  const value = useMemo(
    () => ({
      authenticated,
      currentUser,
      initialized,
    }),
    [authenticated, currentUser, initialized],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
