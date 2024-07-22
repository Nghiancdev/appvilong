import React, {useEffect, useRef, useState} from 'react';
import {useDataAppStore} from '../../store/DataAppStore';
import {useNavigation} from '@react-navigation/native';
import {convertToMoney} from '../../utils/apis/stringUtil';
import ButtonSheet from '../Button/ButtonSheet';
import IconClose from '../Icons/IconClose';
import {findStock} from '../../utils/productUltis';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Text} from 'react-native';
import {Image} from 'react-native';
import Row from '../Row';
import Column from '../Column';
import Container from '../Container';
import ImageIKI from '../ImageIKI';
import {RepoManager} from '../../services';
import SizedBox from '../SizedBox';
import {Divider} from 'react-native-paper';
import Wrap from '../Wrap';
import TickerStateless from '../Button/TickerStateless';
import {set, sub} from 'date-fns';
import {ScrollView} from 'react-native';
import IButton from '../IButton';

export default function ModalDistributesProduct({
  isShowDrawer,
  lineItemId,
  product,
  isOnlyAddToCart,
  isUpdateCart,
  textButton,
  distributesSelectedParam,
  quantityInput,
  onSubmit,
  onClose,
}) {
  const navigation = useNavigation();
  const {appTheme, badge} = useDataAppStore();
  // console.log("barge", JSON.stringify(badge))
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const [productShow, setProductShow] = useState(null);
  const [loading, setLoading] = useState(true);

  ///

  const [priceCurrent, setPriceCurrent] = useState(null);
  const [priceCurrentAgency, setPriceCurrentAgency] = useState(null);
  const [imageUrlCurrent, setImageUrlCurrent] = useState(null);
  const [quantityStockCurrent, setQuantityStockCurrent] = useState(null);
  const [distributesSelected, setDistributesSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errorTextInBottomModel, setErrorTextInBottomModel] = useState('');
  console.log('quantity', quantity);
  var max = -1;

  var canDecrease = true;
  var canIncrease = true;

  var quantityInStock;

  var nameDistribute;
  var valueDistribute;
  var subElementDistribute;

  ///

  const getProductDetail = async () => {
    console.log(appTheme.color_main_1);
    setLoading(true);

    try {
      const response = await RepoManager.product.getProductDetail(product?.id);
      setProductShow(response?.data?.data);

      max =
        response?.data?.data?.mainStock == null ||
        (response?.data?.data?.mainStock ?? 0) < 0
          ? -1
          : response?.data?.data?.mainStock;

      if (distributesSelectedParam != null) {
        setDistributesSelected(distributesSelectedParam);
      }
      console.log('Error fetching data: =================', quantityInput);
      if (quantityInput != null) {
        setQuantity(quantityInput);
      }
      quantityInStock =
        (response?.data?.data?.quantityInStockWithDistribute ?? 0) > 0
          ? response?.data?.data?.quantityInStockWithDistribute ?? 0
          : response?.data?.data?.quantityInStock == null ||
            response?.data?.data?.quantityInStock < 0
          ? -1
          : response?.data?.data?.quantityInStock;
      checkCanCrease();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  function checkItemPriceCurrent() {
    setErrorTextInBottomModel('');
    var priceMain = priceCurrent;
    productShow?.product_discount === null
      ? productShow.price
      : productShow?.product_discount?.discount_price;

    let priceCurrentData = 0;
    let quantityInStockCurrentData = 0;
    let imageUrlCurrentData = '';

    if (productShow?.distributes?.length > 0) {
      var distribute = productShow.distributes[0];
      var select = distributesSelected;
      if (select?.sub_element_distributes !== null) {
        var indexElement = distribute.element_distributes.findIndex(
          e => e.name === select?.value,
        );
        console.log('indexElement', indexElement);
        if (indexElement !== -1) {
          var indexSub = distribute.element_distributes[
            indexElement
          ].sub_element_distributes.findIndex(
            e => e.name === select.sub_element_distributes,
          );
          if (indexSub !== -1) {
            priceCurrentData =
              distribute.element_distributes[indexElement]
                .sub_element_distributes[indexSub].price;
            console.log(
              'priceCurrent ===============>',
              distribute.element_distributes[indexElement]
                .sub_element_distributes[indexSub].price,
            );
            quantityInStockCurrentData =
              distribute.element_distributes[indexElement]
                .sub_element_distributes[indexSub].quantityInStock;
            if (productShow.product_discount !== null) {
              if (priceCurrent !== null) {
                priceCurrentData =
                  priceCurrentData -
                  priceCurrentData * (productShow.product_discount.value / 100);
              } else {
                priceCurrentData = null;
              }
            }
          } else {
            quantityInStockCurrentData = quantityInStock;
            priceCurrentData = priceMain;
          }
        } else {
          quantityInStockCurrentData = quantityInStock;
          priceCurrentData = priceMain;
        }
      } else {
        var indexElement = distribute.element_distributes.findIndex(
          e => e.name === select.value,
        );
        if (indexElement !== -1) {
          quantityInStockCurrentData =
            distribute.element_distributes[indexElement].quantityInStock;
          priceCurrentData = distribute.element_distributes[indexElement].price;
          if (productShow.product_discount !== null) {
            if (priceCurrent !== null) {
              priceCurrentData =
                priceCurrentData -
                priceCurrentData * (productShow.product_discount.value / 100);
            } else {
              priceCurrentData = null;
            }
          }
        } else {
          priceCurrentData = priceMain;
          quantityInStockCurrentData = quantityInStock;
        }
        var indexImage = distribute.element_distributes.findIndex(
          e => e.name === select.value,
        );
        if (indexImage !== -1) {
          imageUrlCurrentData =
            distribute.element_distributes[indexImage].imageUrl ||
            (productShow.images.length === 0
              ? ''
              : productShow.images[0].imageUrl);
        }
        checkCanCrease();
      }
    }
    setQuantityStockCurrent(quantityInStockCurrentData);
    setPriceCurrent(priceCurrentData);
    if ((imageUrlCurrentData ?? '') !== '') {
      setImageUrlCurrent(imageUrlCurrentData);
    }
  }

  function checkCanCrease() {
    var quantityInStockCheck = quantityStockCurrent || quantityInStock;
    if (quantityInStockCheck === 'Vô hạn') {
      // Xử lý logic khi có số lượng hàng vô hạn
    }

    max =
      quantityInStockCheck === null || quantityInStockCheck < 0
        ? -1
        : quantityInStockCheck;

    if (productShow?.check_inventory === true) {
      if (max === 0) {
        errorTextInBottomModel = 'Hết hàng';
      }
    }

    if (quantity === 1) {
      canDecrease = false;
    } else {
      canDecrease = true;
    }

    if (quantity + 1 > max && max !== -1) {
      canIncrease = false;
    } else {
      canIncrease = true;
    }
  }

  useEffect(() => {
    checkItemPriceCurrent();
    console.log(distributesSelected);
  }, [distributesSelected]);

  useEffect(() => {
    getProductDetail();
  }, []);

  function isDoneCheckElement() {
    if (
      productShow.quantity_in_stock_with_distribute !== null &&
      productShow.quantity_in_stock_with_distribute !== 0
    ) {
      max =
        productShow.quantity_in_stock_with_distribute === null ||
        productShow.quantity_in_stock_with_distribute < 0
          ? -1
          : productShow.quantity_in_stock_with_distribute;
    } else {
      max =
        productShow.main_stock === null || productShow.main_stock < 0
          ? -1
          : productShow.main_stock;
    }

    if (productShow?.check_inventory === true) {
      if (max === 0) {
        errorTextInBottomModel = 'Hết hàng';
        return false;
      }
    }

    if (productShow.distributes !== null) {
      if (distributesSelected != null) {
        if (productShow.distributes[0].sub_element_distribute_name !== null) {
          if (
            distributesSelected.sub_element !== null &&
            distributesSelected.name !== null &&
            distributesSelected.value !== null
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          if (
            distributesSelected.name !== null &&
            distributesSelected.value !== null
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  function checkMinMaxPrice(price) {
    return productShow.product_discount === null
      ? price ?? 0
      : (price ?? 0) -
          (price ?? 0) * (productShow.product_discount.value / 100);
  }

  function isChecked(nameDistribute, nameElement) {
    if (distributesSelected != null) {
      if (
        distributesSelected.name === nameDistribute &&
        distributesSelected.value === nameElement
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function isCheckedSub(nameSubElement) {
    if (
      distributesSelected != null &&
      distributesSelected.sub_element_distributes === nameSubElement
    ) {
      return true;
    } else {
      return false;
    }
  }

  function onSubmitBuy({buyNow = false}) {
    if (badge.allow_semi_negative != true) {
      if (productShow.checkInventory == true) {
        if (max == 0) {
          setErrorTextInBottomModel('Hết hàng');
          return;
        }
      }
    }

    if ((productShow.distributes ?? []).length > 0) {
      if (distributesSelected != null) {
        if (productShow.distributes[0].sub_element_distribute_name != null) {
          if (
            distributesSelected.sub_element_distributes != null &&
            distributesSelected.name != null &&
            distributesSelected.value != null
          ) {
            onSubmit(quantity, productShow, distributesSelected, buyNow);
          } else {
            if (
              distributesSelected.name != null &&
              distributesSelected.value != null
            ) {
              setErrorTextInBottomModel(
                `Mời chọn ${productShow.distributes[0].sub_element_distribute_name}`,
              );
            } else {
              setErrorTextInBottomModel(
                `Mời chọn ${productShow.distributes[0].name}`,
              );
            }
          }
        } else {
          if (
            distributesSelected.name != null &&
            distributesSelected.value != null
          ) {
            onSubmit(quantity, productShow, distributesSelected, buyNow);
          } else {
            setErrorTextInBottomModel(
              `Mời chọn ${productShow.distributes[0].name}`,
            );
          }
        }
      } else {
        setErrorTextInBottomModel(
          `Mời chọn ${productShow.distributes[0].name}`,
        );
        return;
      }
    } else {
      onSubmit(quantity, productShow, distributesSelected, buyNow);
    }
  }

  return (
    <Modal visible={isShowDrawer} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={() => onClose()}>
        <View
          style={{height: deviceHeight, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        behavior={Platform.OS === 'android' ? 'padding' : 'position'}>
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
          <View
            style={{
              minHeight: 250, // Đặt giá trị minHeight thay vì cứng chiều cao
              backgroundColor: 'white',
              elevation: 5, // Thêm đổ bóng
              shadowColor: 'black', // Màu đổ bóng
              shadowOffset: {width: 0, height: 2}, // Độ lệch đổ bóng theo chiều ngang và dọc
              shadowOpacity: 0.2, // Độ trong suốt của đổ bóng
              shadowRadius: 3, // Bán kính của đổ bóng
              borderTopLeftRadius: 20, // Bo góc trên trái
              borderTopRightRadius: 20, // Bo góc trên phải
              justifyContent: 'center',
            }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Column>
                <Container
                  padding={10}
                  child={
                    <Row crossAxisAlignment="flex-start">
                      <Row flex={1}>
                        <Container
                          paddingRight={10}
                          child={
                            <ImageIKI
                              style={{
                                width: 110,
                                height: 110,
                                objectFit: 'cover',
                                borderRadius: 20,
                              }}
                              uri={
                                imageUrlCurrent ??
                                ((productShow?.images ?? []).length == 0
                                  ? ''
                                  : productShow.images[0].image_url)
                              }></ImageIKI>
                          }></Container>
                        <Column crossAxisAlignment={'flex-start'}>
                          {priceCurrent != null && isDoneCheckElement() ? (
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: appTheme.color_main_1,
                              }}>
                              {convertToMoney(priceCurrent)}₫
                            </Text>
                          ) : (
                            <Row>
                              {productShow.min_price !=
                              productShow.max_price ? (
                                <Column>
                                  {productShow.product_discount != null && (
                                    <Row>
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: 'grey',
                                          textDecorationLine: 'line-through',
                                        }}>
                                        {convertToMoney(
                                          productShow.min_price ?? 0,
                                        )}
                                        ₫
                                      </Text>
                                      <Text> - </Text>
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: 'grey',
                                          textDecorationLine: 'line-through',
                                        }}>
                                        {convertToMoney(
                                          productShow.max_price ?? 0,
                                        )}
                                        ₫
                                      </Text>
                                    </Row>
                                  )}
                                  {
                                    <Row>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 'bold',
                                          color: appTheme.color_main_1,
                                        }}>
                                        {convertToMoney(
                                          checkMinMaxPrice(
                                            productShow.min_price,
                                          ),
                                        )}
                                        ₫
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 'bold',
                                          color: appTheme.color_main_1,
                                        }}>
                                        {' '}
                                        -{' '}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 'bold',
                                          color: appTheme.color_main_1,
                                        }}>
                                        {checkMinMaxPrice(
                                          productShow.max_price,
                                        )}
                                        ₫
                                      </Text>
                                    </Row>
                                  }
                                </Column>
                              ) : productShow.min_price == 0 ? (
                                <Text>Giá: Liên hệ</Text>
                              ) : (
                                <Column crossAxisAlignment={'flex-start'}>
                                  {productShow.product_discount != null && (
                                    <Text
                                      style={{
                                        textDecorationLine: 'line-through',
                                        color: 'grey',
                                      }}>
                                      {convertToMoney(productShow.price ?? 0)}₫
                                    </Text>
                                  )}
                                  <Text
                                    style={{
                                      fontWeight: 600,
                                      color: appTheme.color_main_1,
                                      fontSize: 16,
                                    }}>
                                    {convertToMoney(
                                      checkMinMaxPrice(productShow.min_price),
                                    )}
                                    ₫
                                  </Text>
                                </Column>
                              )}
                            </Row>
                          )}
                          <SizedBox height={10}></SizedBox>
                          {productShow.product_discount != null && (
                            <Row mainAxisAlignment={'flex-start'}>
                              {priceCurrent != null && isDoneCheckElement() && (
                                <Row>
                                  <Text
                                    style={{
                                      textDecorationLine: 'line-through',
                                      fontSize: 12,
                                      color: 'grey',
                                    }}>
                                    {convertToMoney(
                                      (priceCurrent * 100) /
                                        (100 -
                                          productShow.product_discount.value),
                                    )}
                                    ₫
                                  </Text>
                                  <SizedBox width={10}></SizedBox>
                                </Row>
                              )}
                              <Text style={{color: 'red'}}>
                                -
                                {convertToMoney(
                                  productShow.product_discount.value,
                                )}
                                %
                              </Text>
                            </Row>
                          )}
                          <SizedBox height={15}></SizedBox>
                          {productShow.check_inventory == true &&
                            (quantityStockCurrent != null &&
                            isDoneCheckElement() ? (
                              <Text>
                                Kho:{' '}
                                {quantityStockCurrent == 0
                                  ? 'hết hàng'
                                  : quantityStockCurrent == -1
                                  ? 'vô hạn'
                                  : quantityStockCurrent ?? ''}
                              </Text>
                            ) : (
                              <Text>
                                Kho:{' '}
                                {quantityInStock == 0
                                  ? 'hết hàng'
                                  : quantityInStock == -1
                                  ? 'vô hạn'
                                  : quantityInStock ?? ''}
                              </Text>
                            ))}
                        </Column>
                      </Row>
                      <TouchableOpacity
                        onPress={() => {
                          onClose();
                        }}>
                        <IconClose color={'red'}></IconClose>
                      </TouchableOpacity>
                    </Row>
                  }></Container>
                <Divider></Divider>
                <SizedBox height={15}></SizedBox>
                {productShow.distributes == null ||
                productShow.distributes.length == 0 ? (
                  <></>
                ) : (
                  <Column crossAxisAlignment={'flex-start'} flex={1}>
                    <Column crossAxisAlignment={'flex-start'}>
                      <Container
                        paddingLeft={16}
                        paddingRight={16}
                        paddingTop={8}
                        paddingBottom={8}
                        child={
                          <Text>{productShow.distributes[0].name}</Text>
                        }></Container>
                      <Container
                        paddingLeft={16}
                        paddingRight={16}
                        child={
                          <Wrap>
                            {productShow.distributes[0].element_distributes.map(
                              elementDistribute => {
                                return (
                                  <TickerStateless
                                    text={elementDistribute.name}
                                    ticked={isChecked(
                                      productShow.distributes[0].name,
                                      elementDistribute.name,
                                    )}
                                    onChange={() => {
                                      setDistributesSelected(prev => ({
                                        ...prev,
                                        name: productShow.distributes[0].name,
                                        value: elementDistribute.name,
                                      }));
                                    }}
                                  />
                                );
                              },
                            )}
                          </Wrap>
                        }></Container>
                    </Column>
                    <Column crossAxisAlignment={'flex-start'}>
                      <Container
                        paddingLeft={16}
                        paddingRight={16}
                        paddingTop={8}
                        paddingBottom={8}
                        child={
                          <Text>
                            {
                              productShow.distributes[0]
                                .sub_element_distribute_name
                            }
                          </Text>
                        }></Container>
                      <Container
                        paddingLeft={16}
                        paddingRight={16}
                        child={
                          <Wrap>
                            {(
                              productShow?.distributes[0]
                                ?.element_distributes[0]
                                ?.sub_element_distributes ?? []
                            ).map(e => {
                              return (
                                <TickerStateless
                                  text={e.name}
                                  ticked={isCheckedSub(e.name)}
                                  onChange={() => {
                                    setDistributesSelected(prev => ({
                                      ...prev,
                                      sub_element_distributes: e.name,
                                    }));
                                  }}
                                />
                              );
                            })}
                          </Wrap>
                        }></Container>
                      <Divider></Divider>
                    </Column>
                  </Column>
                )}
                <Container
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={10}
                  child={
                    <Row mainAxisAlignment={'space-between'}>
                      <Text>Số lượng</Text>
                      <Row>
                        <TouchableOpacity
                          onPress={() => {
                            if (quantity == 1) return;
                            setQuantity(quantity - 1);
                            setErrorTextInBottomModel('');
                            checkCanCrease();
                          }}>
                          <Container
                            padding={10}
                            child={
                              <Text style={{fontSize: 30}}> - </Text>
                            }></Container>
                        </TouchableOpacity>
                        <Container
                          borderColor={'grey'}
                          borderRadius={5}
                          // minWidth={25}
                          // padding={5}
                          // height={30}
                          child={
                            <TextInput
                              borderColor={'grey'}
                              borderRadius={5}
                              minWidth={40}
                              padding={5}
                              height={30}
                              style={{textAlign: 'center'}}
                              value={`${quantity}`}
                              onChangeText={v => {
                                if (v === '') {
                                  setQuantity(0);
                                  return;
                                }
                                if (badge.allow_semi_negative == true) {
                                  setQuantity(parseInt(v));
                                } else {
                                  if (productShow.checkInventory == true) {
                                    var quantityInStockCheck =
                                      quantityStockCurrent ?? quantityInStock;
                                    if (quantityInStockCheck < 0) {
                                      setQuantity(parseInt(v));
                                    } else {
                                      if (v != '' && v != '0') {
                                        if (
                                          quantityInStockCheck != null &&
                                          quantityInStockCheck != 'Vô hạn'
                                        ) {
                                          if (
                                            parseInt(v) < quantityInStockCheck
                                          ) {
                                            setQuantity(parseInt(v));
                                          } else {
                                            setQuantity(
                                              parseInt(quantityInStockCheck),
                                            );
                                          }
                                        } else {
                                          setQuantity(parseInt(v));
                                        }
                                      }
                                    }
                                    checkCanCrease();
                                  } else {
                                    setQuantity(parseInt(v));
                                  }
                                }
                              }}
                            />
                          }></Container>
                        <TouchableOpacity
                          onPress={() => {
                            if (productShow.checkInventory == true) {
                              if (canIncrease) {
                                setQuantity(quantity + 1);
                              }
                              checkCanCrease();
                            } else {
                              setQuantity(quantity + 1);
                            }
                          }}>
                          <Container
                            padding={10}
                            child={
                              <Text style={{fontSize: 30}}> + </Text>
                            }></Container>
                        </TouchableOpacity>
                      </Row>
                    </Row>
                  }></Container>
                {errorTextInBottomModel.length > 0 ? (
                  <Container
                    paddingLeft={10}
                    paddingRight={10}
                    paddingBottom={10}
                    child={
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'red',
                          alignItems: 'center',
                        }}>
                        {errorTextInBottomModel}
                      </Text>
                    }></Container>
                ) : (
                  <></>
                )}
                {isUpdateCart ? (
                  <Row mainAxisAlignment={'center'}>
                    <IButton
                      text={'Cập nhật giỏ hàng'}
                      width={deviceWidth - 50}
                      onPress={() => {
                        if (loading === false) {
                          if (productShow.checkInventory == true) {
                            if (
                              (quantityStockCurrent ?? quantityInStock) != 0
                            ) {
                              onSubmitBuy({buyNow: false});
                            } else {
                              setErrorTextInBottomModel('Hết hàng');
                            }
                          } else {
                            onSubmitBuy({buyNow: false});
                          }
                        }
                      }}></IButton>
                  </Row>
                ) : (
                  <Row mainAxisAlignment={'space-around'}>
                    <IButton
                      text={'Thêm vào giỏ hàng'}
                      width={(deviceWidth - 50) / 2}
                      onPress={() => {
                        if (loading === false) {
                          if (productShow.checkInventory == true) {
                            if (
                              (quantityStockCurrent ?? quantityInStock) != 0
                            ) {
                              onSubmitBuy({buyNow: false});
                            } else {
                              setErrorTextInBottomModel('Hết hàng');
                            }
                          } else {
                            onSubmitBuy({buyNow: false});
                          }
                        }
                      }}></IButton>
                    <IButton
                      text={'Mua ngay'}
                      width={(deviceWidth - 50) / 2}
                      onPress={() => {
                        if (loading === false) {
                          if (productShow.checkInventory == true) {
                            if (
                              (quantityStockCurrent ?? quantityInStock) != 0
                            ) {
                              onSubmitBuy({buyNow: true});
                            } else {
                              setErrorTextInBottomModel('Hết hàng');
                            }
                          } else {
                            onSubmitBuy({buyNow: true});
                          }
                        }
                      }}></IButton>
                  </Row>
                )}

                <SizedBox height={30}></SizedBox>
              </Column>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
