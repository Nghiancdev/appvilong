import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = ({height}) => {
  const styles = StyleSheet.create({
    divider: {
      height: height ?? 1, // Độ dài của phân đoạn
      marginVertical: 5,
      backgroundColor: '#F6F6F6',
    },
  });
  return <View style={styles.divider} />;
};

export default Divider;
