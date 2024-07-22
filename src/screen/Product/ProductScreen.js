import React, {useEffect, useRef, useState} from 'react';
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
} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
import {Rating} from 'react-native-ratings';
import IgnorePointer from '../../components/IgnorePointer';
import ShareIcon from '../../components/Icons/ShareIcon';
import {Badge, Button, Divider} from 'react-native-paper';
import BoxIcon from '../../components/Icons/BoxIcon';
import ShieldIcon from '../../components/Icons/ShieldIcon';
import CarIcon from '../../components/Icons/CarIcon';
import DecriptionProduct from './child/DecriptionProduct';
import ReviewProduct from './child/ReviewProduct';
import ProductItem from '../../components/Product/ProductItem';
import {useDataAppStore} from '../../store/DataAppStore';
import ModalDistributesProduct from '../../components/Product/ModalDistributeProduct';
import {useCartStore} from '../../store/CartStore';
import {set} from 'date-fns';
import {RepoManager} from '../../services';
import ChatIcon from '../../components/Icons/ChatIcon';
import ComboProduct from './child/ComboProduct';
import BonusProduct from './child/BonusProduct';
import { toJS } from 'mobx';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const ProductScreen = observer(({route, navigation}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();
  const [isShowDrawer, setShowDrawer] = useState(false);
  const {appTheme, getBadge, badge, isLogin} = useDataAppStore();
  const {addItemCart} = useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(null);
  const [averagedStars, setAveragedStars] = useState(null);
  const [listProductSimilar, setListProductSimilar] = useState(null);
  const [watchedProduct, setWatchedProduct] = useState(null);
  const [totalReview, setTotalReview] = useState(null);
  const [listReview, setListReview] = useState(null);
  const {productId} = route.params;
  console.log("productIdproductId", toJS(appTheme))
  useEffect(() => {
    // console.log('productId', productId);
    getProductDetail(productId);
    getReviewProduct(productId);
    getSimilarProduct(productId);
    if (isLogin == true) {
      getWatchedProduct();
    }
  }, []);

  const getProductDetail = async id => {
    try {
      setLoading(true);
      const response = await RepoManager.product.getProductDetail(id);
      setProduct(response?.data?.data);
      getComboCustomer();
      getBonusCustomer();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReviewProduct = async (id) => {
    // console.log("id", id)
    try {
      const response = await RepoManager.product.getReviewProduct(
        id,
        '',
        '',
        '',
      );
      setAveragedStars(response?.data?.data?.averaged_stars);
      setTotalReview(response?.data?.data?.total_reviews);
      setListReview(response?.data?.data?.data);
      // console.log("ListReview", response?.data?.data?.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  const favoriteProduct = async (id, is_favorite) => {
    try {
      const response = await RepoManager.product.favoriteProduct(
        id,
        is_favorite,
      );
      setProduct({...product, is_favorite: is_favorite});
      // this.product.is_favorite = is_favorite;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  const getSimilarProduct = async id => {
    try {
      const response = await RepoManager.product.getSimilarProduct(id);
      setListProductSimilar(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  const getWatchedProduct = async () => {
    try {
      const response = await RepoManager.product.getWatchedProduct();
      setWatchedProduct(response?.data?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  const [listProductCombo, setListProductCombo] = useState([]);
  const [hasInCombo, setHasInCombo] = useState(false);
  const [discountComboType, setDiscountComboType] = useState(false);
  const [valueComboType, setValueComboType] = useState(false);

  const getComboCustomer = async () => {
    try {
      const res = await RepoManager.product.getComboCustomer();

      // console.log('res.data?.data', res.data?.data);

      res.data?.data?.forEach(e => {
        const checkHasInCombo = e.products_combo.findIndex(
          element => element.product.id === productId,
        );
        if (checkHasInCombo !== -1) {
          // console.log('===============?');
          setHasInCombo(true);
          setDiscountComboType(e.discount_type);
          setValueComboType(e.value_discount);
          setListProductCombo(e.products_combo);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [bonusProduct, setBonusProduct] = useState(null);

  const getBonusCustomer = async () => {
    try {
      const res = await RepoManager.product.getBonusCustomer(productId);

      res.data?.data?.forEach(e => {
        if (e.ladder_reward === false) {
          const checkHasInCombo = e.select_products.findIndex(
            element => element.product.id === productId,
          );
          if (checkHasInCombo !== -1) {
            setBonusProduct(e);
          }
        } else {
          const checkHasInCombo = e.bonus_products_ladder.findIndex(
            element => element.product.id === productId,
          );
          if (checkHasInCombo !== -1) {
            setBonusProduct(e);
          }
        }
      });

      console.log('=====================> ', bonusProduct);
    } catch (err) {
      console.log(err);
    }
  };

  function header() {
    return (
      <View style={[styles.header, {top: insets.top, paddingHorizontal: 15}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Container
            padding={10}
            backgroundColor={'#00000040'}
            borderRadius={15}
            child={<ArrowBackIcon></ArrowBackIcon>}></Container>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CART', {automaticallyImplyLeading: true})
          }>
          <Container
            padding={8.5}
            backgroundColor={'#00000040'}
            borderRadius={15}
            child={<CartIcon color="white" size={20}></CartIcon>}></Container>
          {(badge.cart_quantity ?? 0) > 0 && (
            <Badge style={{position: 'absolute', top: -6, right: -6}}>
              {badge.cart_quantity}
            </Badge>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  const bannerCPN = ({item, index}) => {
    // console.log('item', item);
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',

          height: windowHeight * 0.45,
          width: windowWidth,
        }}>
        <Image
          source={{
            uri: item,
          }}
          style={{flex: 1, borderRadius: 10}}
          resizeMode="cover"
        />
      </View>
    );
  };

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
  };

  return (
    <>
      {loading ? (
        <View
          style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <Scaffold
          body={
            <>
              {header()}
              <View style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}>
                <ScrollView>
                  <Carousel
                    layout={'default'}
                    autoplay={true}
                    data={
                      product?.video_url == null
                        ? [...(product?.images ?? []).map(e => e.image_url)]
                        : [
                            product.video_url,
                            ...(product?.images ?? []).map(e => e.image_url),
                          ]
                    }
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth}
                    renderItem={bannerCPN}
                    onSnapToItem={index => setIndex(index)}
                  />
                  <View style={styles.container}>
                    <Column>
                      <Container
                        child={
                          <Column>
                            <SizedBox height={10}></SizedBox>
                            <Container
                              padding={10}
                              child={
                                <Text style={{fontSize: 16}}>
                                  {product?.name}
                                </Text>
                              }></Container>
                          </Column>
                        }></Container>
                      <Row>
                        <PriceProduct product={product} />
                        <View style={{flex: 1}}></View>
                        <Container
                          flex={0}
                          paddingRight={10}
                          child={
                            <TouchableOpacity
                              onPress={() => {
                                console.log(
                                  'product.is_favorite',
                                  product?.is_favorite,
                                );
                                if ((product?.is_favorite ?? true) === true) {
                                  favoriteProduct(product.id, false);
                                } else {
                                  favoriteProduct(product.id, true);
                                }
                              }}>
                              {!(product?.is_favorite ?? true) ? (
                                <HeartIcon size={20}></HeartIcon>
                              ) : (
                                <HeartFillIcon size={20}></HeartFillIcon>
                              )}
                            </TouchableOpacity>
                          }></Container>
                      </Row>
                      <Divider style={{marginVertical: 5}} />
                      <Container
                        padding={10}
                        child={
                          <Row crossAxisAlignment={'center'}>
                            <Row>
                              <IgnorePointer>
                                <Rating
                                  showRating={false}
                                  onFinishRating={ratingCompleted}
                                  imageSize={15}
                                  startingValue={
                                    averagedStars == 0 ? 5 : averagedStars
                                  }
                                />
                              </IgnorePointer>
                            </Row>
                            <Divider
                              style={{
                                width: 1,
                                height: '100%',
                                marginHorizontal: 10,
                              }}
                            />
                            {/* {console.log("productDaXem",product)} */}
                            {/* product?.is_show_product_view  ? `Đã xem ${product?.view ?? 0} - Đã mua ${product?.sold ?? ""}  `  : "" */}
                            <Text
                              style={{color: 'grey', fontSize: 12}}>{ appTheme?.is_show_product_view  ? `Đã xem ${product?.view ?? 0} - Đã mua ${product?.sold ?? ""}  `  : "" }</Text>
                            <View style={{flex: 1}}></View>
                            <TouchableOpacity
                              onPress={async () => {
                                navigation.push('SHARE', {
                                  idProduct: product.id,
                                });
                              }}>
                              <ShareIcon size={20}></ShareIcon>
                            </TouchableOpacity>
                          </Row>
                        }></Container>
                      <Divider style={{marginVertical: 5}} />
                      <Container
                        padding={10}
                        child={
                          <Row>
                            <Container
                              flex={1}
                              child={
                                <Row>
                                  <BoxIcon size={20}></BoxIcon>
                                  <Text style={{fontSize: 11, marginLeft: 2}}>
                                    Dễ dàng mua sắm
                                  </Text>
                                </Row>
                              }></Container>
                            <Container
                              flex={1}
                              child={
                                <Row>
                                  <ShieldIcon size={20}></ShieldIcon>
                                  <Text style={{fontSize: 11, marginLeft: 2}}>
                                    Chính hãng 100%
                                  </Text>
                                </Row>
                              }></Container>
                            <Container
                              flex={1}
                              child={
                                <Row>
                                  <CarIcon size={20}></CarIcon>
                                  <Text style={{fontSize: 11, marginLeft: 2}}>
                                    Giao hàng miễn phí
                                  </Text>
                                </Row>
                              }></Container>
                          </Row>
                        }></Container>
                      {hasInCombo && (
                        <ComboProduct
                          valueComboType={valueComboType}
                          navigation={navigation}
                          listProductCombo={listProductCombo}
                          discountComboType={discountComboType}
                          product={product}></ComboProduct>
                      )}
                      {bonusProduct != null && (
                        <BonusProduct
                          bonusProduct={bonusProduct}
                          product={product}
                          navigation={navigation}></BonusProduct>
                      )}
                      <DecriptionProduct
                        product={product}
                        isCollapsed={isCollapsed}
                        onPress={v => {
                          setIsCollapsed(v);
                        }}></DecriptionProduct>
                      <ReviewProduct product={listReview}></ReviewProduct>
                      <Container
                        height={8}
                        backgroundColor={'#F1F1F1'}
                        width="100%"></Container>
                      <Row padding={10}>
                        <Text style={{flex: 1, fontWeight: '500'}}>
                          Sản phẩm tương tự
                        </Text>
                      </Row>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {listProductSimilar?.map((e, index) => {
                          return (
                            <ProductItem
                              key={index}
                              product={e}
                              width={170}></ProductItem>
                          );
                        })}
                      </ScrollView>
                      <Container
                        height={8}
                        backgroundColor={'#F1F1F1'}
                        width="100%"></Container>
                      <Row padding={10}>
                        <Text style={{flex: 1, fontWeight: '500'}}>
                          Sản phẩm vừa xem
                        </Text>
                      </Row>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {watchedProduct?.map((e, index) => {
                          return (
                            <ProductItem
                              key={index}
                              product={e}
                              width={170}></ProductItem>
                          );
                        })}
                      </ScrollView>
                      <SizedBox height={50}></SizedBox>
                    </Column>
                  </View>
                </ScrollView>
              </View>
            </>
          }
          bottomNavigationBar={
            <Container
              height={65}
              marginBottom={5}
              backgroundColor={'white'}
              child={
                <Row mainAxisAlignment={'flex-end'} paddingHorizontal={15}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      height: 40,
                      borderColor: appTheme.color_main_1,
                      borderWidth: 1,
                      padding: 8,
                    }}
                    onPress={() => {
                      navigation.push('CHAT_LIST', {});
                    }}>
                    <ChatIcon
                      color={appTheme.color_main_1}
                      size={25}></ChatIcon>
                  </TouchableOpacity>
                  <SizedBox width={10}></SizedBox>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      height: 40,
                      borderColor: appTheme.color_main_1,
                      borderWidth: 1,
                      padding: 8,
                    }}
                    onPress={() => {
                      setShowDrawer(true);
                    }}>
                    <CartIcon color={appTheme.color_main_1}></CartIcon>
                    <SizedBox width={5}></SizedBox>
                    <Text style={{color: appTheme.color_main_1}}>
                      Thêm vào giỏ
                    </Text>
                  </TouchableOpacity>
                  <SizedBox width={10}></SizedBox>
                  <TouchableOpacity
                    onPress={() => {
                      setShowDrawer(true);
                    }}
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'center',
                      borderRadius: 10,
                      height: 40,
                      alignItems: 'center',
                      padding: 8,
                      backgroundColor: appTheme.color_main_1,
                    }}>
                    <Text style={{color: 'white'}}>Mua ngay</Text>
                  </TouchableOpacity>
                </Row>
              }></Container>
          }></Scaffold>
      )}
      {isShowDrawer && (
        <ModalDistributesProduct
          isShowDrawer={isShowDrawer}
          product={product}
          onClose={() => {
            setShowDrawer(false);
          }}
          onSubmit={(quantity, product, distributesSelected, buyNow) => {
            // console.log('distributesSelected', distributesSelected);
            // console.log('quantity', quantity);
            // console.log('product', product);
            // console.log('buyNow', buyNow);
            setShowDrawer(false);
            addItemCart(product.id, quantity, [distributesSelected]);
            getBadge();
            if (buyNow == true) {
              navigation.navigate('CART', {automaticallyImplyLeading: true});
              // Get.to(() => CartScreen());
              // Get.to(() => ConfirmScreen());
            }
          }}></ModalDistributesProduct>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderWidth: 0.5,
    width: SCREEN_WIDTH,
    shadowColor: 'rgba(128, 128, 128, 0.3)',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 7,
    shadowOpacity: 1,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
    flexDirection: 'row',
    width: SCREEN_WIDTH,
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

export default ProductScreen;
