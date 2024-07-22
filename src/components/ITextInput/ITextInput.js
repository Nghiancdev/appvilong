import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Row from '../Row';
import Container from '../Container';
import { TextInput, Platform } from 'react-native';

const ITextInput = ({
  icon,
  right,
  placeholder,
  onChange,
  flatTextSecureEntry,
  keyboardType,
  editable,
  defaultValue

}) => {
  return (
    <Container
      backgroundColor={'white'}
      paddingRight={10}
      paddingLeft={10}
      borderRadius={5}
      child={
        <Row>
          {icon}
          <TextInput
            mode="flat"
            style={{margin: 15 , flex: 1, }}
            dense
            keyboardType={keyboardType ?? 'default'}
            placeholder={placeholder ?? ''}
            onChangeText={onChange}
            contentStyle={{backgroundColor: 'white'}}
            placeholderTextColor={'#64748B'}
            underlineColor="transparent"
            secureTextEntry={flatTextSecureEntry}
            editable = {editable ?? true}
            defaultValue = {defaultValue}
            />
          {right}
        </Row>
      }></Container>
  );
};

export default ITextInput;
