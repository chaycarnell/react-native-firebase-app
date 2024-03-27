import auth from '@react-native-firebase/auth';

/**
 * Log a user in with Firebase
 * @param email user email address
 * @param pass user password
 */
export const login = async (email: string, pass: string) =>
  auth()
    .signInWithEmailAndPassword(email, pass)
    .then(res => ({
      success: true,
      desc: 'Sign in success',
      data: res.user,
      error: null,
    }))
    .catch(error => {
      const errorState = { success: false, data: null, error };
      if (error.code === 'auth/invalid-credential') {
        return {
          ...errorState,
          desc: 'Invalid email/password combination',
        };
      }
      if (error.code === 'auth/invalid-email') {
        return {
          ...errorState,
          desc: 'Invalid email address',
        };
      }
      if (error.code === 'auth/user-disabled') {
        return {
          ...errorState,
          desc: 'User account is disabled',
        };
      }
      return { success: false, desc: 'Unknown error', data: null, error };
    });

/**
 * Logs the currently signed in user out of the app
 */
export const logout = async () =>
  auth()
    .signOut()
    .then(() => ({
      success: true,
      desc: 'Logout completed',
      data: null,
      error: null,
    }))
    .catch(error => ({
      success: false,
      desc: 'Unknown error',
      data: null,
      error,
    }));

/**
 * Reset a users password using their email address
 * @param email user email address
 */
export const resetPassword = async (email: string) =>
  auth()
    .sendPasswordResetEmail(email)
    .then(() => ({
      success: true,
      desc: 'Password reset link sent if a matching account has been found for email provided',
      data: null,
      error: null,
    }))
    .catch(error => {
      const errorState = { success: false, data: null, error };
      if (error.code === 'auth/invalid-email') {
        return {
          ...errorState,
          desc: 'Invalid email address',
        };
      }
      if (error.code === 'auth/user-not-found') {
        return {
          ...errorState,
          desc: 'User not found',
        };
      }
      return {
        ...errorState,
        desc: 'Unknown registration error',
      };
    });

/**
 * Set a new user display name in firebase auth
 * @param displayName new display name to be set on user
 */
export const updateDisplayName = async (displayName: string) =>
  auth()
    .currentUser?.updateProfile({ displayName })
    .then(() => ({
      success: true,
      desc: 'Display name updated',
      data: null,
      error: null,
    }))
    .catch(error => ({
      success: false,
      desc: 'Unknown error',
      data: null,
      error,
    }));

/**
 * Set a new user email address, verify with existing email first
 * @param email new email to be set on user
 */
export const updateEmail = async (email: string) =>
  auth()
    .currentUser?.verifyBeforeUpdateEmail(email)
    .then(() => ({
      success: true,
      desc: 'Email update requested',
      data: null,
      error: null,
    }))
    .catch(error => {
      const errorState = { success: false, data: null, error };
      if (error.code === 'auth/requires-recent-login') {
        return { ...errorState, desc: 'Login required' };
      }
      return { ...errorState, desc: 'Unknown error' };
    });

/**
 * Deletes the currently signed in user from firebase
 */
export const deleteUser = async () =>
  auth()
    .currentUser?.delete()
    .then(() => ({
      success: true,
      desc: 'User account deleted',
      data: null,
      error: null,
    }))
    .catch(error => {
      const errorState = { success: false, data: null, error };
      if (error.code === 'auth/requires-recent-login') {
        return { ...errorState, desc: 'Login required' };
      }
      return { ...errorState, desc: 'Unknown error' };
    });

/**
 * Get a JWT for the currently signed in user
 */
export const getIdToken = async () =>
  auth()
    .currentUser?.getIdToken()
    .then(token => token)
    .catch(() => null);

/**
 * Set a new user password using the password reset code
 */
export const verifyEmail = async () =>
  auth()
    .currentUser?.sendEmailVerification()
    .then(() => ({ success: true, desc: 'Success', data: null, error: null }))
    .catch(error => ({
      success: false,
      desc: 'Unknown error',
      data: null,
      error,
    }));

/**
 * Refresh the current signed in user data
 */
export const refreshUser = async () => auth().currentUser?.reload();

/**
 * Register a new user in Firebase, on success a verification email will be sent
 * @param email user email address
 * @param pass user password
 */
export const register = async (email: string, pass: string) =>
  auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(res => ({
      success: true,
      desc: 'User created',
      data: res.user,
      error: null,
    }))
    .catch(error => {
      const errorState = { success: false, data: null, error };
      if (error.code === 'auth/email-already-in-use') {
        return {
          ...errorState,
          desc: 'Email address is already in use',
        };
      }
      if (error.code === 'auth/invalid-email') {
        return {
          ...errorState,
          desc: 'Invalid email address',
        };
      }
      if (error.code === 'auth/weak-password') {
        return {
          ...errorState,
          desc: 'Password must be at least 8 characters',
        };
      }
      return {
        ...errorState,
        desc: 'Unknown registration error',
      };
    });

/**
 * NOT IN USE
 * Set a new user password using the password reset code
 * @param code password reset code sent to user email
 * @param newPassword new password to be set
 */
export const setNewPassword = async (code: string, newPassword: string) =>
  auth()
    .confirmPasswordReset(code, newPassword)
    .then(res => console.info(res))
    .catch(error => console.error(error));
