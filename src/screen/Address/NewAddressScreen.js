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
import {useAddressStore} from '../../store/AddressStore';
import IButton from '../../components/IButton';

const NewAddressScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {callback, infoAddressCustomer} = route.params;
  const {
    nameEdit,
    phoneEdit,
    emailEdit,
    addressDetailEdit,
    locationProvince,
    locationDistrict,
    locationWard,
    isDefault,
    setDefault,
    setDistrict,
    setProvince,
    setWard,
    setNameEdit,
    setPhoneEdit,
    setEmailEdit,
    setAddressDetailEdit,
    createAddressCustomer,
    updateAddressCustomer,
  } = useAddressStore();

  useEffect(() => {
    setNameEdit('');
    setPhoneEdit('');
    setEmailEdit('');
    setAddressDetailEdit('');
    setProvince(null);
    setDistrict(null);
    setWard(null);
    if (infoAddressCustomer != null) {
      setNameEdit(infoAddressCustomer.name);
      setPhoneEdit(infoAddressCustomer.phone);
      setEmailEdit(infoAddressCustomer.email);
      setAddressDetailEdit(infoAddressCustomer.address_detail);
      setProvince({
        id: infoAddressCustomer.province,
        name: infoAddressCustomer.province_name,
      });
      setDistrict({
        id: infoAddressCustomer.district,
        name: infoAddressCustomer.district_name,
      });
      setWard({
        id: infoAddressCustomer.wards,
        name: infoAddressCustomer.wards_name,
      });
    }
  }, []);

  return (
    <Scaffold
      appbar={<IAppBar title={infoAddressCustomer ? 'Sửa địa chỉ' : 'Địa chỉ mới'}></IAppBar>}
      body={
        <ScrollView>
          <SizedBox width={windowWidth}></SizedBox>
          <Row paddingHorizontal={10}>
            <Text>Họ và tên</Text>
            <Text style={{color: 'red'}}>*</Text>
            <TextInput
              style={{paddingVertical: 20, flex: 1}}
              textAlign="right"
              value={nameEdit}
              onChangeText={setNameEdit}
              placeholder="Nhập họ và tên"></TextInput>
          </Row>
          <Divider></Divider>
          <Row paddingHorizontal={10}>
            <Text>Số điện thoại</Text>
            <Text style={{color: 'red'}}>*</Text>
            <TextInput
              style={{paddingVertical: 20, flex: 1}}
              textAlign="right"
              value={phoneEdit}
              onChangeText={setPhoneEdit}
              placeholder="Nhập số điện thoại"></TextInput>
          </Row>
          <Divider></Divider>
          <Row paddingHorizontal={10}>
            <Text>Email</Text>
            <TextInput
              style={{paddingVertical: 20, flex: 1}}
              textAlign="right"
              value={emailEdit}
              onChangeText={setEmailEdit}
              placeholder="Nhập email"></TextInput>
          </Row>
          <Divider></Divider>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CHOOSE_ADDRESS_API', {
                typeAddress: 'province',
                callback: location => {
                  setProvince(location);
                  setDistrict(null);
                  setWard(null);
                  navigation.goBack();
                },
              });
            }}>
            <Row
              paddingHorizontal={10}
              paddingVertical={20}
              mainAxisAlignment={'space-between'}>
              <Row>
                <Text>Tỉnh/Thành phố</Text>
                <Text style={{color: 'red'}}>*</Text>
              </Row>
              <Row>
                <Text>{`${
                  locationProvince?.name ?? 'Điền Tỉnh/Thành phố'
                }`}</Text>
                <SizedBox width={5}></SizedBox>
                <NextArrowIcon></NextArrowIcon>
              </Row>
            </Row>
          </TouchableOpacity>
          <Divider></Divider>
          <TouchableOpacity
            style={{opacity: locationProvince?.id ? 1 : 0.5}}
            onPress={() => {
              if (!locationProvince?.id) {
                return;
              }
              navigation.navigate('CHOOSE_ADDRESS_API', {
                typeAddress: 'district',
                idProvince: locationProvince?.id,
                callback: location => {
                  setDistrict(location);
                  setWard(null);
                  navigation.goBack();
                },
              });
            }}>
            <Row
              paddingHorizontal={10}
              paddingVertical={20}
              mainAxisAlignment={'space-between'}>
              <Row>
                <Text>Quận/Huyện</Text>
                <Text style={{color: 'red'}}>*</Text>
              </Row>
              <Row>
                <Text>{`${
                  locationDistrict?.name ?? 'Chưa chọn Quận/Huyện'
                }`}</Text>
                <SizedBox width={5}></SizedBox>
                <NextArrowIcon></NextArrowIcon>
              </Row>
            </Row>
          </TouchableOpacity>
          <Divider></Divider>
          <TouchableOpacity
            style={{opacity: locationDistrict?.id ? 1 : 0.5}}
            onPress={() => {
              if (!locationDistrict?.id) {
                return;
              }
              navigation.navigate('CHOOSE_ADDRESS_API', {
                typeAddress: 'ward',
                idDistrict: locationDistrict?.id,
                callback: location => {
                  setWard(location);
                  navigation.goBack();
                },
              });
            }}>
            <Row
              paddingHorizontal={10}
              paddingVertical={20}
              mainAxisAlignment={'space-between'}>
              <Row>
                <Text>Phường/Xã</Text>
                <Text style={{color: 'red'}}>*</Text>
              </Row>
              <Row>
                <Text>{`${locationWard?.name ?? 'Chưa chọn Phường/Xã'}`}</Text>
                <SizedBox width={5}></SizedBox>
                <NextArrowIcon></NextArrowIcon>
              </Row>
            </Row>
          </TouchableOpacity>
          <Divider></Divider>
          <Column paddingHorizontal={10} paddingVertical={20}>
            <Row>
              <Text>Địa chỉ cụ thể (Số nhà, tên đường, tên khu vực)</Text>
              <Text style={{color: 'red'}}>*</Text>
            </Row>
            <TextInput
              style={{paddingVertical: 20, flex: 1}}
              value={addressDetailEdit}
              onChangeText={setAddressDetailEdit}
              placeholder="Nhập địa chỉ cụ thể"></TextInput>
          </Column>
          <Container
            height={8}
            width={windowWidth}
            backgroundColor={'#EEEEEE'}></Container>
          <Row paddingHorizontal={10} paddingVertical={10}>
            <Text style={{flex: 1}}>Đặt làm địa chỉ mặc định</Text>
            <Switch value={isDefault} onValueChange={setDefault} />
          </Row>
          <Container
            height={8}
            width={windowWidth}
            backgroundColor={'#EEEEEE'}></Container>
        </ScrollView>
      }
      bottomNavigationBar={
        <Column flex={0} crossAxisAlignment={'center'}>
          <IButton
            text={'LƯU'}
            onPress={() => {
              if (infoAddressCustomer != null) {
                updateAddressCustomer(infoAddressCustomer.id);
              } else {
                createAddressCustomer();
              }
            }}></IButton>
          <SizedBox height={20}></SizedBox>
        </Column>
      }></Scaffold>
  );
});

export default NewAddressScreen;
