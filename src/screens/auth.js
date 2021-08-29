import React, { useState, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import {
  useAuth,
  register,
  resetPassword,
  login,
  verifyEmail,
  refreshUser,
} from '@utils/auth';
import { setUserId, log, recordError } from '@utils/crashlytics';
import { logEvent } from '@utils/analytics';
import theme from '@styles/theme';
import {
  ScreenWrapper,
  TextInput,
  Button,
  Spacer,
  Text,
  Png,
} from '@components';

const Render = () => {
  const { currentUser, setAuthState } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [message, setMessage] = useState(null);

  // Handle login
  const onLogin = () => {
    if (email && password) {
      setMessage(null);
      setLoading(true);
      login(email, password).then(async (res) => {
        setLoading(false);
        if (!res.success) return setMessage(res.desc);
        if (currentUser && !currentUser.emailVerified) return setStep(3);
        return setAuthState(res.success);
      });
    } else {
      setMessage('Please enter your email and password');
      logEvent('failed_login_attempt', {
        email: email || 'not set',
        screen: 'Auth',
      });
      // The below is an example of logging a custom "non-fatal" error to crashlytics
      setUserId('USER0001');
      log('Some error message log');
      log(JSON.stringify({ key: 'value', anotherKey: 2, array: [1, 2, 3, 4] }));
      recordError('Login Error', 'Error generated from login click');
    }
  };

  // Handle registrations
  const onRegister = () => {
    if (email && password) {
      setMessage(null);
      if (!firstname || !lastname)
        return setMessage('Please enter your first and last name');
      if (password !== passwordConf)
        return setMessage('Password and confirmation does not match');
      setLoading(true);
      return register(email, password).then(async (res) => {
        setLoading(false);
        if (!res.success) return setMessage(res.desc);
        return setStep(3);
      });
    }
    return setMessage('Please enter an email and password');
  };

  // Handle password reset
  const onResetPassword = () => {
    if (email) {
      setLoading(true);
      resetPassword(email).then((res) => {
        if (!res.success) {
          setLoading(false);
          setMessage(res.desc);
        } else {
          setMessage('Success, please check your email');
          setTimeout(() => {
            setStep(0);
          }, 4000);
        }
      });
    } else {
      setMessage('Please enter your email address');
    }
  };

  const onVerifyEmail = () => {
    setLoading(true);
    verifyEmail().then((res) => {
      if (res.success) {
        const timer = setInterval(() => {
          if (currentUser.emailVerified) {
            clearInterval(timer);
            setAuthState(true);
          } else {
            refreshUser();
          }
        }, 2000);
      } else {
        setLoading(false);
        setMessage('Unable to verify email address');
      }
    });
  };

  // Clear state values when step changes
  useEffect(() => {
    setLoading(false);
    setMessage(null);
    setEmail('');
    setPassword('');
    setPasswordConf('');
    setFirstname('');
    setLastname('');
  }, [step]);

  return (
    <ScreenWrapper>
      {step === 0 && (
        <>
          <Png width={200} height={200} name="money" />
          <Spacer height={20} />
          <TextInput
            autoCapitalize="none"
            placeholder="email"
            onChange={setEmail}
            value={email}
          />
          <TextInput
            isSecure
            placeholder="password"
            onChange={setPassword}
            value={password}
          />
          <View height={25}>
            <Text size={12} color={theme.font.colors.secondary}>
              {message}
            </Text>
          </View>
          <Button
            text="Login"
            width={200}
            onPress={onLogin}
            disabled={loading}
            loading={loading}
          />
          <Spacer height={10} />
          <Pressable onPress={() => setStep(1)}>
            <Text size={12} color={theme.font.colors.secondary}>
              No account? Create one here!
            </Text>
          </Pressable>
          <Spacer height={10} />
          <Pressable onPress={() => setStep(2)}>
            <Text size={12} color={theme.font.colors.secondary}>
              Forgot password?
            </Text>
          </Pressable>
        </>
      )}
      {step === 1 && (
        <>
          <Text size={18} bold color={theme.font.colors.primary}>
            New Registration
          </Text>
          <Spacer height={15} />
          <TextInput
            autoCapitalize="words"
            placeholder="first name"
            onChange={setFirstname}
            value={firstname}
          />
          <TextInput
            autoCapitalize="words"
            placeholder="last name"
            onChange={setLastname}
            value={lastname}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="email"
            onChange={setEmail}
            value={email}
          />
          <TextInput
            isSecure
            placeholder="password"
            onChange={setPassword}
            value={password}
          />
          <TextInput
            isSecure
            placeholder="confirm password"
            onChange={setPasswordConf}
            value={passwordConf}
          />
          <View height={25}>
            {message && (
              <Text size={12} color={theme.font.colors.secondary}>
                {message}
              </Text>
            )}
          </View>
          <Button
            type="primary"
            text="Submit"
            width={200}
            onPress={onRegister}
            loading={loading}
            disabled={loading}
          />
          <Spacer height={10} />
          <Button
            type="secondary"
            text="Back"
            width={200}
            disabled={loading}
            onPress={() => setStep(0)}
          />
        </>
      )}
      {step === 2 && (
        <>
          <Text size={18} bold color={theme.font.colors.primary}>
            Reset Password
          </Text>
          <Spacer height={15} />
          <TextInput
            autoCapitalize="none"
            placeholder="email"
            onChange={setEmail}
            value={email}
          />
          <View height={25}>
            {message && (
              <Text size={12} color={theme.font.colors.secondary}>
                {message}
              </Text>
            )}
          </View>
          <Button
            type="primary"
            text="Confirm"
            width={200}
            onPress={onResetPassword}
            disabled={loading}
            loading={loading}
          />
          <Spacer height={10} />
          <Button
            type="secondary"
            text="Back"
            width={200}
            disabled={loading}
            onPress={() => setStep(0)}
          />
        </>
      )}
      {step === 3 && (
        <>
          <Text size={18} bold color={theme.font.colors.primary}>
            Verify Email Address
          </Text>
          <Spacer height={10} />
          {loading && (
            <Text size={12} bold color={theme.font.colors.primary}>
              Check your inbox for the verification email, app will proceed once
              read!
            </Text>
          )}
          <Spacer height={15} />
          <Button
            type="primary"
            text={loading ? 'Please wait' : 'Send Verification'}
            width={200}
            onPress={onVerifyEmail}
            disabled={loading}
            loading={loading}
          />
          <Spacer height={10} />
          <Button
            type="secondary"
            text="Back"
            width={200}
            onPress={() => setStep(0)}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default Render;
