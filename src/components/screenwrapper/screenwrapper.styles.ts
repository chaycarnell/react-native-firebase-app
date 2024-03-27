import { s } from '@utils/scale';
import { StyleProp, ViewStyle } from 'react-native';

export const screenWrapperStyles: StyleProp<ViewStyle> = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: s(10),
  paddingRight: s(10),
};
