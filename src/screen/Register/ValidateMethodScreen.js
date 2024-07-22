import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../store/DataAppStore';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import {Image} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  IconButton,
  TextInput,
  useTheme,
} from 'react-native-paper';
import ITextInput from '../../components/ITextInput/ITextInput';
import PhoneIcon from '../../components/Icons/PhoneIcon';
import SizedBox from '../../components/SizedBox';
import Column from '../../components/Column';
import LockIcon from '../../components/Icons/LockIcon';
import IButton from '../../components/IButton';
import Row from '../../components/Row';
import {da} from 'date-fns/locale';
import PersonCircleIcon from '../../components/Icons/PersonCircleIcon';
import PhoneOutlineIcon from '../../components/Icons/PhoneOutlineIcon';
import EmailIcon from '../../components/Icons/EmailIcon';
import {useRegisterStore} from '../../store/RegisterStore';
import Container from '../../components/Container';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const ValidateMethodScreen = observer(({route, navigation}) => {
  const {phone_number, email, isPhoneValidate, pass, name, code_introduce} =
    route.params;

  return (
    <Scaffold
      appbar={
        <IAppBar title={'Đăng ký'} automaticallyImplyLeading={true}></IAppBar>
      }
      body={
        <Column crossAxisAlignment={'center'} mainAxisAlignment={'center'}>
          <Text style={{fontWeight: 'bold'}}>Chọn phương thức xác thực</Text>
          <SizedBox height={10}></SizedBox>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OTP', {
                isPhoneValidate: true,
                phone_number:phone_number,
                email: email,
                pass: pass,
                name: name,
                code_introduce: code_introduce,
              });
            }}>
            <Container
              height={80}
              width={SCREEN_WIDTH * 0.7}
              borderColor={'#F5F5F5'}
              justifyContent={'center'}
              alignItems={'center'}
              child={
                <Column
                  crossAxisAlignment={'center'}
                  mainAxisAlignment={'center'}>
                  <Text style={{fontWeight: 500}}>OTP SMS</Text>
                  <SizedBox height={10}></SizedBox>
                  <Text style={{fontSize: 12, color: 'grey'}}>
                    {`Gửi tới: ${phone_number}`}
                  </Text>
                </Column>
              }></Container>
          </TouchableOpacity>
          <SizedBox height={10}></SizedBox>
          <TouchableOpacity
            onPress={() => {
              isPhoneValidate, pass, name, code_introduce;
              navigation.navigate('OTP', {
                isPhoneValidate: false,
                phone_number: phone_number,
                email: email,
                pass: pass,
                name: name,
                code_introduce: code_introduce,
              });
            }}>
            <Container
              padding={10}
              height={80}
              width={SCREEN_WIDTH * 0.7}
              justifyContent={'center'}
              alignItems={'center'}
              borderColor={'#F5F5F5'}
              child={
                <Column
                  crossAxisAlignment={'center'}
                  mainAxisAlignment={'center'}>
                  <Text style={{fontWeight: 500}}>OTP Email</Text>
                  <SizedBox height={10}></SizedBox>
                  <Text style={{fontSize: 12, color: 'grey'}}>
                    {`Gửi tới: ${email}`}
                  </Text>
                </Column>
              }></Container>
          </TouchableOpacity>
        </Column>
      }></Scaffold>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textCtv: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    textShadowOffset: {width: 0, height: 4}, // Độ phân tán theo chiều ngang và dọc
    textShadowRadius: 4, // Bán kính phân tán
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    width: SCREEN_WIDTH,
    marginTop: 10,
    height: 200,
  },
  backgroundImage: {
    position: 'absolute',
    borderRadius: 10,
    width: SCREEN_WIDTH - 20,
  },
});

export default ValidateMethodScreen;
