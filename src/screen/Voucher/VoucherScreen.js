import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Pressable,
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

const VoucherScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge} = useDataAppStore();

  const {voucherCodeChooseInput} = route.params ?? {};

  const {
    listVoucher,
    voucherCodeChooseVoucher,
    loadingVoucher,
    setVoucherCodeChooseVoucher,
    getVoucherCustomer,
    checkConditionVoucher,
    codeVoucherEdit,
    setCodeVoucherEdit,
  } = useCartStore();
  console.log("voucherCodeChooseVoucher", voucherCodeChooseVoucher)
  useEffect(() => {
    if (voucherCodeChooseInput != null) {
      setVoucherCodeChooseVoucher(voucherCodeChooseInput);
    }
    getVoucherCustomer();
  }, []);

  return (
    <Scaffold
      appbar={<IAppBar title={'Chi tiết mã giảm giá'}></IAppBar>}
      body={
        <Column>
          <Row marginHorizontal={10}>
            <Container
              borderRadius={3}
              borderColor={'#e0e0e0'}
              flex={1}
              child={
                <TextInput
                  placeholder="Nhập mã vận chyển"
                  style={{padding: 10}}
                  value={codeVoucherEdit}
                  onChangeText={text => {
                    setCodeVoucherEdit(text);
                  }}></TextInput>
              }></Container>
            <SizedBox width={10}></SizedBox>
            <TouchableOpacity
              onPress={() => {
                setVoucherCodeChooseVoucher(codeVoucherEdit);
                if (loadingVoucher || voucherCodeChooseVoucher == null) {
                  return;
                }
                checkConditionVoucher();
              }}>
              <Container
                backgroundColor={appTheme.color_main_1}
                borderRadius={3}
                child={
                  <Text style={{color: 'white', padding: 10}}>Áp dụng</Text>
                }></Container>
            </TouchableOpacity>
          </Row>
          {loadingVoucher ? (
            <ActivityIndicator />
          ) : (
            <ScrollView>
              <SizedBox width={windowWidth}></SizedBox>
              {(listVoucher ?? []).map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setVoucherCodeChooseVoucher(item?.code);
                    }}>
                    <Container
                      margin={10}
                      borderColor={'#e0e0e0'}
                      child={
                        <Row>
                          <View
                            style={{
                              position: 'relative',
                              flexDirection: 'column',
                              width: 100,
                              height: 100,

                              justifyContent: 'center',
                              backgroundColor: appTheme.color_main_1,
                              paddingHorizontal: 10,
                            }}>
                            {item?.discount_for == 1 ? (
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: 'white',
                                }}>
                                Miễn phí vận chuyển
                              </Text>
                            ) : item?.voucher_type == 1 ? (
                              item?.discount_type == 1 ? (
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 12,
                                    color: 'white',
                                  }}>{`Mã: ${item?.code} giảm ${item.value_discount} %`}</Text>
                              ) : (
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 12,
                                    color: 'white',
                                  }}>{`Mã: ${item?.code} giảm ${convertToMoney(
                                  item?.value_discount,
                                )}đ`}</Text>
                              )
                            ) : item?.discount_type == 1 ? (
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: 'white',
                                }}>{`Mã: ${item?.code} giảm ${item?.value_discount} %`}</Text>
                            ) : (
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: 'white',
                                }}>{`Mã: ${item?.code} giảm ${convertToMoney(
                                item?.value_discount,
                              )}đ`}</Text>
                            )}
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 1000,
                                backgroundColor: 'white',
                                position: 'absolute',
                                top: 14,
                                left: -6,
                              }}></View>
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 1000,
                                backgroundColor: 'white',
                                position: 'absolute',
                                top: 34,
                                left: -6,
                              }}></View>
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 1000,
                                backgroundColor: 'white',
                                position: 'absolute',
                                top: 54,
                                left: -6,
                              }}></View>
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 1000,
                                backgroundColor: 'white',
                                position: 'absolute',
                                top: 74,
                                left: -6,
                              }}></View>
                          </View>
                          <SizedBox width={10}></SizedBox>
                          <Column flex={1}>
                            <Text
                              style={{fontSize: 14}}>{`${item?.name}`}</Text>
                            <SizedBox height={5}></SizedBox>
                            {(item?.ship_discount_value ?? 0) != 0 && (
                              <Text style={{fontSize: 12}}>
                                {`Tối đa: ${convertToMoney(
                                  item?.ship_discount_value ?? 0,
                                )}`}
                              </Text>
                            )}
                            <SizedBox height={5}></SizedBox>
                            {item?.voucher_type == 1 ? (
                              <Text style={{fontSize: 12}}>
                                Giảm giá cho các sản phẩm sau:
                              </Text>
                            ) : (
                              <Text style={{fontSize: 12}}>
                                Giảm giá cho toàn bộ các sản phẩm
                              </Text>
                            )}
                            <SizedBox height={5}></SizedBox>
                            {item?.voucher_type == 1 && (
                              <Text style={{fontSize: 12}}>{`${
                                item?.products[0].name ?? ''
                              }, vv...`}</Text>
                            )}
                            <SizedBox height={5}></SizedBox>
                            <Row mainAxisAlignment={'space-between'}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'grey',
                                }}>{`HSD: ${getDDMMYY(item?.end_time)}`}</Text>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate('CONDITION_VOUCHER', {
                                    voucher: item,
                                  });
                                }}>
                                <Text style={{color: 'red'}}>Điều kiện</Text>
                              </TouchableOpacity>
                            </Row>
                          </Column>
                          <SizedBox width={10}></SizedBox>
                          <View
                            style={{
                              position: 'relative',
                              width: 20,
                              height: 20,
                              borderRadius: 1000,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: appTheme.color_main_1,
                              borderWidth: 1,
                              backgroundColor: 'white',
                            }}>
                            {voucherCodeChooseVoucher == item?.code && (
                              <Pressable
                                onPress={() => 
                                  setVoucherCodeChooseVoucher('')
                                }
                                style={{
                                  width: 10,
                                  height: 10,
                                  backgroundColor: appTheme.color_main_1,
                                  borderRadius: 1000,
                                }}></Pressable>
                            )}
                          </View>
                          <SizedBox width={10}></SizedBox>
                        </Row>
                      }></Container>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </Column>
      }
      bottomNavigationBar={
        <Column flex={0} crossAxisAlignment={'center'}>
          <IButton
            text={'LƯU'}
            onPress={() => {
              if (loadingVoucher || voucherCodeChooseVoucher == "") {
                // return;
                checkConditionVoucher();
              } else {
                checkConditionVoucher();
              }
            }}></IButton>
          <SizedBox height={20}></SizedBox>
        </Column>
      }></Scaffold>
  );
});

export default VoucherScreen;
