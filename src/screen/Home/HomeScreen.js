import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Animated,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import IAppbar from '../../components/AppBar';
import Scaffold from '../../components/Scafold';
import Carousel from 'react-native-snap-carousel-v4';
import {useDataAppStore} from '../../store/DataAppStore';
import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Row from '../../components/Row';
import ListFillerIcon from '../../components/Icons/ListFillerIcon';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/AntDesign';
import SizedBox from '../../components/SizedBox';
import Column from '../../components/Column';
import ChatIcon from '../../components/Icons/ChatIcon';
import NotiIcon from '../../components/Icons/NotiIcon';
import Wrap from '../../components/Wrap';
import HomeButton from './child/HomeButton';
import BannerAdsItem from './child/BannerAdsItem';
import CateList from './child/CateList';
import SectionTitle from './child/SectionTitle';
import ListProductCard from './child/ListProductCard';
import PostNewCard from './child/PostNewCard';
import FlashSale from './child/FlashSale';
import actionTap from '../../utils/actionTap';
import {Badge} from 'react-native-paper';
import {TouchEventType} from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import {useFocusEffect} from '@react-navigation/native';
import {toJS} from 'mobx';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const HomeScreen = observer(({navigation}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();
  const HEADER_EXPANDED_HEIGHT = 105 + insets.top;
  const HEADER_COLLAPSED_HEIGHT = 50 + insets.top;

  const {badge, homeApp, getBadge, banner} = useDataAppStore();
  // console.log("badge", toJS(badge))
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  const heroTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const heroTitleHeight = scrollY.interpolate({
    inputRange: [0, insets.top],
    outputRange: [insets.top, 0],
    extrapolate: 'clamp',
  });

  const listHomeButton = () => {
    let listButtons;
    if (homeApp.layouts && homeApp.layouts.length > 0) {
      const button = homeApp.layouts.find(
        element => element.model === 'HomeButton',
      );
      if (button) {
        listButtons = (button?.list ?? []).map(item => ({...item}));
      }
    }

    return (
      <Wrap
        alignment="start"
        spacing={0}
        runAlignment="center"
        runSpacing={15}
        crossAxisAlignment="end">
        {listButtons
          ?.filter(e => e.title != 'Quét mã QR')
          .map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  actionTap({
                    typeAction: listButtons[index].type_action,
                    value: listButtons[index].value,
                    navigation: navigation,
                  });
                }}>
                <HomeButton key={index} homeButton={item}></HomeButton>
              </TouchableOpacity>
            );
          })}
      </Wrap>
    );
  };

  const body = () => {
    var layouts = homeApp.layouts ?? [];
    var bannerAdsApp = homeApp.banner_ads_app;
    var list = [];
    if (layouts.length != 0) {
      for (var layout of layouts) {
        if (layout.hide == true || (layout?.list ?? []).length == 0) {
          continue;
        }

        var cpn =
          layout.model == 'HomeButton' ? (
            <Column>
              <Container
                padding={10}
                child={
                  <Text style={{fontWeight: '500'}}>Tiện ích của tôi</Text>
                }></Container>
              {listHomeButton()}
            </Column>
          ) : (
            <Column>
              {layout.type_layout == 'PRODUCTS_TOP_SALES' &&
                (bannerAdsApp?.position1 ?? []).length != 0 &&
                BannerAdsItem({listBannerAdsItem: bannerAdsApp?.position1})}
              {layout.type_layout == 'PRODUCTS_TOP_SALES' &&
                (bannerAdsApp?.position2 ?? []).length != 0 &&
                BannerAdsItem({listBannerAdsItem: bannerAdsApp?.position2})}
              {layout.type_layout == 'PRODUCTS_TOP_SALES' &&
                (bannerAdsApp?.position3 ?? []).length != 0 &&
                BannerAdsItem({listBannerAdsItem: bannerAdsApp?.position3})}
              {layout.type_layout == 'PRODUCTS_TOP_SALES' &&
                (bannerAdsApp?.position4 ?? []).length != 0 &&
                BannerAdsItem({listBannerAdsItem: bannerAdsApp?.position4})}
              {layout.type_layout != 'PRODUCTS_DISCOUNT' &&
                SectionTitle({
                  title: layout.title ?? '',
                  subtitle: 'Tất cả',
                  layout: layout,
                  navigation: navigation,
                })}
              {layout.model == 'Product' &&
                layout.type_layout != 'PRODUCTS_DISCOUNT' &&
                ListProductCard(layout, navigation)}
              {layout.model == 'Category' && CateList(layout)}
              {layout.model == 'Post' && PostNewCard(layout, navigation)}
              {layout.model == 'Product' &&
                layout.type_layout == 'PRODUCTS_DISCOUNT' &&
                FlashSale(layout)}
            </Column>
          );

        list.push(cpn);
      }
    }
    return list;
  };

  useFocusEffect(
    React.useCallback(() => {
      getBadge();
    }, []),
  );

  const bannerCPN = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor: 'floralwhite',
          padding: 10,
          height: 210,
          width: windowWidth,
        }}>
        <Image
          source={{
            uri: item?.image_url,
          }}
          style={{flex: 1, borderRadius: 10}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <Animated.View style={[{height: heroTitleHeight}]}></Animated.View>
        <Animated.View
          style={{
            flex: 1,
            opacity: heroTitleOpacity,
          }}>
          <Container
            padding={10}
            child={
              <Row crossAxisAlignment={'center'}>
                <Text
                  flex={1}
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#BC4053',
                  }}>
                  {badge?.store_name ?? ''}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CHAT_LIST');
                  }}>
                  <ChatIcon size={20}></ChatIcon>
                  {(badge.chats_unread ?? 0) > 0 && (
                    <Badge style={{position: 'absolute', top: -10, right: -10}}>
                      {badge.chats_unread}
                    </Badge>
                  )}
                </TouchableOpacity>
                <View style={{width: 10}} />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('NOTI');
                  }}>
                  <NotiIcon></NotiIcon>
                  {(badge.notification_unread ?? 0) > 0 && (
                    <Badge style={{position: 'absolute', top: -10, right: -10}}>
                      {badge.notification_unread}
                    </Badge>
                  )}
                </TouchableOpacity>
                <View style={{width: 5}} />
              </Row>
            }
          />
        </Animated.View>
        <Container
          padding={10}
          width={windowWidth}
          child={
            <Row crossAxisAlignment={'center'}>
              {/* <TouchableOpacity
                onPress={() => { 
                  navigation.navigate('PRODUCT');
                }}>
                <ListFillerIcon></ListFillerIcon>
              </TouchableOpacity>
              <View style={{width: 10}} /> */}

              <Container
                padding={10}
                flex={1}
                borderRadius={10}
                borderColor={'#FAFAFB'}
                backgroundColor={'#FAFAFB'}
                child={
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('CATEGORIES', {
                        textSearch: '',
                        autoSearch: true,
                      });
                    }}>
                    <Row>
                      <Icon name="search1" size={18} color="#900" />
                      <SizedBox width={10}></SizedBox>
                      <Text>Tìm kiếm trong cửa hàng</Text>
                    </Row>
                  </TouchableOpacity>
                }
              />
            </Row>
          }
        />
      </Animated.View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 105}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <Carousel
          layout={'default'}
          autoplay={false}
          data={banner}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={bannerCPN}
          onSnapToItem={index => () => {}}
        />
        <SizedBox height={10}></SizedBox>
        {body()}
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  header: {
    backgroundColor: 'white',
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  title: {
    marginVertical: 16,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default HomeScreen;
