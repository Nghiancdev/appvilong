import React from 'react';
import {View} from 'react-native';

const Column = ({
  children,
  flex,
  crossAxisAlignment,
  mainAxisAlignment,
  marginVertical,
  marginHorizontal,
  padding,
  paddingHorizontal,
  paddingVertical,
  width,
  gap,
}) => (
  <View
    style={[
      {
        flex: flex ?? 1,
        flexDirection: 'column',
        gap: gap,
        padding: padding,
        marginVertical: marginVertical,
        marginHorizontal: marginHorizontal,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        width: width,
        alignItems: crossAxisAlignment,
        justifyContent: mainAxisAlignment,
      },
    ]}>
    {children}
  </View>
);

export default Column;
