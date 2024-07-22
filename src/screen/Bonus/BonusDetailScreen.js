import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {observer} from 'mobx-react';
import Container from '../../components/Container';
import IAppBar from '../../components/AppBar';
import Scaffold from '../../components/Scafold';
import Column from '../../components/Column';
import SizedBox from '../../components/SizedBox';
import {useActionTapStore} from '../../store/ActionTapStore';
import Row from '../../components/Row';
import {convertToMoney, getDDMMYY} from '../../utils/apis/stringUtil';
import {useDataAppStore} from '../../store/DataAppStore';
import {Divider} from 'react-native-paper';
import Wrap from '../../components/Wrap';
import {Image} from 'react-native';
import Expanded from '../../components/Expanded';

const BonusDetailScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {getBonus, listBonus, isLoading} = useActionTapStore();
  const {appTheme} = useDataAppStore();

  const {bonusProduct} = route.params;

  useEffect(() => {
    getBonus();
  }, []);

  const itemListOffer = listOffer => {
    return (
      <Column padding={10}>
        <Text>{`Mua từ: ${listOffer.from_quantity ?? 0} Sản phẩm Tặng`}</Text>
        <SizedBox height={10} width={windowWidth - 20}></SizedBox>
        <Row>
          <Column>
            <Text>{`${listOffer.product?.name ?? ''}`}</Text>
            {listOffer.bo_element_distribute_name != null && (
              <Text>{`${listOffer.product?.name ?? ''}`}</Text>
            )}
            <SizedBox height={10}></SizedBox>
          </Column>
          <Text>{`SL: ${listOffer.bo_quantity ?? 0}`}</Text>
        </Row>
        <Divider></Divider>
      </Column>
    );
  };

  const productsApplyVouchers = (product, quantity) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.push('PRODUCT', {productId: product?.id});
        }}>
        <Container
          width={windowWidth / 2}
          child={
            <View style={styles.productContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.productImage}
                    source={{
                      uri:
                        product.images && product.images.length > 0
                          ? product.images[0].image_url
                          : '',
                    }}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={{height: 10}}></View>
                  {quantity && <Text>{`Số lượng: ${quantity}`}</Text>}
                </View>
              </View>
          }></Container>
      </TouchableOpacity>
    );
  };

  const textMoney = product => {
    if (product.product_discount == null) {
      return `${
        product.min_price == 0
          ? 'Liên hệ'
          : `${convertToMoney(product.min_price)}₫`
      }`;
    } else {
      return `${
        product.min_price == 0
          ? 'Liên hệ'
          : `${convertToMoney(
              product.min_price -
                (product.min_price * product.product_discount.value) / 100,
            )}₫`
      }`;
    }
  };

  const checkMinMaxPrice = (price, product) => {
    return product.product_discount == null
      ? price ?? 0
      : (price ?? 0) - (price ?? 0) * (product.product_discount.value / 100);
  };

  return (
    <Scaffold
      appbar={<IAppBar title={'Chương trình thưởng'}></IAppBar>}
      body={
        <ScrollView>
          <Row>
            <View style={{flex: 1}}>
              <Divider></Divider>
            </View>
            <Text style={{marginHorizontal: 10}}>
              {bonusProduct.ladder_reward == true
                ? 'Mua sản phẩm sau:'
                : 'Mua các sản phẩm sau:'}
            </Text>
            <View style={{flex: 1}}>
              <Divider></Divider>
            </View>
          </Row>
          {bonusProduct.ladder_reward != true && (
            <Container
              width={windowWidth}
              child={
                <Wrap
                  children={bonusProduct.select_products.map(e =>
                    productsApplyVouchers(e.product, e.quantity),
                  )}></Wrap>
              }></Container>
          )}
          {(bonusProduct.bonus_products_ladder ?? []).length != 0 &&
            bonusProduct.ladder_reward == true && (
              <Container
                width={windowWidth}
                child={
                  <Wrap
                    children={[
                      productsApplyVouchers(
                        bonusProduct.bonus_products_ladder[0].product,
                      ),
                    ]}></Wrap>
                }></Container>
            )}
          <Row marginHorizontal={5} marginVertical={10}>
            <View style={{flex: 1}}>
              <Divider></Divider>
            </View>
            <Text style={{marginHorizontal: 10}}>Được tặng:</Text>
            <View style={{flex: 1}}>
              <Divider></Divider>
            </View>
          </Row>
          {bonusProduct.ladder_reward != true && (
            <Container
              width={windowWidth}
              child={
                <Wrap
                  children={bonusProduct.bonus_products.map(e =>
                    productsApplyVouchers(e.product, e.quantity),
                  )}></Wrap>
              }></Container>
          )}
          {bonusProduct.ladder_reward == true && (
            <Container
              width={windowWidth}
              child={
                <Wrap
                  children={bonusProduct.bonus_products_ladder.map(e =>
                    itemListOffer(e),
                  )}></Wrap>
              }></Container>
          )}
        </ScrollView>
      }></Scaffold>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 20},
    width: 180,
    shadowRadius: 17.5,
    shadowOpacity: 0.01,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 0,
    flex: 1,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 12,
    fontWeight: '400',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  cartIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -10,
  },
  cartImage: {
    width: 20,
    height: 20,
  },
});

export default BonusDetailScreen;
