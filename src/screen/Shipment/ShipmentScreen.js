import React, {useEffect, useRef} from 'react';
import {
  View,
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
import {Divider, Checkbox} from 'react-native-paper';
import ReceiptIcon from '../../components/Icons/ReceiptIcon';
import MoneyIcon from '../../components/Icons/MoneyIcon';
import BillIcon from '../../components/Icons/BillIcon';
import AgencyIcon from '../../components/Icons/AgencyIcon';
import DocIcon from '../../components/Icons/DocIcon';
import StoreCode from '../../singletons/StoreCode';
import {useAddressStore} from '../../store/AddressStore';
import IButton from '../../components/IButton';

const ShipmentScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge} = useDataAppStore();

  const {idAddressCustomer, shipmentMethodInput, callback} = route.params;

  const {
    shipmentMethodChoose,
    listShipment,
    isLoadingShipmentMethod,
    listShipper,
    chargeShipmentFee,
    setShipmentMethodChoose,
    getListShipper,
  } = useAddressStore();

  useEffect(() => {
    if (shipmentMethodInput != null) {
      console.log('shipmentMethodInput', shipmentMethodInput);
      setShipmentMethodChoose(shipmentMethodInput);
    }
    // chargeShipmentFee(idAddressCustomer);
    getListShipper(idAddressCustomer);
  }, []);

  return (
    <Scaffold
      appbar={<IAppBar title={'Phương thức vận chuyển'}></IAppBar>}
      body={
        isLoadingShipmentMethod ? (
          <ActivityIndicator />
        ) : (
          <Container
            width={windowWidth}
            flex={1}
            child={
              <ScrollView>
                {listShipper?.map((s, index) => {
                  return (
                    <Column padding={10}>
                      <Text>{s.name}</Text>
                      {(s?.listShipment?.fee_with_type_ship ?? []).map(
                        (item, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                setShipmentMethodChoose({
                                  ...item,
                                  partner_shipper_id: s.partner_id,
                                  name: s.name,
                                });
                                console.log('item', shipmentMethodChoose);
                              }}>
                              <Column>
                                <Row padding={10}>
                                  <Checkbox.Android
                                    status={
                                      item?.description ==
                                      shipmentMethodChoose?.description
                                        ? 'checked'
                                        : 'unchecked'
                                    }
                                    onPress={() => {
                                      setShipmentMethodChoose({
                                        ...item,
                                        partner_shipper_id: s.partner_id,
                                        name: s.name,
                                      });
                                    }}
                                  />
                                  <SizedBox width={5}></SizedBox>
                                  <Column>
                                    <Text>{`${item?.description}`}</Text>
                                    <SizedBox height={5}></SizedBox>
                                    <Text>{`${convertToMoney(
                                      item?.fee,
                                    )}`}</Text>
                                    <SizedBox height={5}></SizedBox>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'grey',
                                      }}>{`${item?.description ?? ''}`}</Text>
                                  </Column>
                                </Row>
                                <Divider></Divider>
                              </Column>
                            </TouchableOpacity>
                          );
                        },
                      )}
                    </Column>
                  );
                })}
              </ScrollView>
            }></Container>
        )
      }
      bottomNavigationBar={
        <Column flex={0} crossAxisAlignment={'center'}>
          <IButton
            text={'LƯU'}
            onPress={() => {
              if (isLoadingShipmentMethod) {
                return;
              }
              callback(shipmentMethodChoose);
            }}></IButton>
          <SizedBox height={20}></SizedBox>
        </Column>
      }></Scaffold>
  );
});

export default ShipmentScreen;
