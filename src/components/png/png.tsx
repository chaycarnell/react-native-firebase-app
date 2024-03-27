import { Money } from '@assets/images';
import { s } from '@utils/scale';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import { pngStyles } from './png.styles';

const PNG: { [key: string]: ImageSourcePropType } = {
  money: Money,
};

const Render = ({
  width,
  height,
  name,
}: {
  width: number;
  height: number;
  name: string;
}) => (
  <View style={{ width: s(width), height: s(height) }}>
    <Image style={pngStyles} source={PNG[name]} />
  </View>
);

export default Render;
