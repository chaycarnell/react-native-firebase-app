import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { Money } from '@assets/images';
import { s } from '@utils/scale';

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
    <Image
      style={{
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
      }}
      source={PNG[name]}
    />
  </View>
);

export default Render;
