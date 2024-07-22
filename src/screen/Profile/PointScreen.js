import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
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
import {Divider, useTheme} from 'react-native-paper';
import {hexToRgba, rgbaOpacity} from '../../utils/apis/colorsUtil';
import BoxProfileIcon from '../../components/Icons/Profile/BoxProfileIcon';
import TruckProfileIcon from '../../components/Icons/Profile/TruckProfileIcon';
import StarCircelIcon from '../../components/Icons/Profile/StarCircelIcon';
import NextArrowIcon from '../../components/Icons/NextArrowIcon';
import Expanded from '../../components/Expanded';
import CheckLoginCPN from '../../components/CheckLoginCPN';
import WalletColorIcon from '../../components/Icons/WalletColorIcon';
import {convertToMoney, getDDMMYY} from '../../utils/apis/stringUtil';
import {it} from 'date-fns/locale';
import CheckListIcon from '../../components/Icons/CheckListIcon';
import Ribbon3Icon from '../../components/Icons/Ribbon3Icon';
import GroupEmptyIcon from '../../components/Icons/GroupEmptyIcon';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const PointScreen = observer(({route, navigation}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {
    badge,
    getScoreHistory,
    listScoreHistory,
    getRewardPointCtm,
    rewardPointCtm,
  } = useDataAppStore();
  const theme = useTheme();

  useEffect(() => {
    getScoreHistory();
    getRewardPointCtm();
  }, []);

  const itemHistory = scoreHistoryItem => {
    return (
      <Column>
        <Row padding={10}>
          <Column>
            {(scoreHistoryItem.content ?? '') != '' && (
              <Text>{`${scoreHistoryItem.content}`}</Text>
            )}
            <SizedBox height={5}></SizedBox>
            <Text>{`Xu hiện tại : ${convertToMoney(
              scoreHistoryItem.current_point ?? 0,
            )}`}</Text>
            <SizedBox height={5}></SizedBox>
            <Text style={{fontSize: 12, color: 'grey'}}>{`${getDDMMYY(
              scoreHistoryItem.created_at,
            )}`}</Text>
          </Column>
          <Text style={{color: 'green', fontWeight: 500}}>
            {`${(scoreHistoryItem.point ?? 0) > 0 ? '+' : ''}${convertToMoney(
              scoreHistoryItem.point ?? 0,
            )}`}
          </Text>
        </Row>
        <Divider></Divider>
      </Column>
    );
  };

  return (
    <Scaffold
      appbar={<IAppBar title={'Xu tích luỹ'}></IAppBar>}
      body={
        <ScrollView>
          <Row padding={10}>
            <View
              style={{
                borderRadius: 1000,
                borderColor: 'grey',
                borderWidth: 1,
                padding: 7,
              }}>
              <WalletColorIcon></WalletColorIcon>
            </View>
            <SizedBox width={10}></SizedBox>
            <Text>Xu tích luỹ:</Text>
          </Row>
          <Container
            padding={20}
            marginRight={20}
            marginLeft={20}
            marginBottom={20}
            width={windowWidth - 40}
            alignItems={'center'}
            borderColor={'#e6b92f'}
            child={
              <Text
                style={{
                  color: '#e6b92f',
                  fontWeight: 'bold',
                }}>{`${convertToMoney(badge.customer_point ?? 0)} Xu`}</Text>
            }></Container>
          <TouchableOpacity
            onPress={() => {
              setIsCollapsed(!isCollapsed);
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontWeight: 500,
                color: '#e6b92f',
                textAlign: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              Lịch sử tích điểm
            </Text>
          </TouchableOpacity>
          {isCollapsed &&
            listScoreHistory.map((item, index) => {
              return itemHistory(item);
            })}
          <Row padding={10}>
            <View
              style={{
                borderRadius: 1000,
                borderColor: 'grey',
                borderWidth: 1,
                padding: 7,
              }}>
              <WalletColorIcon></WalletColorIcon>
            </View>
            <SizedBox width={10}></SizedBox>
            <Text>Chính sách tích xu:</Text>
          </Row>
          <Container
            padding={20}
            marginRight={20}
            marginLeft={20}
            marginBottom={20}
            width={windowWidth - 40}
            alignItems={'center'}
            borderColor={'#e6b92f'}
            child={
              <Text
                style={{
                  color: '#e6b92f',
                  fontWeight: 'bold',
                }}>{`1 Xu = ${rewardPointCtm?.money_a_point ?? 0} VNĐ`}</Text>
            }></Container>
          <Container
            height={8}
            width={windowWidth}
            backgroundColor={'#fafafa'}></Container>
          <Row padding={10}>
            <View
              style={{
                borderRadius: 1000,
                borderColor: 'grey',
                borderWidth: 1,
                padding: 7,
              }}>
              <CheckListIcon></CheckListIcon>
            </View>
            <SizedBox width={10}></SizedBox>
            <Column>
              <Text style={{fontWeight: 500}}>Hoàn xu đơn hàng</Text>
              <SizedBox height={5}></SizedBox>
              <Text>{`${rewardPointCtm?.percent_refund ?? 0}% ${
                rewardPointCtm?.is_set_order_max_point == true
                  ? `Giới hạn ${convertToMoney(
                      rewardPointCtm?.order_max_point ?? 0,
                    )} Xu`
                  : ''
              }`}</Text>
              <SizedBox height={5}></SizedBox>
              <Text style={{fontSize: 11, color: 'grey'}}>
                VD: 100k hoàn 10% = 10k = 10k Xu (1Xu = 1VNĐ)
              </Text>
            </Column>
          </Row>
          <Divider></Divider>
          <Row padding={10}>
            <View
              style={{
                borderRadius: 1000,
                borderColor: 'grey',
                borderWidth: 1,
                padding: 7,
              }}>
              <Ribbon3Icon></Ribbon3Icon>
            </View>
            <SizedBox width={10}></SizedBox>
            <Column>
              <Text style={{fontWeight: 500}}>Đánh giá sản phẩm</Text>
              <SizedBox height={5}></SizedBox>
              <Text style={{color: 'green'}}>{`+${convertToMoney(
                rewardPointCtm?.point_review ?? 0,
              )} Xu`}</Text>
            </Column>
          </Row>
          <Divider></Divider>
          <Row padding={10}>
            <View
              style={{
                borderRadius: 1000,
                borderColor: 'grey',
                borderWidth: 1,
                padding: 7,
              }}>
              <GroupEmptyIcon></GroupEmptyIcon>
            </View>
            <SizedBox width={10}></SizedBox>
            <Column>
              <Text style={{fontWeight: 500}}>Giới thiệu bạn bè</Text>
              <SizedBox height={5}></SizedBox>
              <Text style={{color: 'green'}}>{`+${convertToMoney(
                rewardPointCtm?.point_introduce_customer ?? 0,
              )} Xu`}</Text>
            </Column>
          </Row>
          <Divider></Divider>
        </ScrollView>
      }></Scaffold>
  );
});

export default PointScreen;
