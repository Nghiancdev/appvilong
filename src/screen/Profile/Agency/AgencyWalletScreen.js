import React, {useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../../store/DataAppStore';
import Scaffold from '../../../components/Scafold';
import IAppBar from '../../../components/AppBar';
import Column from '../../../components/Column';
import Row from '../../../components/Row';
import SizedBox from '../../../components/SizedBox';
import Container from '../../../components/Container';
import WalletIcon from '../../../components/Icons/Profile/WalletIcon';
import {Divider, useTheme} from 'react-native-paper';
import NextArrowIcon from '../../../components/Icons/NextArrowIcon';
import CheckLoginCPN from '../../../components/CheckLoginCPN';
import {convertToMoney, getDDMMYY} from '../../../utils/apis/stringUtil';
import GroupEmptyIcon from '../../../components/Icons/GroupEmptyIcon';
import PaymentIcon from '../../../components/Icons/PaymentIcon';
import PersonCTVIcon from '../../../components/Icons/PersonCTVIcon';
import GiffFillIcon from '../../../components/Icons/GiffFillIcon';
import CheckedIcon from '../../../components/Icons/CheckedIcon';
import PointIcon from '../../../components/Icons/PointIcon';
import ListFillerIcon from '../../../components/Icons/ListFillerIcon';
import MoneyIcon from '../../../components/Icons/MoneyIcon';
import ReportIcon from '../../../components/Icons/ReportIcon';
import {useAgencyStore} from '../../../store/AgencyStore';
import RegisterAgencyCPN from '../CPN/RegisterAgencyCPN';
import ChartIcon from '../../../components/Icons/ChartIcon';

const AgencyWalletScreen = observer(({route, navigation}) => {
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
    requestPayment,
  } = useAgencyStore();
  const theme = useTheme();
  const [indexTab, setIndexTab] = React.useState(0);
  const [indexMain, setIndexMain] = React.useState(0);
  const [type, setType] = React.useState(0);

  useEffect(() => {
    getGeneralInfoPaymentCtv();
    getInfoCTV();
  }, []);

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
            navigation.navigate('ORDER_AGENCY', {
              routeName: 3,
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
          <Text style={{fontWeight: 500}}>THƯỞNG THEO MỨC HOA HỒNG</Text>
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
              <Row
                paddingHorizontal={10}
                paddingVertical={5}
                mainAxisAlignment="space-between">
                <Text>Họ và tên:</Text>
                <Text>{`${infoCtv.first_and_last_name || ""}`}</Text>
              </Row>
              <Row
                paddingHorizontal={10}
                paddingVertical={5}
                mainAxisAlignment="space-between">
                <Text>Số CMND/CCCD:</Text>
                <Text>{`${infoCtv.cmnd || ""}`}</Text>
              </Row>
              <Text style={{fontWeight: 500}}>Tài khoản ngân hàng:</Text>
              <Row paddingHorizontal={10} paddingVertical={5}>
                <Text>{`${infoCtv.bank|| "" }`}</Text>
              </Row>
              <Row paddingHorizontal={10} paddingVertical={5}>
                <Text>Số CMND/CCCD:</Text>
                <Text>{`${infoCtv.account_number|| ""}`}</Text>
              </Row>
              <SizedBox height={10} width={windowWidth}></SizedBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AGENCY_PAYMENT_INFO');
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
            <Text>{`Tiền từ Ví Đại lý của thành viên Diamond sẽ được thanh toán định kỳ ${
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
            navigation.navigate('ORDER_AGENCY', {
              routeName: 0,
            });
          },
        )}
        <Divider></Divider>
        {itemFunction(
          <MoneyIcon color={appTheme.color_main_1}></MoneyIcon>,
          'Lịch sử thay đổi số dư',
          () => {
            navigation.navigate('PAYMENT_HISTORY_AGENCY');
          },
        )}
        <Divider></Divider>
        {itemFunction(
          <ReportIcon color={appTheme.color_main_1}></ReportIcon>,
          'Báo cáo hoa hồng',
          () => {
            navigation.navigate('REPORT_ROSE_AGENCY');
          },
        )}
        <Divider></Divider>
        {itemFunction(
          <GroupEmptyIcon
            size={25}
            color={appTheme.color_main_1}></GroupEmptyIcon>,
          'Danh sách giới thiệu',
          () => {
            navigation.navigate('AGENCY_INTRODUCT');
          },
        )}
        <Divider></Divider>
      </Column>
    );
  };

  const transaction = () => {
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
    const getText = type => {
      if (type == 0) return 'Theo tháng';
      if (type == 1) return 'Theo tuần';
      if (type == 2) return 'Theo quý';
      if (type == 3) return 'Theo năm';
      return 'Chọn kỳ';
    };

    const itemReport = (title, icon, number) => {
      return (
        <View
          style={{
            padding: 10,
            margin: 10,
            width: (windowWidth - 40) / 2,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#dcdcde',
            borderWidth: 1,
            flex: 1,
          }}>
          <Row padding={10}>
            {icon}
            <SizedBox width={10}></SizedBox>
            <Text style={{fontWeight: 500, fontSize: 15}}>{title}</Text>
          </Row>
          <Divider></Divider>
          <Text>{convertToMoney(number)}</Text>
        </View>
      );
    };

    return (
      <ScrollView>
        <Column>
          <SizedBox width={windowWidth}></SizedBox>
          <Row mainAxisAlignment={'space-between'} padding={20}>
            <Text>Cấp đại lý:</Text>
            <Text>{`${infoCtv?.agency_type?.name}`}</Text>
          </Row>
          <Divider></Divider>
          {itemFunction(
            <ListFillerIcon
              color={appTheme.color_main_1}
              size={25}></ListFillerIcon>,
            'Các đơn hàng đã đặt',
            () => {
              navigation.navigate('ORDER_AGENCY', {
                routeName: 0,
              });
            },
          )}
          <Container height={10} backgroundColor={'#fafafa'}></Container>
          <Row padding={10}>
            <TouchableOpacity
              onPress={() => {
                setType(0);
              }}
              style={{
                flex: 1,
                padding: 10,
                alignItems: 'center',
                bạckgroundColor: 'white',
                borderColor: type == 0 ? 'red' : 'white',
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <Text style={{color: type == 0 ? 'red' : 'black'}}>Tháng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setType(1);
              }}
              style={{
                flex: 1,
                padding: 10,
                alignItems: 'center',
                bạckgroundColor: 'white',
                borderColor: type == 1 ? 'red' : 'white',
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <Text style={{color: type == 1 ? 'red' : 'black'}}>Tuần</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setType(2);
              }}
              style={{
                flex: 1,
                padding: 10,
                alignItems: 'center',
                bạckgroundColor: 'white',
                borderColor: type == 2 ? 'red' : 'white',
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <Text style={{color: type == 2 ? 'red' : 'black'}}>Quý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setType(3);
              }}
              style={{
                flex: 1,
                padding: 10,
                alignItems: 'center',
                bạckgroundColor: 'white',
                borderColor: type == 3 ? 'red' : 'white',
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <Text style={{color: type == 3 ? 'red' : 'black'}}>Năm</Text>
            </TouchableOpacity>
          </Row>
          <SizedBox height={10}></SizedBox>
          <Row>
            {itemReport(
              'Tổng doanh số',
              <ChartIcon color={'blue'}></ChartIcon>,
              generalInfoPaymentCtv.total_after_discount_no_bonus ?? 0,
            )}
            {itemReport(
              'Tổng đơn',
              <ListFillerIcon
                color={appTheme.color_main_1}
                size={25}></ListFillerIcon>,
              generalInfoPaymentCtv.number_order ?? 0,
            )}
          </Row>
          <Row>
            {itemReport(
              'Doanh thu ngày',
              <ChartIcon color={'blue'}></ChartIcon>,
              generalInfoPaymentCtv.total_after_discount_no_bonus_in_day ?? 0,
            )}
            {itemReport(
              'Tổng đơn ngày',
              <ListFillerIcon
                color={appTheme.color_main_1}
                size={25}></ListFillerIcon>,
              generalInfoPaymentCtv.count_in_day ?? 0,
            )}
          </Row>
          {type == 0 && (
            <Row>
              {itemReport(
                'Doanh thu tháng',
                <ChartIcon color={'blue'}></ChartIcon>,
                generalInfoPaymentCtv.total_after_discount_no_bonus_in_month ??
                  0,
              )}
              {itemReport(
                'Tổng đơn tháng',
                <ListFillerIcon
                  color={appTheme.color_main_1}
                  size={25}></ListFillerIcon>,
                generalInfoPaymentCtv.count_in_month ?? 0,
              )}
            </Row>
          )}
          {type == 1 && (
            <Row>
              {itemReport(
                'Doanh thu tuần',
                <ChartIcon color={'blue'}></ChartIcon>,
                generalInfoPaymentCtv.total_after_discount_no_bonus_in_week ??
                  0,
              )}
              {itemReport(
                'Tổng đơn tuần',
                <ListFillerIcon
                  color={appTheme.color_main_1}
                  size={25}></ListFillerIcon>,
                generalInfoPaymentCtv.count_in_week ?? 0,
              )}
            </Row>
          )}
          {type == 2 && (
            <Row>
              {itemReport(
                'Doanh thu quý',
                <ChartIcon color={'blue'}></ChartIcon>,
                generalInfoPaymentCtv.total_after_discount_no_bonus_in_quarter ??
                  0,
              )}
              {itemReport(
                'Tổng đơn quý',
                <ListFillerIcon
                  color={appTheme.color_main_1}
                  size={25}></ListFillerIcon>,
                generalInfoPaymentCtv.count_in_quarter ?? 0,
              )}
            </Row>
          )}
          {type == 3 && (
            <Row>
              {itemReport(
                'Doanh thu năm',
                <ChartIcon color={'blue'}></ChartIcon>,
                generalInfoPaymentCtv.total_after_discount_no_bonus_in_year ??
                  0,
              )}
              {itemReport(
                'Tổng đơn năm',
                <ListFillerIcon
                  color={appTheme.color_main_1}
                  size={25}></ListFillerIcon>,
                generalInfoPaymentCtv.count_in_year ?? 0,
              )}
            </Row>
          )}
        </Column>
      </ScrollView>
    );
  };

  return (
    <Scaffold
      body={
        <CheckLoginCPN
          child={
            <RegisterAgencyCPN
              child={
                <Scaffold
                  appbar={<IAppBar title={'Ví đại lý'}></IAppBar>}
                  body={
                    badge.status_collaborator == 0 &&
                    infoCustomer?.is_agency == true ? (
                      <View style={{flex: 1}}>
                        <Column mainAxisAlignment={'center'}>
                          <Container
                            padding={10}
                            child={
                              <Text>
                                Chức năng Đại lý của bạn chưa được phê
                                duyệt!\nHãy liên hệ với chủ shop để được giải
                                quyết
                              </Text>
                            }></Container>
                        </Column>
                      </View>
                    ) : (
                      <Column>
                        <Row>
                          <TouchableOpacity
                            onPress={() => {
                              setIndexMain(0);
                            }}
                            style={{
                              flex: 1,
                              padding: 15,
                              borderBottomColor:
                              indexMain == 0 ? appTheme.color_main_1 : 'white',

                              borderBottomWidth: 1,
                            }}>
                            <Text style={{textAlign: 'center'}}>Nhập hàng</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setIndexMain(1);
                            }}
                            style={{
                              flex: 1,
                              padding: 15,
                              borderBottomColor:
                              indexMain == 1 ? appTheme.color_main_1 : 'white',
                              borderBottomWidth: 1,
                            }}>
                            <Text style={{textAlign: 'center'}}>Hoa hồng</Text>
                          </TouchableOpacity>
                        </Row>
                        {indexMain == 0 ? (
                          transaction()
                        ) : (
                          <>
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
                                      Bạn đã gửi yêu cầu thanh toán cho shop,
                                      vui lòng chờ xác nhận !
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
                                    indexTab == 0
                                      ? appTheme.color_main_1
                                      : 'white',

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
                                    indexTab == 1
                                      ? appTheme.color_main_1
                                      : 'white',
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
                                    indexTab == 2
                                      ? appTheme.color_main_1
                                      : 'white',
                                  borderBottomWidth: 1,
                                }}>
                                <Text style={{textAlign: 'center'}}>
                                  Thống kê
                                </Text>
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
                          </>
                        )}
                      </Column>
                    )
                  }></Scaffold>
              }></RegisterAgencyCPN>
          }></CheckLoginCPN>
      }></Scaffold>
  );
});

export default AgencyWalletScreen;
