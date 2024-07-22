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
import {da, it} from 'date-fns/locale';
import CheckListIcon from '../../../components/Icons/CheckListIcon';
import Ribbon3Icon from '../../../components/Icons/Ribbon3Icon';
import GroupEmptyIcon from '../../../components/Icons/GroupEmptyIcon';
import PhoneIcon from '../../../components/Icons/PhoneIcon';
import PhoneOutlineIcon from '../../../components/Icons/PhoneOutlineIcon';
import EmailIcon from '../../../components/Icons/EmailIcon';
import TimeWorkIcon from '../../../components/Icons/TimeWorkIcon';
import LocationOutlineIcon from '../../../components/Icons/LocationOutlineIcon';
import FacebookIcon from '../../../components/Icons/FacebookIcon';
import {TextInput} from 'react-native';
import {useCtvStore} from '../../../store/CtvStore';
import ImagePicker from '../../../components/Picker/ImagePicker';
import ImageOnePicker from '../../../components/Picker/ImageOnePicker';
import IButton from '../../../components/IButton';

const UpdateCtvScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme} = useDataAppStore();
  const theme = useTheme();

  const [dataCtv, setDataCtv] = React.useState({});

  const {infoCtv, generalInfoPaymentCtv, updateInfoCTV, registerCtv} =
    useCtvStore();

  const {isFromCheckStatus} = route.params ?? {};

  return (
    <Scaffold
      appbar={<IAppBar title={'Đăng ký cộng tác viên'}></IAppBar>}
      body={
        <ScrollView>
          <Column>
            <SizedBox width={windowWidth}></SizedBox>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập họ và tên"
              onChangeText={v => {
                setDataCtv({...dataCtv, first_and_last_name: v});
              }}></TextInput>
            <Divider></Divider>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập tên tài khoản"
              onChangeText={v => {
                setDataCtv({...dataCtv, account_name: v});
              }}></TextInput>
            <Divider></Divider>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập số tài khoản"
              keyboardType="numeric"
              onChangeText={v => {
                setDataCtv({...dataCtv, account_number: v});
              }}></TextInput>
            <Divider></Divider>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập ngân hàng"
              onChangeText={v => {
                setDataCtv({...dataCtv, bank: v});
              }}></TextInput>
            <Divider></Divider>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập chi nhánh"
              onChangeText={v => {
                setDataCtv({...dataCtv, branch: v});
              }}></TextInput>
            <Divider></Divider>
            <TextInput
              style={{padding: 20}}
              placeholder="Nhập số CMND/CCCD"
              keyboardType="numeric"
              onChangeText={v => {
                setDataCtv({...dataCtv, cmnd: v});
              }}></TextInput>
            <Divider></Divider>
          </Column>
          <Row mainAxisAlignment={'center'}>
            <ImageOnePicker
              limit={1}
              title={'Ảnh CMND mặt trước'}
              onReturn={v => {
                setDataCtv({...dataCtv, front_card: v});
              }}></ImageOnePicker>
            <ImageOnePicker
              limit={1}
              title={'Ảnh CMND mặt sau'}
              onReturn={v => {
                setDataCtv({...dataCtv, back_card: v});
              }}></ImageOnePicker>
          </Row>
        </ScrollView>
      }
      bottomNavigationBar={
        <Container
          height={85}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={5}
          child={
            <IButton
              text={'Đăng ký'}
              onPress={async () => {
                await updateInfoCTV({
                  account_name: dataCtv.account_name,
                  account_number: dataCtv.account_number,
                  bank: dataCtv.bank,
                  branch: dataCtv.branch,
                  cmnd: dataCtv.cmnd,
                  first_and_last_name: dataCtv.first_and_last_name,
                  issued_by: dataCtv.issued_by,
                  front_card: dataCtv.front_card,
                  back_card: dataCtv.back_card,
                });
                await registerCtv(true);
              }}></IButton>
          }></Container>
      }></Scaffold>
  );
});

export default UpdateCtvScreen;
