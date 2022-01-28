import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Linking } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface IAuthContext {
  authenticated: boolean;
  currentUser: FirebaseAuthTypes.User | null;
  initialized: boolean;
  setAuthState: (state: boolean) => void;
}

// @ts-expect-error
export const AuthContext = React.createContext<IAuthContext>({});
export const useAuth = (): IAuthContext => useContext(AuthContext);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | FirebaseAuthTypes.User>(
    null,
  );
  const [initialized, setInitialized] = useState(false);

  // Set authentication state value
  const setAuthState = (state: boolean) => setAuthenticated(state);

  // Listen and set state values when the auth state changes
  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setAuthenticated(true);
      }
      if (!user) setAuthenticated(false);
      setInitialized(true);
    });
    return () => {
      authSubscriber();
    };
  }, []);

  // Listen and set state values when the user object changes
  useEffect(() => {
    const userSubscriber = auth().onUserChanged((user) => {
      if (user) setCurrentUser(user);
    });
    return () => {
      userSubscriber();
    };
  }, []);

  // Handle deep/uninversal linking
  useEffect(() => {
    // Handle universal deep linking where app was closed
    Linking.getInitialURL()
      .then((url) => console.log(url))
      .catch(() => {});
    // Handles deep linking or universal links where app is woken up
    Linking.addEventListener('url', console.log);
  }, []);

  // Memoize context values
  const value = useMemo(
    () => ({
      authenticated,
      currentUser,
      initialized,
      setAuthState,
    }),
    [authenticated, currentUser, initialized],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
