import { defaultTheme } from '@theme';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { spinnerStyles } from './spinner.styles';
import { SpinnerProps } from './spinner.types';

const Render = ({
  loading = false,
  size = 'large',
  color = defaultTheme.colors.white,
}: SpinnerProps) => (
  <View style={spinnerStyles}>
    <ActivityIndicator animating={loading} size={size} color={color} />
  </View>
);

export default Render;
