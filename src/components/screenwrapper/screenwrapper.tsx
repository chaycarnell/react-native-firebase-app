import { defaultTheme } from '@theme';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { screenWrapperStyles } from './screenwrapper.styles';

const Render = ({ children }: { children?: React.ReactNode }) => (
  <LinearGradient
    start={{ x: 0.8, y: 0.05 }}
    end={{ x: 0.5, y: 1.0 }}
    colors={[defaultTheme.colors.white, defaultTheme.colors.white]}
    style={screenWrapperStyles}>
    {children}
  </LinearGradient>
);

export default Render;
