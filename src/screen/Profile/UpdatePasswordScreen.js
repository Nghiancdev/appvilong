import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  Alert,
  Image,
  Pressable,
} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../store/DataAppStore';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import {
  Button,
  Divider,
  Icon,
  IconButton,
  TextInput,
  useTheme,
} from 'react-native-paper';
import IITextInput from '../../components/IITextInput/IITextInput';
import SizedBox from '../../components/SizedBox';
import Column from '../../components/Column';
import IButton from '../../components/IButton';
import Row from '../../components/Row';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import EmailIcon from '../../components/Icons/EmailIcon';
import {useRegisterStore} from '../../store/RegisterStore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {toast} from '../../utils/apis/toast';
import {toJS} from 'mobx';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const UpdatePasswordScreen = observer(({route, navigation}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [flatTextSecureEntry, setFlatTextSecureEntry] = React.useState(true);
  const insets = useSafeAreaInsets();
  const [sex, setSex] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const theme = useTheme();
  const datePicker = new Date();
  const [isModalVisible, setModalVisible] = useState(false);
  const [birthday, setBirthday] = useState();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const {appTheme, isLogin, login, badge, infoCustomer} = useDataAppStore();
  const {checkHasPhoneNumber, checkHasEmail, sendEmailCus, sendSms, onSignUp} =
    useRegisterStore();
  const [dataRegister, setDataRegister] = React.useState({
    phone_number: '',
    password: '',
    name: '',
    email: '',
    otp: '',
    otp_from: '',
    referral_phone_number: '',
  });
  console.log('dataRegister', toJS(infoCustomer));

  const gioiTinh = [
    {
      id: 1,
      sex: 'Nam',
    },
    {
      id: 2,
      sex: 'Nữ',
    },
  ];
  // CHECK IS_USE_OTP TRUE OR FALSE
  const checkIsUseOtp = async dataRegister => {
    // True
    if (badge.is_use_otp) {
      // console.log("badgeTrue", JSON.stringify(badge))
      if (dataRegister.email == '' && dataRegister.phone_number != '') {
        checkHasPhoneNumber(
          // console.log("dataRegister1", dataRegister),
          dataRegister.phone_number,
          () => {},
          () => {
            navigation.navigate('OTP', {
              isPhoneValidate: true,
              phone_number: dataRegister.phone_number,
              email: dataRegister.email,
              pass: dataRegister.password,
              name: dataRegister.name,
              code_introduce: dataRegister.referral_phone_number,
            });
          },
        );
      } else {
        checkHasEmail(
          dataRegister.email,
          () => {},
          () => {
            checkHasPhoneNumber(
              dataRegister.phone_number,
              () => {},
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
      if (
        dataRegister.email === '' ||
        dataRegister.phone_number === '' ||
        dataRegister.name === '' ||
        dataRegister.password === ''
      ) {
        await toast.success(
          'Bạn nhập đầy đủ email,số điện thoại, tên, mật khẩu',
        );
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
      } else {
        checkHasEmail(
          dataRegister.email,
          () => {},
          () => {
            checkHasPhoneNumber(
              dataRegister.phone_number,
              () => {},
              () =>
                onSignUp(
                  true,
                  dataRegister.phone_number,
                  dataRegister.password,
                  dataRegister.name,
                  dataRegister.email,
                  '',
                  dataRegister.referral_phone_number || '',
                ),
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
  };

  //DATE PICKER
  const showDatePicker = () => {
    console.log("datepicker", isDatePickerVisible)
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = selectedDate => {
    setBirthday(selectedDate.toLocaleDateString('vi-VN'));
    hideDatePicker();
  };

  // MODAL
  const toggleModal = () => {
    console.log('123');
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const date = new Date();

  const [validatePhone, setValidatePhone] = useState('');
  const validatePhoneNumber = () => {
    const regex = /^(0[2-9]|1[2-9])[0-9]{8}$/;

    if (regex.test(validatePhone)) {
      setDataRegister({...dataRegister, phone_number: validatePhone});
      checkIsUseOtp(dataRegister);
    } else {
      toast.erorr('Bạn kiểm tra lại số điện thoại');
    }
  };

  return (
    <Scaffold
      appbar={
        <IAppBar
          title={'Cập nhật mật khẩu'}
          automaticallyImplyLeading={true}></IAppBar>
      }
      body={
        <View style={styles.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={{flexGrow: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            extraScrollHeight={60}
            style={{flex: 1}}>
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
                <View
                  style={{
                    width: SCREEN_WIDTH,
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                  }}>
                  <IITextInput
                    icon={<Text>Tên</Text>}
                    placeholder={infoCustomer?.name}
                    onChange={v => {
                      // console.log(v);
                      setDataRegister({...dataRegister, name: v});
                    }}></IITextInput>
                </View>
                <SizedBox height={10}></SizedBox>
                <View style={{width: SCREEN_WIDTH, paddingHorizontal: 20}}>
                  <IITextInput
                    icon={<Text style={{fontSize: 13}}>Số điện thoại</Text>}
                    flatTextSecureEntry={false}
                    placeholder={infoCustomer?.phone_number}
                    keyboardType={'phone-pad'}
                    onChange={v => {
                      setValidatePhone(v);
                      // validatePhoneNumber(v)
                      // setDataRegister({ ...dataRegister, phone_number: v });
                    }}></IITextInput>
                </View>
                <SizedBox height={10}></SizedBox>
                <View style={{width: SCREEN_WIDTH, paddingHorizontal: 20}}>
                  <IITextInput
                    icon={<Text style={{fontSize: 13}}>Email</Text>}
                    placeholder={infoCustomer?.email}
                    flatTextSecureEntry={false}
                    keyboardType={'email-address'}
                    onChange={v => {
                      setDataRegister({...dataRegister, email: v});
                    }}></IITextInput>
                </View>

                <SizedBox height={10}></SizedBox>

                <Pressable onPress={()=>
                  //  showDatePicker
                    setDatePickerVisible(true)
                }>
                  <View
                    style={{
                      width: windowWidth - 40,
                      // paddingHorizontal: 20,
                      backgroundColor: 'white',
                      paddingRight: 10,
                      paddingLeft: 10,
                      borderRadius: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      // backgroundColor: "red",
                      height: 75,
                    }}>
                    <View>
                      <Text>Ngày sinh</Text>
                    </View>
                    <View>
                      <Text>{birthday ? birthday : "Chưa có ngày sinh"}</Text>
                    </View>
                    <DatePicker
                      modal
                      date={datePicker}
                      open={isDatePickerVisible}
                      mode="date"
                    //   isVisible={isDatePickerVisible}
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                      title="Chọn ngày sinh"
                    />
                  </View>
                </Pressable>

                <SizedBox height={10}></SizedBox>

                <View
                  style={{
                    width: windowWidth - 40,
                    // paddingHorizontal: 20,
                    backgroundColor: 'white',
                    paddingRight: 10,
                    paddingLeft: 10,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // backgroundColor: "red",
                    height: 75,
                  }}>
                  <View>
                    <Text>Giới tính</Text>
                  </View>
                  <Pressable
                    style={{
                      paddingHorizontal: 20,
                    }}
                    onPress={toggleModal}>
                    <Text style={{}}>{sex ? sex : 'Khác'}</Text>
                  </Pressable>
                  <Modal
                    isVisible={isModalVisible}
                    swipeThreshold={200}
                    onBackdropPress={closeModal}
                    onSwipeComplete={closeModal}
                    swipeDirection={['up', 'down']}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    backdropOpacity={0.5}
                    useNativeDriver={true}
                    style={{justifyContent: 'flex-end', margin: 0}}>
                    <View
                      style={{
                        backgroundColor: '#ffffff',
                        height: windowHeight - 600,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 25,
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>
                          Chọn giới tính của bạn
                        </Text>
                      </View>

                      {/* Select rooms */}
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center"',
                          marginVertical: 15,
                          marginLeft: 10,
                          marginRight: 10,
                        }}>
                        {gioiTinh.map((item, index) => (
                          <Pressable
                            onPress={() => {
                              setSex(item.sex);
                              setModalVisible(!isModalVisible);
                            }}
                            style={{
                              height: 50,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View>
                              <Text
                                style={{
                                  fontWeight: '500',
                                  margin: 15,
                                  fontSize: 15,
                                }}>
                                {item.sex}
                              </Text>
                            </View>
                          </Pressable>
                        ))}
                      </View>

                      <Button title="Ok" onPress={toggleModal} />
                    </View>
                  </Modal>
                </View>

                <SizedBox height={10}></SizedBox>

                <View style={{width: SCREEN_WIDTH, paddingHorizontal: 20}}>
                  <IITextInput
                    icon={
                      <Text style={{fontSize: 13}}>
                        Số điện thoại người giới thiệu
                      </Text>
                    }
                    placeholder={
                      infoCustomer?.referral_phone_number
                        ? infoCustomer?.referral_phone_number
                        : ''
                    }
                    flatTextSecureEntry={false}
                    onChange={v => {
                      setDataRegister({
                        ...dataRegister,
                        referral_phone_number: v,
                      });
                    }}></IITextInput>
                </View>

                <View style={{width: SCREEN_WIDTH, paddingHorizontal: 20}}>
                  <IITextInput
                    icon={<Text style={{fontSize: 13}}>Thay đổi mật khẩu</Text>}
                    placeholder={'Mật khẩu'}
                    flatTextSecureEntry={flatTextSecureEntry}
                    onChange={v => {
                      setDataRegister({...dataRegister, password: v});
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
                    }></IITextInput>
                </View>

                <SizedBox height={10}></SizedBox>
                <SizedBox height={20}></SizedBox>
                <IButton
                  text={'Đăng ký'}
                  onPress={
                    () => validatePhoneNumber()
                    // checkIsUseOtp(dataRegister)
                  }></IButton>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default UpdatePasswordScreen;
