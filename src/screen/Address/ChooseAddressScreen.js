import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  FlatList,
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
import {convertToMoney} from '../../utils/apis/stringUtil';
import LocationIcon from '../../components/Icons/LocationIcon';
import NextArrowIcon from '../../components/Icons/NextArrowIcon';
import Expanded from '../../components/Expanded';
import CartIcon from '../../components/Icons/CartIcon';
import ImageIKI from '../../components/ImageIKI';
import {Divider, Switch} from 'react-native-paper';
import ReceiptIcon from '../../components/Icons/ReceiptIcon';
import MoneyIcon from '../../components/Icons/MoneyIcon';
import BillIcon from '../../components/Icons/BillIcon';
import AgencyIcon from '../../components/Icons/AgencyIcon';
import DocIcon from '../../components/Icons/DocIcon';
import StoreCode from '../../singletons/StoreCode';
import {useAddressStore} from '../../store/AddressStore';

const ChooseAddressScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge} = useDataAppStore();

  const {typeAddress, idProvince, idDistrict, callback} = route.params;

  const {
    listLocationAddress,
    loadingAddress,
    getProvince,
    getDistrict,
    getWard,
  } = useAddressStore();

  const [nameTitleAppbar, setNameTitleAppbar] = React.useState('');

  useEffect(() => {
    if (typeAddress == 'province') {
      setNameTitleAppbar('Tỉnh/Thành phố');
      getProvince();
    } else {
      if (typeAddress == 'district') {
        setNameTitleAppbar('Quận/Huyện');
        getDistrict(idProvince);
      } else {
        setNameTitleAppbar('Phường/Xã');
        getWard(idDistrict);
      }
    }
  }, []);

  return (
    <Scaffold
      appbar={<IAppBar title={nameTitleAppbar}></IAppBar>}
      body={
        <ScrollView>
          {listLocationAddress.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  callback(item);
                }}>
                <Column>
                  <Container
                    padding={10}
                    paddingVertical={20}
                    width={windowWidth}
                    child={<Text>{item?.name}</Text>}></Container>
                  <Divider></Divider>
                </Column>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      }></Scaffold>
  );
});

export default ChooseAddressScreen;
