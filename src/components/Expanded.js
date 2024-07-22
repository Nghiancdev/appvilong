import React from 'react';
import {View} from 'react-native';

const Expanded = ({child}) => {
  return <View style={{flex: 1}}>{child}</View>;
};

export default Expanded;
