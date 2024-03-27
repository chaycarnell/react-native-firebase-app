import {
  login,
  logout,
  refreshUser,
  register,
  resetPassword,
  useAuth,
  verifyEmail,
} from '@auth';
import { Button, Png, ScreenWrapper, Spacer, TextInput } from '@components';
import { defaultTheme } from '@theme';
import { AnalyticsEventName, ScreenNames } from '@types';
import { logEvent } from '@utils/analytics';
import { log, recordError, setUserId } from '@utils/crashlytics';
import { navigate } from '@utils/navigation';
import { s } from '@utils/scale';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const Render = () => {
  const { initialized, authenticated, currentUser } = useAuth();
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConf, setPasswordConf] = useState<string>('');
  const [message, setMessage] = useState<null | string>(null);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);

  const emailVerified = currentUser?.emailVerified;

  // Handle login
  const onLogin = () => {
    if (email && password) {
      setMessage(null);
      setLoading(true);
      login(email, password).then(async res => {
        setLoading(false);
        if (!res.success) {
          logEvent(AnalyticsEventName.EMAIL_PASSWORD_LOGIN_FAILED);
          return setMessage(res.desc);
        }
        if (!currentUser?.emailVerified) {
          logEvent(AnalyticsEventName.EMAIL_PASSWORD_LOGIN_SUCCESS);
          return setStep(3);
        }
      });
    } else {
      setMessage('Please enter your email and password');
      logEvent(AnalyticsEventName.EMAIL_PASSWORD_LOGIN_FAILED);
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
      if (!firstname || !lastname) {
        return setMessage('Please enter your first and last name');
      }
      if (password !== passwordConf) {
        return setMessage('Password and confirmation does not match');
      }
      setLoading(true);
      return register(email, password).then(async res => {
        setLoading(false);
        if (!res.success) {
          return setMessage(res.desc);
        }
        logEvent(AnalyticsEventName.REGISTRATION_SUCCESS);
        return setStep(3);
      });
    }
    return setMessage('Please enter an email and password');
  };

  // Handle password reset
  const onResetPassword = () => {
    if (email) {
      setLoading(true);
      resetPassword(email).then(res => {
        if (!res.success) {
          setLoading(false);
          setMessage(res.desc);
        } else {
          logEvent(AnalyticsEventName.PASSWORD_RESET_SENT);
          setMessage(res.desc);
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
    verifyEmail().then(res => {
      if (!res?.success) {
        logEvent(AnalyticsEventName.VERIFY_EMAIL_FAILED);
        setLoading(false);
        setMessage('Unable to verify email address');
        return;
      }
      setVerificationSent(true);
      logEvent(AnalyticsEventName.VERIFY_EMAIL_SUCCESS);
    });
  };

  const clearState = () => {
    setLoading(false);
    setMessage(null);
    setEmail('');
    setPassword('');
    setPasswordConf('');
    setFirstname('');
    setLastname('');
    setVerificationSent(false);
  };

  // Clear state values when step changes
  useEffect(() => {
    clearState();
  }, [step]);

  useEffect(() => {
    if (initialized && authenticated) {
      if (emailVerified) {
        clearState();
        return navigate(ScreenNames.DASHBOARD);
      }
      return setStep(3);
    }
  }, [initialized, authenticated, emailVerified]);

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
          <View>
            <Text
              style={{
                fontSize: s(12),
                color: defaultTheme.font.colors.secondary,
              }}>
              {message}
            </Text>
          </View>
          <Button
            text="Login"
            width={200}
            onPress={onLogin}
            onLongPress={onLogin}
            disabled={loading}
            loading={loading}
          />
          <Spacer height={10} />
          <Pressable onPress={() => setStep(1)}>
            <Text
              style={{
                fontSize: s(12),
                color: defaultTheme.font.colors.secondary,
              }}>
              No account? Create one here!
            </Text>
          </Pressable>
          <Spacer height={10} />
          <Pressable onPress={() => setStep(2)}>
            <Text
              style={{
                fontSize: s(12),
                color: defaultTheme.font.colors.secondary,
              }}>
              Forgot password?
            </Text>
          </Pressable>
        </>
      )}
      {step === 1 && (
        <>
          <Text
            style={{
              fontSize: s(18),
              color: defaultTheme.font.colors.primary,
            }}>
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
          <View>
            {message && (
              <Text
                style={{
                  fontSize: s(12),
                  color: defaultTheme.font.colors.secondary,
                }}>
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
          <Text
            style={{
              fontSize: s(18),
              color: defaultTheme.font.colors.primary,
            }}>
            Reset Password
          </Text>
          <Spacer height={15} />
          <TextInput
            autoCapitalize="none"
            placeholder="email"
            onChange={setEmail}
            value={email}
          />
          <View>
            {message && (
              <Text
                style={{
                  fontSize: s(12),
                  color: defaultTheme.font.colors.secondary,
                }}>
                {message}
              </Text>
            )}
          </View>
          <Button
            type="primary"
            text="Confirm"
            width={200}
            onPress={onResetPassword}
            onLongPress={onResetPassword}
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
          <Text
            style={{
              fontSize: s(18),
              color: defaultTheme.font.colors.primary,
            }}>
            Verify Email Address
          </Text>
          <Spacer height={10} />
          {loading && (
            <Text
              style={{
                fontSize: s(12),
                color: defaultTheme.font.colors.primary,
              }}>
              Check your inbox for the verification email.
            </Text>
          )}
          <Spacer height={15} />
          {verificationSent ? (
            <Button
              type="primary"
              text={"I've Verified!"}
              width={200}
              onPress={refreshUser}
              disabled={false}
              loading={false}
            />
          ) : (
            <Button
              type="primary"
              text={loading ? 'Please wait' : 'Send Verification'}
              width={200}
              onPress={onVerifyEmail}
              disabled={loading}
              loading={loading}
            />
          )}
          <Spacer height={10} />
          <Button
            type="secondary"
            text="Logout"
            width={200}
            onPress={() => logout().then(() => setStep(0))}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default Render;
