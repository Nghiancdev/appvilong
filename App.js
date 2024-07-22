import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  ActivityIndicator,
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';

import {configure} from 'mobx';

// Tắt cảnh báo strict mode trong MobX
configure({enforceActions: 'never'});

const CombinedDefaultTheme = merge(NavigationDefaultTheme, PaperDefaultTheme);
const CombinedDarkTheme = merge(NavigationDarkTheme, PaperDarkTheme);
import Navigation from './src/navigation';
import UserUtil from './src/utils/apis/userUtil';
import {SplashScreen} from './src/screen/SplashScreen';
import {useDataAppStore} from './src/store/DataAppStore';
import {useRegisterStore} from './src/store/RegisterStore';
import StoreCode from './src/singletons/StoreCode';
import Toast from 'react-native-toast-message';
import {socket} from './src/socket/socket';
import {fcmService} from './src/fcm/FCMService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const theme = true ? CombinedDarkTheme : CombinedDefaultTheme;

  const [loading, setLoading] = useState(true);
  // const {tokenDevice} = useRegisterStore();
  const {initData} = useDataAppStore();

  useEffect(() => {
    StoreCode.setStoreCode('vilong');
    StoreCode.setStoreName('Vĩ Long');
    loadApp();

    socket.connect();
    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.on('disconnect', () => {
      console.log('socket has been disconnected...');
    });
    codePush.sync(
      {installMode: codePush.InstallMode.IMMEDIATE},
      codePushStatusCallback,
    );
  }, []);

  // @ts-ignore
  const codePushStatusCallback = status => {
    link.ủ;
    if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
      console.log('CodePush Update Installed!');
    }
  };

  const hanđle = async () => {
    let tokenDeviceaa = await AsyncStorage.getItem('tokenn');
    // @ts-ignore
    tokenDevice(tokenDeviceaa);
  };

  const loadApp = async () => {
    console.log('loadApp');
    setLoading(true);
    fcmService.registerAppWithFCM();
    fcmService.requestPermission();
    fcmService.register();
    await UserUtil.init();
    await initData();

    //sửa
    console.log('TOken login', await AsyncStorage.getItem('token'));
    console.log('TOkensssss', await AsyncStorage.getItem('tokenn'));
    // hanđle();
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <PaperProvider>
          <SafeAreaProvider>
            <Navigation theme={theme} />
            <StatusBar style={true ? 'light' : 'dark'} />
          </SafeAreaProvider>
        </PaperProvider>
      )}
      <Toast visibilityTime={1500} />
    </>
  );
};

export default codePush(App);
