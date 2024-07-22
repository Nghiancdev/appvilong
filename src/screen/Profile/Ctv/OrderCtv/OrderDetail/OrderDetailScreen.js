import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';

import {useOrderStore} from '../../../../../store/OrderStore';
import {useDataAppStore} from '../../../../../store/DataAppStore';
import Column from '../../../../../components/Column';
import TruckProfileIcon from '../../../../../components/Icons/Profile/TruckProfileIcon';
import Row from '../../../../../components/Row';
import SizedBox from '../../../../../components/SizedBox';
import {
  convertToMoney,
  getDDMMYY,
  getHHMMSS,
} from '../../../../../utils/apis/stringUtil';
import {Divider} from 'react-native-paper';
import LocationIcon from '../../../../../components/Icons/LocationIcon';
import Container from '../../../../../components/Container';
import ImageIKI from '../../../../../components/ImageIKI';
import {observer} from 'mobx-react-lite';
import Scaffold from '../../../../../components/Scafold';
import IAppBar from '../../../../../components/AppBar';
import MoneyIcon from '../../../../../components/Icons/MoneyIcon';
import ChatIcon from '../../../../../components/Icons/ChatIcon';
import WalletIcon from '../../../../../components/Icons/Profile/WalletIcon';
import CancelOrderModal from './CancelOrderModal';
import {ORDER_STATUS} from '../../../../../constants';
import StoreCode from '../../../../../singletons/StoreCode';

const OrderDetailScreen = observer(({navigation, route, fieldByValue}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const {appTheme, badge} = useDataAppStore();

  const {oneLoading, order, getOneOrder, cancelOrder} = useOrderStore();

  const {orderCode} = route.params;
  const [isShowDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    getOneOrder(orderCode);
  }, []);

  return (
    <>
      <Scaffold
        appbar={<IAppBar title={'Chi tiết đơn hàng'}></IAppBar>}
        body={
          oneLoading ? (
            <ActivityIndicator />
          ) : (
            <ScrollView>
              <Column>
                <Row
                  padding={10}
                  mainAxisAlignment={'space-between'}
                  backgroundColor={'#16a5a1'}>
                  <Text
                    style={{
                      color: 'white',
                    }}>{`Trạng thái đơn hàng: ${order?.order_status_name}`}</Text>
                  <TruckProfileIcon color="white"></TruckProfileIcon>
                </Row>
                <Row
                  padding={10}
                  mainAxisAlignment={'space-between'}
                  backgroundColor={'#16a5a1'}>
                  <Text
                    style={{
                      color: 'white',
                    }}>{`Trạng thái thanh toán: ${order?.payment_status_name}`}</Text>
                  <WalletIcon color="white"></WalletIcon>
                </Row>
                <Row padding={10}>
                  <TruckProfileIcon></TruckProfileIcon>
                  <SizedBox width={10}></SizedBox>
                  <Column>
                    <Text>{`Đơn vị vận chuyển: ${
                      order?.shipper_name ?? 'Chưa có đơn vị vận chuyển'
                    }`}</Text>
                    <SizedBox height={10}></SizedBox>
                    <Text>{`Phí giao hàng: đ${convertToMoney(
                      order?.total_shipping_fee ?? 0,
                    )}`}</Text>
                  </Column>
                </Row>
                <Divider></Divider>
                <Row padding={10}>
                  <LocationIcon></LocationIcon>
                  <SizedBox width={10}></SizedBox>
                  <Column>
                    <Text>Địa chỉ nhận hàng của khách:</Text>
                    <Text>{`${
                      order?.customer_address?.name ?? 'Chưa có tên'
                    }  | ${
                      order?.customer_address?.phone ?? 'Chưa có số điện thoại'
                    }`}</Text>
                    <Text>{`${
                      order?.customer_address?.address_detail ??
                      'Chưa có địa chỉ chi tiết'
                    }`}</Text>
                    <Text>{`${
                      order?.customer_address?.wards_name ?? 'Chưa có Phường/Xã'
                    }, ${
                      order?.customer_address?.district_name ??
                      'Chưa có Quận/Huyện'
                    }, ${
                      order?.customer_address?.province_name ??
                      'Chưa có Tỉnh/Thành phố'
                    }`}</Text>
                  </Column>
                </Row>
                <Container
                  height={8}
                  width={windowWidth}
                  backgroundColor={'#F3F3F3'}></Container>
                <Row>
                  <Text style={{padding: 10}}>Lời nhắn:</Text>
                  <Text style={{flex: 1}}>{`${
                    order?.customer_note ?? ''
                  }`}</Text>
                </Row>
                <Divider></Divider>
                {order?.customer_note && <Divider></Divider>}
                {(order?.line_items_at_time ?? []).map((item, index) => {
                  return (
                    <Column>
                      <Row padding={10}>
                        <ImageIKI
                          style={{
                            width: 80,
                            height: 80,
                            padding: 2,
                            borderRadius: 5,
                          }}
                          uri={item.image_url ?? ''}></ImageIKI>
                        <SizedBox width={10}></SizedBox>
                        <Column>
                          <Text>{`${item?.name}`}</Text>
                          <Text
                            style={{
                              textAlign: 'right',
                            }}>{` x ${item?.quantity}`}</Text>
                          <Row>
                            {item?.before_discount_price !=
                              item?.item_price && (
                              <Text
                                style={{
                                  textDecorationLine: 'line-through',
                                  color: 'grey',
                                }}>{`đ${convertToMoney(
                                item?.before_discount_price,
                              )}`}</Text>
                            )}
                            <SizedBox width={15}></SizedBox>
                            <Text style={{color: appTheme.color_main_1}}>
                              {item?.is_bonus == true
                                ? 'Hàng tặng'
                                : `đ${convertToMoney(item?.item_price ?? 0)}`}
                            </Text>
                          </Row>
                        </Column>
                      </Row>
                      <Divider></Divider>
                      <Text style={{padding: 10}}>{`Ghi chú : ${
                        item?.note ?? ''
                      }`}</Text>
                    </Column>
                  );
                })}
                <Divider></Divider>
                <Row mainAxisAlignment={'space-between'} padding={10}>
                  <Text style={{color: 'grey'}}>Tổng tiền hàng: </Text>
                  <Text style={{color: 'grey'}}>{`₫${convertToMoney(
                    order?.total_before_discount,
                  )}`}</Text>
                </Row>
                <Row mainAxisAlignment={'space-between'} padding={10}>
                  <Text style={{color: 'grey'}}>Phí vận chuyển: </Text>
                  <Text style={{color: 'grey'}}>{`+ ₫${convertToMoney(
                    order?.total_shipping_fee,
                  )}`}</Text>
                </Row>
                {(order?.vat ?? 0) != 0 && (
                  <Row mainAxisAlignment={'space-between'} padding={10}>
                    <Text style={{color: 'grey'}}>VAT: </Text>
                    <Text style={{color: 'grey'}}>{`₫${convertToMoney(
                      order?.vat,
                    )}`}</Text>
                  </Row>
                )}
                {(order?.ship_discount_amount ?? 0) != 0 && (
                  <Row mainAxisAlignment={'space-between'} padding={10}>
                    <Text style={{color: 'grey'}}>Miễn phí vận chuyển: </Text>
                    <Text style={{color: 'grey'}}>{`₫${convertToMoney(
                      order?.ship_discount_amount,
                    )}`}</Text>
                  </Row>
                )}
                {(order?.product_discount_amount ?? 0) != 0 && (
                  <Row mainAxisAlignment={'space-between'} padding={10}>
                    <Text style={{color: 'grey'}}>Giảm giá sản phẩm: </Text>
                    <Text
                      style={{
                        color: 'grey',
                      }}>{`- đ${convertToMoney(
                      order?.product_discount_amount,
                    )}`}</Text>
                  </Row>
                )}
                {(order?.combo_discount_amount ?? 0) != 0 && (
                  <Row mainAxisAlignment={'space-between'} padding={10}>
                    <Text style={{color: 'grey'}}>Giảm giá Combo: </Text>
                    <Text
                      style={{
                        color: 'grey',
                      }}>{`- đ${convertToMoney(
                      order?.combo_discount_amount,
                    )}`}</Text>
                  </Row>
                )}
                {(order?.voucher_discount_amount ?? 0) != 0 && (
                  <Row mainAxisAlignment={'space-between'} padding={10}>
                    <Text style={{color: 'grey'}}>Giảm giá Voucher: </Text>
                    <Text
                      style={{
                        color: 'grey',
                      }}>{`- đ${convertToMoney(
                      order?.voucher_discount_amount,
                    )}`}</Text>
                  </Row>
                )}
                {(order?.bonus_points_amount_used ?? 0) != 0 && (
                  <Row mainAxisAlignment={'space-between'} padding={10}>
                    <Text style={{color: 'grey'}}>Giảm giá Xu: </Text>
                    <Text
                      style={{
                        color: 'grey',
                      }}>{`- đ${convertToMoney(
                      order?.bonus_points_amount_used,
                    )}`}</Text>
                  </Row>
                )}
                {(order?.balance_collaborator_used ?? 0) != 0 && (
                  <Row mainAxisAlignment={'space-between'} padding={10}>
                    <Text style={{color: 'grey'}}>Giảm giá Ví CTV: </Text>
                    <Text
                      style={{
                        color: 'grey',
                      }}>{`- đ${convertToMoney(
                      order?.balance_collaborator_used,
                    )}`}</Text>
                  </Row>
                )}
                {(order?.balance_agency_used ?? 0) != 0 && (
                  <Row mainAxisAlignment={'space-between'} padding={10}>
                    <Text style={{color: 'grey'}}>Giảm giá Ví đại lý: </Text>
                    <Text
                      style={{
                        color: 'grey',
                      }}>{`- đ${convertToMoney(
                      order?.balance_agency_used,
                    )}`}</Text>
                  </Row>
                )}
                {order?.is_order_for_customer == true && (
                  <Row mainAxisAlignment={'space-between'} padding={10}>
                    <Text style={{color: 'grey'}}>Hoa hồng đặt hộ: </Text>
                    <Text
                      style={{
                        color: 'grey',
                      }}>{`₫${convertToMoney(
                      order?.total_commission_order_for_customer ?? 0,
                    )}`}</Text>
                  </Row>
                )}
                <Row mainAxisAlignment={'space-between'} padding={10}>
                  <Text style={{color: 'grey'}}>Thành tiền: </Text>
                  <Text style={{color: 'grey'}}>{`₫${convertToMoney(
                    order?.total_final ?? 0,
                  )}`}</Text>
                </Row>
                <Container
                  height={8}
                  width={windowWidth}
                  backgroundColor={'#F3F3F3'}></Container>
                <Row padding={10}>
                  <MoneyIcon color={appTheme.color_main_1}></MoneyIcon>
                  <SizedBox width={10}></SizedBox>
                  <Column>
                    <Text>Phương thức thanh toán</Text>
                    <SizedBox height={5}></SizedBox>
                    <Text>{`${order?.payment_partner_name}`}</Text>
                  </Column>
                </Row>
                <Container
                  height={8}
                  width={windowWidth}
                  backgroundColor={'#F3F3F3'}></Container>
                <Row
                  mainAxisAlignment={'space-between'}
                  paddingHorizontal={10}
                  paddingVertical={5}>
                  <Text>Mã đơn hàng</Text>
                  <Text>{`${order?.order_code}`}</Text>
                </Row>
                <Row
                  mainAxisAlignment={'space-between'}
                  paddingHorizontal={10}
                  paddingVertical={5}>
                  <Text>Thời gian đặt hàng</Text>
                  <Text>{`${getDDMMYY(order?.created_at)} ${getHHMMSS(
                    order?.created_at,
                  )}`}</Text>
                </Row>
                <SizedBox height={10}></SizedBox>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('CHAT_VIEW', {
                      infoCustomerChat: {
                        name: `${StoreCode.getStoreName() ?? ''}`,
                        avatar_image: `${appTheme.logo_url ?? ''}`,
                      },
                    });
                  }}>
                  <Container
                    borderColor={'grey'}
                    padding={10}
                    child={
                      <Row mainAxisAlignment={'center'}>
                        <ChatIcon color={appTheme.color_main_1}></ChatIcon>
                        <SizedBox width={10}></SizedBox>
                        <Text>Liên hệ</Text>
                      </Row>
                    }></Container>
                </TouchableOpacity>
                <Container
                  height={8}
                  width={windowWidth}
                  backgroundColor={'#F3F3F3'}></Container>
                {order?.order_status_code ==
                  ORDER_STATUS.WAITING_FOR_PROGRESSING && (
                  <TouchableOpacity
                    onPress={() => {
                      setShowDrawer(true);
                    }}>
                    <Container
                      borderColor={'grey'}
                      backgroundColor={'#F3F3F3'}
                      margin={10}
                      padding={10}
                      child={
                        <Row mainAxisAlignment={'center'}>
                          <Text>Huỷ đơn hàng</Text>
                        </Row>
                      }></Container>
                  </TouchableOpacity>
                )}
              </Column>
            </ScrollView>
          )
        }
        bottomNavigationBar={
          <Container
            padding={10}
            height={90}
            child={
              <Column>
                <Row mainAxisAlignment={'space-between'}>
                  <Text>Tổng tiền:</Text>
                  <Text
                    style={{color: appTheme.color_main_1}}>{`đ${convertToMoney(
                    order?.total_final ?? 0,
                  )}`}</Text>
                </Row>
                <SizedBox height={10}></SizedBox>
                <Row mainAxisAlignment={'space-between'}>
                  <Text>Mã đơn hàng:</Text>
                  <Text>{`${order?.order_code ?? ''}`}</Text>
                </Row>
              </Column>
            }></Container>
        }></Scaffold>
      {isShowDrawer && (
        <CancelOrderModal
          isShowDrawer={isShowDrawer}
          onClose={() => {
            setShowDrawer(false);
          }}
          onSubmit={reasonChoose => {
            cancelOrder(orderCode, reasonChoose);
            setShowDrawer(false);
            navigation.goBack();
          }}></CancelOrderModal>
      )}
    </>
  );
});

export default OrderDetailScreen;
