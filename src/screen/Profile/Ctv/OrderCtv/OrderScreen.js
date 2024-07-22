import React, {useEffect, useRef} from 'react';
import {observer} from 'mobx-react';
import IAppBar from '../../../../components/AppBar';
import OrderPageScreen from './OrderPage/OrderPageScreen';
import {ORDER_STATUS} from '../../../../constants';
import {FlatList, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Text, TouchableOpacity} from 'react-native';
import {Tab, TabView} from '@rneui/themed';
import {useDataAppStore} from '../../../../store/DataAppStore';
import { useOrderCtvStore } from '../../../../store/OrderCtvStore';

const OrderCTVScreen = observer(({route, navigation}) => {
  const {getAllOrderDeboucer, getAllOrder} = useOrderCtvStore();
  const {appTheme} = useDataAppStore();

  const nameToStatus = {
    0: ORDER_STATUS.WAITING_FOR_PROGRESSING,  //  (done)
    1: ORDER_STATUS.PACKING,// (done)
    2: ORDER_STATUS.OUT_OF_STOCK,// (stock)
    3: ORDER_STATUS.SHIPPING, //(shipping)
    4: ORDER_STATUS.RECEIVED_PRODUCT, //(product)
    5: ORDER_STATUS.COMPLETED, //(COMPLETED)
    6: ORDER_STATUS.USER_CANCELLED, //(USER_CANCELLED)
    7: ORDER_STATUS.CUSTOMER_CANCELLED, //( CUSTOMER_CANCELLED)
    8: ORDER_STATUS.DELIVERY_ERROR, //( DELIVERY_ERROR)
    9: ORDER_STATUS.CUSTOMER_RETURNING, //(CUSTOMER_RETURNING)
    10: ORDER_STATUS.CUSTOMER_HAS_RETURNS, //(CUSTOMER_HAS_RETURNS)
    11: ORDER_STATUS.ALL //(ALL)
  };

  const {routeName} = route?.params ?? '';

  useFocusEffect(
    React.useCallback(() => {
      setIndexTab(routeName);
      setTimeout(() => {
        flatlistRef.current.scrollToIndex({animated: true, index: routeName});
      }, 100);
      getAllOrder(true, nameToStatus[routeName], routeName, true);
    }, []),
  );

  const [indexTab, setIndexTab] = React.useState(0);

  const flatlistRef = useRef();

  const getItemLayout = (data, index) => ({
    length: 100,
    offset: 100 * index,
    index,
  });
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={{
          backgroundColor: index === indexTab ? appTheme.color_main_1 : 'white',
          padding: 10,
          borderRadius: 5,
          margin: 5,
          height: 40,
        }}
        onPress={() => {
          setIndexTab(index);
          getAllOrderDeboucer(true, nameToStatus[index], index);
          flatlistRef.current.scrollToIndex({animated: true, index: index});
        }}>
        <Text
          style={{color: index !== indexTab ? appTheme.color_main_1 : 'white'}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <IAppBar title={'Danh sách đơn hàng'}></IAppBar>
      <View style={{height: 50, backgroundColor: 'white'}}>
        <FlatList
          data={[
            'Chờ xử lý', // WAITING_FOR_PROGRESSING
            'Đang chuẩn bị hàng', // PACKING
            'Hết hàng', //OUT_OF_STOCK
            'Đang giao hàng', //SHIPING
            'Đã nhận hàng', //RECIEVED_PRODUCT
            'Đã hoàn thành', //COMPLETED
            'Shop đã hủy', // USER_CANCELLED
            'Khách đã hủy', //CUSTOMER_CANCELLED
            'Lỗi giao hàng', //DELIVERY_ERROR
            'Chờ trả hàng', //CUSTOMER_RETURNING
            'Đã trả hàng', //CUSTOMER_HAS_RETURNS
            'Tất cả', //ALL
          ]}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          horizontal={true}
          ref={flatlistRef}
          getItemLayout={getItemLayout}
        />
      </View>
      <View style={{flex:1}}>
        <TabView
          value={indexTab}
          onChange={e => {
            setIndexTab(e);
            flatlistRef.current.scrollToIndex({animated: true, index: e});
            getAllOrderDeboucer(true, nameToStatus[e], e);
          }}
          animationType="spring">
          <TabView.Item style={{backgroundColor: 'red', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.WAITING_FOR_PROGRESSING}
            />
          </TabView.Item>
          {/* RECIEVED_PRODUCT */}
          <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.RECEIVED_PRODUCT}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'blue', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.SHIPPING}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.PACKING}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.COMPLETED}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.OUT_OF_STOCK}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.USER_CANCELLED}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.CUSTOMER_CANCELLED}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.DELIVERY_ERROR}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.CUSTOMER_RETURNING}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.CUSTOMER_HAS_RETURNS}
            />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <OrderPageScreen
              navigation={navigation}
              fieldByValue={ORDER_STATUS.ALL}
            />
          </TabView.Item>
        </TabView>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export default OrderCTVScreen;
