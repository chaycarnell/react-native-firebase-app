import React from 'react';
import { View } from 'react-native';

import { spacerStyles } from './spacer.styles';
import { SpacerProps } from './spacer.types';

const Render = ({ height = 0, width = 0, children }: SpacerProps) => (
  <View style={spacerStyles({ height, width })}>{children}</View>
);

export default Render;
