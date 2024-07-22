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
import LocationIcon from '../../components/Icons/LocationIcon';
import {create} from 'react-test-renderer';

const ConfirmScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge} = useDataAppStore();

  const {
    infoAddressCustomer,
    cartData,
    listOrder,
    shipmentMethodCurrent,
    voucherCodeChoose,
    paymentMethodName,
    paymentPartnerId,
    paymentMethodId,
    isExportBill,
    balanceAgencyCanUse,
    balanceCollaboratorCanUse,
    isUseBalanceCollaborator,
    isUseBalanceAgency,
    loading,
    initDefaultPaymentMethod,
    getAllAddressCustomer,
    onToggleSwitch,
    onToggleSwitchBalance,
    addVoucherCart,
    getListShipper,
    setInfoAddressCustomer,
    getItemCart,
    setShipmentMethodCurrent,
    setPaymentMethodId,
    setPaymentPartnerId,
    setPaymentMethodName,
    createOrders,
    setCompanyAddress,
    setCompanyName,
    setCompanyEmail,
    setTaxCode,
    setNoteCustomerEdit,
    onToggleSwitchBalanceCTV,
  } = useCartStore();

  useEffect(() => {
    initDefaultPaymentMethod();
    getAllAddressCustomer();
  }, []);

  const itemAddress = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ADDRESS_RECEIVER', {
            infoAddressCustomers: infoAddressCustomer,
            callback: item => {
              navigation.goBack();
              setInfoAddressCustomer(item);
              getListShipper(item.id);
            },
          });
        }}>
        {infoAddressCustomer?.id == null ? (
          <View
            style={{
              padding: 10,
              margin: 10,
              borderRadius: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.09,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: 'white',
            }}>
            <Row flex={0}>
              <LocationIcon
                color={appTheme?.color_main_1}
                size={20}></LocationIcon>
              <SizedBox width={10}></SizedBox>
              <Column flex={1}>
                <Text style={{fontSize: 13}}>Địa chỉ nhận hàng:</Text>
                <SizedBox height={5}></SizedBox>
                <Text style={{fontSize: 13}}>
                  Chưa chọn địa chỉ nhận hàng (nhấn để chọn)
                </Text>
              </Column>
              <NextArrowIcon></NextArrowIcon>
            </Row>
          </View>
        ) : (
          <View
            style={{
              padding: 10,
              margin: 10,
              borderRadius: 5,
              paddingRight: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.09,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: 'white',
            }}>
            <Row mainAxisAlignment={'space-between'}>
              <Row>
                <LocationIcon></LocationIcon>
                <SizedBox width={10}></SizedBox>
                <Column>
                  <Text>Địa chỉ nhận hàng:</Text>
                  <Text>{`${infoAddressCustomer?.name ?? 'Chưa có tên'}  | ${
                    infoAddressCustomer?.phone ?? 'Chưa có số điện thoại'
                  }`}</Text>
                  {(infoAddressCustomer?.email ?? '') != '' && (
                    <Text>{`${
                      infoAddressCustomer?.email ?? 'Chưa có Email'
                    }`}</Text>
                  )}
                  <Text>{`${
                    infoAddressCustomer?.address_detail ??
                    'Chưa có địa chỉ chi tiết'
                  }`}</Text>
                  <Text style={{color: 'grey', fontSize: 12}}>{`${
                    infoAddressCustomer?.wards_name ?? 'Chưa có Phường/Xã'
                  }, ${
                    infoAddressCustomer?.district_name ?? 'Chưa có Quận/Huyện'
                  }, ${
                    infoAddressCustomer?.province_name ??
                    'Chưa có Tỉnh/Thành phố'
                  }`}</Text>
                </Column>
              </Row>
              <NextArrowIcon></NextArrowIcon>
            </Row>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const itemProduct = lineItem => {
    return (
      <Column>
        <Container
          padding={10}
          child={
            <Row>
              <ImageIKI
                style={{
                  width: 80,
                  height: 80,
                  padding: 2,
                  borderRadius: 5,
                  position: 'relative',
                }}
                uri={
                  (lineItem.product?.images ?? []).length == 0
                    ? ''
                    : lineItem.product?.images[0].image_url
                }></ImageIKI>
              <SizedBox width={10}></SizedBox>
              <Column flex={1}>
                <Text numberOfLines={2}>
                  {`${lineItem.product?.name ?? 'Lỗi sản phẩm'}`}
                </Text>
                {lineItem.distributes_selected != null &&
                  (lineItem.distributes_selected ?? []).length != 0 && (
                    <SizedBox height={5}></SizedBox>
                  )}
                {lineItem.distributes_selected != null &&
                  (lineItem.distributes_selected ?? []).length != 0 && (
                    <Text style={{fontSize: 12, color: 'grey'}}>{`Phân loại: ${
                      lineItem.distributes_selected[0].value ?? ''
                    }${
                      lineItem.distributes_selected[0].subElement == null
                        ? ''
                        : ','
                    } ${
                      lineItem.distributes_selected[0]
                        .sub_element_distributes ?? ''
                    }`}</Text>
                  )}
                <SizedBox height={5}></SizedBox>
                <Row mainAxisAlignment={'space-between'}>
                  <Text
                    style={{
                      color: appTheme.color_main_1,
                      fontWeight: '500',
                    }}>{`${convertToMoney(lineItem.item_price)}`}</Text>
                  <Text>{` x${lineItem.quantity}   `}</Text>
                </Row>
              </Column>
            </Row>
          }></Container>
        <Divider></Divider>
      </Column>
    );
  };

  const itemShipping = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SHIPMENT', {
            idAddressCustomer: infoAddressCustomer?.id,
            shipmentMethodInput: shipmentMethodCurrent,
            callback: shipmentMethod => {
              console.log('item', shipmentMethod);
              setShipmentMethodCurrent(shipmentMethod);
              getItemCart();
              navigation.goBack();
            },
          });
        }}>
        <Container
          padding={10}
          borderColor={'green'}
          child={
            <Column>
              <Text style={{fontWeight: '500', color: 'green'}}>
                Đơn vị vận chuyển ( Nhấn để chọn )
              </Text>
              <SizedBox height={10}></SizedBox>
              <Divider></Divider>
              <SizedBox height={10}></SizedBox>
              <Row>
                <Column flex={1}>
                  <Text
                    style={{
                      fontWeight: '500',
                    }}>{`${shipmentMethodCurrent?.name}`}</Text>
                  <SizedBox height={5}></SizedBox>
                  <Text style={{fontSize: 13}}>{`${
                    shipmentMethodCurrent?.description ??
                    'Chưa chọn đơn vị vẩn chuyển'
                  } (Tạm tính)`}</Text>
                  <SizedBox height={5}></SizedBox>
                  <Text style={{fontSize: 13, color: 'grey'}}>
                    Nhận hàng sau 1 - 2 ngày nội thành
                  </Text>
                </Column>
                <Text>{`${convertToMoney(shipmentMethodCurrent?.fee)}đ`}</Text>
                <NextArrowIcon></NextArrowIcon>
              </Row>
            </Column>
          }></Container>
      </TouchableOpacity>
    );
  };

  const itemPayment = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PAYMENT', {
            paymentMethodInput: {
              name: paymentMethodName,
              id: paymentPartnerId,
              payment_method_id: paymentMethodId,
            },
            callback: paymentMethod => {
              setPaymentMethodName(paymentMethod?.name);
              setPaymentPartnerId(paymentMethod?.id);
              setPaymentMethodId(paymentMethod?.payment_method_id);
              navigation.goBack();
            },
          });
        }}>
        <Container
          paddingHorizontal={10}
          paddingVertical={20}
          child={
            <Row mainAxisAlignment={'space-between'}>
              <Row flex={6}>
                <MoneyIcon color={appTheme.color_main_1}></MoneyIcon>
                <SizedBox width={10}></SizedBox>
                <Text style={{fontSize: 13}}>Phương thức thanh toán</Text>
              </Row>
              <Row flex={4} mainAxisAlignment={'flex-end'}>
                {paymentMethodName == '' ? (
                  <Text style={{fontSize: 13, color: appTheme.color_main_1}}>
                    Chọn phương thức thanh toán
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 13,
                      color: appTheme.color_main_1,
                    }}>{`${paymentMethodName}`}</Text>
                )}
                <NextArrowIcon></NextArrowIcon>
              </Row>
            </Row>
          }></Container>
      </TouchableOpacity>
    );
  };

  const itemBill = () => {
    return (
      <Column>
        <Row padding={10}>
          <BillIcon color={appTheme.color_main_1}></BillIcon>
          <SizedBox width={10}></SizedBox>
          <Text>Xuất hoá đơn công ty</Text>
          <View style={{flex: 1}}></View>
          <Switch value={isExportBill} onValueChange={onToggleSwitch} />
        </Row>
        {isExportBill && (
          <Column>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập tên công ty"
              onChangeText={setCompanyName}></TextInput>
            <Divider></Divider>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập mã số thuế"
              onChangeText={setTaxCode}></TextInput>
            <Divider></Divider>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập địa chỉ công ty"
              onChangeText={setCompanyAddress}></TextInput>
            <Divider></Divider>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập email nhận hoá đơn"
              onChangeText={setCompanyEmail}></TextInput>
            <Divider></Divider>
          </Column>
        )}
      </Column>
    );
  };

  const itemAgency = () => {
    return (
      balanceAgencyCanUse > 0 && (
        <Container
          padding={10}
          child={
            <Row>
              <AgencyIcon></AgencyIcon>
              <SizedBox width={10}></SizedBox>
              <Text>Dùng số dư đại lý</Text>
              <View style={{flex: 1}}></View>
              <Text>{`[-${convertToMoney(balanceAgencyCanUse)}₫] `}</Text>
              <Switch
                value={isUseBalanceAgency}
                onValueChange={onToggleSwitchBalance}
              />
            </Row>
          }></Container>
      )
    );
  };

  const itemCtv = () => {
    return (
      balanceCollaboratorCanUse > 0 && (
        <Container
          padding={10}
          child={
            <Row>
              <AgencyIcon></AgencyIcon>
              <SizedBox width={10}></SizedBox>
              <Text>Dùng số dư cộng tác viên</Text>
              <View style={{flex: 1}}></View>
              <Text>{`[-${convertToMoney(balanceCollaboratorCanUse)}₫] `}</Text>
              <Switch
                value={isUseBalanceCollaborator}
                onValueChange={onToggleSwitchBalanceCTV}
              />
            </Row>
          }></Container>
      )
    );
  };

  const itemOrdered = () => {
    return (
      <>
        {badge.status_agency == 1 && (
          <Row padding={10}>
            <MoneyIcon color={appTheme.color_main_1}></MoneyIcon>
            <SizedBox width={10}></SizedBox>
            <Text>Đặt hộ</Text>
            <View style={{flex: 1}}></View>
            <Switch
              value={cartData.is_order_for_customer}
              onValueChange={() => {
                cartData.is_order_for_customer = !(
                  cartData.is_order_for_customer ?? false
                );
                addVoucherCart(voucherCodeChoose, () => {});
              }}
            />
          </Row>
        )}
      </>
    );
  };

  const itemPoint = () => {
    return (
      <>
        {badge.allow_use_point_order == true &&
          cartData.total_points_can_use != 0 &&
          cartData.total_points_can_use != null && (
            <Row padding={10}>
              <MoneyIcon color={appTheme.color_main_1}></MoneyIcon>
              <SizedBox width={10}></SizedBox>
              <Text>{`Dùng ${convertToMoney(
                cartData.total_points_can_use,
              )} xu`}</Text>
              <View style={{flex: 1}}></View>
              <Text>{`[-${convertToMoney(
                cartData.bonus_points_amount_used ?? 0,
              )}₫] `}</Text>
              <Switch
                value={cartData.is_use_points}
                onValueChange={() => {
                  cartData.is_use_points = !(cartData.is_use_points ?? false);
                  addVoucherCart(voucherCodeChoose, () => {});
                }}
              />
            </Row>
          )}
      </>
    );
  };

  const allCaculate = () => {
    return (
      <Column>
        <Row mainAxisAlignment={'space-between'} padding={10}>
          <Text>Tạm tính:</Text>
          <Text>{`${convertToMoney(
            cartData.total_before_discount ?? 0,
          )}`}</Text>
        </Row>
        {cartData.product_discount_amount != 0 && (
          <Row mainAxisAlignment={'space-between'} padding={10}>
            <Text>Giảm giá sản phẩm:</Text>
            <Text>{`- ${convertToMoney(
              cartData.product_discount_amount,
            )}`}</Text>
          </Row>
        )}
        {cartData.combo_discount_amount != 0 && (
          <Row mainAxisAlignment={'space-between'} padding={10}>
            <Text>Giảm giá combo:</Text>
            <Text>{`- ${convertToMoney(cartData.combo_discount_amount)}`}</Text>
          </Row>
        )}
        {cartData.voucher_discount_amount != 0 && (
          <Row mainAxisAlignment={'space-between'} padding={10}>
            <Text>Giảm giá voucher:</Text>
            <Text>{`- ${convertToMoney(
              cartData.voucher_discount_amount,
            )}`}</Text>
          </Row>
        )}
        {cartData.is_use_points == true && (
          <Row mainAxisAlignment={'space-between'} padding={10}>
            <Text>Giảm giá Xu:</Text>
            <Text>{`- ${convertToMoney(
              cartData.bonus_points_amount_used,
            )}`}</Text>
          </Row>
        )}
        <Divider></Divider>
        <Row mainAxisAlignment={'space-between'} padding={10}>
          <Text>Tổng tiền hàng:</Text>
          <Text>{`${convertToMoney(cartData.total_after_discount)}`}</Text>
        </Row>
        {cartData.vat != null && cartData.vat != 0 && (
          <Row mainAxisAlignment={'space-between'} padding={10}>
            <Text>VAT:</Text>
            <Text>{`${convertToMoney(cartData.vat)}`}</Text>
          </Row>
        )}
        <Row mainAxisAlignment={'space-between'} padding={10}>
          <Text>Tổng tiền vận chuyển:</Text>
          <Text>{`+ ${convertToMoney(shipmentMethodCurrent.fee)}`}</Text>
        </Row>
        {(cartData.ship_discount_amount ?? 0) != 0 && (
          <Row mainAxisAlignment={'space-between'} padding={10}>
            <Text>Tổng tiền vận chuyển:</Text>
            <Text>{`+ ${convertToMoney(cartData.ship_discount_amount)}`}</Text>
          </Row>
        )}

        {badge.status_agency == 1 && (
          <Row mainAxisAlignment={'space-between'} padding={10}>
            <Text>Tiền hoa hồng đặt hộ:</Text>
            <Text>{`+ ${convertToMoney(
              cartData.total_commission_order_for_customer,
            )}`}</Text>
          </Row>
        )}
        <Row mainAxisAlignment={'space-between'} padding={10}>
          <Text style={{color: 'red', fontWeight: 500}}>Tổng thanh toán:</Text>
          <Text style={{color: 'red', fontWeight: 500}}>{`${convertToMoney(
            cartData.total_final,
          )}`}</Text>
        </Row>
      </Column>
    );
  };

  return (
    <Scaffold
      appbar={<IAppBar title={'Giỏ hàng'}></IAppBar>}
      body={
        <ScrollView>
          <Column width={windowWidth}>
            {itemAddress()}
            <Container
              paddingVertical={20}
              paddingHorizontal={10}
              child={
                <Row>
                  <CartIcon color={appTheme.color_main_1}></CartIcon>
                  <SizedBox width={10}></SizedBox>
                  <Text style={{fontWeight: '500'}}>Các mặt hàng đã đặt:</Text>
                </Row>
              }></Container>
            {(listOrder ?? []).map((item, index) => {
              return itemProduct(item);
            })}
            {itemShipping()}
            <Container
              paddingVertical={20}
              paddingHorizontal={10}
              child={
                <Row mainAxisAlignment={'space-between'}>
                  <Text
                    style={{
                      fontWeight: 500,
                    }}>{`Tổng số tiền (${listOrder.length} sản phẩm): `}</Text>
                  <Text>{`${convertToMoney(
                    cartData.total_before_discount ?? 0,
                  )}`}</Text>
                </Row>
              }></Container>
            <Container
              height={8}
              width={windowWidth}
              backgroundColor={'#EEEEEE'}></Container>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('VOUCHER', {
                  // callback: item => {
                  //   navigation.goBack();
                  // },
                });
              }}>
              <Container
                padding={10}
                paddingVertical={20}
                child={
                  <Row mainAxisAlignment={'space-between'}>
                    <Row>
                      <ReceiptIcon color={appTheme.color_main_1}></ReceiptIcon>
                      <SizedBox width={10}></SizedBox>
                      <Text>Shop Voucher: </Text>
                    </Row>
                    <Row>
                      {voucherCodeChoose == '' ? (
                        <Text>Chọn hoặc nhập mã</Text>
                      ) : (
                        <Text>{`Mã: ${voucherCodeChoose}`}</Text>
                      )}
                      <SizedBox width={10}></SizedBox>
                      <NextArrowIcon></NextArrowIcon>
                    </Row>
                  </Row>
                }></Container>
            </TouchableOpacity>
            <Container
              height={8}
              width={windowWidth}
              backgroundColor={'#EEEEEE'}></Container>
            {itemPayment()}
            <Container
              height={8}
              width={windowWidth}
              backgroundColor={'#EEEEEE'}></Container>
            {itemBill()}
            {itemAgency()}
            {itemCtv()}
            {itemOrdered()}
            {itemPoint()}
            {allCaculate()}
            <Container
              height={8}
              width={windowWidth}
              backgroundColor={'#EEEEEE'}></Container>
            <View
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 5,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.09,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: 'white',
              }}>
              <Row>
                <DocIcon color={appTheme.color_main_1}></DocIcon>
                <SizedBox width={10}></SizedBox>
                <Text style={{flex: 1, fontSize: 12}}>
                  {`Nhấn 'Đặt hàng' đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản ${StoreCode.getStoreName()} `}
                </Text>
              </Row>
            </View>
          </Column>
        </ScrollView>
      }
      bottomNavigationBar={
        <Container
          height={85}
          marginBottom={5}
          child={
            <Row mainAxisAlignment={'flex-end'}>
              <Column flex={0}>
                <Text>Tổng thanh toán</Text>
                <Text style={{fontSize: 16, color: 'red', fontWeight: '500'}}>
                  {`${convertToMoney(cartData?.total_final || 0)}₫`}
                </Text>
              </Column>
              <SizedBox width={10}></SizedBox>
              <TouchableOpacity
                onPress={() => {
                  if (loading == true) {
                    return;
                  }
                  createOrders();
                }}>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: appTheme.color_main_1,
                    paddingHorizontal: 15,
                    paddingVertical: 5,

                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: 'white', fontWeight: 500}}>
                    {`Đặt hàng (${listOrder.length})`}
                  </Text>
                  {loading && <ActivityIndicator></ActivityIndicator>}
                </View>
              </TouchableOpacity>

              <SizedBox width={10}></SizedBox>
            </Row>
          }></Container>
      }></Scaffold>
  );
});

export default ConfirmScreen;
