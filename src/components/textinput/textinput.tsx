import React from 'react';
import { TextInput } from 'react-native';

import { textinputStyles } from './textinput.styles';
import { CustomTextInput } from './textinput.types';

const Render = ({
  value = '',
  placeholder = '',
  isSecure = false,
  autoCapitalize = 'none',
  textAlign = 'center',
  onChange,
}: CustomTextInput) => {
  return (
    <TextInput
      style={textinputStyles(textAlign)}
      textAlign={textAlign}
      secureTextEntry={isSecure}
      autoCapitalize={autoCapitalize}
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
    />
  );
};

export default Render;
