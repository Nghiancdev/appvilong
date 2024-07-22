import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import { useDataAppStore } from '../store/DataAppStore';

const IButton = ({text, width, onPress, style}) => {
  const navigation = useNavigation();
  const {appTheme} = useDataAppStore();
  const windowWidth = Dimensions.get('window').width;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          style,
          {
            padding: 15,
            backgroundColor: appTheme.color_main_1,
            borderRadius: 5,
            width: width ?? windowWidth * 0.7,
            alignItems: 'center',
          },
        ]}>
        <Text style={{color: 'white'}}>{text ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IButton;
