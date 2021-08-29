import React from 'react';
import theme from '@styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const Render = ({ children }) => (
  <LinearGradient
    start={{ x: 0.8, y: 0.05 }}
    end={{ x: 0.5, y: 1.0 }}
    colors={[theme.colors.white, theme.colors.white]}
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {children}
  </LinearGradient>
);

export default Render;
