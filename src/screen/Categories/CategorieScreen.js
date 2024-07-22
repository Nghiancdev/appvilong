import React, {useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  Animated,
  Image,
  ActivityIndicator,
  TextInput,
  UIManager,
  LayoutAnimation,
} from 'react-native';

import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDataAppStore} from '../../store/DataAppStore';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import Row from '../../components/Row';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import ProductItem from '../../components/Product/ProductItem';
import {useCategoriesStore} from '../../store/CategoriesStore';
import Container from '../../components/Container';
import Wrap from '../../components/Wrap';
import SizedBox from '../../components/SizedBox';
import CateAllIcon from '../../components/Icons/CateAllIcon';
import ArrowDownIcon from '../../components/Icons/ArrowDownIcon';
import ArrowTopIcon from '../../components/Icons/ArrowTopIcon';
import IconClose from '../../components/Icons/IconClose';
import {set} from 'date-fns';
import {useFocusEffect} from '@react-navigation/native';

const CategorieScreen = observer(({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, infoCustomer} = useDataAppStore();
  const {
    products,
    categories,
    categoryCurrent,
    sortByShow,
    descendingShow,
    categoryCurrentChild,
    isLoadingProductMore,
    loadInit,
    searchProduct,
    getAllCategory,
    setCategoryCurrent,
    setCategoryCurrentChild,
    setTextSearch,
    setCategoryChildInput,
    setIsChooseDiscountSort,
    setCategories,
    setSortByShow,
  } = useCategoriesStore();

  const [textValue, setTextValue] = React.useState('');
  const [expanded, setExpanded] = React.useState(true);

  const {
    autoSearch = false,
    isHideBack = null,
    categoryId = null,
    categoryChildId = null,
    textSearch = null,
    categoryChildInput = null,
    sortByShowInput = null,
    isChooseDiscountSort = null,
  } = route.params ?? {};

  // console.log("textSearch", textSearch)
  // console.log("descendingShow", descendingShow)
  // console.log("sortByShowInput", sortByShowInput)
  // console.log("textSearch", textSearch)
  const isLoad = useRef(false);

  useEffect(() => {
    // console.log('=====================', sortByShowInput);
    setSortByShow(sortByShowInput ?? '');
    if (categoryChildInput != null) {
      setCategories(categoryChildInput);
      setTextSearch(textSearch ?? '');
      setTextValue(textSearch ?? '');
      setIsChooseDiscountSort(isChooseDiscountSort ?? false);
      setCategoryCurrent(categoryId ?? -1);
      setCategoryCurrentChild(categoryChildId ?? -1);
      if (categoryChildInput.length == 1) {
        setCategoryCurrentChild(categoryChildInput[0].id ?? 0);
      }
      searchProduct(textSearch, descendingShow, sortByShowInput);
    } else {
      setCategoryCurrent(categoryId ?? -1);
      setIsChooseDiscountSort(isChooseDiscountSort ?? false);
      getAllCategory();
      searchProduct(
        textSearch,
        descendingShow,
        sortByShowInput,
        categoryCurrent != -1 ? categoryCurrent : null,
      );
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (isLoad.current == true) {
        searchProduct();
      }
      isLoad.current = true;
    }, []),
  );

  const itemProduct = item => {
    return (
      <Row>
        <ProductItem
          product={item?.item?.item1}
          height={
            infoCustomer?.is_collaborator == true ||
            infoCustomer?.is_agency == true
              ? 310
              : 280
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
                ? 310
                : 280
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
    for (let i = 0; i < (products ?? []).length; i += 2) {
      const combinedItem = {
        item1: products[i],
        item2: products.length <= i + 1 ? null : products[i + 1],
      };
      combinedProducts.push(combinedItem);
    }
    //  console.log('combinedProducts', combinedProducts);
    return combinedProducts;
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const position = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [400, 500],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  const prevScrollY = useRef(new Animated.Value(0)).current;
  const direction = useRef('down'); // Giả định mặc định là cuộn xuống

  scrollY.addListener(({value}) => {
    if (value > prevScrollY._value + 50) {
      // Scroll xuống
      direction.current = 'down';
      if (value > 0) {
        debouncedScroll(true);
      }
    } else if (value + 50 < prevScrollY._value) {
      // Scroll lên
      direction.current = 'up';
      debouncedScroll(false);
    }

    prevScrollY.setValue(value); // Cập nhật giá trị scrollY trước đó
  });

  // debouncedScroll = _.debounce(isDown => {
  //   if (isDown) {
  //     handlePress(false);
  //   } else {
  //     handlePress(true);
  //   }
  // }, 10);

  const isAnimating = useRef(false);

  const debouncedScroll = _.debounce(isDown => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, () => {
      isAnimating.current = false;
    });
    setExpanded(!isDown);
    // if (!isAnimating.current) {
    //   isAnimating.current = true;

    // }
  }, 0);

  const checkHeight = () => {
    const cateNumber = categories.length;
    if (cateNumber < 9) {
      return Dimensions.get('window').width / 4.5 + 70;
    } else {
      return (Dimensions.get('window').width / 4.5 + 70) * 2;
    }
  };

  const CateList = () => {
    const checkWidth = () => {
      const cateNumber = categories.length;
      if (cateNumber < 9) {
        return cateNumber * (Dimensions.get('window').width / 4.5) + 1;
      } else {
        const ca2 = Math.ceil(cateNumber / 2);
        return ca2 * (Dimensions.get('window').width / 4.5) + 1;
      }
    };

    return (
      <Container
        flex={1}
        width={windowWidth}
        child={
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{width: windowWidth}}>
              <View
                style={{
                  height: checkHeight(),
                  width: checkWidth(),
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                {
                  <Wrap runSpacing={10}>
                    {(categories ?? []).map((e, index) => (
                      <TouchableOpacity
                        key={e.id}
                        onPress={() => {
                          if (categoryChildInput != null) {
                            setCategoryCurrentChild(e.id ?? -1);
                          } else {
                            setCategoryCurrent(e.id ?? -1);
                          }
                          if (
                            e.category_children != null &&
                            e.category_children.length > 0
                          ) {
                            navigation.push('CATEGORIES_SUB', {
                              textSearch: textSearch,
                              categoryId: e.id,
                              categoryChildInput: e.category_children,
                            });
                            // Navigator.push(
                            //   context,
                            //   MaterialPageRoute(
                            //       builder: (context) =>
                            //           CategoryProductStyle4(
                            //             textSearch: categoryController
                            //                 .textSearch.value,
                            //             categoryChildInput:
                            //                 category.listCategoryChild,
                            //             categoryId: category.id,
                            //           )),
                            // );
                          } else {
                            searchProduct();
                          }
                        }}
                        style={{
                          width: Dimensions.get('window').width / 4.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {e.id == -1 ? (
                          <CateAllIcon
                            size={windowWidth / 6}
                            color={
                              e.id == categoryCurrent
                                ? appTheme.color_main_1
                                : 'grey'
                            }></CateAllIcon>
                        ) : (
                          <Image
                            style={{
                              width: Dimensions.get('window').width / 6,
                              height: Dimensions.get('window').width / 6,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'white',
                              borderRadius: 25,
                            }}
                            source={{uri: e.image_url || ''}}
                            onError={e => {
                              console.log('error');
                              e.target.source;
                            }}
                          />
                        )}
                        <SizedBox height={10}></SizedBox>
                        <View
                          style={{
                            height: 30,
                            paddingLeft: 3,
                            paddingRight: 3,
                          }}>
                          <Text
                            style={{
                              fontSize: 11,
                              textAlign: 'center',
                              color:
                                e.id == categoryCurrent
                                  ? appTheme.color_main_1
                                  : 'black',
                              fontWeight:
                                e.id == categoryCurrent ? 500 : 'normal',
                            }}
                            numberOfLines={2}>
                            {e.name || ''}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </Wrap>
                }
              </View>
            </ScrollView>
          </View>
        }></Container>
    );
  };

  const itemSort = (title, key) => {
    var selected = key == sortByShow;
    return (
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          if (sortByShow == 'price' && key == 'price') {
            searchProduct(null, !descendingShow, key, null, null, null);
            return;
          }
          searchProduct(null, null, key, null, null, null);
        }}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderBottomColor: selected ? appTheme.color_main_1 : 'white',
            borderBottomWidth: 2,
          }}>
          <Text>{title}</Text>
          {key == 'price' &&
            selected &&
            (descendingShow == true ? (
              <ArrowDownIcon></ArrowDownIcon>
            ) : (
              <ArrowTopIcon></ArrowTopIcon>
            ))}
        </View>
      </TouchableOpacity>
    );
  };

  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

  return (
    <Scaffold
      appbar={
        <View style={{zIndex: 10000}}>
          <IAppBar
            actionButton={
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: '#eaedf0',
                  }}>
                  <SizedBox width={10}></SizedBox>
                  <Icon
                    name="search1"
                    size={18}
                    color={appTheme.color_main_1}
                  />

                  <TextInput
                    style={{
                      padding: 10,
                      flex: 1,
                    }}
                    value={textValue}
                    placeholder="Nhập từ khoá..."
                    onChangeText={text => {
                      setTextValue(text);
                    }}
                    autoFocus={autoSearch ?? false}
                    onSubmitEditing={v => {
                      navigation.navigate('SEARCH_PRODUCT', {
                        textSearch: textValue,
                      });
                      setTextSearch(textValue);
                    }}
                    icon="search"></TextInput>
                  <TouchableOpacity
                    onPress={() => {
                      setTextValue('');
                      setTextSearch('');
                      searchProduct();
                    }}>
                    <IconClose></IconClose>
                  </TouchableOpacity>
                  <SizedBox width={10}></SizedBox>
                </View>
                <SizedBox width={10}></SizedBox>
                <Icon name="filter" size={18} color={appTheme.color_main_1} />
                <SizedBox width={10}></SizedBox>
              </View>
            }></IAppBar>
        </View>
      }
      body={
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            width: windowWidth,
          }}>
          <View
            style={{
              height: expanded ? checkHeight() : 0,
              overflow: 'hidden',
              backgroundColor: 'white',
              width: windowWidth,
            }}>
            <Row>
              {itemSort('Phổ biến', 'views')}
              {itemSort('Mới nhất', 'created_at')}
              {itemSort('Bán chạy', 'sales')}
              {itemSort('Giá', 'price')}
            </Row>
            {CateList()}
          </View>
          {loadInit == true ? (
            <ActivityIndicator style={{flex: 1}}></ActivityIndicator>
          ) : products.length > 0 ? (
            <FlatList
              data={dataProduct()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={itemProduct}
              ListFooterComponent={
                isLoadingProductMore && (
                  <ActivityIndicator
                    style={{marginTop: 10}}></ActivityIndicator>
                )
              }
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                if ((products ?? []).length > 0 && !isLoadingProductMore) {
                  searchProduct(null, null, null, null, null, true);
                }
              }}
              onScroll={handleScroll}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: windowWidth,
              }}>
              <Text>Chưa có sản phẩm</Text>
            </View>
          )}
        </View>
      }></Scaffold>
  );
});

export default CategorieScreen;
