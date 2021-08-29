import React from 'react';
import { Image, View } from 'react-native';
import { Money } from '@assets/images';
import { s } from '@utils/scale';

const PNG = {
  money: Money,
};

const Render = ({ width, height, name }) => (
  <View style={{ width: s(width), height: s(height) }}>
    <Image
      style={{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
      }}
      source={PNG[name]}
    />
  </View>
);

export default Render;
