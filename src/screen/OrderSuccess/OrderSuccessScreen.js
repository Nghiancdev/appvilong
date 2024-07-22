import React, {useEffect, useRef} from 'react';
import {Text, Dimensions, Linking, Alert, AppState} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../store/DataAppStore';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import Row from '../../components/Row';
import SizedBox from '../../components/SizedBox';
import Column from '../../components/Column';
import IButton from '../../components/IButton';
import SuccessIcon from '../../components/Icons/SuccessIcon';
import {observer} from 'mobx-react-lite';
import {convertToMoney} from '../../utils/apis/stringUtil';
import {Dropdown} from 'react-native-element-dropdown';
import {ca} from 'date-fns/locale';
import {RepoManager} from '../../services';
import StoreCode from '../../singletons/StoreCode';
import {useFocusEffect} from '@react-navigation/native';

const OrderSuccessScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [value, setValue] = React.useState('');
  const [isFocus, setIsFocus] = React.useState(false);
  const [paymentMethods, setPaymentMethods] = React.useState([]); // [{label: 'a', value: '1'}
  const {appTheme, badge} = useDataAppStore();
  const appState = useRef(AppState.currentState);
  const {order} = route.params;
  const [orderShow, setOrderShow] = React.useState(order);

  useEffect(() => {
    getPaymentMethod();
    getOneOrder();
  }, []);

  useEffect(() => {
    if (value !== '' && paymentMethods?.length > 0) {
      changePaymentMethod();
    }
  }, [value]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        getOneOrder();
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const getPaymentMethod = async () => {
    try {
      const res = await RepoManager.cart.getPaymentMethod();
      setPaymentMethods(res.data?.data);
      setValue(
        res.data?.data?.filter(
          item =>
            item?.id === orderShow?.payment_partner_id &&
            item?.payment_method_id == orderShow?.payment_method_id,
        )[0]?.id,
      );
      getOneOrder();
    } catch (error) {
      console.log('error', error);
    }
  };

  const changePaymentMethod = async () => {
    try {
      const res = await RepoManager.cart.changePaymentMethod(
        order?.order_code,
        {
          payment_method_id: paymentMethods.filter(item => item.id === value)[0]
            ?.payment_method_id,
          payment_partner_id: value,
        },
      );
      getOneOrder();
    } catch (error) {
      console.log('error', error);
    }
  };

  const getOneOrder = async () => {
    try {
      const res = await RepoManager.order.getOneOrder(order?.order_code);
      setOrderShow(res.data?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePress = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Trang không tồn tại: ${url}`);
    }
  };

  return (
    <Scaffold
      appbar={<IAppBar title={''}></IAppBar>}
      body={
        <Column mainAxisAlignment={'center'} crossAxisAlignment={'center'}>
          <SuccessIcon></SuccessIcon>
          <SizedBox height={30} width={windowWidth}></SizedBox>
          <Text style={{fontSize: 25}}>Đặt hàng thành công</Text>
          <SizedBox height={30}></SizedBox>
          <Column flex={0} width={windowWidth} padding={10}>
            <Row mainAxisAlignment={'space-between'} padding={10}>
              <Text>Mã đơn hàng</Text>
              <Text>{`${orderShow?.order_code}`}</Text>
            </Row>

            <Row mainAxisAlignment={'space-between'} padding={10}>
              <Text>Tổng thanh toán</Text>
              <Text>{`${convertToMoney(orderShow?.total_final)}`}</Text>
            </Row>
            <Row mainAxisAlignment={'space-between'} padding={10}>
              <Text>Trạng thái đơn hàng</Text>
              <Text>{`${orderShow?.order_status_name}`}</Text>
            </Row>
            <Row mainAxisAlignment={'space-between'} padding={10}>
              <Text>Trạng thái thanh toán</Text>
              <Text>{`${orderShow?.payment_status_name}`}</Text>
            </Row>
            <Row mainAxisAlignment={'space-between'} padding={10}>
              <Text
                style={{
                  fontSize: 16,
                  color: appTheme.color_main_1,
                  fontWeight: 500,
                }}>
                Phương thức thanh toán:
              </Text>
            </Row>
            <Dropdown
              style={[
                {
                  height: 50,
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  marginHorizontal: 10,
                },
                isFocus && {borderColor: 'blue'},
              ]}
              data={paymentMethods.map(item => ({
                label: item.name,
                payment_method_id: item.payment_method_id,
                value: item.id,
              }))}
              search={false}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? `${orderShow?.payment_partner_name}` : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              // renderLeftIcon={() => (
              //   <Keyba
              //     style={styles.icon}
              //     color={isFocus ? 'blue' : 'black'}
              //     name="Safety"
              //     size={20}
              //   />
              // )}
            />
          </Column>
          <SizedBox height={10}></SizedBox>
          {orderShow?.payment_method_id == 2 || orderShow?.payment_method_id == null ? (
            <></>
          ) : (
            <IButton
              text={'THANH TOÁN NGAY'}
              width={windowWidth - 50}
              onPress={() => {
                handlePress(
                  `https://main.doapp.vn/api/customer/${StoreCode.getStoreCode()}/purchase/pay/${
                    orderShow.order_code
                  }`,
                );
              }}></IButton>
          )}
          <SizedBox height={30}></SizedBox>
          <IButton
            text={'TIẾP TỤC MUA SẮM'}
            width={windowWidth - 50}
            onPress={() => {
              navigation.goBack();
              navigation.goBack();
              navigation.navigate('Home');
            }}></IButton>
        </Column>
      }></Scaffold>
  );
});

export default OrderSuccessScreen;
