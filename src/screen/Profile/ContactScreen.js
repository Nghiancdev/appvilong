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
import PhoneIcon from '../../components/Icons/PhoneIcon';
import PhoneOutlineIcon from '../../components/Icons/PhoneOutlineIcon';
import EmailIcon from '../../components/Icons/EmailIcon';
import TimeWorkIcon from '../../components/Icons/TimeWorkIcon';
import LocationOutlineIcon from '../../components/Icons/LocationOutlineIcon';
import FacebookIcon from '../../components/Icons/FacebookIcon';

const ContactScreen = observer(({route, navigation}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme} = useDataAppStore();
  const theme = useTheme();
  console.log("appTheme", JSON.stringify(appTheme.contact_address))
  useEffect(() => {}, []);

  const item = (icon, title, sub) => {
    return (
      <Column width={windowWidth}> 
        <Row padding={20} >
          {icon}
          <SizedBox width={10}></SizedBox>
          <Text style={{fontWeight: 500}}>{title}</Text>
          <SizedBox width={10}></SizedBox>
          <View style={{flex: 1, marginBottom: 5}}>
           <Text style={{flexWrap:'wrap'}}>{sub}</Text>
          </View>
        </Row>
        <Divider></Divider>
      </Column>
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
      appbar={<IAppBar title={'Liên hệ'}></IAppBar>}
      body={
        <ScrollView>
          {item(
            <PhoneOutlineIcon color={appTheme.color_main_1}></PhoneOutlineIcon>,
            'Điện thoại :',
            appTheme?.contact_phone_number,
          )}
          {item(
            <EmailIcon color={appTheme.color_main_1}></EmailIcon>,
            'Email :',
            appTheme?.contact_email,
          )}
          {item(
            <TimeWorkIcon color={appTheme.color_main_1}></TimeWorkIcon>,
            'Thời gian làm việc :',
            appTheme?.contact_time_work,
          )}
          {item(
            <LocationOutlineIcon color={appTheme.color_main_1}></LocationOutlineIcon>,
            'Địa chỉ :',
            appTheme?.contact_address,
          )}
          <TouchableOpacity onPress={() => {
            handlePress(appTheme?.contact_fanpage);
          }}>
          {item(
            <FacebookIcon color={appTheme.color_main_1}></FacebookIcon>,
            'Fanpage :',
            appTheme?.contact_fanpage,
          )}
          </TouchableOpacity>
        </ScrollView>
      }></Scaffold>
  );
});

export default ContactScreen;
