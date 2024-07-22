import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  FlatList,
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
import {convertToMoney} from '../../utils/apis/stringUtil';
import LocationIcon from '../../components/Icons/LocationIcon';
import NextArrowIcon from '../../components/Icons/NextArrowIcon';
import Expanded from '../../components/Expanded';
import CartIcon from '../../components/Icons/CartIcon';
import ImageIKI from '../../components/ImageIKI';
import {Divider, Switch} from 'react-native-paper';
import ReceiptIcon from '../../components/Icons/ReceiptIcon';
import MoneyIcon from '../../components/Icons/MoneyIcon';
import BillIcon from '../../components/Icons/BillIcon';
import AgencyIcon from '../../components/Icons/AgencyIcon';
import DocIcon from '../../components/Icons/DocIcon';
import StoreCode from '../../singletons/StoreCode';
import IconCheck from '../../components/Icons/IconCheck';
import PinIcon from '../../components/Icons/PinIcon';
import {useFocusEffect} from '@react-navigation/native';

const AddressScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge} = useDataAppStore();

  const {listInfoAddressCustomer, getAllAddressCustomerReceiver} =
    useCartStore();


  useEffect(() => {
    getAllAddressCustomerReceiver();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllAddressCustomerReceiver();
    }, []),
  );

  const itemAddress = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NEW_ADDRESS', {infoAddressCustomer: item});
        }}>
        <Column>
          <Container
            padding={10}
            child={
              <Row>
                <Column flex={1}>
                  <Text>{`${
                    listInfoAddressCustomer[index].name ?? 'Chưa có tên'
                  }`}</Text>
                  <SizedBox height={5}></SizedBox>
                  <Text>{`${
                    listInfoAddressCustomer[index].email ?? 'Chưa có email'
                  }`}</Text>
                  <Text>{`${
                    listInfoAddressCustomer[index].phone ??
                    'Chưa có số điện thoại'
                  }`}</Text>
                  <SizedBox height={5}></SizedBox>
                  <Text>{`${
                    listInfoAddressCustomer[index].address_detail ??
                    'Chưa có địa chỉ chi tiết'
                  }`}</Text>
                  <SizedBox height={5}></SizedBox>
                  <Text>{`${
                    listInfoAddressCustomer[index].district_name ??
                    'Chưa có Quận/Huyện'
                  }, ${
                    listInfoAddressCustomer[index].wards_name ??
                    'Chưa có Phường/Xã'
                  }, ${
                    listInfoAddressCustomer[index].province_name ??
                    'Chưa có Tỉnh/Thành phố'
                  }`}</Text>
                </Column>
                <SizedBox width={10}></SizedBox>
                <Column flex={0}>
                  <PinIcon
                    size={18}
                    color={
                      listInfoAddressCustomer[index].is_default == true
                        ? appTheme.color_main_1
                        : 'grey'
                    }></PinIcon>
                </Column>
              </Row>
            }></Container>
          <Container
            height={8}
            width={windowWidth}
            backgroundColor={'#EEEEEE'}></Container>
        </Column>
      </TouchableOpacity>
    );
  };

  return (
    <Scaffold
      appbar={<IAppBar title={'Địa chỉ của tôi'}></IAppBar>}
      body={
        <ScrollView>
          {listInfoAddressCustomer.map((item, index) => {
            return itemAddress(item, index);
          })}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NEW_ADDRESS',{});
            }}>
            <Row
              padding={15}
              mainAxisAlignment={'space-between'}
              crossAxisAlignment="center">
              <Text>Thêm địa chỉ mới</Text>
              <Text style={{fontSize: 18}}>+</Text>
            </Row>
          </TouchableOpacity>
          <Container
            height={8}
            width={windowWidth}
            backgroundColor={'#EEEEEE'}></Container>
        </ScrollView>
      }></Scaffold>
  );
});

export default AddressScreen;
