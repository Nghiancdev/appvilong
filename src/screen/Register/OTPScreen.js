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

import OTPTextInput from 'react-native-otp-textinput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SizedBox from '../../components/SizedBox';
import Column from '../../components/Column';
import {useDataAppStore} from '../../store/DataAppStore';
import IButton from '../../components/IButton';
import {useRegisterStore} from '../../store/RegisterStore';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const OTPScreen = observer(({route, navigation}) => {
  const {phone_number, email, isPhoneValidate, pass, name, code_introduce} =
    route.params;

  const {appTheme} = useDataAppStore();

  const [otp, setOtp] = React.useState('');

  const _start = 30;
  const [count, setCount] = React.useState(_start);

  const {checkHasPhoneNumber, checkHasEmail, onSignUp, sendEmailCus, sendSms} =
    useRegisterStore();

  useEffect(() => {
    let interval = null;
    if (count) {
      interval = setInterval(() => {
        setCount(count => count - 1);
      }, 1000);
    } else {
    }

    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    if (isPhoneValidate == true) {
      sendSms(phone_number);
    } else {
      sendEmailCus(email);
    }
  }, []);

  return (
    <Scaffold
      appbar={
        <IAppBar title={'Đăng ký'} automaticallyImplyLeading={true}></IAppBar>
      }
      body={
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          extraScrollHeight={60}
          style={{flex: 1}}>
          <Column crossAxisAlignment={'center'}>
            <SizedBox height={20}></SizedBox>
            <OTPTextInput
              inputCount={6}
              autoFocus={true}
              handleTextChange={text => {
                setOtp(text);
              }}></OTPTextInput>
            <SizedBox height={20}></SizedBox>
            <Text>{`Mã xác thực (OTP) đã được gửi tới`}</Text>
            <SizedBox height={5}></SizedBox>
            <Text
              style={{
                fontWeight: 'bold',
              }}>{`${isPhoneValidate == false ? 'Email' : 'SĐT'} ${
              isPhoneValidate == false ? email : phone_number
            }`}</Text>
            <SizedBox height={40}></SizedBox>
            <Text>{`Bạn có thể yêu cầu mã mới ${
              count > 0 ? 'sau ' + count.toString() + 's' : ''
            }`}</Text>
            <SizedBox height={10}></SizedBox>
            <TouchableOpacity
              onPress={() => {
                if (count == 0) {
                  if (isPhoneValidate == true) {
                    sendSms();
                  } else {
                    sendEmailCus();
                  }
                }
              }}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: appTheme.color_main_1,
                }}>
                Gửi lại mã
              </Text>
            </TouchableOpacity>
            <SizedBox height={40}></SizedBox>
            <IButton
              text={'LƯU'}
              onPress={() => {
                onSignUp(
                  isPhoneValidate,
                  phone_number,
                  pass,
                  name,
                  email,
                  otp,
                  code_introduce  || "",
                );
              }}></IButton>
          </Column>
        </KeyboardAwareScrollView>
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

export default OTPScreen;
