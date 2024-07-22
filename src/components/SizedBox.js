import React from 'react';
import {View} from 'react-native';

const SizedBox = ({child, height = 'auto', width = 'auto'}) => (
  <View
    style={{
      height: height,
      width: width,
    }}>
    {child}
  </View>
);

export default SizedBox;
