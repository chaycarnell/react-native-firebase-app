import React from 'react';
import Styled from 'styled-components/native';
import theme from '@styles/theme';
import { s } from '@utils/scale';

const Input = Styled.TextInput`
    width: 80%;
    height: ${s(40)}px;
    font-size: ${s(16)}px;
    margin-bottom: ${s(4)}px;
    background-color: ${theme.colors.white};
    text-align: ${(props) => props.textAlign};
    color: ${theme.font.colors.primary}
    border-color: ${theme.colors.primary};
    border-radius: 10px;
    border-width: 2px;
`;

const Render = ({
  value = '',
  placeholder = '',
  onChange,
  isSecure = false,
  autoCapitalize = 'none',
  textAlign = 'center',
}) => {
  return (
    <Input
      textAlign={textAlign}
      secureTextEntry={isSecure}
      autoCapitalize={autoCapitalize}
      placeholder={placeholder}
      onChangeText={(text) => onChange && onChange(text)}
      value={value}
    />
  );
};

export default Render;
