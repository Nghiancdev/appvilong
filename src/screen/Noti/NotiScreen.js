import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {observer} from 'mobx-react';
import Column from '../../components/Column';
import SizedBox from '../../components/SizedBox';
import {getDDMMYY} from '../../utils/apis/stringUtil';
import {Divider, Icon} from 'react-native-paper';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import Row from '../../components/Row';
import {useDataAppStore} from '../../store/DataAppStore';
import {useNotiStore} from '../../store/NotiStore';
import NextArrowIcon from '../../components/Icons/NextArrowIcon';
import DotIcon from '../../components/Icons/DotIcon';

const NotiScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const {getAllNoti, readAllNotification, listNoti, loadInit, isLoading} =
    useNotiStore();

  useEffect(() => {
    getAllNoti(true);
    readAllNotification();
  }, []);

  const navigator = (typeNotification, orderCode) => {
    if (typeNotification == 'NEW_ORDER') {
      navigation.navigate('OrderHistoryDetailScreen');
    }
    if (typeNotification == 'NEW_MESSAGE') {
      navigation.navigate('CHAT_LIST');
    }
    if (typeNotification == 'NEW_POST') {
      navigation.navigate('NEW');
    }

    if (typeNotification == 'NEW_PERIODIC_SETTLEMENT') {
      navigation.navigate('CTV');
    }

    if (typeNotification.split('-')[0] == 'ORDER_STATUS') {
      if (typeNotification.split('-')[1] == 'WAITING_FOR_PROGRESSING') {
        navigation.navigate('ORDER_DETAIL', {
          orderCode: orderCode,
        });
      }

      if (typeNotification.split('-')[1] == 'PACKING') {
        navigation.navigate('ORDER_DETAIL', {
          orderCode: orderCode,
        });
      }

      if (typeNotification.split('-')[1] == 'SHIPPING') {
        navigation.navigate('ORDER_DETAIL', {
          orderCode: orderCode,
        });
      }
      if (typeNotification.split('-')[1] == 'COMPLETED') {
        navigation.navigate('ORDER_DETAIL', {
          orderCode: orderCode,
        });
      }

      if (typeNotification.split('-')[1] == 'OUT_OF_STOCK') {
        navigation.navigate('ORDER_DETAIL', {
          orderCode: orderCode,
        });
      }

      if (typeNotification.split('-')[1] == 'USER_CANCELLED') {
        navigation.navigate('ORDER', {routeName: 5});
      }

      if (typeNotification.split('-')[1] == 'CUSTOMER_CANCELLED') {
        navigation.navigate('ORDER_DETAIL', {
          orderCode: orderCode,
        });
      }

      if (typeNotification.split('-')[1] == 'DELIVERY_ERROR') {
        navigation.navigate('ORDER_DETAIL', {
          orderCode: orderCode,
        });
      }

      if (typeNotification.split('-')[1] == 'CUSTOMER_RETURNING') {
        navigation.navigate('ORDER_DETAIL', {
          orderCode: orderCode,
        });
      }

      if (typeNotification.split('-')[1] == 'CUSTOMER_HAS_RETURNS') {
        navigation.navigate('ORDER_DETAIL', {
          orderCode: orderCode,
        });
      }
    }

    if (typeNotification == 'SEND_ALL') {
    }
    if (typeNotification == 'TO_ADMIN') {
    }
  };

  const itemHis = data => {
    var item = data.item;
    return (
      <TouchableOpacity
        onPress={() => {
          navigator(item.type, item.references_value);
        }}
        style={{
          backgroundColor: item.unread == true ? 'rgba(0,0,0,0.1)' : 'white',
        }}>
        <Column>
          <SizedBox width={windowWidth}></SizedBox>
          <Row crossAxisAlignment={'flex-start'} padding={10}>
            <DotIcon></DotIcon>
            <SizedBox width={10}></SizedBox>
            <Column>
              <Text>{item?.title}</Text>
              <SizedBox height={10}></SizedBox>
              <Text>{item?.content}</Text>
              <SizedBox height={10}></SizedBox>
              <Text>{getDDMMYY(item?.created_at)}</Text>
            </Column>
            <SizedBox width={10}></SizedBox>
            <NextArrowIcon></NextArrowIcon>
          </Row>
          <Divider></Divider>
        </Column>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Scaffold
        appbar={<IAppBar title={'Thông báo'}></IAppBar>}
        body={
          loadInit == true ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <Column>
              <FlatList
                data={listNoti}
                keyExtractor={(item, index) => index.toString()}
                renderItem={itemHis}
                ListFooterComponent={
                  isLoading && (
                    <ActivityIndicator
                      style={{marginTop: 10}}></ActivityIndicator>
                  )
                }
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                  if (listNoti.length > 0 && !isLoading) {
                    getAllNoti();
                  }
                }}
              />
            </Column>
          )
        }></Scaffold>
    </>
  );
});

export default NotiScreen;
