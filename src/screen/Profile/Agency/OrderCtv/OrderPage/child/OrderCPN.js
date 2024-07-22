import {Dimensions, TouchableOpacity} from 'react-native';
import {useDataAppStore} from '../../../../../../store/DataAppStore';
import Container from '../../../../../../components/Container';
import Column from '../../../../../../components/Column';
import Row from '../../../../../../components/Row';
import SizedBox from '../../../../../../components/SizedBox';
import {Text} from 'react-native';
import ImageIKI from '../../../../../../components/ImageIKI';
import Expanded from '../../../../../../components/Expanded';
import {View} from 'react-native';
import {convertToMoney} from '../../../../../../utils/apis/stringUtil';
import {Divider} from 'react-native-paper';
import MoneyIcon from '../../../../../../components/Icons/MoneyIcon';
import {ORDER_STATUS} from '../../../../../../constants';
import {useNavigation} from '@react-navigation/native';

const OrderCPN = ({order}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme} = useDataAppStore();
  const navigation = useNavigation();
  return (
    <Container
      width={windowWidth}
      child={
        <Column>
          <Row padding={10} mainAxisAlignment={'space-between'}>
            <SizedBox width={1}></SizedBox>
            <Text
              style={{
                color: appTheme.color_main_1,
              }}>{`${order.order_status_name}`}</Text>
          </Row>
          <Row padding={10} mainAxisAlignment={'flex-start'}>
            <ImageIKI
              style={{
                width: 80,
                height: 80,
                padding: 2,
                borderRadius: 5,
              }}
              uri={
                (order?.line_items_at_time ?? []).length == 0
                  ? ''
                  : `${order.line_items_at_time[0].image_url}`
              }></ImageIKI>
            <SizedBox width={10}></SizedBox>
            <Expanded
              child={
                <Column>
                  <Text>{`${
                    (order?.line_items_at_time ?? []).length == 0
                      ? 'Lỗi sản phẩm'
                      : order.line_items_at_time[0].name
                  }`}</Text>
                  <Column>
                    <Row mainAxisAlignment={'space-between'}>
                      <SizedBox width={2}></SizedBox>
                      <Text>
                        {` x ${
                          (order?.line_items_at_time ?? []).length == 0
                            ? 'Lỗi sản phẩm'
                            : order.line_items_at_time[0].quantity
                        }`}
                      </Text>
                    </Row>
                    <Row>
                      <View style={{flex: 1}}></View>
                      {order.line_items_at_time[0].before_discount_price !=
                        order.line_items_at_time[0].item_price && (
                        <Text
                          style={{
                            textDecorationLine: 'line-through',
                            color: 'grey',
                          }}>
                          {`đ${convertToMoney(
                            (order?.line_items_at_time ?? []).length == 0
                              ? 0.0
                              : order.line_items_at_time[0]
                                  .before_discount_price ?? 0,
                          )}`}
                        </Text>
                      )}
                      <SizedBox width={15}></SizedBox>
                      <Text style={{color: appTheme.color_main_1}}>
                        {`đ${convertToMoney(
                          (order?.line_items_at_time ?? []).length == 0
                            ? 0.0
                            : order.line_items_at_time[0].item_price ?? 0,
                        )}`}
                      </Text>
                    </Row>
                  </Column>
                </Column>
              }></Expanded>
          </Row>
          <Divider></Divider>
          {order.line_items_at_time.length > 1 ? (
            <Container
              padding={10}
              alignItems={'center'}
              child={
                <Text style={{color: 'grey', fontSize: 13}}>
                  Xem thêm sản phẩm
                </Text>
              }></Container>
          ) : (
            <></>
          )}
          <Divider></Divider>
          <Container
            padding={10}
            child={
              <Row>
                <Text>{`${order.line_items_at_time.length} sản phẩm`}</Text>
                <View style={{flex: 1}}></View>
                <MoneyIcon color={appTheme.color_main_1} size={20}></MoneyIcon>
                <SizedBox width={10}></SizedBox>
                <Text>Thành tiền: </Text>
                <Text
                  style={{color: appTheme.color_main_1}}>{`đ${convertToMoney(
                  order.total_final,
                )}`}</Text>
              </Row>
            }></Container>
          <Divider></Divider>
          <Container
            padding={10}
            child={
              <Row>
                {order.order_status_code ==
                  ORDER_STATUS.WAITING_FOR_PROGRESSING ||
                order.order_status_code == ORDER_STATUS.PACKING ||
                order.order_status_code == ORDER_STATUS.SHIPPING ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ORDER_SUCCESS', {order: order});
                    }}>
                    <Container
                      width={100}
                      height={35}
                      backgroundColor={appTheme.color_main_1}
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderRadius={3}
                      child={
                        <Text style={{color: 'white'}}>Thanh toán</Text>
                      }></Container>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <View style={{flex: 1}}></View>
                {order.order_status_code != ORDER_STATUS.COMPLETED ? (
                  <Container
                    width={100}
                    height={35}
                    justifyContent={'center'}
                    alignItems={'center'}
                    child={
                      <Text style={{color: appTheme.color_main_1}}>Xem</Text>
                    }></Container>
                ) : order.reviewed == false ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('REVIEW', {order: order});
                    }}>
                    <Container
                      width={100}
                      height={35}
                      backgroundColor={appTheme.color_main_1}
                      justifyContent={'center'}
                      alignItems={'center'}
                      borderRadius={3}
                      child={
                        <Text style={{color: 'white'}}>Đánh giá</Text>
                      }></Container>
                  </TouchableOpacity>
                ) : (
                  <Container
                    width={100}
                    height={35}
                    backgroundColor={appTheme.color_main_1}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={3}
                    child={
                      <Text style={{color: 'white'}}>Mua lại</Text>
                    }></Container>
                )}
              </Row>
            }></Container>
          <Row paddingHorizontal={10}>
            <Text>Mã đơn hàng</Text>
            <View style={{flex: 1}}></View>
            <Text style={{fontWeight: 500}}>{`${order?.order_code}`}</Text>
          </Row>
          <SizedBox height={15}></SizedBox>
          <Container height={8} backgroundColor={'#e0e0e0'}></Container>
        </Column>
      }></Container>
  );
};

export default OrderCPN;
