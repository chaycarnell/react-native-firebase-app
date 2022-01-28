import React from 'react';
import { View, Pressable } from 'react-native';
import { s } from '@utils/scale';
import theme from '@styles/theme';
import Spinner from './spinner';
import Text from './text';

const typeColors: { [key: string]: string } = {
  primary: theme.colors.primary,
  secondary: theme.colors.error,
};

const Render = ({
  onPress = () => {},
  onLongPress = () => {},
  disabled = false,
  height = 40,
  width = 120,
  type = 'primary',
  text = 'Button',
  textSize = 12,
  textColor = theme.font.colors.white,
  bold = false,
  loading = false,
}) => {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => ({
        backgroundColor: typeColors[type],
        opacity: (!disabled && pressed) || disabled ? 0.7 : 1,
        height: s(height),
        width: s(width),
        borderRadius: s(4),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      })}
      onPress={() => onPress && onPress()}
      onLongPress={() => onLongPress && onLongPress()}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: s(30) }} />
        <View
          style={{
            width: s(width) - s(60),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text size={textSize} color={textColor} bold={bold}>
            {text}
          </Text>
        </View>
        <View style={{ width: s(30) }}>
          <Spinner size="small" loading={loading} color={theme.colors.white} />
        </View>
      </View>
    </Pressable>
  );
};

export default Render;
