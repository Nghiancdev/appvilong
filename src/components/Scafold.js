import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Scaffold = ({appbar, body, bottomNavigationBar}) => {
  return (
    <View style={styles.container}>
      {appbar ?? <></>}
      <View style={styles.body}>{body}</View>
      {bottomNavigationBar ?? <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Scaffold;
