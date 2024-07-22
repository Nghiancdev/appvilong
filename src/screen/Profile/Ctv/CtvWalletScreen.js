import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking,
} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../../store/DataAppStore';
import Scaffold from '../../../components/Scafold';
import IAppBar from '../../../components/AppBar';
import {Image} from 'react-native';
import Column from '../../../components/Column';
import Row from '../../../components/Row';
import SizedBox from '../../../components/SizedBox';
import Wrap from '../../../components/Wrap';
import Container from '../../../components/Container';
import WalletIcon from '../../../components/Icons/Profile/WalletIcon';
import {Divider, useTheme} from 'react-native-paper';
import {hexToRgba, rgbaOpacity} from '../../../utils/apis/colorsUtil';
import BoxProfileIcon from '../../../components/Icons/Profile/BoxProfileIcon';
import TruckProfileIcon from '../../../components/Icons/Profile/TruckProfileIcon';
import StarCircelIcon from '../../../components/Icons/Profile/StarCircelIcon';
import NextArrowIcon from '../../../components/Icons/NextArrowIcon';
import Expanded from '../../../components/Expanded';
import CheckLoginCPN from '../../../components/CheckLoginCPN';
import WalletColorIcon from '../../../components/Icons/WalletColorIcon';
import {convertToMoney, getDDMMYY} from '../../../utils/apis/stringUtil';
import {it} from 'date-fns/locale';
import CheckListIcon from '../../../components/Icons/CheckListIcon';
import Ribbon3Icon from '../../../components/Icons/Ribbon3Icon';
import GroupEmptyIcon from '../../../components/Icons/GroupEmptyIcon';
import PhoneIcon from '../../../components/Icons/PhoneIcon';
import PhoneOutlineIcon from '../../../components/Icons/PhoneOutlineIcon';
import EmailIcon from '../../../components/Icons/EmailIcon';
import TimeWorkIcon from '../../../components/Icons/TimeWorkIcon';
import LocationOutlineIcon from '../../../components/Icons/LocationOutlineIcon';
import FacebookIcon from '../../../components/Icons/FacebookIcon';
import RegisterCtvCPN from '../CPN/RegisterCtvCPN';
import {useCtvStore} from '../../../store/CtvStore';
import PaymentIcon from '../../../components/Icons/PaymentIcon';
import PersonCTVIcon from '../../../components/Icons/PersonCTVIcon';
import GiffFillIcon from '../../../components/Icons/GiffFillIcon';
import CheckedIcon from '../../../components/Icons/CheckedIcon';
import PointIcon from '../../../components/Icons/PointIcon';
import ListFillerIcon from '../../../components/Icons/ListFillerIcon';
import MoneyIcon from '../../../components/Icons/MoneyIcon';
import ReportIcon from '../../../components/Icons/ReportIcon';
import { toJS } from 'mobx';

const CtvWalletScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge, infoCustomer} = useDataAppStore();
  const {
    infoCtv,
    generalInfoPaymentCtv,
    getGeneralInfoPaymentCtv,
    checkInfoPayment,
    getInfoCTV,
    requestPayment
  } = useCtvStore();
  const theme = useTheme();
  const [indexTab, setIndexTab] = React.useState(0);

  useEffect(() => {
    getGeneralInfoPaymentCtv();
    getInfoCTV();
  }, []);
  console.log("INFOCTV", toJS(infoCtv))
  const infoTab = () => {
    const itemBoxGif = (typeRose, svgAsset, svgAssetCheck, stepsBonus) => {
      console.log('stepsBonus', stepsBonus);
      return (
        <Column>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderColor:
                typeRose == 0
                  ? generalInfoPaymentCtv.total_final >= stepsBonus.limit
                    ? 'transparent'
                    : 'red'
                  : generalInfoPaymentCtv.balance >= stepsBonus.limit
                  ? 'transparent'
                  : 'red',
              borderWidth: 1,
            }}>
            <Row>
              {typeRose == 0
                ? generalInfoPaymentCtv.total_final >= stepsBonus.limit
                  ? svgAssetCheck
                  : svgAsset
                : generalInfoPaymentCtv.balance >= stepsBonus.limit
                ? svgAssetCheck
                : svgAsset}
            </Row>
            <SizedBox width={10}></SizedBox>
            <Text style={{fontWeight: 500}}>{`Đạt: ${convertToMoney(
              stepsBonus.limit,
            )}₫`}</Text>
            <View style={{flex: 1}}></View>
            <Text
              style={{
                color: '#37cc6d',
                fontWeight: 500,
              }}>{`Thưởng: ${convertToMoney(stepsBonus.bonus)}₫`}</Text>
          </View>
        </Column>
      );
    };

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PAYMENT_HISTORY_CTV');
          }}>
          <Column padding={10} flex={0}>
            <Row>
              <PersonCTVIcon color="#ea3679"></PersonCTVIcon>
              <SizedBox width={10}></SizedBox>
              <Text style={{fontWeight: 500}}>Hoa hồng tháng này</Text>
              <View style={{flex: 1}}></View>
              <NextArrowIcon></NextArrowIcon>
            </Row>
            <SizedBox height={10}></SizedBox>
            <Row>
              <Text>{`${
                generalInfoPaymentCtv.number_order ?? 0
              } Giao dịch`}</Text>
              <View style={{flex: 1}}></View>
              <Text>{`${convertToMoney(
                generalInfoPaymentCtv.share_collaborator ?? 0,
              )}₫`}</Text>
            </Row>
          </Column>
        </TouchableOpacity>

        <Container height={10} backgroundColor={'#fafafa'}></Container>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ORDER_CTV', {
              routeName: 5,
            });
          }}>
          <Column padding={10} flex={0}>
            <Row>
              <PaymentIcon color="#37cc6d"></PaymentIcon>
              <SizedBox width={10}></SizedBox>
              <Text style={{fontWeight: 500}}>Doanh thu tháng này</Text>
              <View style={{flex: 1}}></View>
              <NextArrowIcon></NextArrowIcon>
            </Row>
            <SizedBox height={10}></SizedBox>
            <Row>
              <Text>{`${
                generalInfoPaymentCtv.number_order ?? 0
              } Giao dịch`}</Text>
              <View style={{flex: 1}}></View>
              <Text>{`${convertToMoney(
                generalInfoPaymentCtv.total_final ?? 0,
              )}₫`}</Text>
            </Row>
          </Column>
        </TouchableOpacity>

        <Container height={10} backgroundColor={'#fafafa'}></Container>
        <Row padding={10}>
          <GiffFillIcon></GiffFillIcon>
          <SizedBox width={10}></SizedBox>
          <Text style={{fontWeight: 500}}>Thưởng theo mức doanh thu</Text>
        </Row>
        <SizedBox height={7}></SizedBox>
        {(generalInfoPaymentCtv.steps_bonus ?? []).map((item, index) => {
          return itemBoxGif(
            generalInfoPaymentCtv.type_rose ?? 0,
            <PointIcon></PointIcon>,
            <CheckedIcon></CheckedIcon>,
            item,
          );
        })}
      </View>
    );
  };

  const infoPayment = () => {
    return (
      <View style={{flex: 1}}>
        <Column>
          <Row padding={10}>
            <WalletIcon></WalletIcon>
            <SizedBox width={10}></SizedBox>
            <Text style={{fontWeight: 500}}>THÔNG TIN THANH TOÁN</Text>
          </Row>
          <Divider></Divider>
          {checkInfoPayment() == true && (
            <Column padding={15}>
             
              <Text style={{fontWeight: 500}}>CMND/CCCD:</Text>
              <Row paddingHorizontal={10} paddingVertical={5} mainAxisAlignment='space-between'>
                <Text>Họ và tên:</Text>
                <Text>{`${infoCtv.first_and_last_name || ""}`}</Text>
              </Row>
              <Row paddingHorizontal={10} paddingVertical={5}  mainAxisAlignment='space-between'>
                <Text>Số CMND/CCCD:</Text>
                <Text>{`${infoCtv.cmnd || ""}`}</Text>
              </Row>
              <Text style={{fontWeight: 500}}>Tài khoản ngân hàng:</Text>
              <Row paddingHorizontal={10} paddingVertical={5}>
                <Text>{`${infoCtv.bank|| ""}`}</Text>
              </Row>
              <Row paddingHorizontal={10} paddingVertical={5}>
                <Text>Số CMND/CCCD:</Text>
                <Text>{`${infoCtv.account_number|| ""}`}</Text>
              </Row>
              <SizedBox height={10} width={windowWidth}></SizedBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CTV_PAYMENT_INFO');
                }}
                style={{
                  backgroundColor: appTheme.color_main_1,
                  borderRadius: 20,
                  padding: 10,
                }}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  CẬP NHẬT THÔNG TIN THANH TOÁN
                </Text>
              </TouchableOpacity>
            </Column>
          )}
          {checkInfoPayment() == false && (
            <Column padding={15} flex={0}>
              <Text>{`Bạn chưa có thông tin thanh toán.\nVui lòng nhập thông tin để được thanh toán tiền từ ví CTV`}</Text>
              <SizedBox height={15}></SizedBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CTV_PAYMENT_INFO');
                }}
                style={{
                  backgroundColor: appTheme.color_main_1,
                  borderRadius: 20,
                  padding: 10,
                }}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  THÊM THÔNG TIN THANH TOÁN
                </Text>
              </TouchableOpacity>
            </Column>
          )}
          <Container height={10} backgroundColor={'#fafafa'}></Container>
          <Row padding={10}>
            <WalletIcon></WalletIcon>
            <SizedBox width={10}></SizedBox>
            <Text style={{fontWeight: 500}}>CHÍNH SÁCH THANH TOÁN</Text>
          </Row>
          <Divider></Divider>
          <Column padding={15} flex={0}>
            <Text>{`Tiền từ Ví CTV của thành viên Diamond sẽ được thanh toán định kỳ ${
              generalInfoPaymentCtv.payment_1_of_month == true &&
              generalInfoPaymentCtv.payment_16_of_month == true
                ? '02/Tháng'
                : generalInfoPaymentCtv.payment_16_of_month == true ||
                  generalInfoPaymentCtv.payment_1_of_month == true
                ? '01/Tháng'
                : ''
            }`}</Text>
            <SizedBox height={10}></SizedBox>
            {generalInfoPaymentCtv.payment_16_of_month == true && (
              <Row padding={10}>
                <PointIcon></PointIcon>
                <SizedBox width={10}></SizedBox>
                <Text style={{fontWeight: 500}}>Ngày 15 hàng tháng</Text>
              </Row>
            )}
            {generalInfoPaymentCtv.payment_1_of_month == true && (
              <Row padding={10}>
                <PointIcon></PointIcon>
                <SizedBox width={10}></SizedBox>
                <Text style={{fontWeight: 500}}>Ngày 30 hàng tháng</Text>
              </Row>
            )}
            <SizedBox height={10}></SizedBox>
            <Text>{`* Lưu ý:\nBạn cần có số dư ví tối thiểu là ${convertToMoney(
              generalInfoPaymentCtv.payment_limit ?? 0,
            )} VNĐ để được thanh toán định kỳ.`}</Text>
            <SizedBox height={10}></SizedBox>
            <TouchableOpacity
              onPress={() => {
                requestPayment();
              }}
              style={{
                backgroundColor: appTheme.color_main_1,
                borderRadius: 20,
                padding: 10,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                GỬI YÊU CẦU THANH TOÁN
              </Text>
            </TouchableOpacity>
            <SizedBox height={10}></SizedBox>
            <Text>{`* Lưu ý:\nBạn cần gửi yêu cầu thanh toán trước ít nhất 3 ngày so với kỳ hạn thanh toán`}</Text>
          </Column>
        </Column>
      </View>
    );
  };

  const report = () => {
    const itemFunction = (icon, text, onPress) => {
      return (
        <TouchableOpacity onPress={onPress}>
          <Row padding={20}>
            {icon}
            <SizedBox width={10}></SizedBox>
            <Text>{text}</Text>
            <View style={{flex: 1}}></View>
            <NextArrowIcon></NextArrowIcon>
          </Row>
        </TouchableOpacity>
      );
    };

    return (
      <Column>
        {itemFunction(
          <ListFillerIcon
            color={appTheme.color_main_1}
            size={25}></ListFillerIcon>,
          'Các đơn hàng giới thiệu',
          () => {
            navigation.navigate('ORDER_CTV', {
              routeName: 0,
            });
          },
        )}
        <Divider></Divider>
        {itemFunction(
          <MoneyIcon color={appTheme.color_main_1}></MoneyIcon>,
          'Lịch sử thay đổi số dư',
          () => {
            navigation.navigate('PAYMENT_HISTORY_CTV');
          },
        )}
        <Divider></Divider>
        {itemFunction(
          <ReportIcon color={appTheme.color_main_1}></ReportIcon>,
          'Báo cáo hoa hồng',
          () => {
            navigation.navigate('REPORT_ROSE');
          },
        )}
        <Divider></Divider>
        {itemFunction(
          <GroupEmptyIcon
            size={25}
            color={appTheme.color_main_1}></GroupEmptyIcon>,
          'Danh sách giới thiệu',
          () => {
            navigation.navigate('CTV_INTRODUCT');
          },
        )}
        <Divider></Divider>
      </Column>
    );
  };

  return (
    <Scaffold
      body={
        <CheckLoginCPN
          child={
            <RegisterCtvCPN
              child={
                <Scaffold
                  appbar={<IAppBar title={'Ví cộng tác viên'}></IAppBar>}
                  body={
                    badge.status_collaborator == 0 &&
                    infoCustomer?.is_collaborator == true ? (
                      <View style={{flex: 1}}>
                        <Column mainAxisAlignment={'center'}>
                          <Container
                            padding={10}
                            child={
                              <Text>
                                Chức năng CTV của bạn chưa được phê duyệt!\nHãy
                                liên hệ với chủ shop để được giải quyết
                              </Text>
                            }></Container>
                        </Column>
                      </View>
                    ) : (
                      <Column>
                        <View
                          style={{
                            height: 150,
                            width: windowWidth,
                            position: 'relative',
                          }}>
                          <Column crossAxisAlignment={'center'}>
                            <SizedBox height={20}></SizedBox>
                            <Text>số dư</Text>
                            <SizedBox height={10}></SizedBox>
                            <Text style={{fontSize: 25}}>{`${convertToMoney(
                              generalInfoPaymentCtv.balance ?? 0,
                            )} ₫`}</Text>
                            {(generalInfoPaymentCtv.money_payment_request ??
                              0) != 0 && (
                              <Text>{`Đóng băng: ${convertToMoney(
                                generalInfoPaymentCtv.money_payment_request ??
                                  0,
                              )} ₫`}</Text>
                            )}
                            {generalInfoPaymentCtv.has_payment_request ==
                              true && (
                              <View
                                style={{
                                  position: 'absolute',
                                  left: 10,
                                  bottom: 5,
                                  backgroundColor: '#FEEBEB',
                                  padding: '5px 10px',
                                  borderRadius: 5,
                                }}>
                                <Text style={{fontSize: 11}}>
                                  Bạn đã gửi yêu cầu thanh toán cho shop, vui
                                  lòng chờ xác nhận !
                                </Text>
                              </View>
                            )}
                          </Column>
                        </View>
                        <Container
                          height={10}
                          backgroundColor={'#fafafa'}></Container>
                        <Row>
                          <TouchableOpacity
                            onPress={() => {
                              setIndexTab(0);
                            }}
                            style={{
                              flex: 1,
                              padding: 15,
                              borderBottomColor:
                                indexTab == 0 ? appTheme.color_main_1 : 'white',

                              borderBottomWidth: 1,
                            }}>
                            <Text style={{textAlign: 'center'}}>
                              Thông tin ví
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setIndexTab(1);
                            }}
                            style={{
                              flex: 1,
                              padding: 15,
                              borderBottomColor:
                                indexTab == 1 ? appTheme.color_main_1 : 'white',
                              borderBottomWidth: 1,
                            }}>
                            <Text style={{textAlign: 'center'}}>
                              Thanh toán
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setIndexTab(2);
                            }}
                            style={{
                              flex: 1,
                              padding: 15,
                              borderBottomColor:
                                indexTab == 2 ? appTheme.color_main_1 : 'white',
                              borderBottomWidth: 1,
                            }}>
                            <Text style={{textAlign: 'center'}}>Thống kê</Text>
                          </TouchableOpacity>
                        </Row>
                        <Container
                          height={10}
                          backgroundColor={'#fafafa'}></Container>
                        <View style={{flex: 1}}>
                          <ScrollView>
                            {indexTab == 0
                              ? infoTab()
                              : indexTab == 1
                              ? infoPayment()
                              : report()}
                          </ScrollView>
                        </View>
                      </Column>
                    )
                  }></Scaffold>
              }></RegisterCtvCPN>
          }></CheckLoginCPN>
      }></Scaffold>
  );
});

export default CtvWalletScreen;
