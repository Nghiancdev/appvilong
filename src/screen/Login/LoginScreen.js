import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const LoginScreen = observer(({ route, navigation }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [flatTextSecureEntry, setFlatTextSecureEntry] = React.useState(true);
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const theme = useTheme();
  const { appTheme, isLogin, login, tokenDevice } = useDataAppStore();
  const [dataLogin, setDataLogin] = React.useState(null);


  const getToken = async () =>{
    var value = await AsyncStorage.getItem('tokenn')
    console.log("value", value)
     tokenDevice(value)
  }
  return (
    <Scaffold
      appbar={
        <IAppBar title={'Đăng nhập'} automaticallyImplyLeading={true}></IAppBar>
      }
      body={
        <View style={styles.container}>
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
                  icon={<PhoneIcon size={20}></PhoneIcon>}
                  placeholder={'Email hoặc số điện thoại'}
                  onChange={v => {
                    // console.log(v);
                    setDataLogin({ ...dataLogin, email_or_phone_number: v });
                  }}></ITextInput>
              </View>
              <SizedBox height={10}></SizedBox>
              <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
                <ITextInput
                  icon={<LockIcon size={20} color={'grey'}></LockIcon>}
                  placeholder={'Mật khẩu'}
                  flatTextSecureEntry={flatTextSecureEntry}
                  onChange={v => {
                    setDataLogin({ ...dataLogin, password: v });
                  }}
                  right={
                    <Row>
                      <IconButton
                        icon={flatTextSecureEntry ? 'eye' : 'eye-off'}
                        size={20}
                        onPress={() => {
                          setFlatTextSecureEntry(!flatTextSecureEntry);
                        }}></IconButton>
                      <Button
                        onPress={() => {
                          navigation.navigate("FORGOT_PASSWORD")
                        }}
                        style={{ margin: -10, fontSize: 13 }}
                        contentStyle={{ flexDirection: 'row-reverse' }}>
                        Quên
                      </Button>
                    </Row>
                  }></ITextInput>
              </View>

              <SizedBox height={20}></SizedBox>
              <IButton
                text={'Đăng nhập'}
                onPress={async () => {
                  let check = await login(
                    dataLogin.email_or_phone_number,
                    dataLogin.password,
                  );
                  console.log("check", check)
                  if (check === true) {
                     await getToken()  
                  // console.log("TokenDevicee",  getToken()  )
                  await navigation.goBack();
                   await tokenDevice(token)
                  }
                }}></IButton>
              <Button
                onPress={() => {
                  //console.log('navigation', navigation);
                  navigation.navigate('REGISTER');
                }}
                style={{ margin: 4, fontSize: 13 }}
                contentStyle={{ flexDirection: 'row-reverse' }}>
                Đăng ký
              </Button>
            </Column>
          </ScrollView>
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

export default LoginScreen;
