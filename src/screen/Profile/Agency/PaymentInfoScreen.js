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
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useAgencyStore} from '../../../store/AgencyStore';

const PaymentInfoAgencyScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme} = useDataAppStore();
  const theme = useTheme();

  const [dataCtv, setDataCtv] = React.useState({});
  const [indexTab, setIndexTab] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const {infoCtv, generalInfoPaymentCtv, updateInfoCTV, getInfoCTV} =
    useAgencyStore();

  const {isFromCheckStatus} = route.params ?? {};

  useEffect(() => {
    getInfoCTV();
  }, []);

  useEffect(() => {
    setDataCtv({
      account_name: infoCtv?.account_name,
      account_number: infoCtv?.account_number,
      bank: infoCtv?.bank,
      branch: infoCtv?.branch,
      cmnd: infoCtv?.cmnd,
      first_and_last_name: infoCtv?.first_and_last_name,
      issued_by: infoCtv?.issued_by,
      front_card: infoCtv?.front_card,
      back_card: infoCtv?.back_card,
      date_range: infoCtv?.date_range,
      payment_auto: infoCtv?.payment_auto,
    });
  }, [infoCtv]);

  return (
    <Scaffold
      appbar={<IAppBar title={'Đăng ký cộng tác viên'}></IAppBar>}
      body={
        <>
          <Column>
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
                <Text style={{textAlign: 'center'}}>CMND/CCCD</Text>
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
                <Text style={{textAlign: 'center'}}>Tài khoản ngân hàng</Text>
              </TouchableOpacity>
            </Row>
            <View style={{flex: 1}}>
              {indexTab == 0 ? (
                <ScrollView>
                  <Column>
                    <SizedBox width={windowWidth}></SizedBox>
                    <TextInput
                      style={{padding: 20}}
                      value={dataCtv.first_and_last_name}
                      placeholder="Nhập họ và tên"
                      onChangeText={v => {
                        setDataCtv({...dataCtv, first_and_last_name: v});
                      }}></TextInput>
                    <Divider></Divider>
                    <TextInput
                      style={{padding: 20}}
                      value={dataCtv.cmnd}
                      placeholder="Nhập số CMND/CCCD"
                      keyboardType="numeric"
                      onChangeText={v => {
                        setDataCtv({...dataCtv, cmnd: v});
                      }}></TextInput>
                    <Divider></Divider>
                    <TouchableOpacity
                      onPress={() => {
                        setOpen(true);
                      }}>
                      <Row padding={20} mainAxisAlignment={'space-between'}>
                        <Text>Chọn ngày cấp:</Text>
                        <Text>{`${
                          (dataCtv.date_range ?? '') == ''
                            ? 'Chọn'
                            : moment(dataCtv.date_range ?? new Date()).format(
                                'DD-MM-yyyy',
                              )
                        }`}</Text>
                      </Row>
                    </TouchableOpacity>
                    <Divider></Divider>
                    <TextInput
                      style={{padding: 20}}
                      value={dataCtv.issued_by}
                      placeholder="Nơi cấp"
                      onChangeText={v => {
                        setDataCtv({...dataCtv, issued_by: v});
                      }}></TextInput>
                    <Divider></Divider>
                  </Column>
                  <Row mainAxisAlignment={'center'}>
                    <ImageOnePicker
                      imageInput={dataCtv.front_card}
                      limit={1}
                      title={'Ảnh CMND mặt trước'}
                      onReturn={v => {
                        console.log('v', v);
                        setDataCtv({...dataCtv, front_card: v[0]});
                      }}></ImageOnePicker>
                    <ImageOnePicker
                      imageInput={dataCtv.back_card}
                      limit={1}
                      title={'Ảnh CMND mặt sau'}
                      onReturn={v => {
                        console.log('v', v);
                        setDataCtv({...dataCtv, back_card: v[0]});
                      }}></ImageOnePicker>
                  </Row>
                </ScrollView>
              ) : (
                <ScrollView>
                  <Column>
                    <SizedBox width={windowWidth}></SizedBox>
                    <TextInput
                      style={{padding: 20}}
                      value={dataCtv.bank}
                      placeholder="Nhập ngân hàng"
                      onChangeText={v => {
                        setDataCtv({...dataCtv, bank: v});
                      }}></TextInput>
                    <Divider></Divider>
                    <TextInput
                      style={{padding: 20}}
                      value={dataCtv.branch}
                      placeholder="Nhập chi nhánh"
                      onChangeText={v => {
                        setDataCtv({...dataCtv, branch: v});
                      }}></TextInput>
                    <Divider></Divider>
                    <TextInput
                      style={{padding: 20}}
                      value={dataCtv.account_name}
                      placeholder="Nhập tên tài khoản"
                      onChangeText={v => {
                        setDataCtv({...dataCtv, account_name: v});
                      }}></TextInput>
                    <Divider></Divider>
                    <TextInput
                      style={{padding: 20}}
                      value={dataCtv.account_number}
                      placeholder="Nhập số tài khoản"
                      keyboardType="numeric"
                      onChangeText={v => {
                        setDataCtv({...dataCtv, account_number: v});
                      }}></TextInput>
                    <Divider></Divider>
                  </Column>
                </ScrollView>
              )}
            </View>
          </Column>
          {open && (
            <DatePicker
              modal
              locale="vi"
              mode="date"
              open={open}
              date={dataCtv.date_range || new Date()}
              onConfirm={date => {
                setDataCtv({...dataCtv, date_range: date});
                setOpen(false);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          )}
        </>
      }
      bottomNavigationBar={
        <Container
          height={85}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={5}
          child={
            <IButton
              text={'Lưu thông tin'}
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
                  date_range: dataCtv.date_range,
                  payment_auto: dataCtv.payment_auto,
                });
              }}></IButton>
          }></Container>
      }></Scaffold>
  );
});

export default PaymentInfoAgencyScreen;
