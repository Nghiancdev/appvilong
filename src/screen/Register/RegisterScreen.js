import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { observer } from 'mobx-react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDataAppStore } from '../../store/DataAppStore';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import { Image } from 'react-native';
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
import { da } from 'date-fns/locale';
import PersonCircleIcon from '../../components/Icons/PersonCircleIcon';
import PhoneOutlineIcon from '../../components/Icons/PhoneOutlineIcon';
import EmailIcon from '../../components/Icons/EmailIcon';
import { useRegisterStore } from '../../store/RegisterStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {toast} from '../../utils/apis/toast';
import UserUtil from '../../utils/apis/userUtil';
const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const RegisterScreen = observer(({ route, navigation }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [flatTextSecureEntry, setFlatTextSecureEntry] = React.useState(true);
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const theme = useTheme();
  const { appTheme, isLogin, login, badge } = useDataAppStore();
  const { checkHasPhoneNumber, checkHasEmail, sendEmailCus, sendSms, onSignUp  } = useRegisterStore();
  const [dataRegister, setDataRegister] = React.useState({
    phone_number: '',
    password: '',
    name: '',
    email: '',
    otp: '',
    otp_from: '',
    referral_phone_number: '',
  });
  useEffect(() => {
    if(UserUtil.getPhoneNumberIntroduce() != null){
      setDataRegister({
        ...dataRegister,
        referral_phone_number: UserUtil.getPhoneNumberIntroduce(),
      });
    }
  }, []);

  // CHECK IS_USE_OTP TRUE OR FALSE
  const checkIsUseOtp = async (dataRegister) => {
    // True
    if(badge.is_use_otp){
      // console.log("badgeTrue", JSON.stringify(badge))
      if (dataRegister.email == '' && dataRegister.phone_number != '') {
        checkHasPhoneNumber(
          // console.log("dataRegister1", dataRegister),
          dataRegister.phone_number,
          () => {},
          () => {
            navigation.navigate('OTP', {
              isPhoneValidate: true,
              phone_number: dataRegister?.phone_number,
              email: dataRegister?.email,
              pass: dataRegister?.password,
              name: dataRegister?.name,
              code_introduce: dataRegister?.referral_phone_number,
            });
          },
        );
      } 
      else {
        checkHasEmail(
          dataRegister.email,
          () => { },
          () => {
            checkHasPhoneNumber(
              dataRegister.phone_number,
              () => { },
              () => {
                navigation.navigate('VALIDATE_METHOD', {
                  isPhoneValidate: true,
                  phone_number: dataRegister.phone_number,
                  email: dataRegister.email,
                  pass: dataRegister.password,
                  name: dataRegister.name,
                  code_introduce: dataRegister.referral_phone_number,
                });
              },
            );
          },
        );
      }
    }
    // FALSE
    else {
      if (dataRegister.email === '' || dataRegister.phone_number === '' || dataRegister.name === '' || dataRegister.password === '' ) {
       await  toast.success('Bạn nhập đầy đủ email,số điện thoại, tên, mật khẩu')
        // checkHasPhoneNumber(
        //   console.log("dataRegister1", dataRegister),
        //   dataRegister.phone_number,
        //   () => {},
        //   () => {
        //     // onSignUp(
        //     //   true,
        //     //   dataRegister.phone_number,
        //     //   dataRegister.password,
        //     //   dataRegister.name,
        //     //   dataRegister.email,
        //     //   234567,
        //     //   dataRegister.code_introduce  || "",
        //     // );
        //     navigation.navigate('OTP', {
        //       isPhoneValidate: true,
        //       phone_number: dataRegister.phone_number,
        //       email: dataRegister.email,
        //       pass: dataRegister.password,
        //       name: dataRegister.name,
        //       code_introduce: dataRegister.code_introduce,
        //     });
        //   },
        // );
      } 
      else {
        checkHasEmail(
          dataRegister.email,
          () => { },
          () => {
            checkHasPhoneNumber(
              dataRegister.phone_number,
              () => { },
              () => 
                onSignUp(
                   true,
                   dataRegister.phone_number,
                   dataRegister.password,
                   dataRegister.name,
                   dataRegister.email,
                   "",
                   dataRegister.referral_phone_number  || "",
                )
              // {
              //   navigation.navigate('VALIDATE_METHOD', {
              //     isPhoneValidate: true,
              //     phone_number: dataRegister.phone_number,
              //     email: dataRegister.email,
              //     pass: dataRegister.password,
              //     name: dataRegister.name,
              //     code_introduce: dataRegister.code_introduce,
              //   });
              // },
            );
          },
        );
      }
    }
 
  }

  const [validatePhone, setValidatePhone] = useState("")
  const validatePhoneNumber = () => {
    const regex = /^(0[2-9]|1[2-9])[0-9]{8}$/;

    if (regex.test(validatePhone)) {
        setDataRegister({ ...dataRegister, phone_number: validatePhone });
        checkIsUseOtp(dataRegister)
    } else {
      toast.erorr('Bạn kiểm tra lại số điện thoại')
    }
  };


  return (
    <Scaffold
      appbar={
        <IAppBar title={'Đăng ký'} automaticallyImplyLeading={true}></IAppBar>
      }
      body={
        <View style={styles.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            extraScrollHeight={60}
            style={{ flex: 1 }}>
            <ScrollView>
              <Column crossAxisAlignment={'center'}>
                <SizedBox height={20} width={SCREEN_WIDTH}></SizedBox>
                <Image
                  style={{
                    height: SCREEN_WIDTH / 2,
                    width: SCREEN_WIDTH / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: appTheme?.logo_url,
                  }}
                  resizeMode="cover"></Image>
                <SizedBox height={20}></SizedBox>
                <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
                  <ITextInput
                    icon={
                      <PersonCircleIcon
                        size={20}
                        color={'grey'}></PersonCircleIcon>
                    }
                    placeholder={'Họ và tên'}
                    onChange={v => {
                      // console.log(v);
                      setDataRegister({ ...dataRegister, name: v });
                    }}></ITextInput>
                </View>
                <SizedBox height={10}></SizedBox>
                <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
                  <ITextInput
                    icon={
                      <PhoneOutlineIcon
                        size={20}
                        color={'grey'}></PhoneOutlineIcon>
                    }
                    flatTextSecureEntry={false}
                    placeholder={'Số điện thoại'}
                    keyboardType={'phone-pad'}
                    onChange={v => {
                      setValidatePhone(v)
                      // validatePhoneNumber(v)
                      // setDataRegister({ ...dataRegister, phone_number: v });
                    }}></ITextInput>
                </View>
                <SizedBox height={10}></SizedBox>
                <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
                  <ITextInput
                    icon={<EmailIcon size={20} color={'grey'}></EmailIcon>}
                    placeholder={'Email'}
                    flatTextSecureEntry={false}
                    keyboardType={'email-address'}
                    onChange={v => {
                      setDataRegister({ ...dataRegister, email: v });
                    }}></ITextInput>
                </View>
                <SizedBox height={10}></SizedBox>

                <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
                  <ITextInput
                    icon={<LockIcon size={20} color={'grey'}></LockIcon>}
                    placeholder={'Mật khẩu'}
                    flatTextSecureEntry={flatTextSecureEntry}
                    onChange={v => {
                      setDataRegister({ ...dataRegister, password: v });
                    }}
                    right={
                      <Row>
                        <IconButton
                          icon={flatTextSecureEntry ? 'eye' : 'eye-off'}
                          size={20}
                          onPress={() => {
                            setFlatTextSecureEntry(!flatTextSecureEntry);
                          }}></IconButton>
                      </Row>
                    }></ITextInput>
                </View>
                <SizedBox height={10}></SizedBox>
                <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
                  <ITextInput
                    icon={
                      <PersonCircleIcon
                        size={20}
                        color={'grey'}></PersonCircleIcon>
                    }
                    placeholder={'Mã giới thiệu'}
                    defaultValue={UserUtil.getPhoneNumberIntroduce()}
                    flatTextSecureEntry={false}
                    editable={UserUtil.getPhoneNumberIntroduce() == null}
                    onChange={v => {
                      setDataRegister({
                        ...dataRegister,
                        referral_phone_number: v,
                      });
                    }}></ITextInput>
                </View>
                <SizedBox height={20}></SizedBox>
                <IButton
                  text={'Đăng ký'}
                  onPress={() => 
                    validatePhoneNumber()
                    // checkIsUseOtp(dataRegister)
                  }
                ></IButton>
              </Column>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
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
    textShadowOffset: { width: 0, height: 4 }, // Độ phân tán theo chiều ngang và dọc
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

export default RegisterScreen;
