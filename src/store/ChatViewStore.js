// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';
import {useNavigation} from '@react-navigation/native';
import {useDataAppStore} from './DataAppStore';
import {socket} from '../socket/socket';

class ChatViewStore {
  navigation = useNavigation();

  isLoading = false;
  pageLoadMore = 1;
  isEndPageCombo = false;
  timeNow = new Date();
  listMessages = [];
  isRefresh = false;
  userChat = {
    id: 1,
    name: 'Customer',
    avatar: 'https://placeimg.com/140/140/any',
  };

  userMain = {
    id: 2,
    name: 'Admin',
    avatar: 'https://placeimg.com/140/140/any',
  };

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      pageLoadMore: observable,
      isEndPageCombo: observable,
      timeNow: observable,
      listMessages: observable,
      userChat: observable,
      userMain: observable,
      isRefresh: observable,
      loadMoreMessage: action.bound,
      setUserChat: action.bound,
      setUserMain: action.bound,
      setListMessages: action.bound,
      setIsRefresh: action.bound,
      sendImageToUser: action.bound,
      sendMessageToUsers: action.bound,
      socketOn: action.bound,
      socketOff: action.bound,
    });
  }

  setIsRefresh = isRefresh => {
    this.isRefresh = isRefresh;
  };

  setUserChat = user => {
    this.userChat = user;
  };

  setUserMain = user => {
    this.userMain = user;
  };

  dataApp = useDataAppStore();

  setListMessages = list => {
    this.listMessages = list;
  };

  socketOn = () => {
    socket.on(
      `chat:message_from_user:${this.dataApp.infoCustomer?.id}`,
      data => {
        console.log('data', data);
        const resData = data;

        if (resData.link_images === null) {
          const message = {
            author: this.userChat,
            id: resData.id.toString(),
            createdAt: resData.created_at
              ? new Date(resData.created_at)
              : this.timeNow,
            text: resData.content || '',
            status: 'sent',
            type: 'text',
          };
          this.listMessages.unshift(message);
        } else {
          try {
            var link_images = JSON.parse(resData.link_images);

            link_images.map(e => {
              const message = {
                author: this.userChat,
                height: e.height,
                id: e.link_images,
                name: e.link_images,
                size: e.size || 1000000,
                createdAt: resData.created_at
                  ? new Date(resData.created_at)
                  : this.timeNow,
                uri: e.link_images,
                width: e.width,
                status: 'sent',
                type: 'image',
              };

              this.listMessages.unshift(message);
            });
          } catch (err) {
            console.log(err);
          }
        }

        this.setIsRefresh(!this.isRefresh);
      },
    );
  };

  socketOff = () => {
    socket.off(`chat:box_chat:${profile.id}`, roomChats => {
      console.log('room chat is Off', roomChats);
    });
  };

  loadMoreMessage = async isRefresh => {
    this.isLoading = true;

    if (isRefresh === true) {
      this.pageLoadMore = 1;
      this.isEndPageCombo = false;
      this.listMessages = [];
    }

    this.timeNow = new Date();

    try {
      if (!this.isEndPageCombo) {
        const res = await RepoManager.chatView.getAllMessageCustomer(
          this.pageLoadMore,
        );

        console.log(res.data.data.data);

        res.data.data.data.forEach(eMain => {
          console.log(eMain.is_user);

          if (eMain.is_user !== false) {
            if (eMain.link_images === null) {
              const message = {
                author: this.userChat,
                id: eMain.id,
                createdAt: eMain.created_at
                  ? new Date(eMain.created_at)
                  : this.timeNow,
                text: eMain.content || '',
                status: 'sent',
                type: 'text',
              };
              this.listMessages.push(message);
            } else {
              try {
                var link_images = JSON.parse(eMain.link_images);
                link_images.map(e => {
                  const message = {
                    author: this.userChat,
                    height: e.height,
                    id: e.link_images,
                    name: e.link_images,
                    size: e.size || 1000000,
                    createdAt: eMain.created_at
                      ? new Date(eMain.created_at)
                      : this.timeNow,
                    uri: e.link_images,
                    width: e.width,
                    status: 'sent',
                    type: 'image',
                  };
                  this.listMessages.push(message);
                });
              } catch (err) {
                // allImageInMessage[i] = [listMessage[i].link_images];
              }
            }
          } else {
            if (eMain.link_images === null) {
              const message = {
                author: this.userMain,
                id: eMain.id,
                createdAt: eMain.created_at
                  ? new Date(eMain.created_at)
                  : this.timeNow,
                text: eMain.content || '',
                status: 'sent',
                type: 'text',
              };
              this.listMessages.push(message);
            } else {
              try {
                var link_images = JSON.parse(eMain.link_images);

                link_images.map(e => {
                  const message = {
                    author: this.userMain,
                    height: e.height,
                    id: e.link_images,
                    name: e.link_images,
                    size: e.size || 1000000,
                    createdAt: eMain.created_at
                      ? new Date(eMain.created_at)
                      : this.timeNow,
                    uri: e.link_images,
                    width: e.width,
                    status: 'sent',
                    type: 'image',
                  };
                  this.listMessages.push(message);
                });
              } catch (err) {
                console.log('err', err);
                // allImageInMessage[i] = [listMessage[i].link_images];
              }
            }
          }
        });

        this.setIsRefresh(!this.isRefresh);

        if (res.data.data.next_page_url !== null) {
          this.pageLoadMore++;
          this.isEndPageCombo = false;
        } else {
          this.isEndPageCombo = true;
        }
      }
    } catch (err) {
      //  SahaAlert.showError({message: err.toString()});
    }

    this.isLoading = false;
  };

  sendImageToUser = async data => {
    try {
      var res = await RepoManager.chatView.sendMessageToUser({
        link_images: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }
  };
  sendMessageToUsers = async data => {
    try {
      var res = await RepoManager.chatView.sendMessageToUser({
        content: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const chatViewStore = new ChatViewStore();

export const chatViewStoreContext = React.createContext(chatViewStore);
export const useChatViewStore = () => React.useContext(chatViewStoreContext);
