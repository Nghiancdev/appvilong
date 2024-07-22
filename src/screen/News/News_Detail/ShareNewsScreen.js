// @ts-ignore
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  // @ts-ignore
  SafeAreaView,
  // @ts-ignore
  Animated,
  // @ts-ignore
  StyleSheet,
  // @ts-ignore
  ScrollView,
  Dimensions,
  TouchableOpacity,
  // @ts-ignore
  Image,
  Text,
  // @ts-ignore
  ActivityIndicator,
  Share as RNShare,
  Clipboard,
} from 'react-native';
import Share from 'react-native-share';
import { observer } from 'mobx-react';
import ViewShot from 'react-native-view-shot';
import SizedBox from '../../../components/SizedBox';
import Container from '../../../components/Container';
import Scaffold from '../../../components/Scafold';
import Column from '../../../components/Column';
import Row from '../../../components/Row';
import ShareIcon from '../../../components/Icons/ShareIcon';
// @ts-ignore
import { Badge, Button, Divider } from 'react-native-paper';
import { useDataAppStore } from '../../../store/DataAppStore';
import QRCode from 'react-native-qrcode-svg';
import IAppBar from '../../../components/AppBar';
import dynamicLinks from '@react-native-firebase/dynamic-links';
// @ts-ignore
const ShareNewsScreen = observer(({ route, navigation }) => {
  // @ts-ignore
  const { idProduct, idPost, listImage } = route.params;

  const windowWidth = Dimensions.get('window').width;
  // @ts-ignore
  const windowHeight = Dimensions.get('window').height;

  const viewShotRef = useRef();

  const { badge, isLogin, infoCustomer } = useDataAppStore();

  useEffect(() => { }, []);

  // @ts-ignore


  // @ts-ignore
  const linkQr = (productId, postId) => {
    if (productId != null) {

      if (isLogin == true) {
        return `https://${(badge.domain ?? '') == ''
            ? '${StoreInfo().getCustomerStoreCode()}.myiki.vn'
            : badge.domain.includes('https://')
              ? badge.domain.replaceAll('https://', '')
              : badge.domain
          }/qr-app?action=product&references_id=${productId}&cid=${infoCustomer?.id
          }`;
      } else {
        return `https://${(badge.domain ?? '') == ''
            ? '${StoreInfo().getCustomerStoreCode()}.myiki.vn'
            : badge.domain.includes('https://')
              ? badge.domain.replaceAll('https://', '')
              : badge.domain
          }/qr-app?action=product&references_id=${productId}`;
      }

      //////

    }

    if (postId != null) {
      if (isLogin == true) {
        return `https://${
          // @ts-ignore
          (badge.domain ?? '') == ''
            ? '${StoreInfo().getCustomerStoreCode()}.myiki.vn'
            // @ts-ignore
            : badge.domain.includes('https://')
              // @ts-ignore
              ? badge.domain.replaceAll('https://', '')
              // @ts-ignore
              : badge.domain
          // @ts-ignore
          }/qr-app?action=post&references_id=${postId}&cid=${infoCustomer?.id}`;
      } else {
        return `https://${
          // @ts-ignore
          (badge.domain ?? '') == ''
            ? '${StoreInfo().getCustomerStoreCode()}.myiki.vn'
            // @ts-ignore
            : badge.domain.includes('https://')
              // @ts-ignore
              ? badge.domain.replaceAll('https://', '')
              // @ts-ignore
              : badge.domain
          }/qr-app?action=post&references_id=${postId}`;
      }
    } else {
      return '';
    }
  };

  // @ts-ignore
  function callback(dataURL) {
    // @ts-ignore
    svg.current = dataURL;
    console.log(dataURL);
  }

  return (
    <
      // @ts-ignore
      Scaffold
      // @ts-ignore
      appbar={<IAppBar title={'Chia sẻ Tin Tức'}></IAppBar>}
      body={
        <
          // @ts-ignore
          Column crossAxisAlignment={'center'}>
          <SizedBox
            // @ts-ignore
            height={30} width={windowWidth}></SizedBox>
          <Text
            // @ts-ignore
            style={{ fontWeight: 500, fontSize: 15 }}>
            Hãy chia sẻ mã QR này cho người khác
          </Text>
          <SizedBox
            // @ts-ignore
            height={30}></SizedBox>
          <ViewShot
            // @ts-ignore
            ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
            <
              // @ts-ignore
              Container
              padding={10}
              borderColor={'green'}
              borderRadius={10}
              child={
                <QRCode
                  size={windowWidth * 0.5}
                  // @ts-ignore
                  value={
                    idProduct != null
                      ? linkQr(idProduct)
                      : idPost != null
                        ? linkQr(idPost)
                        : ''
                  }
                />
              }></Container>
          </ViewShot>

          <SizedBox
            // @ts-ignore
            height={30} width={windowWidth}></SizedBox>
          <TouchableOpacity
            onPress={async () => {
              Clipboard.setString(
                // @ts-ignore
                idProduct != null
                  ? linkQr(idProduct)
                  : idPost != null
                    ? linkQr(idPost)
                    : '',
              );
              try {
                const result = await RNShare.share({
                  message:
                    idProduct != null
                      ? linkQr(idProduct)
                      : idPost != null
                        ? linkQr(idPost)
                        : '',
                  // @ts-ignore
                  url: idProduct != null,
                });
                if (result.action === RNShare.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === RNShare.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                console.log(error);
              }
            }}>
            <SizedBox
              // @ts-ignore
              width={windowWidth}></SizedBox>
            <
              // @ts-ignore
              Row padding={20}>
              <Text
                // @ts-ignore
                style={{ fontWeight: 500 }}>Link chia sẻ</Text>
              <View style={{ flex: 1 }}></View>
              <ShareIcon></ShareIcon>
            </Row>
          </TouchableOpacity>
          <Divider></Divider>
          <TouchableOpacity
            onPress={async () => {
              try {
                // Chụp ảnh từ View chứa QR code
                // @ts-ignore
                const imageURI = await viewShotRef.current.capture();

                // Chia sẻ ảnh sử dụng react-native-share
                const shareOptions = {
                  title: 'Share QR Code Image',
                  message: 'Check out my QR Code!',
                  url: imageURI,
                  type: 'image/png',
                };

                await Share.open(shareOptions);
              } catch (error) {
                console.error('Error sharing QR code:', error);
              }
            }}>
            <SizedBox
              // @ts-ignore
              width={windowWidth}></SizedBox>
            <
              // @ts-ignore
              Row padding={20}>
              <Text
                // @ts-ignore
                style={{ fontWeight: 500 }}>Chia sẻ mã QR</Text>
              <View style={{ flex: 1 }}></View>
              <ShareIcon></ShareIcon>
            </Row>
          </TouchableOpacity>
        </Column>
      }
    >


    </Scaffold>
  );
});

export default ShareNewsScreen;
