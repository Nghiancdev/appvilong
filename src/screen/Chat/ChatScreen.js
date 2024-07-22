import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import SizedBox from '../../components/SizedBox';
import Column from '../../components/Column';
import Scaffold from '../../components/Scafold';
import IAppBar from '../../components/AppBar';
import CheckLoginCPN from '../../components/CheckLoginCPN';
import StoreCode from '../../singletons/StoreCode';
import {useDataAppStore} from '../../store/DataAppStore';
import {Chat} from '@flyerhq/react-native-chat-ui';
import {useChatViewStore} from '../../store/ChatViewStore';
import {observer} from 'mobx-react';
import {launchImageLibrary} from 'react-native-image-picker';
import {constants} from '../../constants';
import UserUtil from '../../utils/apis/userUtil';
import axios from 'axios';
const ChatScreen = observer(({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const {
    loadMoreMessage,
    userMain,
    userChat,
    listMessages,
    isLoading,
    isRefresh,
    setIsRefresh,
    setUserChat,
    setUserMain,
    setListMessages,
    sendMessageToUsers,
    sendImageToUser,
    socketOff,
    socketOn,
  } = useChatViewStore();
  const {appTheme, isLogin} = useDataAppStore();

  const [messages, setMessages] = useState();

  const {infoCustomerChat} = route.params;

  useEffect(() => {
    setUserChat({
      id: `${StoreCode.getStoreCode()}`,
      imageUrl: appTheme.logo_url ?? '',
      firstName: `${StoreCode.getStoreName() ?? ''}`,
    });

    setUserMain({
      id: `${infoCustomerChat.id}`,
      imageUrl: `${infoCustomerChat.avatar_image ?? ''}`,
      firstName: `${infoCustomerChat.name ?? ''}`,
    });

    if (isLogin == true) {
      loadMoreMessage(true);
      socketOn();
    }
    return () => {
      socketOff();
    };
  }, []);

  const addMessage = message => {
    setMessages([message, ...messages]);
  };

  const handleAttachmentPress = () => {
    // setIsShowDrawer(true);
    handleImageSelection();
    // showActionSheetWithOptions(
    //   {
    //     options: ['Photo', 'File', 'Cancel'],
    //     cancelButtonIndex: 2,
    //   },
    //   buttonIndex => {
    //     switch (buttonIndex) {
    //       case 0:
    //         handleImageSelection();
    //         break;
    //       case 1:
    //         handleFileSelection();
    //         break;
    //     }
    //   },
    // );
  };

  const handleFileSelection = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      const fileMessage = {
        author: user,
        createdAt: Date.now(),
        id: uuidv4(),
        mimeType: response.type ?? undefined,
        name: response.name,
        size: response.size ?? 0,
        type: 'file',
        uri: response.uri,
      };
      addMessage(fileMessage);
    } catch {}
  };

  const handleImageSelection = () => {
    launchImageLibrary(
      {
        includeBase64: true,
        maxWidth: 1440,
        mediaType: 'photo',
        quality: 0.7,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          try {
            let imageUris =
              response.uri || response.assets?.map(item => item.uri);

            var data = await uploadImages(imageUris);

            const asset = response.assets?.[0];

            const imageMessage = {
              author: userMain,
              createdAt: Date.now(),
              height: asset.height,
              id: data[0],
              name: asset.fileName ?? asset.uri?.split('/').pop() ?? '🖼',
              size: asset.fileSize ?? 0,
              type: 'image',
              uri: data[0],
              width: asset.width,
              status: 'sent',
            };
            var list = listMessages;
            list.unshift(imageMessage);

            setListMessages(list);
            setIsRefresh(!isRefresh);
            sendImageToUser([
              {
                link_images: data[0],
                height: asset.height,
                width: asset.width,
                size: asset.fileSize ?? 0,
              },
            ]);
          } catch (error) {
            console.log('error', error);
          }
        }
      },
    );
  };

  const uploadImages = async images => {
    const uploadPromises = images.map(image => {
      const formData = new FormData();

      formData.append('image', {
        name: image?.split('/').pop(),
        type: 'image/jpeg',
        uri: Platform.OS === 'ios' ? image?.replaceAll('file://', '') : image,
      });

      console.log('formData', formData);
      console.log(
        `${constants.API_URL}customer/${StoreCode.getStoreCode()}/images`,
      );
      console.log(`${UserUtil.getToken()}`);
      return axios.post(
        `${constants.API_URL}customer/${StoreCode.getStoreCode()}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'customer-token': UserUtil.getToken(),
          },
        },
      );
    });

    try {
      const responses = await Promise.all(uploadPromises);
      console.log('Upload responses:', responses);
      return responses.map(response => response.data.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleMessagePress = async message => {
    if (message.type === 'file') {
      try {
        await FileViewer.open(message.uri, {showOpenWithDialog: true});
      } catch {}
    }
  };

  const handlePreviewDataFetched = ({message, previewData}) => {
    setMessages(
      messages.map <
        MessageType.Any >
        (m => (m.id === message.id ? {...m, previewData} : m)),
    );
  };

  const handleSendPress = message => {
    try {
      const textMessage = {
        author: userMain,
        createdAt: Date.now(),
        id: `${Math.random()}`,
        text: message.text,
        type: 'text',
      };
      var list = listMessages;
      list.unshift(textMessage);

      setListMessages(list);
      setIsRefresh(!isRefresh);
      sendMessageToUsers(message.text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Scaffold
        appbar={<IAppBar title={'Chat'}></IAppBar>}
        body={
          <CheckLoginCPN
            child={
              <Column>
                <SizedBox width={windowWidth}></SizedBox>
                {isRefresh == true ? (
                  <Chat
                    messages={listMessages}
                    onSendPress={handleSendPress}
                    user={userMain}
                    inverted
                    onMessagePress={handleMessagePress}
                    onImagePress={handleMessagePress}
                    onEndReached={() => {
                      loadMoreMessage();
                    }}
                    showUserNames
                    onAttachmentPress={handleAttachmentPress}
                    onCameraPress={handleImageSelection}
                    // onFilePress={handleFileSelection}
                    // onLocationPress={handleMessagePress}
                    // onPhonePress={handleMessagePress}
                    // onPreviewDataFetched={handlePreviewDataFetched}

                    // renderMessageContent={renderMessageContent}
                    // renderMessageFooter={renderMessageFooter}
                    // renderMessageHeader={renderMessageHeader}
                    // renderMessageReactions={renderMessageReactions}
                    // renderMessageUsernameOnMessage={renderMessageUsernameOnMessage}
                    // renderTime={renderTime}
                    // renderUsernameOnMessage={renderUsernameOnMessage}
                    // showUserAvatar={showUserAvatar}
                    // showUsernameOnMessage={showUsernameOnMessage}
                    // textInputProps={textInputProps}
                    // timeFormat={timeFormat}
                    // dateFormat={dateFormat}
                    // renderLoadEarlier={renderLoadEarlier}
                    // onLoadEarlier={onLoadEarlier}
                    // loadEarlier={loadEarlier}
                    // isLoadingEarlier={isLoadingEarlier}
                    // infiniteScroll={infiniteScroll}
                    // onKeyboardWillShow={onKeyboardWillShow}
                    // onKeyboardWillHide={onKeyboardWillHide}
                    // onSendAudio={onSendAudio}
                    // onSendFile={onSendFile}
                    // onSendLocation={onSendLocation}
                    // onSendPhoto={onSendPhoto}
                    // onSendVideo={onSendVideo}
                    // onSendContact={onSendContact}
                    // onSendGallery={onSendGallery}
                    // onSendDocument={onSendDocument}
                    // onSendSticker={onSendSticker}
                    // onSendQuickReply={onSendQuickReply}
                    // onSendVoice={onSendVoice}
                    // onSendProduct={onSendProduct}
                    // onSendProductGallery={onSendProductGallery}
                  ></Chat>
                ) : (
                  <Chat
                    messages={listMessages}
                    onSendPress={handleSendPress}
                    user={userMain}
                    inverted
                    onMessagePress={handleMessagePress}
                    onImagePress={handleMessagePress}
                    onEndReached={() => {
                      loadMoreMessage();
                    }}
                    showUserNames
                    onAttachmentPress={handleAttachmentPress}
                    onCameraPress={handleImageSelection}
                    // onFilePress={handleFileSelection}
                    // onLocationPress={handleMessagePress}
                    // onPhonePress={handleMessagePress}
                    // onPreviewDataFetched={handlePreviewDataFetched}

                    // renderMessageContent={renderMessageContent}
                    // renderMessageFooter={renderMessageFooter}
                    // renderMessageHeader={renderMessageHeader}
                    // renderMessageReactions={renderMessageReactions}
                    // renderMessageUsernameOnMessage={renderMessageUsernameOnMessage}
                    // renderTime={renderTime}
                    // renderUsernameOnMessage={renderUsernameOnMessage}
                    // showUserAvatar={showUserAvatar}
                    // showUsernameOnMessage={showUsernameOnMessage}
                    // textInputProps={textInputProps}
                    // timeFormat={timeFormat}
                    // dateFormat={dateFormat}
                    // renderLoadEarlier={renderLoadEarlier}
                    // onLoadEarlier={onLoadEarlier}
                    // loadEarlier={loadEarlier}
                    // isLoadingEarlier={isLoadingEarlier}
                    // infiniteScroll={infiniteScroll}
                    // onKeyboardWillShow={onKeyboardWillShow}
                    // onKeyboardWillHide={onKeyboardWillHide}
                    // onSendAudio={onSendAudio}
                    // onSendFile={onSendFile}
                    // onSendLocation={onSendLocation}
                    // onSendPhoto={onSendPhoto}
                    // onSendVideo={onSendVideo}
                    // onSendContact={onSendContact}
                    // onSendGallery={onSendGallery}
                    // onSendDocument={onSendDocument}
                    // onSendSticker={onSendSticker}
                    // onSendQuickReply={onSendQuickReply}
                    // onSendVoice={onSendVoice}
                    // onSendProduct={onSendProduct}
                    // onSendProductGallery={onSendProductGallery}
                  ></Chat>
                )}
              </Column>
            }></CheckLoginCPN>
        }></Scaffold>
      <Modal visible={isShowDrawer} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setIsShowDrawer(false)}>
          <View
            style={{
              height: windowHeight,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
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
                minHeight: 50, // Đặt giá trị minHeight thay vì cứng chiều cao
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
              <Column>
                <TouchableOpacity
                  onPress={() => {
                    handleImageSelection();

                    setIsShowDrawer(false);
                  }}
                  style={{padding: 20}}>
                  <Text>Chọn ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleFileSelection();
                    setIsShowDrawer(false);
                  }}>
                  <Text>Chọn file</Text>
                </TouchableOpacity>
                <SizedBox height={30}></SizedBox>
              </Column>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
});

export default ChatScreen;
