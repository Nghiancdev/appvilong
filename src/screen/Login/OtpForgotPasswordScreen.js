import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';

import { observer } from 'mobx-react';

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

import OTPTextInput from 'react-native-otp-textinput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SizedBox from '../../components/SizedBox';
import Column from '../../components/Column';
import { useDataAppStore } from '../../store/DataAppStore';
import IButton from '../../components/IButton';
import PhoneOutlineIcon from '../../components/Icons/PhoneOutlineIcon';
import ITextInput from '../../components/ITextInput/ITextInput';
import { useRegisterStore } from '../../store/RegisterStore';
import { toast } from '../../utils/apis/toast';
import Row from '../../components/Row';
import LockIcon from '../../components/Icons/LockIcon';
const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const OtpForgotPasswordScreen = observer(({ route, navigation }) => {
    const [flatTextSecureEntry, setFlatTextSecureEntry] = React.useState(true);
    const { phone_number, isPhoneValidate } = route.params;
    const { appTheme } = useDataAppStore();
    //   const [otp, setOtp] = useState();
    const [otp, setOtp] = React.useState('');
    const [password, setPassword] = useState("");
    console.log('phone_number', phone_number);
    const [countdown, setCountdown] = useState(30);
    const otp_from = "phone";
    const { checkHasPhoneNumber, checkHasEmail, onSignUp, sendEmailCus, sendSms, resetPassword } = useRegisterStore();

    const confirmResetPassword = (phone_number, otp, otp_from, password) => {
        if (password == "") {
            toast.erorr('Bạn nhập mật khẩu mới! ')
        } else {
            resetPassword(phone_number, otp, otp_from, password)
            navigation.navigate("LOGIN")
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Scaffold
            appbar={
                <IAppBar
                    title={'Lấy lại mật khẩu'}
                    automaticallyImplyLeading={true}></IAppBar>
            }
            body={
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    extraScrollHeight={60}
                    style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                    <Column crossAxisAlignment={'center'}>
                        <SizedBox height={20}></SizedBox>
                        <Text
                            style={{
                                paddingHorizontal: 20,
                            }}>{`Nhập mã OTP và nhập mật khẩu mới để lấy lại mật khẩu`}</Text>
                        <SizedBox height={20}></SizedBox>
                        <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
                            <OTPTextInput
                                inputCount={6}
                                autoFocus={true}
                                handleTextChange={text => {
                                    setOtp(text);
                                }}></OTPTextInput>
                        </View>
                        <SizedBox height={40}></SizedBox>
                        <Text>{`Mã xác thực (OTP) đã được gửi tới`}</Text>
                        <SizedBox height={5}></SizedBox>
                        <Text style={{ fontWeight: 'bold' }}>{`${phone_number}`}</Text>
                        <SizedBox height={40}></SizedBox>
                        <Text>
                            {`Bạn có thể yêu cầu mã mới ${countdown > 0 ? 'sau ' + countdown.toString() + 's' : ''
                                }`}
                        </Text>
                        <SizedBox height={10}></SizedBox>
                        <TouchableOpacity
                            onPress={() => {
                                if (countdown == 0) {
                                    console.log("phone_number123213")
                                    sendSms(phone_number);
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
                        <SizedBox height={10}></SizedBox>
                        <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
                            <ITextInput
                                icon={<LockIcon size={20} color={'grey'}></LockIcon>}
                                placeholder={'Mật khẩu'}
                                flatTextSecureEntry={flatTextSecureEntry}
                                onChange={v => {
                                    setPassword(v)
                                    //   setDataRegister({ ...dataRegister, password: v });
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
                        <SizedBox height={40}></SizedBox>
                        <IButton
                            text={'TIẾP TỤC'}
                            onPress={() => {
                                confirmResetPassword(phone_number, otp, otp_from, password)
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

export default OtpForgotPasswordScreen;
