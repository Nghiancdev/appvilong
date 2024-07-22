import React, {useEffect, useRef} from 'react';
import {Dimensions, FlatList, ActivityIndicator, View, Text} from 'react-native';

import {observer} from 'mobx-react';
import {useCtvStore} from '../../../store/CtvStore';
import Column from '../../../components/Column';
import SizedBox from '../../../components/SizedBox';
import {convertToMoney, getDDMMYY} from '../../../utils/apis/stringUtil';
import {Divider} from 'react-native-paper';
import Scaffold from '../../../components/Scafold';
import IAppBar from '../../../components/AppBar';
import Row from '../../../components/Row';

const PaymentHistoryScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {getPaymentCtvHistory, history, isLoading, loadInit} = useCtvStore();


  useEffect(() => {
    getPaymentCtvHistory(true);
  }, []);

  const itemHis = (data) => {
    var item = data.item;
    return (
      <Column>
        <Column padding={10}>
          <Text>{item?.type_name}</Text>
          <SizedBox height={10}></SizedBox>
          <Row>
            <Text>{`${convertToMoney(item?.money)} ₫`}</Text>
            <View style={{flex: 1}}></View>
            <Text>{`${getDDMMYY(item?.created_at)}`}</Text>
          </Row>
        </Column>
        <Divider></Divider>
      </Column>
    );
  };


  
  const renderEmptyComponent = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        marginTop: 200,
      }}>
        <Text>Chưa có phát sinh lịch sử số dư</Text>
      </View>
    );
  };


  return (
    <Scaffold
      appbar={<IAppBar title={'Lịch sử số dư'}></IAppBar>}
      body={
        loadInit == true ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <Column>
            <SizedBox width={windowWidth}></SizedBox>
            <FlatList
              data={history}
              keyExtractor={(item, index) => index.toString()}
              renderItem={itemHis}
              ListFooterComponent={
                isLoading && (
                  <ActivityIndicator
                    style={{marginTop: 10}}></ActivityIndicator>
                )
              }
              onEndReachedThreshold={0.1}
              ListEmptyComponent={renderEmptyComponent}
              onEndReached={() => {
                if (history.length > 0 && !isLoading) {
                  getPaymentCtvHistory();
                }
              }}
            />
          </Column>
        )
      }></Scaffold>
  );
});

export default PaymentHistoryScreen;
