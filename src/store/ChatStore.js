// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

class ChatStore {
  navigation = useNavigation();

  isLoading = false;
  loadInit = true;
  listBoxChat = [];
  currentPage = 1;
  isEnd = false;
  


  constructor() {
    makeObservable(this, {
      isLoading: observable,
      loadInit: observable,
      listBoxChat: observable,
      currentPage: observable,
      isEnd: observable,
      getAllPersonChat: action.bound,
    });
  }

    loadMoreMessage = async (isRefresh) => {
    isLoading.value = true;
    
    if (isRefresh === true) {
      pageLoadMore = 1;
      isEndPageCombo = false;
    }
    
    timeNow.value = new Date();
    
    try {
      if (!isEndPageCombo) {
        const res = await CustomerRepositoryManager.chatCustomerRepository.getAllMessageCustomer(pageLoadMore);
        
        res.data.data.forEach((eMain) => {
          console.log(eMain.isUser);
          
          if (eMain.isUser !== false) {
            if (eMain.linkImages === null) {
              const message = new types.TextMessage({
                author: userChat.value,
                id: eMain.id.toString(),
                createdAt: eMain.createdAt ? eMain.createdAt.millisecondsSinceEpoch : timeNow.value.millisecondsSinceEpoch,
                text: eMain.content || "",
                status: types.Status.sent
              });
              listMessages.push(message);
            } else {
              try {
                const listImage = JSON.parse(eMain.linkImages).map(e => new ImageChat(e));
                
                listImage.forEach(e => {
                  const message = new types.ImageMessage({
                    author: userChat.value,
                    height: e.height,
                    id: e.linkImages,
                    name: e.linkImages,
                    size: e.size || 1000000,
                    createdAt: eMain.createdAt ? eMain.createdAt.millisecondsSinceEpoch : timeNow.value.millisecondsSinceEpoch,
                    uri: e.linkImages,
                    width: e.width,
                    status: types.Status.sent
                  });
                  listMessages.push(message);
                });
              } catch (err) {
                // allImageInMessage[i] = [listMessage[i].linkImages];
              }
            }
          } else {
            if (eMain.linkImages === null) {
              const message = new types.TextMessage({
                author: userMain.value,
                id: eMain.id.toString(),
                createdAt: eMain.createdAt ? eMain.createdAt.millisecondsSinceEpoch : timeNow.value.millisecondsSinceEpoch,
                text: eMain.content || "",
                status: types.Status.sent
              });
              listMessages.push(message);
            } else {
              try {
                const listImage = JSON.parse(eMain.linkImages).map(e => new ImageChat(e));
                
                listImage.forEach(e => {
                  const message = new types.ImageMessage({
                    author: userMain.value,
                    height: e.height,
                    id: e.linkImages,
                    name: e.linkImages,
                    size: e.size || 1000000,
                    createdAt: eMain.createdAt ? eMain.createdAt.millisecondsSinceEpoch : timeNow.value.millisecondsSinceEpoch,
                    uri: e.linkImages,
                    width: e.width,
                    status: types.Status.sent
                  });
                  listMessages.push(message);
                });
              } catch (err) {
                // allImageInMessage[i] = [listMessage[i].linkImages];
              }
            }
          }
        });
        
        listMessages.refresh();
        
        if (res.data.nextPageUrl !== null) {
          pageLoadMore++;
          isEndPageCombo = false;
        } else {
          isEndPageCombo = true;
        }
      }
    } catch (err) {
      SahaAlert.showError({ message: err.toString() });
    }
    
    isLoading.value = false;
  }
  

  getAllPersonChat = async (isRefresh = false) => {
    if (isRefresh === true) {
      this.currentPage = 1;
      this.isEnd = false;
    }

    try {
      if (!this.isEnd) {
        var res = await RepoManager.chat.getAllPersonChat(
          this.currentPage,
        );
        var list = res.data.data.data;
        this.isLoading = true;

        if (isRefresh == true) {
          this.listBoxChat = list;
        } else {
          this.listBoxChat.push(...list);
        }

        if (res?.data?.data?.next_page_url == null) {
          this.isEnd = true;
        } else {
          this.isEnd = false;
          this.currentPage = this.currentPage + 1;
        }
      }
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.loadInit = false;
  };


}

const chatStore = new ChatStore();

export const chatStoreContext = React.createContext(chatStore);
export const useChatStore = () => React.useContext(chatStoreContext);
