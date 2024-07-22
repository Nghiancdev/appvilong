import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const IgnorePointer = ({ children, disabled }) => {
  return (
    <View pointerEvents="none">
      {children}
    </View>
  );
};

export default IgnorePointer;
