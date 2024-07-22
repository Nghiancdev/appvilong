// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import {
  View,

  SafeAreaView,

  Animated,

  StyleSheet,

  ScrollView,
  Dimensions,
  TouchableOpacity,

  Image,
  Text,

  ActivityIndicator,
  Share as RNShare,
  Clipboard,
} from 'react-native';
import Share from 'react-native-share';
import { observer } from 'mobx-react';
import ViewShot from 'react-native-view-shot';
import SizedBox from '../../components/SizedBox';

import CartIcon from '../../components/Icons/CartIcon';

import ArrowBackIcon from '../../components/Icons/ArrowBackIcon';
import Container from '../../components/Container';

import Carousel from 'react-native-snap-carousel-v4';
import Scaffold from '../../components/Scafold';
import Column from '../../components/Column';

import PriceProduct from './child/ProductPrice';
import Row from '../../components/Row';

import HeartIcon from '../../components/Icons/HeartIcon';

import HeartFillIcon from '../../components/Icons/HeartFillIcon';

import { Rating } from 'react-native-ratings';

import IgnorePointer from '../../components/IgnorePointer';
import ShareIcon from '../../components/Icons/ShareIcon';

import { Badge, Button, Divider } from 'react-native-paper';

import BoxIcon from '../../components/Icons/BoxIcon';

import ShieldIcon from '../../components/Icons/ShieldIcon';

import CarIcon from '../../components/Icons/CarIcon';

import DecriptionProduct from './child/DecriptionProduct';

import ReviewProduct from './child/ReviewProduct';

import ProductItem from '../../components/Product/ProductItem';
import { useDataAppStore } from '../../store/DataAppStore';

import ModalDistributesProduct from '../../components/Product/ModalDistributeProduct';

import { useCartStore } from '../../store/CartStore';

import { set } from 'date-fns';

import { RepoManager } from '../../services';
import QRCode from 'react-native-qrcode-svg';
import IAppBar from '../../components/AppBar';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const ShareScreen = observer(({ route, navigation }) => {

  const { idProduct, idPost, listImage } = route.params;

  const windowWidth = Dimensions.get('window').width;

  const windowHeight = Dimensions.get('window').height;

  const viewShotRef = useRef();

  const { badge, isLogin, infoCustomer } = useDataAppStore();
  const [loading, setLoading] = useState(true);
  const [dynamicLink, setDynamicLink ] = useState()
  useEffect(async () => {
    var link = await buildLink(idProduct);
    setDynamicLink(link);
    setLoading(false);
   
  }, []);


  async function buildLink(productId) {

    const link = await dynamicLinks().buildShortLink({
      link: `https://vilong.page.link/customer?product_id=${productId}`,

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


  // const linkQr = (productId, postId) => {
  //   if (productId != null) {
  //     console.log("dynamic link", dynamicLink)
  //     return dynamicLink;
  //     // if (isLogin == true) {
  //     //   return `https://${
  //     //     (badge.domain ?? '') == ''
  //     //       ? '${StoreInfo().getCustomerStoreCode()}.myiki.vn'
  //     //       : badge.domain.includes('https://')
  //     //       ? badge.domain.replaceAll('https://', '')
  //     //       : badge.domain
  //     //   }/qr-app?action=product&references_id=${productId}&cid=${
  //     //     infoCustomer?.id
  //     //   }`;
  //     // } else {
  //     //   return `https://${
  //     //     (badge.domain ?? '') == ''
  //     //       ? '${StoreInfo().getCustomerStoreCode()}.myiki.vn'
  //     //       : badge.domain.includes('https://')
  //     //       ? badge.domain.replaceAll('https://', '')
  //     //       : badge.domain
  //     //   }/qr-app?action=product&references_id=${productId}`;
  //     // }
  //   }

  //   if (postId != null) {
  //     if (isLogin == true) {
  //       return `https://${(badge.domain ?? '') == ''
  //         ? '${StoreInfo().getCustomerStoreCode()}.myiki.vn'

  //         : badge.domain.includes('https://')

  //           ? badge.domain.replaceAll('https://', '')

  //           : badge.domain

  //         }/qr-app?action=post&references_id=${postId}&cid=${infoCustomer?.id}`;
  //     } else {
  //       return `https://${(badge.domain ?? '') == ''
  //         ? '${StoreInfo().getCustomerStoreCode()}.myiki.vn'

  //         : badge.domain.includes('https://')

  //           ? badge.domain.replaceAll('https://', '')

  //           : badge.domain
  //         }/qr-app?action=post&references_id=${postId}`;
  //     }
  //   } else {
  //     return '';
  //   }
  // };


  function callback(dataURL) {

    svg.current = dataURL;
    console.log(dataURL);
  }
  console.log("123123", dynamicLink)
  return (
    loading ? (
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator />
      </View>
    ) :
      <Scaffold
        appbar={<IAppBar title={'Chia sẻ'}></IAppBar>}
        body={
          <Column crossAxisAlignment={'center'}>
            <SizedBox

              height={30} width={windowWidth}></SizedBox>
            <Text

              style={{ fontWeight: 500, fontSize: 15 }}>
              Hãy chia sẻ mã QR này cho người khác
            </Text>
            <SizedBox

              height={30}></SizedBox>
            <ViewShot

              ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
              <Container
                padding={10}
                borderColor={'green'}
                borderRadius={10}
                child={
                  <QRCode
                    size={windowWidth * 0.5}
                    value={dynamicLink}
                  />
                }></Container>
            </ViewShot>

            <SizedBox

              height={30} width={windowWidth}></SizedBox>
            <TouchableOpacity
              onPress={async () => {
                Clipboard.setString(

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

                width={windowWidth}></SizedBox>
              <Row padding={20}>
                <Text

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

                width={windowWidth}></SizedBox>
              <Row padding={20}>
                <Text

                  style={{ fontWeight: 500 }}>Chia sẻ mã QR</Text>
                <View style={{ flex: 1 }}></View>
                <ShareIcon></ShareIcon>
              </Row>
            </TouchableOpacity>
          </Column>
        }></Scaffold>
  );
});

export default ShareScreen;
