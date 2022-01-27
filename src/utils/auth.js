import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Linking } from 'react-native';
import auth from '@react-native-firebase/auth';

/**
 * Log a user in with Firebase
 * @param {*} email user email address
 * @param {*} pass user password
 */
export const login = async (email, pass) =>
  auth()
    .signInWithEmailAndPassword(email, pass)
    .then((res) => ({ success: true, desc: 'success', data: res }))
    .catch((error) => {
      const errorState = { success: false, data: error };
      if (error.code === 'auth/wrong-password')
        return {
          ...errorState,
          desc: 'Invalid email/password combination',
        };
      if (error.code === 'auth/invalid-email')
        return {
          ...errorState,
          desc: 'Invalid email address',
        };
      if (error.code === 'auth/user-not-found')
        return { ...errorState, desc: 'User not found' };
      if (error.code === 'auth/user-disabled')
        return {
          ...errorState,
          desc: 'User account is disabled',
        };
      return { success: false, desc: 'Unkown error', data: error };
    });

/**
 * Logs the currently signed in user out of the app
 */
export const logout = async () =>
  auth()
    .signOut()
    .then(() => ({ success: true, desc: 'success', data: null }))
    .catch((error) => ({
      success: false,
      desc: 'unkown',
      data: error,
    }));

/**
 * Reset a users password using their email address
 * @param {*} email user email address
 */
export const resetPassword = async (email) =>
  auth()
    .sendPasswordResetEmail(email)
    .then(() => ({ success: true, desc: 'success', data: null }))
    .catch((error) => {
      const errorState = { success: false, data: error };
      if (error.code === 'auth/invalid-email')
        return {
          ...errorState,
          desc: 'Invalid email address',
        };
      if (error.code === 'auth/user-not-found')
        return {
          ...errorState,
          desc: 'User not found',
        };
      return {
        ...errorState,
        desc: 'Unkown registration error',
      };
    });

/**
 * Set a new user display name in firebase auth
 * @param {*} displayName new display name to be set on user
 */
export const updateDisplayName = async (displayName) =>
  auth().currentUser &&
  auth()
    .currentUser.updateProfile({ displayName })
    .then(() => ({ success: true, desc: 'success', data: null }))
    .catch((error) => ({
      success: false,
      desc: 'unkown',
      data: error,
    }));

/**
 * Set a new user email address, verify with existing email first
 * @param {*} displayName new display name to be set on user
 */
export const updateEmail = async (email) =>
  auth().currentUser &&
  auth()
    .currentUser.verifyBeforeUpdateEmail(email)
    .then(() => ({ success: true, desc: 'success', data: null }))
    .catch((error) => {
      const errorState = { success: false, data: error };
      if (error.code === 'auth/requires-recent-login')
        return { ...errorState, desc: 'Login required' };
      return { ...errorState, desc: 'unkown' };
    });

/**
 * Deletes the currently signed in user from firebase
 */
export const deleteUser = async () =>
  auth().currentUser &&
  auth()
    .currentUser.delete()
    .then(() => ({ success: true, desc: 'success', data: null }))
    .catch((error) => {
      const errorState = { success: false, data: error };
      if (error.code === 'auth/requires-recent-login')
        return { ...errorState, desc: 'Login required' };
      return { ...errorState, desc: 'unkown' };
    });

/**
 * Get a JWT token for the currently signed in user
 */
export const getIdToken = async () =>
  auth().currentUser &&
  auth()
    .currentUser.getIdToken()
    .then((token) => token)
    .catch(() => null);

/**
 * Set a new user password using the password reset code
 */
export const verifyEmail = async () =>
  auth().currentUser &&
  auth()
    .currentUser.sendEmailVerification()
    .then(() => ({ success: true, desc: 'success', data: null }))
    .catch((error) => ({
      success: false,
      desc: 'unkown',
      data: error,
    }));

/**
 * Refresh the current signed in user data
 */
export const refreshUser = async () =>
  auth().currentUser && auth().currentUser.reload();

/**
 * Register a new user in Firebase, on success a verification email will be sent
 * @param {*} email user email address
 * @param {*} pass user password
 */
export const register = async (email, pass) =>
  auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(async (res) => ({ success: true, desc: 'success', data: res }))
    .catch((error) => {
      const errorState = { success: false, data: error };
      if (error.code === 'auth/email-already-in-use')
        return {
          ...errorState,
          desc: 'Email address is already in use',
        };
      if (error.code === 'auth/invalid-email')
        return {
          ...errorState,
          desc: 'Invalid email address',
        };
      if (error.code === 'auth/weak-password')
        return {
          ...errorState,
          desc: 'Password must be at least 8 characters',
        };
      return {
        ...errorState,
        desc: 'Unkown registration error',
      };
    });

/**
 * NOT IN USE
 * Set a new user password using the password reset code
 * @param {*} code password reset code sent to user email
 * @param {*} newPassword new password to be set
 */
export const setNewPassword = async (code, newPassword) =>
  auth()
    .confirmPasswordReset(code, newPassword)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));

export const AuthContext = React.createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {
  const { children } = props;
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Set authentication state value
  const setAuthState = (state) => setAuthenticated(state);

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
    return authSubscriber;
  }, []);

  // Listen and set state values when the user object changes
  useEffect(() => {
    const userSubscriber = auth().onUserChanged((user) => {
      if (user) setCurrentUser(user);
    });
    return userSubscriber;
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
