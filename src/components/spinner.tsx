import React from 'react';
import theme from '@styles/theme';
import { View, ActivityIndicator } from 'react-native';

interface ISpinnerProps {
  loading: boolean;
  size: 'large' | 'small';
  color: string;
}

const Render = ({
  loading = false,
  size = 'large',
  color = theme.colors.white,
}: ISpinnerProps) => (
  <View
    style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
    }}
  >
    <ActivityIndicator animating={loading} size={size} color={color} />
  </View>
);

export default Render;
