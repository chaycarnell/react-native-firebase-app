import React from 'react';
import Styled from 'styled-components/native';
import theme from '@styles/theme';
import { s } from '@utils/scale';

interface ITextProps {
  children: React.ReactNode;
  size: number;
  color: string;
  bold?: boolean;
}

const Text = Styled.Text<ITextProps>`
    font-size: ${({ size }) => `${s(size)}px`};
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
    color: ${({ color }) => color};
`;

const Render = ({
  children,
  size = 12,
  bold = false,
  color = theme.font.colors.primary,
}: ITextProps) => {
  return (
    <Text size={size} color={color} bold={bold}>
      {children}
    </Text>
  );
};

export default Render;
