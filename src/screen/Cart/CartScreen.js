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
} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../store/DataAppStore';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import Row from '../../components/Row';
import SizedBox from '../../components/SizedBox';
import Container from '../../components/Container';
import CheckLoginCPN from '../../components/CheckLoginCPN';
import {useCartStore} from '../../store/CartStore';
import ItemProductCart from './components/ItemProductCart';
import Column from '../../components/Column';
import {convertToMoney} from '../../utils/apis/stringUtil';
import {useFocusEffect} from '@react-navigation/native';
import MoneyIcon from '../../components/Icons/MoneyIcon';
import {Switch} from 'react-native-paper';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const CartScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge} = useDataAppStore();
  const {automaticallyImplyLeading} = route?.params || false;

  const {
    listOrder,
    voucherCodeChoose,
    listQuantityProduct,
    listCombo,
    listUsedCombo,
    enoughCondition,
    enoughConditionCB,
    infoAddressCustomer,
    cartData,
    balanceCollaboratorCanUse,
    balanceCollaboratorUsed,
    balanceAgencyCanUse,
    balanceAgencyUsed,
    isUseBalanceCollaborator,
    isUseBalanceAgency,
    isLoadingRefresh,
    shipmentMethodCurrent,
    listShipmentFast,
    isLoadingShipmentMethod,
    setIsUseBalanceCollaborator,
    setIsUseBalanceAgency,
    increaseItem,
    decreaseItem,
    updateItemCart,
    getItemCart,
    getAllAddressCustomer,
    addVoucherCart,
    refresh,
  } = useCartStore();

  useEffect(() => {
    getAllAddressCustomer();
    refresh();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getItemCart();
    }, []),
  );

  // console.log('listOrder', listOrder);
  return (
    <Scaffold
      appbar={
        <IAppBar
          title={'Giỏ hàng'}
          automaticallyImplyLeading={
            automaticallyImplyLeading || false
          }></IAppBar>
      }
      body={
        <CheckLoginCPN
          child={
            isLoadingRefresh ? (
              <ActivityIndicator />
            ) : listOrder.length == 0 ? (
              <Text>Giỏ hàng trống</Text>
            ) : (
              <View style={{flex: 1}}>
                <View>
                  <FlatList
                    data={listCombo}
                    keyExtactor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('COMBO_DETAIL', {
                            product: item.products_combo[0].product,
                          })
                        }>
                        <Container
                          paddingLeft={15}
                          paddingRight={15}
                          paddingTop={10}
                          paddingBottom={10}
                          child={
                            <Row>
                              <Container
                                height={20}
                                borderRadius={2}
                                borderColor={appTheme.color_main_1}
                                child={
                                  <Row>
                                    <SizedBox width={3}></SizedBox>
                                    <Text
                                      style={{
                                        color: appTheme.color_main_1,
                                      }}>{`Combo ${listCombo[index]?.name}`}</Text>
                                    <SizedBox width={3}></SizedBox>
                                  </Row>
                                }></Container>
                            </Row>
                          }></Container>
                      </TouchableOpacity>
                    )}
                  />
                  <FlatList
                    data={listOrder}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <ItemProductCart
                        lineItem={item}
                        onDismissed={() => {
                          updateItemCart(
                            item.id,
                            item.product.id,
                            0,
                            item.distributesSelected || [],
                            item.note,
                          );
                          // Gọi hàm cập nhật badge ở đây
                        }}
                        onDecreaseItem={() => {
                          decreaseItem(index, item.distributesSelected);
                        }}
                        onIncreaseItem={() => {
                          increaseItem(index, item.distributesSelected);
                        }}
                        onUpdateProduct={(quantity, distributesSelected) => {
                          updateItemCart(
                            item.id,
                            item.product.id,
                            quantity,
                            [distributesSelected],
                            item.note,
                          );
                        }}
                        quantity={listQuantityProduct[index]}
                        onNote={(cartItemId, note) => {
                          updateItemCart(
                            item.id,
                            item.product.id,
                            item.quantity || 0,
                            item.distributesSelected || [],
                            note,
                          );
                        }}
                      />
                    )}
                  />
                </View>
              </View>
            )
          }></CheckLoginCPN>
      }
      bottomNavigationBar={
        <Column flex={0} marginVertical={10}>
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
          {balanceCollaboratorCanUse > 0 && badge.status_collaborator == 1 && (
            <Row padding={10}>
              <MoneyIcon color={appTheme.color_main_1}></MoneyIcon>
              <SizedBox width={10}></SizedBox>
              <Text>Dùng số dư cộng tác viên</Text>
              <View style={{flex: 1}}></View>
              <Text>{`[-${convertToMoney(balanceCollaboratorCanUse)}₫] `}</Text>
              <Switch
                value={isUseBalanceCollaborator}
                onValueChange={() => {
                  setIsUseBalanceCollaborator(!isUseBalanceCollaborator);

                  addVoucherCart(voucherCodeChoose, () => {});
                }}
              />
            </Row>
          )}
          <Row mainAxisAlignment={'flex-end'}>
            <Column flex={0}>
              <Text>
                {`Tổng cộng: ${convertToMoney(
                  cartData?.total_after_discount || 0,
                )}₫`}
              </Text>
              <SizedBox height={5}></SizedBox>
              <Container
                paddingHorizontal={10}
                paddingVertical={5}
                borderRadius={5}
                backgroundColor={'#FEEBEB'}
                flex={0}
                child={
                  <Text style={{fontSize: 12, color: 'red'}}>
                    {`Giảm giá hóa đơn: ${convertToMoney(
                      (cartData?.total_before_discount ?? 0) -
                        (cartData?.total_after_discount ?? 0),
                    )}₫`}
                  </Text>
                }></Container>
            </Column>
            <SizedBox width={10}></SizedBox>
            <TouchableOpacity
              disabled={listOrder.length === 0 ? true : false}
              onPress={() => {
                navigation.navigate('CONFIRM');
              }}>
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor:
                    listOrder.length === 0 ? '#beb3b3' : appTheme.color_main_1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  width: 120,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>
                  {`Đặt hàng (${listOrder.length})`}
                </Text>
              </View>
            </TouchableOpacity>
            <SizedBox width={10}></SizedBox>
          </Row>
          <SizedBox height={20}></SizedBox>
        </Column>
      }></Scaffold>
  );
});

export default CartScreen;
