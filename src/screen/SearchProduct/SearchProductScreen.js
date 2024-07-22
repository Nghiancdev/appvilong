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
import {useSearchProductStore} from '../../store/SearchProductStore';

const SearchProductScreen = observer(({route, navigation}) => {
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
    histories,
    searchProduct,
    getAllCategory,
    setCategoryCurrent,
    setCategoryCurrentChild,
    setTextSearch,
    setCategoryChildInput,
    getSearchHistory,
    setCategories,
  } = useSearchProductStore();

  const [textValue, setTextValue] = React.useState('');

  const {
    autoSearch = false,
    isHideBack = null,
    categoryId = null,
    categoryChildId = null,
    textSearch = null,
    categoryChildInput = null,
  } = route.params ?? {};

  useEffect(() => {
    // console.log('categoryChildInput', categoryChildInput);
    // console.log('categoryChildId', categoryChildId);
    // console.log('categoryId', categoryId);
    // console.log('textSearch', textSearch);
    getSearchHistory();
    setTextValue(textSearch ?? '');
    setTextSearch(textSearch ?? '');

    if (categoryChildInput != null) {
      setCategories(categoryChildInput);
      setCategoryCurrent(categoryId ?? -1);
      setCategoryCurrentChild(categoryChildId ?? -1);
      if (categoryChildInput.length == 1) {
        setCategoryCurrentChild(categoryChildInput[0].id ?? 0);
      }
      searchProduct(textSearch, descendingShow, sortByShow);
    } else {
      setCategoryCurrent(categoryId ?? -1);
      getAllCategory();
      searchProduct(
        textSearch,
        descendingShow,
        sortByShow,
        categoryCurrent != -1 ? categoryCurrent : null,
      );
    }
  }, []);
  console.log('products', products.length);
  const itemProduct = item => {
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
    console.log('anson');
    const combinedProducts = [];
    for (let i = 0; i < (products ?? []).length; i += 2) {
      const combinedItem = {
        item1: products[i],
        item2: products.length <= i + 1 ? null : products[i + 1],
      };
      combinedProducts.push(combinedItem);
    }
    //  console.log('combinedProducts', combinedProducts.length);
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
    if (value > prevScrollY._value) {
      // Scroll xuống
      direction.current = 'down';
      if (value > 0) {
        debouncedScroll(true);
      }
    } else if (value < prevScrollY._value) {
      // Scroll lên
      direction.current = 'up';
      debouncedScroll(false);
    }

    prevScrollY.setValue(value); // Cập nhật giá trị scrollY trước đó
  });

  debouncedScroll = _.debounce(
    isDown => {
      if (isDown) {
        Animated.timing(position, {
          toValue: -checkHeight(),
          duration: 100,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(position, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
    },
    10, // Thời gian debounce, điều chỉnh theo yêu cầu của bạn
  );

  const checkHeight = () => {
    if ((histories ?? []).length > 0) {
      return 70 + 20;
    } else {
      return 80;
    }
  };

  const height = scrollY.interpolate({
    inputRange: [0, checkHeight()],
    outputRange: [checkHeight(), 0],
    extrapolate: 'clamp',
  });

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

  const itemHistory = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setTextSearch(item?.text);
          setTextValue(item?.text);
          searchProduct(item?.text, null, null, null, null, null);
        }}>
        <View
          style={{
            margin: 10,
            marginTop: 2,
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'white',
            shadowColor: '#000',
            marginRight: 10,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
          }}>
          <Text>{item?.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
                    onSubmitEditing={v => {
                      searchProduct(textValue, descendingShow, sortByShow);
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
          <Animated.View
            style={[
              {
                height: checkHeight(),
                width: windowWidth,
                position: 'absolute',
                zIndex: 9999,
              },
              {transform: [{translateY: position}]},
            ]}>
            <Row>
              {itemSort('Phổ biến', 'views')}
              {itemSort('Mới nhất', 'created_at')}
              {itemSort('Bán chạy', 'sales')}
              {itemSort('Giá', 'price')}
            </Row>
            <View style={{width: windowWidth}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {(histories ?? []).map((e, index) => {
                  return itemHistory(e);
                })}
              </ScrollView>
            </View>
          </Animated.View>
          <Animated.View style={[{height: height}]}></Animated.View>
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
                if (products.length > 0 && !isLoadingProductMore) {
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

export default SearchProductScreen;
