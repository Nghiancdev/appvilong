import React, {useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';


import {useChatStore} from '../../store/ChatStore';
import SizedBox from '../../components/SizedBox';
import Column from '../../components/Column';
import Row from '../../components/Row';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import CheckLoginCPN from '../../components/CheckLoginCPN';
import {Image} from 'react-native';
import {handleShowTime} from '../../utils/apis/stringUtil';
import StoreCode from '../../singletons/StoreCode';
import {useDataAppStore} from '../../store/DataAppStore';
import { observer } from 'mobx-react-lite';

const ChatListScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {loadInit, listBoxChat, getAllPersonChat, isLoading} = useChatStore();
  const {appTheme} = useDataAppStore();

  useEffect(() => {
    getAllPersonChat(true);
  }, []);

  const itemBoxChat = data => {
    var item = data.item;
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('CHAT_VIEW', {
            infoCustomerChat: item.to_customer,
        });
      }}>
        <Row
          mainAxisAlignment={'flex-start'}
          crossAxisAlignment={'flex-start'}
          padding={10}>
          <Image
            source={{
              uri: item?.to_customer?.avatar_image,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 1000,
            }}
            resizeMode="cover"></Image>
          <SizedBox width={10}></SizedBox>
          <Column mainAxisAlignment={'space-between'}>
            <Row mainAxisAlignment={'space-between'}>
              <Text>{item.to_customer?.name ?? 'Chưa đặt tên'}</Text>
              <Text>{`${handleShowTime(item.updated_at)}`}</Text>
            </Row>
            <SizedBox height={10}></SizedBox>
            <Text>{item.last_mess ?? ''}</Text>
          </Column>
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <Scaffold
      appbar={<IAppBar title={'Chat'}></IAppBar>}
      body={
        <CheckLoginCPN
          child={
            loadInit == true ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Column>
                {itemBoxChat({
                  item: {
                    last_mess: 'Liên hệ ngay',
                    to_customer: {
                      name: `${StoreCode.getStoreName() ?? ''}`,
                      avatar_image: `${appTheme.logo_url ?? ''}`,
                    },
                  },
                })}
                <SizedBox width={windowWidth}></SizedBox>
                <FlatList
                  data={listBoxChat}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={itemBoxChat}
                  ListFooterComponent={
                    isLoading && (
                      <ActivityIndicator
                        style={{marginTop: 10}}></ActivityIndicator>
                    )
                  }
                  onEndReachedThreshold={0.1}
                  onEndReached={() => {
                    if (listBoxChat.length > 0 && !isLoading) {
                      getAllPersonChat();
                    }
                  }}
                />
              </Column>
            )
          }></CheckLoginCPN>
      }></Scaffold>
  );
});

export default ChatListScreen;
