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
import {
  convertToMoney,
  getDDMMYY,
  getHHMMSS,
} from '../../utils/apis/stringUtil';
import IButton from '../../components/IButton';

const ConditionScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge} = useDataAppStore();

  const {voucher} = route.params;

  useEffect(() => {
    // if (voucherCodeChooseInput != null) {
    //   setVoucherCodeChooseVoucher(voucherCodeChooseInput);
    // }
    // getVoucherCustomer();
  }, []);

  return (
    <>
      <Scaffold
        appbar={<IAppBar title={'Chi tiết mã giảm giá'}></IAppBar>}
        body={
        <ScrollView>
              <Column width={windowWidth}>
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
                    {voucher?.discount_for == 1 ? (
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          color: 'white',
                        }}>
                        Miễn phí vận chuyển
                      </Text>
                    ) : voucher?.voucher_type == 1 ? (
                      voucher?.discount_type == 1 ? (
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'white',
                          }}>{`Mã: ${voucher?.code} giảm ${voucher.value_discount} %`}</Text>
                      ) : (
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'white',
                          }}>{`Mã: ${voucher?.code} giảm ${convertToMoney(
                          voucher?.value_discount,
                        )}đ`}</Text>
                      )
                    ) : voucher?.discount_type == 1 ? (
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          color: 'white',
                        }}>{`Mã: ${voucher?.code} giảm ${voucher?.value_discount} %`}</Text>
                    ) : (
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          color: 'white',
                        }}>{`Mã: ${voucher?.code} giảm ${convertToMoney(
                        voucher?.value_discount,
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
                    <Text style={{fontSize: 14}}>{`${voucher?.name}`}</Text>
                    <SizedBox height={5}></SizedBox>
                    {(voucher?.ship_discount_value ?? 0) != 0 && (
                      <Text style={{fontSize: 12}}>
                        {`Tối đa: ${convertToMoney(
                          voucher?.ship_discount_value ?? 0,
                        )}`}
                      </Text>
                    )}
                    <SizedBox height={5}></SizedBox>
                    {voucher?.voucher_type == 1 ? (
                      <Text style={{fontSize: 12}}>
                        Giảm giá cho các sản phẩm sau:
                      </Text>
                    ) : (
                      <Text style={{fontSize: 12}}>
                        Giảm giá cho toàn bộ các sản phẩm
                      </Text>
                    )}
                    <SizedBox height={5}></SizedBox>
                    {voucher?.voucher_type == 1 && (
                      <Text style={{fontSize: 12}}>{`${
                        voucher?.products[0].name ?? ''
                      }, vv...`}</Text>
                    )}
                    <SizedBox height={5}></SizedBox>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'grey',
                      }}>{`HSD: ${getDDMMYY(voucher?.end_time)}`}</Text>
                  </Column>

                  <SizedBox width={10}></SizedBox>
                </Row>
              }></Container>
            <SizedBox height={10}></SizedBox>
            <Column padding={10}>
              <Text style={{fontWeight: 'bold'}}>Ưu đãi</Text>
              {voucher.discount_for != 1 &&
                (voucher.voucher_type == 1 ? (
                  voucher.discount_type == 1 ? (
                    <Text>{`Giảm ${voucher.value_discount} % cho các sản phẩm sau:`}</Text>
                  ) : (
                    <Text>{`Giảm ${convertToMoney(
                      voucher.value_discount,
                    )}đ cho các sản phẩm sau:`}</Text>
                  )
                ) : voucher.discount_type == 1 ? (
                  <Text>{`Giảm ${voucher.value_discount} % cho toàn bộ các sản phẩm`}</Text>
                ) : (
                  <Text>{`Giảm ${convertToMoney(
                    voucher.value_discount,
                  )}đ cho toàn bộ các sản phẩm`}</Text>
                ))}
              {voucher.discount_for != 1 &&
                (voucher.discount_type == 1 ? (
                  <Text>{`${voucher?.products[0].name}, vv...`}</Text>
                ) : (
                  <></>
                ))}
              {voucher.discount_for == 1 ? (
                (voucher.ship_discount_value ?? 0) == 0 ? (
                  <Text>Miễn phí vận chuyển</Text>
                ) : (
                  <Text>{`Giới hạn giảm ${convertToMoney(
                    voucher.ship_discount_value,
                  )}đ.`}</Text>
                )
              ) : voucher.set_limit_value_discount == true ? (
                <Text>{`Giới hạn giảm ${convertToMoney(
                  voucher.max_value_discount,
                )}đ.`}</Text>
              ) : (
                <></>
              )}
              <SizedBox height={20}></SizedBox>
              <Text style={{fontWeight: 'bold'}}>Có hiệu lực</Text>
              <SizedBox height={10}></SizedBox>
              <Text>{`${getDDMMYY(voucher.start_time)} ${getHHMMSS(
                voucher.start_time,
              )} - ${getDDMMYY(voucher.end_time)} ${getHHMMSS(
                voucher.end_time,
              )}`}</Text>
              <SizedBox height={20}></SizedBox>
              <Text style={{fontWeight: 'bold'}}>Thanh toán</Text>
              <SizedBox height={10}></SizedBox>
              <Text>Mọi hình thức thanh toán.</Text>
              <SizedBox height={20}></SizedBox>
              <Text style={{fontWeight: 'bold'}}>Điều kiện sử dụng:</Text>
              <SizedBox height={10}></SizedBox>
              {voucher.set_limit_amount == true ? (
                <Text>{`Số lượng giới hạn: ${voucher.amount}.`}</Text>
              ) : (
                <></>
              )}
              {voucher?.voucher_type == 1 ? (
                <Column>
                  {(voucher?.products ?? []).map((e, index) => {
                    return <Text>{e.name.join(', ')}</Text>;
                  })}
                </Column>
              ) : (
                <></>
              )}
              {voucher.set_limit_total == true ? (
                <Text>{`Giá trị tổng đơn hàng tối thiểu: ${convertToMoney(
                  voucher?.value_limit_total,
                )}đ.`}</Text>
              ) : (
                <></>
              )}
              <Text>{`HSD: ${getDDMMYY(voucher.start_time)} ${getHHMMSS(
                voucher.start_time,
              )} - ${getDDMMYY(voucher.end_time)} ${getHHMMSS(
                voucher.end_time,
              )}.`}</Text>
            </Column>
            {/* <Container
              paddingVertical={10}
              child={
                <Text>Các sản phẩm có thể áp dụng voucher</Text>
              }></Container> */}
          </Column>
        </ScrollView>
        }></Scaffold>
    </>
  );
});

export default ConditionScreen;
