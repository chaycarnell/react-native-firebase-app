import React from 'react';
import Styled from 'styled-components/native';
import theme from '@styles/theme';
import { s } from '@utils/scale';

const Text = Styled.Text`
    font-size: ${({ size }) => `${s(size)}px`};
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
    color: ${({ color }) => color};
`;

const Render = ({
  children,
  size = 12,
  bold = false,
  color = theme.font.colors.primary,
}) => {
  return (
    <Text size={size} color={color} bold={bold}>
      {children}
    </Text>
  );
};

export default Render;
