import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../store/DataAppStore';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import Row from '../../components/Row';
import SizedBox from '../../components/SizedBox';
import Container from '../../components/Container';
import {useCartStore} from '../../store/CartStore';
import Column from '../../components/Column';
import {convertToMoney, getDDMMYY} from '../../utils/apis/stringUtil';
import IButton from '../../components/IButton';
import IconCheck from '../../components/Icons/IconCheck';
import { Divider } from 'react-native-paper';

const PaymentScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge} = useDataAppStore();

  const {paymentMethodInput, callback} = route.params;

  const {
    listPaymentMethod,
    paymentMethodChoose,
    loadingPaymentMethod,
    getPaymentMethod,
    setPaymentMethodChoose,
  } = useCartStore();

  useEffect(() => {
    if (paymentMethodInput != null) {
      setPaymentMethodChoose(paymentMethodInput);
    }
    getPaymentMethod();
  }, []);

  return (
    <Scaffold
      appbar={<IAppBar title={'Chi tiết mã giảm giá'}></IAppBar>}
      body={
        loadingPaymentMethod ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <SizedBox width={windowWidth}></SizedBox>

            {(listPaymentMethod ?? []).map((item, index) => {
              return (
               <Column>
                <TouchableOpacity
                  onPress={() => {
                    setPaymentMethodChoose(item);
                  }}>
                  <Row paddingHorizontal={10}paddingVertical={20}>
                    <Column>
                      <Text style={{fontWeight: 500}}>{`${item?.name}`}</Text>
                      <SizedBox height={10}></SizedBox>
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'grey',
                        }}>{`${item?.description ?? ""}`}</Text>
                    </Column>
                    <SizedBox width={10}></SizedBox>
                    {paymentMethodChoose?.description == item?.description &&
                      paymentMethodChoose?.payment_method_id ==
                        item.payment_method_id && <IconCheck size={15} color={appTheme.color_main_1} ></IconCheck>}
                  </Row>
                </TouchableOpacity>
                <Divider></Divider>
               </Column>
              );
            })}
          </ScrollView>
        )
      }
      bottomNavigationBar={
        <Column flex={0} crossAxisAlignment={'center'}>
          <IButton
            text={'LƯU'}
            onPress={() => {
              if (loadingPaymentMethod || paymentMethodChoose == null) {
                return;
              }
              callback(paymentMethodChoose);
            }}></IButton>
          <SizedBox height={20}></SizedBox>
        </Column>
      }></Scaffold>
  );
});

export default PaymentScreen;
