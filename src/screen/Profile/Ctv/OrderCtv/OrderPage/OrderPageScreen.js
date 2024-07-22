import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';

import {observer} from 'mobx-react';

import OrderCPN from './child/OrderCPN';
import Scaffold from '../../../../../components/Scafold';
import {useOrderStore} from '../../../../../store/OrderStore';
import {useDataAppStore} from '../../../../../store/DataAppStore';
import { useOrderCtvStore } from '../../../../../store/OrderCtvStore';

const OrderPageScreen = observer(({navigation, fieldByValue}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {appTheme, badge} = useDataAppStore();

  const {isLoading, loadInit, listOrder, getAllOrder} = useOrderCtvStore();
  console.log("listOrder",JSON.stringify(listOrder.order_code))
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loadInit ? (
           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
         </View>
        
      ) : listOrder.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Không có đơn hàng nào</Text>
        </View>
      ) : (
        <FlatList
          data={listOrder}
          renderItem={({item, separators}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ORDER_DETAIL', {
                  orderCode: item.order_code,
                });
              }}>
              <OrderCPN order={item}></OrderCPN>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={isLoading ? <ActivityIndicator /> : <></>}
          //   onEndReached={getAllOrder(false, fieldByValue)}
          onEndThreshold={0}
        />
      )}
    </View>
  );
});

export default OrderPageScreen;
