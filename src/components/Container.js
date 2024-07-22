import React from 'react';
import {View} from 'react-native';

const Container = ({
  child,
  flex,
  padding,
  alignItems,
  justifyContent,
  paddingBottom,
  paddingTop,
  paddingLeft,
  paddingRight,
  paddingHorizontal,
  paddingVertical,  
  marginLeft,
  marginRight,
  marginBottom,
  marginTop,
  margin,
  backgroundColor,
  borderRadius,
  borderColor,
  borderBottomColor,
  borderBottomWidth,
  height = 'auto',
  width = 'auto',
  minWidth,
  color,
}) => (
  <View
    style={{
      flex: flex ?? 0,
      padding: padding,
      margin: margin,
      marginLeft: marginLeft,
      marginRight: marginRight,
      marginBottom: marginBottom,
      marginTop: marginTop,
      minWidth: minWidth,
      alignItems: alignItems,
      paddingHorizontal: paddingHorizontal,
      paddingVertical:paddingVertical,
      paddingBottom: paddingBottom,
      paddingTop: paddingTop,
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      borderColor: borderColor,
      borderWidth: borderColor ? 1 : 0, 
      height: height,
      width: width,
      justifyContent: justifyContent,
      color: color,
      borderBottomColor: borderBottomColor,
      borderBottomWidth: borderBottomWidth,
    }}>
    {child}
  </View>
);

export default Container;
