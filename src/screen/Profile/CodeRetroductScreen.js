import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Share,
} from 'react-native';

import { observer } from 'mobx-react';
import { useCtvStore } from '../../store/CtvStore';
import Column from '../../components/Column';
import SizedBox from '../../components/SizedBox';
import { convertToMoney, getDDMMYY } from '../../utils/apis/stringUtil';
import { Button, Dialog, Divider } from 'react-native-paper';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import Row from '../../components/Row';
import GroupEmptyIcon from '../../components/Icons/GroupEmptyIcon';
import { useDataAppStore } from '../../store/DataAppStore';
import QRCodeIcon from '../../components/Icons/QRCodeIcon';
import ShareIcon from '../../components/Icons/ShareIcon';
import { useCodeRetroduceStore } from '../../store/CodeRetroduceStore';
import Container from '../../components/Container';
import StoreCode from '../../singletons/StoreCode';
import QRCode from 'react-native-qrcode-svg';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const CodeRetroductScreen = observer(({ route, navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const { infoCustomer, appTheme, badge } = useDataAppStore();
  const [loading, setLoading] = useState(true);
  const { getAllReferral, listInfoCustomer, loadInit, isLoading } =
    useCodeRetroduceStore();
  const [dynamicLink, setDynamicLink] = useState()

  useEffect(async () => {
    getAllReferral(true);
    var link = await buildLink(infoCustomer.phone_number);
    setDynamicLink(link);
    setLoading(false);
  }, []);

  async function buildLink(phoneNumber) {

    const link = await dynamicLinks().buildShortLink({
      link: `https://vilong.page.link/customer?phone_number=${phoneNumber}`,

      domainUriPrefix: 'https://vilong.page.link',
      android: {
        packageName: 'com.doapp.store.vilong',
      },
      ios: {
        bundleId: 'com.doapp.store.vilong2',
        appStoreId: '6477432688',
      },
    });

    return link;
  }

  const itemHis = data => {
    var item = data.item;
    return (
      <Column>
        <Column padding={10}>
          <Text>
            {item?.name} {item?.phone_number}
          </Text>
          <SizedBox height={10}></SizedBox>
        </Column>
        <Divider></Divider>
      </Column>
    );
  };

  return (
    loading ? (
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator />
      </View>
    ) :
      <>
        <Scaffold
          appbar={<IAppBar title={'Mã giới thiệu'}></IAppBar>}
          body={
            loadInit == true ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Column>
                <SizedBox width={windowWidth}></SizedBox>
                <Row padding={10}>
                  <GroupEmptyIcon size={35}></GroupEmptyIcon>
                  <SizedBox width={10}></SizedBox>
                  <Column>
                    <Text>Mã giới thiệu</Text>
                    <SizedBox height={5}></SizedBox>
                    <Text>{infoCustomer?.phone_number}</Text>
                  </Column>
                  <TouchableOpacity
                    onPress={() => {
                      showDialog();
                    }}>
                    <QRCodeIcon color={appTheme.color_main_1}></QRCodeIcon>
                  </TouchableOpacity>
                  <SizedBox width={10}></SizedBox>
                  <TouchableOpacity
                    onPress={async () => {
                     
                      console.log("dynamic link", dynamicLink)
                      try {
                        const result = await Share.share({
                          message: `Mời bạn tải ứng dụng ${StoreCode.getStoreName() ?? 'DoApp'}, để nhận ngay các phần quà mới hấp dẫn. Tải ứng dụng tại đây ${dynamicLink}`
                          // message: `Mời bạn tải ứng dụng ${StoreCode.getStoreName() ?? 'DoApp'
                          //   }, để nhận ngay các phần quà mới hấp dẫn. Tải ứng dụng tại đây https://${(badge.domain ?? '') == ''
                          //     ? `${StoreCode.setStoreCode()}.myiki.vn`
                          //     : badge.domain.includes('https://')
                          //       ? badge.domain.replaceAll('https://', '')
                          //       : badge.domain
                          //   }/qr-app?cid=${infoCustomer?.id}`,
                        });
                        if (result.action === Share.sharedAction) {
                          if (result.activityType) {
                            // shared with activity type of result.activityType
                          } else {
                            // shared
                          }
                        } else if (result.action === Share.dismissedAction) {
                          // dismissed
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}>
                    <ShareIcon color={appTheme.color_main_1}></ShareIcon>
                  </TouchableOpacity>
                </Row>
                <Container height={8} backgroundColor={'#fafafa'}></Container>
                <Text
                  style={{
                    color: appTheme.color_main_1,
                    padding: 10,
                    fontWeight: 500,
                  }}>
                  Danh sách đã giới thiệu:
                </Text>
                <Divider></Divider>
                <FlatList
                  data={listInfoCustomer}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={itemHis}
                  ListFooterComponent={
                    isLoading && (
                      <ActivityIndicator
                        style={{ marginTop: 10 }}></ActivityIndicator>
                    )
                  }
                  onEndReachedThreshold={0.1}
                  onEndReached={() => {
                    if ((listInfoCustomer ?? []).length > 0 && !isLoading) {
                      getAllReferral();
                    }
                  }}
                />
              </Column>
            )
          }></Scaffold>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Mã giới thiệu</Dialog.Title>
          <Dialog.Content>
            <Row mainAxisAlignment={'center'}>
              <QRCode
                size={windowWidth / 2}
                value={dynamicLink}
              />
            </Row>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </>
  );
});



export default CodeRetroductScreen;
