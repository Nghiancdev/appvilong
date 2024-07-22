import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../store/DataAppStore';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import {Image} from 'react-native';
import Column from '../../components/Column';
import Row from '../../components/Row';
import SizedBox from '../../components/SizedBox';
import Wrap from '../../components/Wrap';
import Container from '../../components/Container';
import WalletIcon from '../../components/Icons/Profile/WalletIcon';
import {Badge, Divider, useTheme} from 'react-native-paper';
import {hexToRgba, rgbaOpacity} from '../../utils/apis/colorsUtil';
import BoxProfileIcon from '../../components/Icons/Profile/BoxProfileIcon';
import TruckProfileIcon from '../../components/Icons/Profile/TruckProfileIcon';
import StarCircelIcon from '../../components/Icons/Profile/StarCircelIcon';
import NextArrowIcon from '../../components/Icons/NextArrowIcon';
import Expanded from '../../components/Expanded';
import CheckLoginCPN from '../../components/CheckLoginCPN';
import StoreCode from '../../singletons/StoreCode';
import UserUtil from '../../utils/apis/userUtil';
import {useNavigation} from '@react-navigation/native';
import {getDDMMYY} from '../../utils/apis/stringUtil';
import {toast} from '../../utils/apis/toast';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const ProfileScreen = observer(({route, navigation}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {badge, setIsLogin, infoCustomer} = useDataAppStore();
  const theme = useTheme();

  const cardCPN = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (
            infoCustomer?.is_collaborator == true ||
            (badge.agency_register_request?.status != 1 &&
              badge.agency_register_request != null)
          ) {
            if (
              badge.collaborator_register_request?.status != 2 &&
              badge.collaborator_register_request != null
            ) {
              navigation.navigate('CHECK_STT_CTV');
              return;
            }
            navigation.navigate('CTV');
          } else {
            if (
              badge.agency_register_request?.status != 2 &&
              badge.agency_register_request != null
            ) {
              navigation.navigate('CHECK_STT_AGENCY');
              return;
            }
            navigation.navigate('AGENCY');
          }
        }}>
        <View style={styles.card}>
          <Image
            source={require('../../../assets/images/card_profile.png')}
            style={styles.backgroundImage}
          />
          <View style={{width: windowWidth, flex: 1, padding: 30}}>
            <Column mainAxisAlignment={'space-between'}>
              <Row mainAxisAlignment={'space-between'}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                  }}>
                  Furniture
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#E2E2E2',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                  }}>
                  Nền tảng 0 đồng
                </Text>
              </Row>
              <Text style={styles.textCtv}>{` ${
                infoCustomer?.is_collaborator == true
                  ? 'CỘNG TÁC VIÊN'
                  : infoCustomer?.is_agency == true
                  ? 'ĐẠI LÝ'
                  : 'KHÁCH HÀNG'
              }`}</Text>
              <Row mainAxisAlignment={'space-between'}>
                <Column>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#E2E2E2',
                      fontWeight: '500',
                    }}>
                    Họ và tên
                  </Text>
                  <SizedBox height={5}></SizedBox>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                    }}>
                    {infoCustomer?.name || 'Khách hàng'}
                  </Text>
                </Column>
                <Column crossAxisAlignment={'flex-end'}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#E2E2E2',
                      fontWeight: '500',
                    }}>
                    Ngày tham gia
                  </Text>
                  <SizedBox height={5}></SizedBox>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'white',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                    }}>
                    {getDDMMYY(infoCustomer?.created_at) || 'Khách hàng'}
                  </Text>
                </Column>
              </Row>
            </Column>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const functionItem = (icon, title, onPress) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Column flex={0}>
          <Container
            padding={15}
            flex={0}
            width={windowWidth}
            backgroundColor={'white'}
            child={
              <Row>
                <Image source={icon} style={{width: 22, height: 22}} />
                <SizedBox width={10}></SizedBox>
                <Expanded child={<Text>{title}</Text>}></Expanded>
                <NextArrowIcon></NextArrowIcon>
              </Row>
            }></Container>
          <Divider></Divider>
        </Column>
      </TouchableOpacity>
    );
  };

  const handlePress = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Trang không tồn tại: ${url}`);
    }
  };

  return (
    <Scaffold
      appbar={
        <IAppBar
          title={'TÀI KHOẢN'}
          automaticallyImplyLeading={false}></IAppBar>
      }
      body={
        <CheckLoginCPN
          child={
            <View style={styles.container}>
              <ScrollView>
                {cardCPN()}
                <Wrap>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ORDER', {routeName: 0});
                    }}>
                    <Container
                      padding={0}
                      flex={0}
                      width={windowWidth / 4}
                      child={
                        <Container
                          padding={15}
                          backgroundColor={'white'}
                          child={
                            <Column crossAxisAlignment={'center'} gap={10}>
                              <Container
                                flex={0}
                                padding={10}
                                borderRadius={1000}
                                backgroundColor={rgbaOpacity(
                                  theme.colors.primary,
                                  0.1,
                                )}
                                child={
                                  <>
                                    <WalletIcon
                                      color={theme.colors.primary}
                                      size={30}></WalletIcon>
                                    {(badge.orders_waitting_for_progressing ??
                                      0) > 0 && (
                                      <Badge
                                        style={{
                                          position: 'absolute',
                                          top: -10,
                                          right: -10,
                                        }}>
                                        {badge.orders_waitting_for_progressing}
                                      </Badge>
                                    )}
                                  </>
                                }></Container>
                              <Text style={{color: '#64748B', fontSize: 10}}>
                                Chờ xác nhận
                              </Text>
                            </Column>
                          }></Container>
                      }></Container>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ORDER', {
                        routeName: 1,
                      });
                    }}>
                    <Container
                      padding={0}
                      flex={0}
                      width={windowWidth / 4}
                      child={
                        <Container
                          padding={15}
                          backgroundColor={'white'}
                          child={
                            <Column crossAxisAlignment={'center'} gap={10}>
                              <Container
                                flex={0}
                                padding={10}
                                borderRadius={1000}
                                backgroundColor={rgbaOpacity(
                                  theme.colors.primary,
                                  0.1,
                                )}
                                child={
                                  <>
                                    <BoxProfileIcon
                                      color={theme.colors.primary}
                                      size={30}></BoxProfileIcon>
                                    {(badge.orders_packing ?? 0) > 0 && (
                                      <Badge
                                        style={{
                                          position: 'absolute',
                                          top: -10,
                                          right: -10,
                                        }}>
                                        {badge.orders_packing}
                                      </Badge>
                                    )}
                                  </>
                                }></Container>
                              <Text style={{color: '#64748B', fontSize: 10}}>
                                Chờ lấy hàng
                              </Text>
                            </Column>
                          }></Container>
                      }></Container>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ORDER', {
                        routeName: 3,
                      });
                    }}>
                    <Container
                      padding={0}
                      flex={0}
                      width={windowWidth / 4}
                      child={
                        <Container
                          padding={15}
                          backgroundColor={'white'}
                          child={
                            <Column crossAxisAlignment={'center'} gap={10}>
                              <Container
                                flex={0}
                                padding={10}
                                borderRadius={1000}
                                backgroundColor={rgbaOpacity(
                                  theme.colors.primary,
                                  0.1,
                                )}
                                child={
                                  <>
                                    <TruckProfileIcon
                                      color={theme.colors.primary}
                                      size={30}></TruckProfileIcon>
                                    {(badge.orders_shipping ?? 0) > 0 && (
                                      <Badge
                                        style={{
                                          position: 'absolute',
                                          top: -10,
                                          right: -10,
                                        }}>
                                        {badge.orders_shipping}
                                      </Badge>
                                    )}
                                  </>
                                }></Container>
                              <Text style={{color: '#64748B', fontSize: 10}}>
                                Đang giao
                              </Text>
                            </Column>
                          }></Container>
                      }></Container>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ORDER', {
                        routeName: 5,
                      });
                    }}>
                    <Container
                      padding={0}
                      flex={0}
                      width={windowWidth / 4}
                      child={
                        <Container
                          padding={15}
                          backgroundColor={'white'}
                          child={
                            <Column crossAxisAlignment={'center'} gap={10}>
                              <Container
                                flex={0}
                                padding={10}
                                borderRadius={1000}
                                backgroundColor={rgbaOpacity(
                                  theme.colors.primary,
                                  0.1,
                                )}
                                child={
                                  <>
                                    <StarCircelIcon
                                      color={theme.colors.primary}
                                      size={30}></StarCircelIcon>
                                    {(badge.orders_no_reviews ?? 0) > 0 && (
                                      <Badge
                                        style={{
                                          position: 'absolute',
                                          top: -10,
                                          right: -10,
                                        }}>
                                        {badge.orders_no_reviews}
                                      </Badge>
                                    )}
                                  </>
                                }></Container>
                              <Text style={{color: '#64748B', fontSize: 10}}>
                                Đánh giá
                              </Text>
                            </Column>
                          }></Container>
                      }></Container>
                  </TouchableOpacity>
                </Wrap>
                <Column crossAxisAlignment={'center'}>
                  <SizedBox height={20}></SizedBox>
                  <Image
                    source={require('../../../assets/images/code_ctv.png')}
                    style={{
                      width: windowWidth / 2,
                      height: 100,
                      objectFit: 'contain',
                    }}
                  />
                  <SizedBox height={20}></SizedBox>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('CODE_RETRODUCE');
                    }}>
                    <Container
                      padding={10}
                      borderRadius={10}
                      width={250}
                      backgroundColor={theme.colors.primary}
                      alignItems={'center'}
                      child={
                        <Text style={{color: 'white'}}>Mã giới thiệu</Text>
                      }></Container>
                  </TouchableOpacity>
                  <SizedBox height={20}></SizedBox>
                  {/* {functionItem(
                    require('../../../assets/images/profile/register_ctv.png'),
                    'Sản phẩm',
                  )} */}
                  {infoCustomer?.is_agency == true ||
                    (badge.agency_register_request?.status != 1 &&
                    badge.agency_register_request != null ? (
                      <></>
                    ) : (
                      functionItem(
                        require('../../../assets/images/profile/ctv_register.png'),
                        `${
                          infoCustomer?.is_collaborator == true
                            ? 'Ví Cộng tác viên'
                            : `Đăng ký CTV ${
                                badge.collaborator_register_request?.status == 0
                                  ? ' (Đang chờ duyệt)'
                                  : ''
                              }`
                        }`,
                        onPress => {
                          if (
                            badge.collaborator_register_request?.status != 2 &&
                            badge.collaborator_register_request != null
                          ) {
                            navigation.navigate('CHECK_STT_CTV');

                            return;
                          }
                          if (
                            badge.required_agency_ctv_has_referral_code ==
                              true &&
                            infoCustomer?.is_collaborator == false
                          ) {
                            toast.erorr(
                              'Bạn cần người giới thiệu để đăng ký làm CTV ',
                            );
                          } else if (
                            badge.required_agency_ctv_has_referral_code ==
                              true &&
                            infoCustomer?.is_collaborator != false
                          ) {
                            navigation.navigate('CTV');
                          } else if (
                            badge.required_agency_ctv_has_referral_code == false
                          ) {
                            navigation.navigate('CTV');
                          }
                        },
                      )
                    ))}
                  {infoCustomer?.is_collaborator == true ||
                  (badge.agency_register_request?.status != 1 &&
                    badge.agency_register_request != null) ? (
                    <></>
                  ) : (
                    functionItem(
                      require('../../../assets/images/profile/agency_register.png'),
                      `${
                        infoCustomer?.is_agency == true
                          ? 'Ví Đại lý'
                          : `Đăng ký Đại lý${
                              badge.agency_register_request?.status == 0
                                ? ' (Đang chờ duyệt)'
                                : ''
                            }`
                      }`,
                      onPress => {
                        if (
                          badge.agency_register_request?.status != 2 &&
                          badge.agency_register_request != null
                        ) {
                          navigation.navigate('CHECK_STT_AGENCY');
                          return;
                        }
                        if (
                          badge.required_agency_ctv_has_referral_code == true &&
                          infoCustomer?.is_agency == false
                        ) {
                          toast.erorr(
                            'Bạn cần người giới thiệu để đăng ký làm đại lý',
                          );
                        } else if (
                          badge.required_agency_ctv_has_referral_code == true &&
                          infoCustomer?.is_agency != false
                        ) {
                          navigation.navigate('AGENCY');
                        } else if (
                          badge.required_agency_ctv_has_referral_code == false
                        ) {
                          navigation.navigate('AGENCY');
                        }
                      },
                    )
                  )}
                  {functionItem(
                    require('../../../assets/images/profile/xu.png'),
                    'Xu tích luỹ',
                    onPress => {
                      navigation.navigate('POINT');
                    },
                  )}
                  {functionItem(
                    require('../../../assets/images/profile/buy_again.png'),
                    'Mua lại',
                    onPress => {
                      navigation.navigate('PURCHARSED_PRODUCT');
                    },
                  )}
                  {functionItem(
                    require('../../../assets/images/profile/voucher_wallet.png'),
                    'Ví Voucher',
                    onPress => {
                      navigation.navigate('VOUCHER');
                    },
                  )}
                  {functionItem(
                    require('../../../assets/images/profile/heart_fill.png'),
                    'Sản phẩm yêu thích',
                    onPress => {
                      navigation.navigate('LIKED_PRODUCT');
                    },
                  )}
                  {functionItem(
                    require('../../../assets/images/profile/location.png'),
                    'Địa chỉ của tôi',
                    onPress => {
                      navigation.navigate('MY_ADDRESS');
                    },
                  )}
                  {functionItem(
                    require('../../../assets/images/profile/contact.png'),
                    'Liên hệ',
                    onPress => {
                      navigation.navigate('CONTACT');
                    },
                  )}
                  {functionItem(
                    require('../../../assets/images/profile/web.png'),
                    'Website',
                    onPress => {
                      if (badge.domain == null) {
                        url = `https://${StoreCode.getStoreCode()}.myiki.vn`;
                        handlePress(url);
                        return;
                      }

                      if (badge.domain.includes('https://')) {
                        url = badge.domain;

                        handlePress(url);
                        return;
                      } else {
                        url = `https://${badge.domain}`;

                        handlePress(url);
                        return;
                      }
                    },
                  )}
                  {/* {functionItem(
                    require('../../../assets/images/profile/post_new.png'),
                    'Cập nhật thông tin',
                    onPress => {
                      navigation.navigate('UPDATE_PROFILE', {
                        automaticallyImplyLeading: true,
                      });
                    },
                  )} */}
                  {functionItem(
                    require('../../../assets/images/profile/log_out.png'),
                    'Đăng xuất',
                    onPress => {
                      Alert.alert(
                        'Đăng xuất',
                        'Bạn có muốn chắc chắn đăng xuất !',
                        [
                          {
                            text: 'Thoát',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              navigation.navigate('Home');
                              setIsLogin(false);
                              UserUtil.logout();
                            },
                          },
                        ],
                      );
                    },
                  )}
                  {functionItem(
                    require('../../../assets/images/profile/log_out.png'),
                    'Yêu cầu xoá tài khoản',
                    onPress => {
                      Alert.alert(
                        'Yêu cầu xoá tài khoản',
                        'Tài khoản của bạn sẽ được xoá sau khoảng thời gian 1 ngày, trong thời gian này bạn có thể huỷ kích hoạt xoá tài khoản bằng cách đăng nhập lại!',
                        [
                          {
                            text: 'Thoát',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              navigation.navigate('Home');
                              setIsLogin(false);
                              UserUtil.logout();
                            },
                          },
                        ],
                      );
                    },
                  )}
                </Column>
              </ScrollView>
            </View>
          }></CheckLoginCPN>
      }></Scaffold>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  textCtv: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    textShadowOffset: {width: 0, height: 4}, // Độ phân tán theo chiều ngang và dọc
    textShadowRadius: 4, // Bán kính phân tán
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    width: SCREEN_WIDTH,
    marginTop: 10,
    height: 200,
  },
  backgroundImage: {
    position: 'absolute',
    borderRadius: 10,
    width: SCREEN_WIDTH - 20,
  },
});

export default ProfileScreen;
