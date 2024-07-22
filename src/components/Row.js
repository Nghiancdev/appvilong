import React from 'react';
import {View} from 'react-native';

const Row = ({
  children,
  flex,
  crossAxisAlignment = 'center',
  mainAxisAlignment,
  padding,
  paddingVertical,
  paddingHorizontal,
  margin,
  marginHorizontal,
  marginVertical,
  backgroundColor,
}) => (
  <View
    style={[
      {
        padding: padding,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        margin: margin,
        backgroundColor: backgroundColor,
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
        flexDirection: 'row',
        alignItems: crossAxisAlignment,
        justifyContent: mainAxisAlignment,
        flex:flex ?? 0
      },
    ]}>
    {children}
  </View>
);

export default Row;
