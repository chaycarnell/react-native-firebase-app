import { defaultTheme } from '@theme';
import { s } from '@utils/scale';
import { StyleProp, TextStyle } from 'react-native';

import { TextAlignType } from './textinput.types';

export const textinputStyles = (
  textAlign: TextAlignType,
): StyleProp<TextStyle> => ({
  width: '80%',
  height: s(40),
  fontSize: s(16),
  marginBottom: s(4),
  backgroundColor: defaultTheme.colors.white,
  textAlign: textAlign,
  color: defaultTheme.font.colors.primary,
  borderColor: defaultTheme.colors.primary,
  borderRadius: 10,
  borderWidth: 2,
});
