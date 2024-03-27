import { logout, useAuth } from '@auth';
import { ScreenWrapper, Spacer } from '@components';
import { s } from '@utils/scale';
import React from 'react';
import { Pressable, Text } from 'react-native';
import env from 'react-native-config';

const Render = () => {
  const { currentUser } = useAuth();

  return (
    <ScreenWrapper>
      <Text>Current user ID: {currentUser?.uid}</Text>
      <Spacer height={s(5)} />
      <Spacer height={s(5)} />
      <Pressable onPress={() => logout()}>
        <Text>Logout</Text>
      </Pressable>
      <Spacer height={s(5)} />
      <Text>Built for {env.APP_ENV}</Text>
    </ScreenWrapper>
  );
};

export default Render;
