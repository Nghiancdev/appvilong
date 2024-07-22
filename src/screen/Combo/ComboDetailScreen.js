import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
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
import {convertToMoney, getDDMMYY} from '../../utils/apis/stringUtil';
import IButton from '../../components/IButton';
import {useComboStore} from '../../store/ComboStore';
import ModalDistributesProduct from '../../components/Product/ModalDistributeProduct';

const ComboDetailScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [data, setData] = useState({isShowDrawer: false, product: null});
  const {appTheme, badge, getBadge} = useDataAppStore();
  const {addItemCart, getItemCart} = useCartStore();

  const {product} = route.params ?? {};

  const {
    listCombo,
    listQuantityProductNeedBuy,
    listProductCombo,
    cartController,
    valueComboType,
    discountComboType,
    hadEnough,
    getComboCustomer,
    checkProductInCombo,
  } = useComboStore();

  useEffect(() => {
    getComboCustomer(product.id);
    checkProductInCombo();
  }, []);

  return (
    <>
      <Scaffold
        appbar={
          <IAppBar
            title={`Combo giảm ${convertToMoney(valueComboType ?? '')}${
              discountComboType == 1 ? '%' : 'đ'
            }`}></IAppBar>
        }
        body={
          <Column>
            {hadEnough == true ? (
              <Text>{`Bạn đã đủ điều kiện sử dụng Combo giảm ${valueComboType}%${
                discountComboType == 1 ? '%' : 'đ'
              }`}</Text>
            ) : (
              <Column width={windowWidth}>
                <SizedBox width={windowWidth}></SizedBox>
                <Text style={{padding: 10}}>
                  Mua thêm các sản phẩm sau để được sử dụng combo:
                </Text>
                {listProductCombo.map((e, index) => {
                  return listQuantityProductNeedBuy[index] == 0 ? (
                    <></>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setData({isShowDrawer: true, product: e.product});
                      }}>
                      <Row margin={10}>
                        <Text style={{width: windowWidth * 0.7}}>
                          {e.product.name}
                        </Text>
                        <View style={{flex: 1}}></View>
                        <Text>{`x ${listQuantityProductNeedBuy[index]}`}</Text>
                        <SizedBox width={10}></SizedBox>
                      </Row>
                    </TouchableOpacity>
                  );
                })}
              </Column>
            )}
          </Column>
        }></Scaffold>
      {data.isShowDrawer && data.product != null && (
        <ModalDistributesProduct
          isShowDrawer={data.isShowDrawer}
          product={data.product}
          onClose={() => {
            setData({isShowDrawer: false, product: null});
          }}
          onSubmit={async (quantity, product, distributesSelected, buyNow) => {
            console.log('distributesSelected', distributesSelected);
            console.log('quantity', quantity);
            console.log('product', product);
            console.log('buyNow', buyNow);
            setData({isShowDrawer: false, product: null});
            await addItemCart(
              product.id,
              quantity,
              distributesSelected == null ? [] : [distributesSelected],
            );
            getBadge();
            await getComboCustomer(product.id);

            checkProductInCombo();

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

export default ComboDetailScreen;
