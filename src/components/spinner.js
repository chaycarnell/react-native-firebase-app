import React from 'react';
import theme from '@styles/theme';
import { View, ActivityIndicator } from 'react-native';

const Render = ({
  loading = false,
  size = 'large',
  color = theme.colors.white,
  fullScreen = false,
}) => {
  if (fullScreen)
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        <ActivityIndicator animating={loading} size={size} color={color} />
      </View>
    );
  return <ActivityIndicator animating={loading} size={size} color={color} />;
};

export default Render;
