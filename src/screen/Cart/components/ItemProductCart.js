import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';

import Container from '../../../components/Container';
import Row from '../../../components/Row';
import ImageIKI from '../../../components/ImageIKI';
import RibbonIcon from '../../../components/Icons/RibbonIcon';
import Column from '../../../components/Column';
import SizedBox from '../../../components/SizedBox';
import Expanded from '../../../components/Expanded';
import NextArrowIcon from '../../../components/Icons/NextArrowIcon';
import {Divider} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import ModalDistributesProduct from '../../../components/Product/ModalDistributeProduct';
import {convertToMoney} from '../../../utils/apis/stringUtil';
import {useDataAppStore} from '../../../store/DataAppStore';
import IconCheck from '../../../components/Icons/IconCheck';
import EditIcon from '../../../components/Icons/EditIcon';
import TrashIcon from '../../../components/Icons/TrashIcon';

const ItemProductCart = ({
  lineItem,
  quantity,
  onDismissed,
  onDecreaseItem,
  onIncreaseItem,
  onNote,
  onUpdateProduct,
}) => {
  var canDecrease = true;
  var canIncrease = true;
  const windowWidth = Dimensions.get('window').width;

  const {appTheme} = useDataAppStore();

  function checkQuantityItem() {
    if (
      lineItem.distributes_selected !== null &&
      lineItem.product.distributes.length > 0
    ) {
      var distribute = lineItem.product.distributes[0];
      var select = lineItem.distributes_selected[0];
      if (select.sub_element_distributes !== null) {
        var indexElement = (distribute?.element_distributes ?? []).findIndex(
          e => e.name === select.value,
        );
        if (indexElement !== -1) {
          var indexSub = (
            distribute.element_distributes[indexElement]
              ?.sub_element_distribute ?? []
          ).findIndex(e => e.name === select.sub_element_distributes);
          if (indexSub !== -1) {
            return distribute.element_distributes[indexElement]
              .sub_element_distribute[indexSub].stock;
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        var indexElement = distribute.element_distributes.findIndex(
          e => e.name === select.value,
        );
        if (indexElement !== -1) {
          return distribute.element_distributes[indexElement].stock;
        } else {
          return null;
        }
      }
    }
    return null;
  }

  function checkCanDecrease() {
    var product = lineItem.product;

    var max =
      checkQuantityItem() ||
      (product.quantity_in_stock === null || product.quantity_in_stock < 0
        ? -1
        : product.quantity_in_stock);

    if (quantity === 1) canDecrease = false;
    else canDecrease = true;

    if (product.check_inventory === true) {
      if (quantity + 1 > max && max !== -1) canIncrease = false;
      else canIncrease = true;
    } else {
      canIncrease = true;
    }
  }

  const [product, setProduct] = useState(null);

  function imageItem() {
    if (
      lineItem.product &&
      lineItem.product.distributes &&
      lineItem.distributes_selected
    ) {
      if (lineItem.product.distributes.length > 0) {
        var indexImage =
          lineItem.product.distributes[0].element_distributes.findIndex(
            e => e.name == lineItem.distributes_selected[0].value,
          );
        if (indexImage !== -1) {
          var imageUrlCurrent =
            lineItem.product.distributes[0].element_distributes[indexImage]
              .image_url ||
            (lineItem.product.images.length === 0
              ? ''
              : lineItem.product.images[0].image_url);
          return imageUrlCurrent;
        }
      }
      return null;
    } else {
      return null;
    }
  }

  const [modal, setModal] = useState({});

  useEffect(() => {
    setProduct(lineItem.product);
    checkCanDecrease();
  }, []);

  return (
    <>
      <View style={{width: windowWidth}}>
        <Column>
          <Container
            flex={1}
            child={
              lineItem.is_bonus == true ? (
                <Container
                  marginLeft={10}
                  marginRight={0}
                  padding={10}
                  flex={1}
                  child={
                    <Row mainAxisAlignment={'flex-start'}>
                      {lineItem.is_bonus == true && (
                        <SizedBox width={20}></SizedBox>
                      )}
                      <View>
                        <ImageIKI
                          style={{
                            width: 50,
                            height: 50,
                            padding: 2,
                            borderRadius: 5,
                            position: 'relative',
                          }}
                          uri={`${
                            imageItem() ??
                            (product?.images.length == 0
                              ? ''
                              : product?.images[0].image_url)
                          }`}></ImageIKI>
                        <View style={{position: 'absolute', top: -20}}>
                          {product?.product_discount != null && (
                            <View>
                              <RibbonIcon size={50}></RibbonIcon>
                            </View>
                          )}
                          {product?.product_discount != null && (
                            <Text
                              style={{
                                position: 'absolute',
                                top: 17,
                                fontSize: 10,
                                color: 'red',
                              }}>{`  -${convertToMoney(
                              product?.product_discount?.value,
                            )} %`}</Text>
                          )}
                        </View>
                      </View>
                      <SizedBox width={10}></SizedBox>
                      <Expanded
                        child={
                          <Column>
                            <Row>
                              <Expanded
                                child={
                                  <Container
                                    child={
                                      <Text
                                        style={{fontSize: 12}}
                                        numberOfLines={1}>
                                        {product?.name ?? 'Không tên'}
                                      </Text>
                                    }></Container>
                                }></Expanded>
                              {lineItem.is_bonus == true && (
                                <SizedBox width={5}></SizedBox>
                              )}
                              {lineItem.is_bonus == true && (
                                <Text>{`x ${quantity}`}</Text>
                              )}
                            </Row>
                            <SizedBox height={5}></SizedBox>
                            {(lineItem.distributes_selected == null ||
                              lineItem.distributes_selected.length == 0) ==
                              false && (
                              <TouchableOpacity
                                onPress={() => {
                                  if (lineItem.is_bonus == false) {
                                    console.log('lineItem', lineItem.quantity);
                                    setModal({
                                      isShowDrawer: true,
                                      product: lineItem.product,
                                      lineItemId: lineItem.id,
                                      isOnlyAddToCart: true,
                                      distributesSelectedParam:
                                        lineItem.distributes_selected[0],
                                      quantityInput: lineItem.quantity,
                                    });
                                  } else {
                                    if (
                                      lineItem.allowsChooseDistribute == true
                                    ) {
                                      setModal({
                                        isShowDrawer: true,
                                        product: lineItem.product,
                                        lineItemId: lineItem.id,
                                        isOnlyAddToCart: true,
                                        distributesSelectedParam:
                                          lineItem.distributes_selected[0],
                                        quantityInput: lineItem.quantity,
                                      });
                                    }
                                  }
                                }}>
                                <Row>
                                  <View
                                    style={{
                                      minWidth: 10,
                                      maxWidth: windowWidth / 2,
                                      backgroundColor: '#f2f2f2',
                                      borderRadius: 5,
                                      padding: 5,
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'grey',
                                      }}>
                                      {`Phân loại: ${
                                        lineItem?.distributes_selected[0]
                                          ?.value ?? ''
                                      } ${
                                        lineItem?.distributes_selected[0]
                                          .sub_element_distributes ?? ''
                                      }`}{' '}
                                    </Text>
                                    {lineItem.is_bonus != true && (
                                      <NextArrowIcon size={10}></NextArrowIcon>
                                    )}
                                  </View>
                                </Row>
                              </TouchableOpacity>
                            )}
                            <SizedBox height={5}></SizedBox>
                            <Row>
                              <Text
                                style={{
                                  color:
                                    lineItem.is_bonus == true
                                      ? 'red'
                                      : appTheme.color_main_1,
                                }}>
                                {lineItem.is_bonus == true
                                  ? 'Hàng tặng'
                                  : `đ${convertToMoney(
                                      lineItem.item_price ?? 0,
                                    )}`}
                              </Text>
                              <SizedBox width={5}></SizedBox>
                              <Text
                                style={{
                                  fontSize: 12,
                                  textDecorationLine: 'line-through',
                                  color: 'grey',
                                }}>
                                {product?.product_discount == null
                                  ? ''
                                  : `đ${convertToMoney(
                                      (100 * lineItem?.item_price) /
                                        (100 - product?.product_discount.value),
                                    )}`}
                              </Text>
                            </Row>
                            <SizedBox height={5}></SizedBox>
                            {lineItem.is_bonus != true && (
                              <Row>
                                <TouchableOpacity
                                  onPress={() => {
                                    if (canDecrease) {
                                      onDecreaseItem();
                                    }
                                  }}>
                                  <View
                                    style={{
                                      height: 25,
                                      width: 30,
                                      borderWidth: 1,
                                      borderTopLeftRadius: 5,
                                      borderBottomLeftRadius: 5,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      paddingRight: 10,
                                      paddingLeft: 10,
                                      borderColor: '#f2f2f2',
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                      }}>
                                      -
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    setModal({
                                      isShowDrawer: true,
                                      product: lineItem.product,
                                      lineItemId: lineItem.id,
                                      isOnlyAddToCart: true,
                                      distributesSelectedParam:
                                        (lineItem.distributes_selected ?? [])
                                          .length == 0
                                          ? null
                                          : (lineItem.distributes_selected ??
                                              [])[0],
                                      quantityInput: lineItem.quantity,
                                    });
                                  }}>
                                  <View
                                    style={{
                                      height: 25,
                                      borderWidth: 1,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      paddingTop: 2,
                                      paddingBottom: 2,
                                      paddingRight: 10,
                                      paddingLeft: 10,
                                      borderColor: '#f2f2f2',
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 14,
                                      }}>
                                      {`${quantity || 1}`}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    if (canIncrease) {
                                      onIncreaseItem();
                                    }
                                  }}>
                                  <View
                                    style={{
                                      height: 25,
                                      width: 30,
                                      borderWidth: 1,
                                      borderTopRightRadius: 5,
                                      borderBottomRightRadius: 5,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      paddingRight: 10,
                                      paddingLeft: 10,
                                      borderColor: '#f2f2f2',
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 15,
                                      }}>
                                      +
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <View style={{flex: 1}}></View>
                                {/* <EditIcon></EditIcon>
                              <SizedBox width={5}></SizedBox> */}
                                <TouchableOpacity
                                  onPress={() => {
                                    onDismissed();
                                  }}>
                                  <TrashIcon></TrashIcon>
                                </TouchableOpacity>
                              </Row>
                            )}
                          </Column>
                        }></Expanded>
                    </Row>
                  }></Container>
              ) : (
                <Container
                  marginLeft={10}
                  marginRight={0}
                  padding={10}
                  flex={1}
                  child={
                    <Row mainAxisAlignment={'flex-start'}>
                      <View>
                        <ImageIKI
                          style={{
                            width: 80,
                            height: 80,
                            padding: 2,
                            borderRadius: 5,
                            position: 'relative',
                          }}
                          uri={`${
                            imageItem() ??
                            (product?.images.length == 0
                              ? ''
                              : product?.images[0].image_url)
                          }`}></ImageIKI>

                        <View style={{position: 'absolute', top: -20}}>
                          {product?.product_discount != null && (
                            <View>
                              <RibbonIcon size={50}></RibbonIcon>
                            </View>
                          )}
                          {product?.product_discount != null && (
                            <Text
                              style={{
                                position: 'absolute',
                                top: 17,
                                fontSize: 10,
                                color: 'red',
                              }}>{`  -${convertToMoney(
                              product?.product_discount?.value,
                            )} %`}</Text>
                          )}
                        </View>
                      </View>
                      <SizedBox width={10}></SizedBox>
                      <Expanded
                        child={
                          <Column>
                            <Row>
                              <Expanded
                                child={
                                  <Container
                                    child={
                                      <Text
                                        style={{fontSize: 14}}
                                        numberOfLines={1}>
                                        {product?.name ?? 'Không tên'}
                                      </Text>
                                    }></Container>
                                }></Expanded>
                              {lineItem.is_bonus == true && (
                                <SizedBox width={5}></SizedBox>
                              )}
                              {lineItem.is_bonus == true && (
                                <Text>{`x ${quantity}`}</Text>
                              )}
                            </Row>
                            <SizedBox height={10}></SizedBox>
                            {(lineItem.distributes_selected == null ||
                              lineItem.distributes_selected.length == 0) ==
                              false && (
                              <TouchableOpacity
                                onPress={() => {
                                  if (lineItem.is_bonus == false) {
                                    console.log('lineItem', lineItem.quantity);
                                    setModal({
                                      isShowDrawer: true,
                                      product: lineItem.product,
                                      lineItemId: lineItem.id,
                                      isOnlyAddToCart: true,
                                      distributesSelectedParam:
                                        lineItem.distributes_selected[0],
                                      quantityInput: lineItem.quantity,
                                    });
                                  } else {
                                    if (
                                      lineItem.allowsChooseDistribute == true
                                    ) {
                                      setModal({
                                        isShowDrawer: true,
                                        product: lineItem.product,
                                        lineItemId: lineItem.id,
                                        isOnlyAddToCart: true,
                                        distributesSelectedParam:
                                          lineItem.distributes_selected[0],
                                        quantityInput: lineItem.quantity,
                                      });
                                    }
                                  }
                                }}>
                                <Row>
                                  <View
                                    style={{
                                      minWidth: 10,
                                      maxWidth: windowWidth / 2,
                                      backgroundColor: '#f2f2f2',
                                      borderRadius: 5,
                                      padding: 5,
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'grey',
                                      }}>
                                      {`Phân loại: ${
                                        lineItem?.distributes_selected[0]
                                          ?.value ?? ''
                                      } ${
                                        lineItem?.distributes_selected[0]
                                          .sub_element_distributes ?? ''
                                      }`}{' '}
                                    </Text>
                                    {lineItem.is_bonus != true && (
                                      <NextArrowIcon size={10}></NextArrowIcon>
                                    )}
                                  </View>
                                </Row>
                              </TouchableOpacity>
                            )}
                            <SizedBox height={10}></SizedBox>
                            <Row>
                              <Text style={{color: appTheme.color_main_1}}>
                                {lineItem.is_bonus == true
                                  ? 'Hàng tặng'
                                  : `đ${convertToMoney(
                                      lineItem.item_price ?? 0,
                                    )}`}
                              </Text>
                              <SizedBox width={10}></SizedBox>
                              <Text
                                style={{
                                  fontSize: 12,
                                  textDecorationLine: 'line-through',
                                  color: 'grey',
                                }}>
                                {product?.product_discount == null
                                  ? ''
                                  : `đ${convertToMoney(
                                      (100 * lineItem?.item_price) /
                                        (100 - product?.product_discount.value),
                                    )}`}
                              </Text>
                            </Row>
                            <SizedBox height={10}></SizedBox>
                            {lineItem.is_bonus != true && (
                              <Row>
                                <TouchableOpacity
                                  onPress={() => {
                                    if (canDecrease) {
                                      onDecreaseItem();
                                    }
                                  }}>
                                  <View
                                    style={{
                                      height: 25,
                                      width: 30,
                                      borderWidth: 1,
                                      borderTopLeftRadius: 5,
                                      borderBottomLeftRadius: 5,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      paddingRight: 10,
                                      paddingLeft: 10,
                                      borderColor: '#f2f2f2',
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                      }}>
                                      -
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    setModal({
                                      isShowDrawer: true,
                                      product: lineItem.product,
                                      lineItemId: lineItem.id,
                                      isOnlyAddToCart: true,
                                      distributesSelectedParam:
                                        (lineItem.distributes_selected ?? [])
                                          .length == 0
                                          ? null
                                          : (lineItem.distributes_selected ??
                                              [])[0],
                                      quantityInput: lineItem.quantity,
                                    });
                                  }}>
                                  <View
                                    style={{
                                      height: 25,
                                      borderWidth: 1,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      paddingTop: 2,
                                      paddingBottom: 2,
                                      paddingRight: 10,
                                      paddingLeft: 10,
                                      borderColor: '#f2f2f2',
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 14,
                                      }}>
                                      {`${quantity || 1}`}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    if (canIncrease) {
                                      onIncreaseItem();
                                    }
                                  }}>
                                  <View
                                    style={{
                                      height: 25,
                                      width: 30,
                                      borderWidth: 1,
                                      borderTopRightRadius: 5,
                                      borderBottomRightRadius: 5,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      paddingRight: 10,
                                      paddingLeft: 10,
                                      borderColor: '#f2f2f2',
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 15,
                                      }}>
                                      +
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <View style={{flex: 1}}></View>
                                {/* <EditIcon></EditIcon>
                                <SizedBox width={5}></SizedBox> */}
                                <TouchableOpacity
                                  onPress={() => {
                                    onDismissed();
                                  }}>
                                  <TrashIcon></TrashIcon>
                                </TouchableOpacity>
                              </Row>
                            )}
                          </Column>
                        }></Expanded>
                    </Row>
                  }></Container>
              )
            }></Container>
          <Divider></Divider>
        </Column>
      </View>
      {modal?.isShowDrawer && (
        <ModalDistributesProduct
          isShowDrawer={modal?.isShowDrawer}
          product={modal?.product}
          isUpdateCart={true}
          onClose={() => {
            setModal({
              isShowDrawer: false,
              product: null,
              lineItemId: null,
              isOnlyAddToCart: false,
              distributesSelectedParam: null,
              quantityInput: null,
            });
          }}
          lineItemId={modal?.lineItemId}
          isOnlyAddToCart={modal?.isOnlyAddToCart}
          quantityInput={modal?.quantityInput}
          distributesSelectedParam={modal?.distributesSelectedParam}
          onSubmit={(quantity, product, distributesSelected, buyNow) => {
            console.log('distributesSelected', distributesSelected);
            console.log('quantity', quantity);
            console.log('product', product);
            console.log('buyNow', buyNow);
            onUpdateProduct(quantity, distributesSelected);
            setModal({
              isShowDrawer: false,
              product: null,
              lineItemId: null,
              isOnlyAddToCart: false,
              distributesSelectedParam: null,
              quantityInput: null,
            });
          }}></ModalDistributesProduct>
      )}
    </>
  );
};

export default ItemProductCart;
