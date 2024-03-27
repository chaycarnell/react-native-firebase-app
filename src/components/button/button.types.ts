import { GestureResponderEvent } from 'react-native';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

export interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => any;
  onLongPress?: (event: GestureResponderEvent) => any;
  disabled?: boolean;
  height?: number;
  width?: number;
  type?: `${ButtonType}`;
  text?: string;
  textSize?: number;
  textColor?: string;
  bold?: boolean;
  loading?: boolean;
}
