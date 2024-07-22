import React, {useEffect, useRef, useState} from 'react';
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
import PhoneOutlineIcon from '../../components/Icons/PhoneOutlineIcon';
import ITextInput from '../../components/ITextInput/ITextInput';
import {useRegisterStore} from '../../store/RegisterStore';
import { toast } from '../../utils/apis/toast';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const ForgotPassword = observer(({route, navigation}) => {
  // const {phone_number, email, isPhoneValidate, pass, name, code_introduce} =
  //   route.params;
  const {appTheme} = useDataAppStore();
  const [validatePhone, setValidatePhone] = useState("")

  const {checkHasPhoneNumber, checkHasEmail, onSignUp, sendEmailCus, sendSms} = useRegisterStore();

  const validatePhoneNumber = () => {
    const regex = /^(0[2-9]|1[2-9])[0-9]{8}$/;
    console.log("validatePhone", validatePhone)
    if (regex.test(validatePhone)) {
      sendSms(validatePhone)
      navigation.navigate('OTP_FORGOT_PASSWORD', {
           isPhoneValidate: true,
           phone_number: validatePhone,
        });
    } else {
      toast.erorr('Bạn kiểm tra lại số điện thoại')
    }
  };
  // const _start = 30;
  // const [count, setCount] = React.useState(_start);

  // const {checkHasPhoneNumber, checkHasEmail, onSignUp, sendEmailCus, sendSms} =
  //   useRegisterStore();

  // useEffect(() => {
  //   let interval = null;
  //   if (count) {
  //     interval = setInterval(() => {
  //       setCount(count => count - 1);
  //     }, 1000);
  //   } else {
  //   }

  //   return () => clearInterval(interval);
  // }, [count]);

  // useEffect(() => {
  //   if (isPhoneValidate == true) {
  //     sendSms(phone_number);
  //   } else {
  //     sendEmailCus(email);
  //   }
  // }, []);

  return (
    <Scaffold
      appbar={
        <IAppBar
          title={'Lấy lại mật khẩu'}
          automaticallyImplyLeading={true}></IAppBar>
      }
      body={
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          extraScrollHeight={60}
          style={{flex: 1, backgroundColor: '#F5F5F5'}}>
          <Column crossAxisAlignment={'center'}>
            <SizedBox height={20}></SizedBox>

            <View style={{width: SCREEN_WIDTH, paddingHorizontal: 20}}>
              <ITextInput
                icon={<PhoneOutlineIcon size={20}></PhoneOutlineIcon>}
                placeholder={'Nhập số điện thoại'}
                keyboardType={'phone-pad'}
                onChange={v => {
                  setValidatePhone(v)
                  // setPhone(v);
                  // validatePhoneNumber();
                  // setDataLogin({...dataLogin, email_or_phone_number: v});
                }}></ITextInput>
            </View>

            <SizedBox height={10}></SizedBox>
            <TouchableOpacity
              onPress={() => {
                // if (count == 0) {
                //   if (isPhoneValidate == true) {
                //     sendSms();
                //   } else {
                //     sendEmailCus();
                //   }
                // }
              }}>
              {/* <Text
                style={{
                  textDecorationLine: 'underline', color: appTheme.color_main_1,
                }}>
                Gửi lại mã
              </Text> */}
            </TouchableOpacity>
            <SizedBox height={40}></SizedBox>
            <IButton
              text={'TIẾP TỤC'}
              onPress={() => {
                validatePhoneNumber();
                // navigation.navigate('OTP_FORGOT_PASSWORD', {
                //   // phone_number: dataRegister.phone_number,
                // });
                // onSignUp(
                //   isPhoneValidate,
                //   phone_number,
                //   pass,
                //   name,
                //   email,
                //   otp,
                //   code_introduce || "",
                // );
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

export default ForgotPassword;
