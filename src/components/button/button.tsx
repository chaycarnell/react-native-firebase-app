import { Spacer } from '@components';
import { defaultTheme } from '@theme';
import { s } from '@utils/scale';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import Spinner from '../spinner/spinner';
import {
  buttonContentStyles,
  buttonTextStyles,
  buttonWrapper,
} from './button.styles';
import { ButtonType, CustomButtonProps } from './button.types';

const typeColors: Record<ButtonType, string> = {
  primary: defaultTheme.colors.primary,
  secondary: defaultTheme.colors.error,
};

const Render = ({
  onPress,
  onLongPress,
  disabled = false,
  height = 40,
  width = 120,
  type = 'primary',
  text = 'Button',
  textSize = 12,
  textColor = defaultTheme.font.colors.white,
  bold = false,
  loading = false,
}: CustomButtonProps) => {
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
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={buttonWrapper}>
        <Spacer width={30} height={0} />
        <View style={buttonContentStyles(width)}>
          <Text style={buttonTextStyles(textSize, textColor, bold)}>
            {text}
          </Text>
        </View>
        <Spacer width={30}>
          <Spinner
            size="small"
            loading={loading}
            color={defaultTheme.colors.white}
          />
        </Spacer>
      </View>
    </Pressable>
  );
};

export default Render;
