// counter.store.js
import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {RepoManager} from '../services';
import {useNavigation} from '@react-navigation/native';

class NotiStore {
  navigation = useNavigation();

  isEnd = false;
  currentPage = 1;
  isLoading = false;
  loadInit = true;
  listNoti = [];

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      loadInit: observable,
      listNoti: observable,
      getAllNoti: action.bound,
      readAllNotification: action.bound,
    });
  }
  readAllNotification = async () => {
    try {
      var res = await RepoManager.noti.readAllNotification();
    } catch (err) {
      console.log(err);
    }
  };

  getAllNoti = async (isRefresh = false) => {
    if (isRefresh === true) {
      this.currentPage = 1;
      this.isEnd = false;
      this.listNoti = [];
    }

    try {
      if (!this.isEnd) {
        var res = await RepoManager.noti.getAllNoti(this.currentPage);
        var list = res.data.data.list_notification.data;
        this.isLoading = true;
        console.log('list', list);

        if (isRefresh == true) {
          this.listNoti = list;
        } else {
          this.listNoti.push(...list);
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

const notiStoreStore = new NotiStore();

export const notiStoreContext = React.createContext(notiStoreStore);
export const useNotiStore = () => React.useContext(notiStoreContext);
