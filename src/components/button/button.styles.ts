import { s } from '@utils/scale';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export const buttonWrapper: StyleProp<ViewStyle> = {
  flex: 1,
  flexDirection: 'row',
};

export const buttonTextStyles = (
  textSize: number,
  textColor: string,
  bold: boolean,
): StyleProp<TextStyle> => ({
  fontSize: textSize,
  color: textColor,
  fontWeight: bold ? 'bold' : 'normal',
});

export const buttonContentStyles = (width: number): StyleProp<ViewStyle> => ({
  width: s(width) - s(60),
  justifyContent: 'center',
  alignItems: 'center',
});
