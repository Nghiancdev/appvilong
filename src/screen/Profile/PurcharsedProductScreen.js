import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
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
import {useProductStore} from '../../store/ProductStore';
import ProductItem from '../../components/Product/ProductItem';

const PurcharsedProductScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {productsPurcharsed, isLoadingProduct, loading, getPurcharsedProducts} =
    useProductStore();

  const {infoCustomer} = useDataAppStore();
  const theme = useTheme();

  useEffect(() => {
    getPurcharsedProducts(false, true);
  }, []);

  const itemProduct = item => {
    // console.log('itemProduct', item);
    return (
      <Row>
        <ProductItem
          product={item?.item?.item1}
          height={
            infoCustomer?.is_collaborator == true ||
            infoCustomer?.is_agency == true
              ? 330
              : 300
          }
          width={(windowWidth - 20) / 2}
          showCart={
            item?.item?.item1?.is_medicine == false ? true : false
          }></ProductItem>
        {item?.item?.item2 && (
          <ProductItem
            product={item?.item?.item2}
            height={
              infoCustomer?.is_collaborator == true ||
              infoCustomer?.is_agency == true
                ? 330
                : 300
            }
            width={(windowWidth - 20) / 2}
            showCart={
              item?.item?.item2?.is_medicine == false ? true : false
            }></ProductItem>
        )}
      </Row>
    );
  };

  const dataProduct = () => {
    const combinedProducts = [];
    for (let i = 0; i < (productsPurcharsed ?? []).length; i += 2) {
      const combinedItem = {
        item1: productsPurcharsed[i],
        item2:
          productsPurcharsed.length <= i + 1 ? null : productsPurcharsed[i + 1],
      };
      combinedProducts.push(combinedItem);
    }
    //  console.log('combinedProducts', combinedProducts);
    return combinedProducts;
  };

  const renderEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 200,
        }}>
        <Text>Chưa có sản phẩm đã mua</Text>
      </View>
    );
  };

  return (
    <Scaffold
      appbar={<IAppBar title={'Sản phẩm đã mua'}></IAppBar>}
      body={
        loading == true ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <Column>
            <SizedBox width={windowWidth}></SizedBox>
            <FlatList
              data={dataProduct()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={itemProduct}
              ListFooterComponent={
                isLoadingProduct && (
                  <ActivityIndicator
                    style={{marginTop: 10}}></ActivityIndicator>
                )
              }
              ListEmptyComponent={renderEmptyComponent}
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                if (productsPurcharsed.length > 0 && !isLoadingProduct) {
                  getPurcharsedProducts(true, false);
                }
              }}
            />
          </Column>
        )
      }></Scaffold>
  );
});

export default PurcharsedProductScreen;
